import { useEnvConfig } from '@/use/useEnvConfig'

let host = 'http://localhost:3002'

const { API_HOST } = useEnvConfig()

if (API_HOST) {
  host = API_HOST
}

const defaultHeaders = {
  'Content-Type': 'application/json',
}

// 超时时间
const timeout = 30000

export default {
  host,
  defaultHeaders,
  timeout,
}
