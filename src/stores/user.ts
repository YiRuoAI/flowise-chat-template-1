import { defineStore } from 'pinia'
import { reactive } from 'vue'

import apis from '@/apis'
import { Toast } from '@/components/toast/Toast'
import { db } from '@/db'

import { useChatStore } from './chat'
import { useChatflowStore } from './chatflow'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    username: '',
    password: '',
    verifySuccess: false,
  })

  const chatflow = useChatflowStore()
  const chat = useChatStore()

  async function init() {
    const cacheUser = await db.table('users').where('chatflowId').equals(chatflow.chatflowId).first()
    if (cacheUser) {
      user.username = cacheUser.username
      user.password = cacheUser.password
    }
    verifyUser()
  }

  async function verifyUser() {
    if (!user.username || !user.password) {
      user.verifySuccess = false
      return
    }
    const res = await apis.authPost<{ result: boolean }>('/verify-user', {
      autoLoading: true,
    }).catch((err) => {
      Toast(err)
    })
    chat.clear()
    if (res?.result) {
      user.verifySuccess = true
      chat.init()
      const cacheUser = await db.table('users').where('chatflowId').equals(chatflow.chatflowId).first()
      if (cacheUser) {
        await db.table('users').where('chatflowId').equals(chatflow.chatflowId).modify({
          username: user.username,
          password: user.password,
        })
      }
      else {
        await db.table('users').add({
          chatflowId: chatflow.chatflowId,
          username: user.username,
          password: user.password,
        })
      }
    }
  }

  return { user, init, verifyUser }
})
