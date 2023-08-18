import { get } from '@/common/apiHttp'
import apiConfig from '@/common/apiConfig'

var loginRepository = {
    phone: 0,
    // 密码
    password: '',
    // 验证码
    code: 0,
    // 登录方式 code为验证码
    type: '',
    async getSendCode(phone: number): Promise<any> {
        // 每次发送记录本次发送的事件，限制一分钟一次
        uni.setStorageSync('codeLasttime', Date.now().toString())
        return await get(apiConfig.LOGIN.GET_SEND_CODE, { phone })
    },
      // 校验验证码
    async getVerifyCode(phone: number, code: number): Promise<any> {
        return await get(apiConfig.LOGIN.GET_VERIFY_CODE, { phone, captcha: code })
    },
      // 登录
    async getLogin(args: any): Promise<any> {
        const { phone, password, md5_password, code } = args
        const params: any = { phone }
        if (password) params.password = password
        if (md5_password) params.md5_password = md5_password
        if (code) params.captcha = code
        return await get(apiConfig.LOGIN.GET_LOGIN, params)
    },
      // 注册
    async getRegister(phone: number, password: any, nickname: string, code: number): Promise<any> {
        return await get(apiConfig.LOGIN.GET_LOGIN, { phone, password, nickname, code })
    }

}

export default loginRepository