
const baseURL = 'https://music.zusheng.club'

let cookie: any = ''

uni.addInterceptor('request', {
    invoke(args) {
      args.url = baseURL + args.url
    }
  })

  export const get = (url: string, params: any, requireCookie?: boolean, noCache?: boolean ):Promise<any> => {
    if (!cookie) cookie = uni.getStorageSync('cookie')
 
 



  }