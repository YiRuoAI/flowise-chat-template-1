<script setup lang="ts">
import {
  MenuOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  SendOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
import ConversationList from '@components/ConversationList.vue'
import { nextTick, ref, watch } from 'vue'

import MessageList from '@/components/MessageList.vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const question = ref('')
const messageContainer = ref<HTMLElement | null>(null)

watch(
  () => chatStore.currentMessageList,
  () => {
    nextTick(() => {
      if (messageContainer.value) {
        messageContainer.value.scrollTo({
          top: messageContainer.value.scrollHeight - messageContainer.value.clientHeight,
          behavior: 'smooth',
        })
      }
    })
  },
  {
    deep: true,
  },
)

const isOpenConversationList = ref(true)

function toggleConversationList() {
  isOpenConversationList.value = !isOpenConversationList.value
}

function sendMessage(event?: KeyboardEvent) {
  if (event?.shiftKey) {
    return
  }
  event?.preventDefault()
  chatStore.sendMessage(question.value)
  question.value = ''
}
</script>

<template>
  <div class="index-page">
    <div class="header-view">
      <div class="title">
        <MenuOutlined class="icon" @click="toggleConversationList" />
        YIRUO AI
      </div>
    </div>
    <div class="content" :class="{ 'is-open-conversation-list': isOpenConversationList }">
      <div class="mask"></div>
      <div class="conversation-container">
        <div class="search-title">
          <a-input v-model:value="chatStore.searchTitle" size="large" placeholder="搜索(支持正则)">
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
          <ReloadOutlined class="icon" />
        </div>
        <ConversationList />
      </div>
      <div class="message-container">
        <div class="header-container">
          <div class="left">
            {{ chatStore.currentConversation?.title }}
          </div>
          <PlusOutlined class="icon" @click="chatStore.addConversation" />
          <UploadOutlined class="icon" />
        </div>
        <div ref="messageContainer" class="center-container">
          <MessageList />
        </div>
        <div class="footer-container">
          <a-textarea
            v-model:value="question"
            placeholder="在这里输入"
            size="large"
            :auto-size="{ minRows: 1, maxRows: 5 }"
            @press-enter="sendMessage"
          />
          <div class="icon-wrap" @click="sendMessage()">
            <SendOutlined class="icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.conversation-container {
  > .search-title {
    > .ant-input-affix-wrapper {
      > .ant-input {
        background: transparent !important;
      }
    }
  }
}
</style>

<style scoped lang="less">
.index-page {
  .wh(100vw, 100vh);
  background-color: #F3F3F3;
  > .header-view {
    .p-r();
    z-index: 3;
    .wh(100vw, 60px);
    background-color: #FFFFFF;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
    .flex(flex-start, center);
    > .title {
      .flex();
      font-size: 24px;
      > .icon {
        font-size: 16px;
        margin: 0 0.2rem;
        cursor: pointer;
      }
    }
  }
  > .content {
    .p-r();
    .wh(100vw, calc(100vh - 60px));
    .flex();
    > .mask {
      .p-f();
      left: 0;
      top: 0;
      display: none;
      .wh(100vw, 100vh);
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.8);
    }
    > .conversation-container {
      .p-r();
      .wh(0, 100%);
      margin-left: 0;
      left: 0;
      background-color: #FFFFFF;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
      transition: width 0.3s, padding 0.3s;
      overflow: hidden;
      padding: 0px;
      z-index: 2;
      .flex-column();
      > .search-title {
        .p-r();
        .wh(100%, auto);
        padding-bottom: 12px;
        .flex();
        > .icon {
          font-size: 16px;
          margin: 0 0.2rem;
          cursor: pointer;
          color: rgb(128,128,128);
        }
        > .ant-input-affix-wrapper {
          border: none;
          box-shadow: none;
          background-color: #F6F6F6;
          &:hover,
          &:focus {
            border: none;
            box-shadow: none;
          }
        }
      }
      @media screen and (max-width: 768px) {
        .p-f();
        left: 0;
        top: 60px;
      }
    }
    > .message-container {
      .p-r();
      .wh(100vw, 100%);
      transition: width 0.3s;
      .flex-column();
      > .header-container {
        .p-a();
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #e5e7eb;
        flex-shrink: 0;
        .flex();
        background: #F3F3F366;
        -webkit-backdrop-filter: blur(24px);
        backdrop-filter: blur(24px);
        top: 0;
        z-index: 1;
        > .left {
          flex: 1;
          font-size: 18px;
          margin-left: 12px;
        }
        > .icon {
          font-size: 20px;
          margin-right: 12px;
          cursor: pointer;
        }
      }
      > .center-container {
        .p-r();
        width: 100%;
        height: 100%;
        padding-top: 60px;
        padding-bottom: 120px;
        overflow: scroll;
      }
      > .footer-container {
        .p-a();
        .flex();
        bottom: 0;
        width: 100%;
        padding-top: 24px;
        padding-bottom: 24px;
        flex-shrink: 0;
        background: #F3F3F366;
        -webkit-backdrop-filter: blur(24px);
        backdrop-filter: blur(24px);
        > .ant-input {
          border-radius: 20px;
          width: 96%;
          border: none;
          padding-right: 36px;
          &:hover,
          &:focus {
            border: none;
            box-shadow: none;
          }
        }
        > .icon-wrap {
          .p-a();
          font-size: 20px;
          right: 2.5%;
          bottom: 28px;
          cursor: pointer;
          background-color: #4EAB5F;
          border-radius: 100px;
          .wh(32px, 32px);
          .flex();

          > .icon {
            color: #FFFFFF;
            transform: translate(-2px, -2px) rotate(-135deg);
          }
        }
      }
    }
    &.is-open-conversation-list {

      @media screen and (max-width: 768px) {
        > .mask {
          display: inline-block;
        }
      }
      > .conversation-container {
        width: 300px;
        padding: 12px;
      }
      > .message-container {
        width: calc(100vw - 300px);
        @media screen and (max-width: 768px) {
          width: 100vw;
        }
      }
    }
  }
}
</style>
