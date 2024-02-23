<script lang="ts" setup>
import { CommentOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'

import type { Conversation } from '@/db'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()

function deleteConversation(conversation: Conversation) {
  Modal.confirm({
    title: '确定删除该会话吗？',
    content: `${conversation.title}`,
    okText: '确认',
    cancelText: '取消',
    onOk() {
      chatStore.deleteConversation(conversation)
    },
    onCancel() {},
  })
}

// function editConversation(conversation: Conversation) {

// }

function selectConversation(conversation: Conversation) {
  chatStore.selectConversation(conversation)
}
</script>

<template>
  <div class="conversation-list">
    <div
      v-for="conversation in chatStore.conversationList"
      :key="conversation.id" class="conversation-item"
      :class="{ active: conversation.id === chatStore.currentConversation?.id }"
    >
      <CommentOutlined class="icon" />
      <div class="title" @click="selectConversation(conversation)">
        {{ conversation.title }}
      </div>
      <!-- <EditOutlined class="icon btn" @click="editConversation(conversation)" /> -->
      <DeleteOutlined class="icon btn" @click="deleteConversation(conversation)" />
    </div>
    <a-empty v-if="chatStore.conversationList.length === 0" />
  </div>
</template>

<style lang="less" scoped>
.conversation-list {
  .p-r();
  width: 100%;
  flex: 1;
  padding-bottom: 12px;
  overflow: scroll;
  > .conversation-item {
    padding: 12px 10px 12px 0px;
    border-radius: 5px;
    font-size: 14px;
    width: 100%;
    .flex();
    cursor: pointer;
    &:hover {
      background-color: rgba(234,234,234, 0.4);
      > .icon {
        &.btn {
          display: block;
        }
      }
    }
    &.active {
      background-color: #EAEAEA;
    }
    > .title {
      .text-line();
      flex: 1;
      margin-left: 10px;
    }
    > .icon {
      margin-left: 10px;
      color: #797979;
      &.btn {
        display: none;
        cursor: pointer;
        &:hover {
          color: #000000;
        }
      }
    }
  }
}
</style>
