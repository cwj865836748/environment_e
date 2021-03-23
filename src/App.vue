<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			if (uni.getSystemInfoSync().platform === 'android') {
               
				let userInfo = uni.getStorageSync('userInfo');
				//判断是否存在登录信息
				if (!userInfo) {
					//不存在则跳转登录页
					uni.reLaunch({
						url: "/pages/login/index",
						success: () => {
							//跳转完页面后再关闭启动页
							plus.navigator.closeSplashscreen();
						}
					})
				} else {
					//存在则关闭启动页进入首页
					plus.navigator.closeSplashscreen();
				}
			}

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			text: 'text'
		},
		methods: {

		}

	}
</script>

<style lang="scss">
	@import '@/common/uview-ui/index.scss';
	@import '@/components/uni-table/index.scss';
	@import '@/common/common.scss';
</style>
