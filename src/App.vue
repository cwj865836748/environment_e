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
			this.changeUpdate()
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
			async changeUpdate() {
				const {
					data
				} = await this.$api.User.currentVersion()
				if (plus.runtime.version == data.version) {
					return
				}
				uni.showModal({ //提醒用户更新  
					title: "更新提示",
					content: data.remarks,
					success: (res) => {
						if (res.confirm) {
							this.doUpData(data.apkUrl);
						}
					}
				})
			},
			doUpData(url) {
				uni.showLoading({

					title: '更新中……'

				})

				uni.downloadFile({ //执行下载

					url, //下载地址

					success: downloadResult => { //下载成功

						uni.hideLoading();

						if (downloadResult.statusCode == 200) {

							uni.showModal({

								title: '',

								content: '更新成功，确定现在重启吗？',

								confirmText: '重启',

								confirmColor: '#EE8F57',

								success: function(res) {

									if (res.confirm == true) {

										plus.runtime.install( //安装

											downloadResult.tempFilePath, {

												force: true

											},

											function(res) {

												utils.showToast('更新成功，重启中');

												plus.runtime.restart();

											}

										);

									}

								}

							});

						}

					}

				});
			}
		}

	}
</script>

<style lang="scss">
	@import '@/common/uview-ui/index.scss';
	@import '@/components/uni-table/index.scss';
	@import '@/common/common.scss';
</style>
