import { createApp, reactive } from 'vue'

import ToastApp from './ToastApp.vue'
import type { ToastOption } from './type'

let hadMount = false
const app = createApp(ToastApp)

const defaultOption: Partial<ToastOption> = {
  type: 'center',
  duration: 2500,
  wordWrap: true,
  width: '',
}

let toastTimer = -1

const toastData = reactive({
  show: false,
  tip: '',
  wordWrap: true,
  type: 'center',
  extStyle: {
    width: '',
  },
})

function Toast(tip: string, config: Partial<ToastOption> = {}) {
  if (!hadMount) {
    hadMount = true
    app.mount('#toast')
  }
  const option: Partial<ToastOption> = {}
  Object.assign(option, defaultOption, config)

  if (toastTimer !== -1) {
    clearTimeout(toastTimer)
    toastTimer = -1
  }
  toastData.tip = tip
  toastData.wordWrap = option.wordWrap || false
  toastData.type = option.type || 'center'
  toastData.extStyle.width = option.width || ''
  toastData.show = true
  toastTimer = window.setTimeout(() => {
    toastData.show = false
    toastTimer = -1
  }, option.duration)
}
Toast.top = (tip: string, config: Partial<ToastOption> = {}) => Toast(tip, Object.assign(config, { type: 'top' }))
Toast.center = (tip: string, config: Partial<ToastOption> = {}) => Toast(tip, Object.assign(config, { type: 'center' }))
Toast.bottom = (tip: string, config: Partial<ToastOption> = {}) => Toast(tip, Object.assign(config, { type: 'bottom' }))

let loadingTimer = -1

const loadingData = reactive({
  show: false,
  showContent: false,
  tip: '',
})

function Loading(tip = '', waitToShowLoading = 0, type?: 'open' | 'close') {
  if (!hadMount) {
    hadMount = true
    app.mount('#toast')
  }
  if (type === 'close') {
    loadingData.tip = ''
    loadingData.showContent = false
    loadingData.show = false
    clearTimeout(loadingTimer)
    return
  }
  loadingData.tip = tip
  loadingData.show = true
  loadingTimer = window.setTimeout(() => {
    loadingData.showContent = true
  }, waitToShowLoading)
}

Loading.open = (tip = '', waitToShowLoading = 0) => Loading(tip, waitToShowLoading, 'open')
Loading.close = () => Loading('', 0, 'close')

function useToastData() {
  return { loadingData, toastData }
}

export { Loading, Toast, useToastData }
