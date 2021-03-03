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
			console.log('out')
			state.userInfo = null
			// 清理缓存用户信息
			uni.removeStorage({
			    key: 'userInfo',
			    success: function (res) {
			        console.log('success');
			    }
			});
		}
	},
	actions: {
		async login({
			state
		}, params) {
			try {
				uni.clearStorageSync();
				uni.showLoading({
				    title: '正在登录中'
				});
				const param = Object.assign({},params.data)
				const {data} = await Vue.prototype.$api.userLogin(param); 
				uni.setStorage({
					key: 'userInfo',
					data: JSON.stringify(data)
				});
				state.userInfo = data
				uni.showToast({
					icon: 'success',
					title: '欢迎登录',
					success() {
						uni.hideLoading();
						setTimeout(()=>{
							uni.reLaunch({
								url: '../../pages/index/index'
							})
						},100)
					}
				})
				
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
		},
		/**
		 * @description 从数据库取用户数据
		 * @param {Object} vuex context
		 */
		load({
			state,
			dispatch
		}) {
			const value = uni.getStorageSync('userInfo')
			if(value) {
				state.userInfo = JSON.parse(value)
			}
		}
	},
	getters: {
		user: state => {
			if (state.user) {
				return state.user
			}
			return uni.getStorageSync('userInfo')
		}
	}
}
