import { eMailReg } from './reg'

export const emailValidate = (email) => {
  if (!email || email.trim().length <= 0) {
    return {
      pass: false,
      message: '邮箱不能为空'
    }
  }
  if (!eMailReg.test(email)) {
    return {
      pass: false,
      message: '邮箱格式不正确'
    }
  }
  return {
    pass: true,
    message: '校验通过'
  }
}
