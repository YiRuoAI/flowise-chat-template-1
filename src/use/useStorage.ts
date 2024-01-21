const suffix: string[] = ['yiruoai-chat-flowise-tpl']

function genKey(key: string) {
  return [...suffix, key].join(':')
}

function customSave(key: string, value: any) {
  try {
    let saveValue
    try {
      saveValue = JSON.stringify(value)
    }
    catch (e) {
      saveValue = value
    }
    localStorage.setItem(key, saveValue)
  }
  catch (e) {
    console.log(e)
    console.log('存储数据失败', key, value)
  }
}

function customLoad<T = any | null>(key: string, defaultValue?: T): T {
  let value: any = localStorage.getItem(key)
  if (value === null) {
    return defaultValue as T
  }
  try {
    value = JSON.parse(value)
  }
  catch (e) {
    console.log(e)
    value = value || defaultValue
  }
  return value
}

function customRemove(key: string) {
  localStorage.removeItem(key)
}

function save(key: string, value: any, expMs?: number) {
  key = genKey(key)
  const data = {
    v: value,
    e: expMs || -1,
    t: new Date().getTime(),
  }
  localStorage.setItem(key, JSON.stringify(data))
}

function load<T = any | null>(key: string, defaultValue?: T): T {
  key = genKey(key)
  const item = localStorage.getItem(key)
  if (item === null) {
    return defaultValue as T
  }
  try {
    const data = JSON.parse(item || '{}')
    if (!data.e || !data.t) {
      customRemove(key)
      return defaultValue as T
    }
    if (data.e === -1) {
      return data.v || defaultValue
    }
    // 过期
    if (data.t + data.e <= new Date().getTime()) {
      customRemove(key)
      return defaultValue as T
    }
    return data.v || defaultValue
  }
  catch (e) {
    customRemove(key)
    return defaultValue as T
  }
}

function remove(key: string) {
  key = genKey(key)
  customRemove(key)
}

export function useStorage() {
  return {
    customSave,
    customLoad,
    customRemove,
    save,
    load,
    remove,
  }
}
