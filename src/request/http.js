import config from '@/config/index.js'

let statusCode = {
  success: 200
}

export const request = (params) => {
  let header = {
    ...params.header
  }
  if (uni.getStorageSync('userInfo')) {
    header["token"] = JSON.parse(uni.getStorageSync('userInfo')).token
  }
  header['Content-Type'] = header['Content-Type'] ? header['Content-Type'] : "application/json"
  
  return new Promise((resolve, reject) => {
    uni.request({
      method: 'GET',
      ...params,
      header: header,
      url: config.baseUrl + params.url,
      success: (res) => {
        if (res.data.code == statusCode.success) {
          resolve(res.data)
        }
         else {
            uni.showToast({
              title: res.data.msg,
              duration: 2000,
              mask: true
            })
          resolve(res.data)
        }
      },
      fail: (res) => {
        uni.showToast({
          title: res.data.msg,
          duration: 2000,
          mask: true
        })
      },
      complete: (res) => {
        
      }
    });
  })
}