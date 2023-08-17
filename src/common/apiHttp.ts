
const baseURL = 'https://music.zusheng.club'

let cookie: any = ''

uni.addInterceptor('request', {
    invoke(args) {
      args.url = baseURL + args.url
    }
  })

  export const get = (url: string, params: any, requireCookie?: boolean, noCache?: boolean ):Promise<any> => {
    if (!cookie) cookie = uni.getStorageSync('cookie')

    return new Promise(resolve => {
        const data = params
        if (noCache) data.time = Date.now()
        if (requireCookie && cookie) data.cookie = encodeURIComponent(cookie)
    
        const uniReq: any = uni.request({
          url,
          data,
          method: 'GET',
          // withCredentials: true,
          sslVerify: true,
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
            // 'Set-Cookie': 'SameSite=None; '
          }
        })
    
        uniReq
          .then((res: any) => {
            resolve(res.data)
          })
          .catch((err: any) => {
            resolve(err)
          })
      })

  }