import config from '@/config/index.js'

let statusCode = {
  success: 200,
  fail:1003,
  tokenInvalidation:1002
}

export const request = (params) => {
  let header = {
    ...params.header
  }
  if (uni.getStorageSync('userInfo')) {
    header["token"] = JSON.parse(uni.getStorageSync('userInfo')).token
  }else {
	  header["token"] =''
  }
  header['Content-Type'] = header['Content-Type'] ? header['Content-Type'] : "application/x-www-form-urlencoded"
  
  return new Promise((resolve, reject) => {
    uni.request({
      method: 'POST',
      ...params,
      header: header,
      url: config.baseUrl + params.url,
      success: (res) => {
        if (res.data.code == statusCode.success) {
          resolve(res.data)
        }
		else if (res.data.code == statusCode.tokenInvalidation){
			let routes = getCurrentPages()
			let curRoute = routes[routes.length - 1].route
			if(curRoute=='pages/index/index'){
				return
			}
			uni.showToast({
			  title: res.data.msg,
			  duration: 2000,
			  mask: true,
			  icon:'none'
			})
			uni.reLaunch({
				url: '/pages/login/index'
			})
		}
         else {
            uni.showToast({
              title: res.data.msg,
              duration: 2000,
              mask: true,
			  icon:'none'
            })
          resolve(res.data)
        }
      },
      fail: (res) => {
        uni.showToast({
          title: res.data.msg,
          duration: 2000,
          mask: true,
		  icon:'none'
        })
      },
      complete: (res) => {
        
      }
    });
  })
}