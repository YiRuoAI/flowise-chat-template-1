<script lang="ts" setup>
import { useChatflowStore } from '@stores/chatflow'
import { useUserStore } from '@stores/user'

import { Loading } from './toast/Toast'

const userStore = useUserStore()
const chatflowStore = useChatflowStore()
const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
if (!id) {
  Loading('缺少 chatflow id')
}
else {
  chatflowStore.chatflowId = id
  userStore.init()
}
</script>

<template>
  <div v-if="!userStore.user.verifySuccess" class="setting-page">
    <form class="form-card">
      <div class="title">
        设置账号密码
      </div>
      <input
        v-model="userStore.user.username"
        class="input-box"
        type="text"
        placeholder="用户名"
        autoComplete="username"
      />
      <input
        v-model="userStore.user.password"
        class="input-box"
        type="password"
        placeholder="密码"
        autoComplete="current-password"
      />
      <div
        class="save-button" @click="userStore.verifyUser"
      >
        保存
      </div>
    </form>
  </div>
</template>

<style lang="less" scoped>
.setting-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5); // Semi-transparent white
  backdrop-filter: blur(10px); // Apply blur effect
  animation: fadeIn .3s ease-in-out; // Apply fade in effect
  .form-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    padding: 48px 0;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1); // Add lighter shadow on all sides
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 600px) {
      width: 90%; // Reduce width on small screens
    }

    .title {
      font-size: 24px; // Change to the size you want
      font-weight: bold; // Make the title bold
      color: #333; // Change to the color you want
      text-align: center; // Center the title
      margin-bottom: 20px; // Add some space below the title
    }

    .input-box {
      display: block;
      width: 80%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 10px;
      &:focus {
        outline: none;
        border-color: #ccc; // Change to the color you want
      }
    }

    .save-button {
      display: block;
      width: 80%;
      padding: 10px;
      border: none;
      border-radius: 4px;
      font-size: 0.32rem;
      .flex();
      background-color: #4CAF50;
      color: white;
      cursor: pointer;
      &:hover {
        background-color: #45a049;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
