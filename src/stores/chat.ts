import { useUtil } from '@use/useUtil'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import apis from '@/apis'
import { type ChatMessage, ChatMessageStatus, type Conversation, db } from '@/db'
import { useDayjs } from '@/use/useDayjs'

import { useChatflowStore } from './chatflow'

const { dayjs } = useDayjs()
const { generateRandomString } = useUtil()

export const useChatStore = defineStore('chat', () => {
  const list = ref<Conversation[]>([])
  const searchTitle = ref('')
  const currentConversation = ref<Conversation | null>(null)
  const groupId = ref('')
  const messageMap = ref<Map<string, ChatMessage[]>>(new Map<string, ChatMessage[]>())
  const currentMessageList = ref<ChatMessage[]>([])

  function sortList() {
    list.value.sort((a, b) => dayjs(b.updatedAt).diff(dayjs(a.updatedAt)))
  }

  const conversationList = computed(() => {
    if (searchTitle.value === '') {
      return list.value
    }
    return list.value.filter((item) => {
      return new RegExp(searchTitle.value).test(item.title)
    })
  })
  const chatflow = useChatflowStore()

  async function clear() {
    list.value = []
    currentConversation.value = null
    currentMessageList.value = []
    messageMap.value = new Map<string, ChatMessage[]>()
  }

  async function init() {
    const chatInfo = await db.table('chatInfos').where('chatflowid').equals(chatflow.chatflowId).first()
    if (!chatInfo) {
      groupId.value = generateRandomString(12)
      await db.table('chatInfos').add({
        chatflowid: chatflow.chatflowId,
        groupId: groupId.value,
      })
    }
    else {
      groupId.value = chatInfo.groupId
    }
    list.value = await db.table('conversations').where('chatflowid').equals(chatflow.chatflowId).toArray()
    sortList()
  }

  async function selectConversation(conversation: Conversation) {
    currentConversation.value = conversation
    if (messageMap.value.has(conversation.id)) {
      currentMessageList.value = messageMap.value.get(conversation.id) || []
    }
    else {
      let messages = await db.table('chatMessages').where('conversationId').equals(conversation.id).toArray()
      messages = messages.sort((a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)))
      messageMap.value.set(conversation.id, messages)
      currentMessageList.value = messages
    }
  }

  async function deleteConversation(conversation: Conversation) {
    await db.table('conversations').where('id').equals(conversation.id).delete()
    await db.table('chatMessages').where('conversationId').equals(conversation.id).delete()
    messageMap.value.delete(conversation.id)
    currentConversation.value = null
    currentMessageList.value = []
    const index = list.value.findIndex(item => item.id === conversation.id)
    list.value.splice(index, 1)
    sortList()
  }

  async function updateConversation(conversation: Conversation) {
    const cacheConversation = await db.table('conversations').where('id').equals(conversation.id).first()
    if (cacheConversation) {
      await db.table('conversations').where('id').equals(conversation.id).modify(conversation)
    }
    else {
      await db.table('conversations').add(conversation)
    }
    const index = list.value.findIndex(item => item.id === conversation.id)
    Object.assign(list.value[index], conversation)
    sortList()
  }

  async function addConversation() {
    if (currentConversation.value) {
      return currentConversation.value
    }
    const conversation = {
      id: '-1',
      title: '新会话',
      chatflowid: chatflow.chatflowId,
      groupId: groupId.value,
      thirdUserId: generateRandomString(12),
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
    currentMessageList.value = []
    currentConversation.value = conversation
    list.value.unshift(currentConversation.value)
    sortList()
    return conversation
  }

  async function sendMessage(userInput: string) {
    if (userInput === '') {
      return
    }
    const conversation = await addConversation()

    if (conversation.id === '-1') {
      conversation.id = generateRandomString(12)
    }

    const message: ChatMessage = {
      id: generateRandomString(12),
      userId: conversation.thirdUserId,
      role: 'userMessage',
      chatflowid: chatflow.chatflowId,
      content: userInput,
      conversationId: conversation.id,
      status: ChatMessageStatus.Success,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
    await db.table('chatMessages').add(message)
    currentMessageList.value.push(message)
    if (!messageMap.value.has(conversation.id)) {
      messageMap.value.set(conversation.id, currentMessageList.value)
    }
    const aiMessage: ChatMessage = {
      id: generateRandomString(12),
      userId: conversation.thirdUserId,
      role: 'apiMessage',
      chatflowid: chatflow.chatflowId,
      content: '正在查询...',
      conversationId: conversation.id,
      status: ChatMessageStatus.Pending,
      createdAt: dayjs().add(1, 's').format('YYYY-MM-DD HH:mm:ss'),
    }
    const result = await apis.authPost<string | { sourceDocuments: Array<{ pageContent: string, metadata: { page: number, paragraph: number } }>, text: string }>('/prediction', {
      data: {
        groupId: groupId.value,
        thirdUserId: conversation.thirdUserId,
        question: userInput,
      },
    }).catch((err) => {
      console.log('err', err)
      aiMessage.status = ChatMessageStatus.Failed
      aiMessage.content = err || '系统错误'
    })
    if (result) {
      aiMessage.status = ChatMessageStatus.Success
      if (typeof result === 'string') {
        aiMessage.content = result || ''
      }
      else {
        aiMessage.content = result.text
        aiMessage.sourceDocuments = result.sourceDocuments
      }
    }
    await db.table('chatMessages').add(aiMessage)
    currentMessageList.value.push(aiMessage)
    if (!messageMap.value.has(conversation.id)) {
      messageMap.value.set(conversation.id, currentMessageList.value)
    }
    conversation.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss')
    await updateConversation(conversation)
  }

  return {
    searchTitle,
    conversationList,
    currentConversation,
    currentMessageList,
    selectConversation,
    deleteConversation,
    addConversation,
    updateConversation,
    init,
    clear,
    sendMessage,
  }
})
