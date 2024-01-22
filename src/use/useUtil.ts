function generateRandomString(
  length: number,
  opt?: {
    withSpecialCharacter?: boolean
    justNumber?: boolean
    removeConfusingCharacters?: boolean
    withoutNumberStart?: boolean
  },
) {
  let charset
    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  if (opt?.justNumber) {
    charset = '0123456789'
  }
  if (opt?.withSpecialCharacter) {
    charset += '!@#$%^&*()_+~|}{[]:;?><,./-='
  }
  if (opt?.removeConfusingCharacters) {
    charset = charset.replace(/[0Oo1IiLl|svxzc]/g, '')
  }
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    const char = charset[randomIndex]
    // 判断是否是第一个字符，如果是数字，判断是否需要去掉数字开头
    if (i === 0 && opt?.withoutNumberStart && /\d/.test(char)) {
      i--
      continue
    }
    result += char
  }

  return result
}

export function useUtil() {
  return {
    generateRandomString,
  }
}
