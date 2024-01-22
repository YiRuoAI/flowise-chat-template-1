import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatflowStore = defineStore('chatflow', () => {
  const chatflowId = ref('')
  const chatflowUrlKey = ref('')

  return { chatflowId, chatflowUrlKey }
})
