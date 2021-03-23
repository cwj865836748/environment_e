import Vue from 'vue'
export default {
	namespaced: true,
	state: {
		userInfo: null
	},
	mutations: {
		login(state, userInfo) {
			state.userInfo = userInfo
			// 缓存用户信息
			uni.setStorage({
				key: 'userInfo',
				data: JSON.stringify(userInfo)
			});
		},
		logout(state) {
			state.userInfo = null
			// 清理缓存用户信息
			uni.removeStorage({
				key: 'userInfo'
			});
		}
	},
	actions: {
		async login({
			commit
		}, params) {
			try {
				uni.showLoading({
					title: '正在登录中'
				});
				uni.clearStorageSync()
				const param = Object.assign({}, params)
				const {
					data,code
				} = await Vue.prototype.$api.User.login(param);
				uni.hideLoading();
				if(code===200){
					commit('login',data)
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 100)
				}
				return Promise.resolve(data);
			} catch (error) {
				// 结束
				return Promise.reject(error);
			}
		},
		logout({
			commit
		}) {
			commit('logout')
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}, 100)
		}
	},
	getters: {
		userInfo: state => state.userInfo
	}
}
