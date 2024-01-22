import type { Method } from 'axios'

import { useChatflowStore } from '@/stores/chatflow'
import { useUserStore } from '@/stores/user'

import type { AxiosParams } from './axios'
import { get, post, request } from './axios'
import config from './config'

const authRequest = async <T>(method: Method, url: string, opts?: AxiosParams) => {
  const options = Object.assign({ params: {}, headers: {}, data: {}, refresh: false }, opts)
  const { user } = useUserStore()
  const { chatflowId, chatflowUrlKey } = useChatflowStore()
  options.headers.chatflowid = chatflowId
  options.headers.chatflow_url_key = chatflowUrlKey
  options.headers.chatflow_username = user.username
  options.headers.chatflow_password = user.password
  return request<T>(method, url, options)
}

const authGet = async <T>(url: string, opts?: AxiosParams) => {
  return authRequest<T>('get', url, opts)
}

const authPost = async <T>(url: string, opts?: AxiosParams) => {
  return authRequest<T>('post', url, opts)
}

export default {
  host: config.host,
  request,
  post,
  get,
  authRequest,
  authGet,
  authPost,
}
