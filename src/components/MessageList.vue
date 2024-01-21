<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue'
import { useChatStore } from '@stores/chat'
import { Modal } from 'ant-design-vue'
import hljs from 'highlight.js'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'

import { ChatMessageStatus } from '@/db'

hljs.initHighlightingOnLoad()

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code) {
      return hljs.highlightAuto(code).value
    },
  }),
)
marked.setOptions({
  renderer: new marked.Renderer(),
  breaks: true,
})

const chatStore = useChatStore()

function showDetail(source: string) {
  Modal.info({
    title: '原文详情',
    content: source,
    okText: '确认',
  })
}
</script>

<template>
  <div class="message-list">
    <link href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css" rel="stylesheet" />
    <div
      v-for="message in chatStore.currentMessageList"
      :key="message.id"
      class="message-item"
      :class="{
        'user-message': message.role === 'userMessage',
        'ai-message': message.role === 'apiMessage',
        'is-error': message.status === ChatMessageStatus.Failed,
      }"
    >
      <a-avatar class="avatar" shape="square">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <div class="info-box">
        <section class="markdown-body" v-html="marked.parse(message.content)"></section>
        <div v-if="message.sourceDocuments?.length" class="source-list">
          <div
            v-for="(sourceDocument, index) in message.sourceDocuments"
            :key="index"
            class="item"
            @click="showDetail(sourceDocument.pageContent)"
          >
            {{ sourceDocument.pageContent }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="chatStore.currentMessageList.length === 0" class="empty-view">
      <a-empty />
    </div>
  </div>
</template>

<style lang="less" scoped>
.message-list {
  .p-r();
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 12px;
  > .empty-view {
    .wh(100%, 300px);
    .flex();
  }
  .message-item {
    .p-r();
    width: 100%;
    padding: 12px 10px;
    border-radius: 5px;
    font-size: 14px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    > .avatar {
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      margin: 0 10px;
    }
    > .info-box {
      .p-r();
      padding: 8px 10px;
      border-radius: 8px;
      .flex-column();
      justify-content: flex-start;
      align-items: flex-start;
      > .info {
        .p-r();
        color: #393939;
        overflow: scroll;
      }
      > .source-list {
        .flex(flex-start);
        flex-wrap: wrap;
        border-top: 1px solid #EAEAEA;
        margin-top: 12px;
        width: 100%;
        > .item {
          .text-line();
          max-width: 150px;
          padding: 4px;
          border: 1px solid #EAEAEA;
          border-radius: 5px;
          background-color: #FFFFFF;
          color: #393939;
          cursor: pointer;
          margin-right: 12px;
          margin-top: 10px;
          &:hover {
            background-color: #EAEAEA;
          }
        }
      }

    }
    &.is-error {
      > .info-box {
        background-color: #F5A9A9;
      }
    }
    &.user-message {
      flex-direction: row-reverse;
      > .info-box {
        background-color: #A9EA7A;
        margin-left: 50px;
        border-bottom-right-radius: 0px;
      }
    }
    &.ai-message {
      > .info-box {
        background-color: #FFFFFF;
        margin-right: 50px;
        border-bottom-left-radius: 0px;
      }
    }
  }
}
</style>

<style lang="css">
.markdown-body {
  font-size: 14px !important;
}
pre {
  margin-bottom: 0px !important;
}
pre code.hljs {
    display: block;
    overflow-x: auto;
}

code.hljs {
    padding: 3px 5px;
}

.hljs {
    color: #24292e;
    background: #fff;
}

.hljs-doctag,
.hljs-keyword,
.hljs-meta .hljs-keyword,
.hljs-template-tag,
.hljs-template-variable,
.hljs-type,
.hljs-variable.language_ {
    color: #d73a49;
}

.hljs-title,
.hljs-title.class_,
.hljs-title.class_.inherited__,
.hljs-title.function_ {
    color: #6f42c1;
}

.hljs-attr,
.hljs-attribute,
.hljs-literal,
.hljs-meta,
.hljs-number,
.hljs-operator,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-selector-id,
.hljs-variable {
    color: #005cc5;
}

.hljs-meta .hljs-string,
.hljs-regexp,
.hljs-string {
    color: #032f62;
}

.hljs-built_in,
.hljs-symbol {
    color: #e36209;
}

.hljs-code,
.hljs-comment,
.hljs-formula {
    color: #6a737d;
}

.hljs-name,
.hljs-quote,
.hljs-selector-pseudo,
.hljs-selector-tag {
    color: #22863a;
}

.hljs-subst {
    color: #24292e;
}

.hljs-section {
    color: #005cc5;
    font-weight: 700;
}

.hljs-bullet {
    color: #735c0f;
}

.hljs-emphasis {
    color: #24292e;
    font-style: italic;
}

.hljs-strong {
    color: #24292e;
    font-weight: 700;
}

.hljs-addition {
    color: #22863a;
    background-color: #f0fff4;
}

.hljs-deletion {
    color: #b31d28;
    background-color: #ffeef0;
}
</style>
