import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import Axios from 'axios'
import { md5 } from 'md5js'

import { Loading } from '@/components/toast/Toast'

import config from './config'

export type AxiosParams = AxiosRequestConfig & {
  refresh?: boolean
  autoLoading?: boolean
  autoLoadingTime?: number
}

const axios = Axios.create({
  baseURL: `${config.host}/v1/chat-open`,
  headers: config.defaultHeaders,
  timeout: config.timeout,
})

axios.interceptors.request.use(
  (res) => {
    return res
  },
  (error) => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response
  },
  (error) => {
    console.log(error)
    return Promise.reject(error.response && error.response.data)
  },
)

const cacheData: Record<string, any> = {}
const cacheDataKeys: string[] = []
const loadingList: Record<string, { fnList: any[] }> = {}
const autoLoadingList: Set<string> = new Set()

const clearLoading = (key: string) => {
  if (autoLoadingList.has(key)) {
    autoLoadingList.delete(key)
    if (autoLoadingList.size === 0) {
      // 关闭loading
      Loading.close()
    }
  }
}

const entries = (obj: Record<string, any>) => {
  return Object.entries(obj)
    .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
    .sort()
    .join('&')
}

const getMD5 = (
  method: Method,
  url: string,
  params: Record<string, any>,
  data: Record<string, any>,
  headers: Record<string, any>,
) => {
  const str = `${method}_${url}_${entries(data)}_${entries(params)}_${entries(headers)}`
  return md5(encodeURI(str), 16)
}

const preDeal = async <T = any>(md5Str: string, fn: Promise<AxiosResponse<T>>) => {
  return fn
    .then((res) => {
      clearLoading(md5Str)
      cacheData[md5Str] = res
      cacheDataKeys.push(md5Str)
      // 只缓存20条数据
      if (cacheDataKeys.length > 20) {
        const key = cacheDataKeys.shift()
        if (key) {
          delete cacheData[key]
        }
      }
      if (loadingList[md5Str]) {
        loadingList[md5Str].fnList.forEach((resolve) => {
          resolve(res)
        })
        delete loadingList[md5Str]
      }
      return res.data
    })
    .catch((e) => {
      clearLoading(md5Str)
      // 接口挂了也需要清除
      delete loadingList[md5Str]
      throw e
    })
}

const request = async <T = any>(method: Method, url: string, opts?: AxiosParams) => {
  const options = Object.assign({ params: {}, headers: {}, data: {}, refresh: false }, opts)
  console.log('发起请求：', method, url)
  console.log('请求参数：', options)
  const md5Str = getMD5(method, url, options.params, options.data, options.headers)
  let fn: Promise<AxiosResponse<T>>
  if (loadingList[md5Str]) {
    // 已经有相同的接口发起了，等待结果返回
    console.log('有相同接口发起，整合成一个接口')
    fn = new Promise<AxiosResponse<T>>((resolve) => {
      loadingList[md5Str].fnList.push(resolve)
    })
  }
  else {
    loadingList[md5Str] = {
      fnList: [],
    }
    if (!options.refresh && cacheData[md5Str]) {
      console.log('从缓存获取数据')
      fn = new Promise<AxiosResponse<T>>((resolve) => {
        resolve(cacheData[md5Str])
      })
    }
    else {
      if (opts?.autoLoading) {
        autoLoadingList.add(md5Str)
        Loading('', opts.autoLoadingTime || 800)
      }
      fn = axios({
        url,
        method,
        params: options.params,
        data: options.data,
        headers: options.headers,
        ...opts,
      })
    }
  }
  return preDeal<T>(md5Str, fn)
}

const get = async <T = any>(url: string, opts?: AxiosParams) => {
  return request<T>('get', url, Object.assign({ params: {}, headers: {}, refresh: false }, opts))
}

const post = async <T = any>(url: string, opts?: AxiosParams) => {
  return request<T>('post', url, Object.assign({ data: {}, headers: {}, refresh: false }, opts))
}

export { get, post, request }
