const envConfig: Record<string, Record<string, string>> = {
  local: {
    BASE: '/',
    API_HOST: 'http://localhost:3002',
  },
  dev: {
    BASE: 'https://open-dev.yiruocloud.com/web/chatflow/tpl1/',
    API_HOST: 'http://localhost:3002',
  },
  production: {
    BASE: 'https://open.yiruocloud.com/web/chatflow/tpl1/',
    API_HOST: '',
  },
}

const env = process.env.runEnv as string
console.log('当前运行环境：', env)

export function useEnvConfig() {
  if (!envConfig[env]) {
    throw '当前运行环境不存在'
  }
  const config = { ...envConfig[env] }
  config.RUN_ENV = env
  const keys = Object.keys(config)
  for (let i = 0; i < keys.length; ++i) {
    const key = `VITE_APP_${keys[i]}`
    process.env[key] = config[keys[i]]
  }
  console.log('当前环境变量：', config)
  return config
}
