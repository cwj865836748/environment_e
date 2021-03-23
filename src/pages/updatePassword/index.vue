<template>
	<uni-clayout :isBack="true" navTitle="修改密码">
		<view class="form-body">
			<view class="form-body_head me-fx-col-c">
				<view class="form-body_head--name">
					{{info.name}}
				</view>
				<view class=" ">
					手机：{{info.account}}
				</view>
				<!-- <view class="">
					职务：产品经理
				</view> -->
			</view>
			<view class="form-body_form">
				<view class="form-body_form--one">
					<view class="form-body_form--title">
						原密码
					</view>
					<input type="password" v-model="form.oldPwd" placeholder="请输入原密码" class="form-body_form--input" placeholder-class="form-body_form--placeholder" />
				</view>
				<view class="form-body_form--one">
					<view class="form-body_form--title">
						新密码
					</view>
					<input type="password" v-model="form.newPwd" placeholder="请输入新密码" class="form-body_form--input" placeholder-class="form-body_form--placeholder" />
				</view>
				<view class="form-body_form--one">
					<view class="form-body_form--title">
						确认新密码
					</view>
					<input type="password" v-model="form.newResetPwd" placeholder="请再次输入新密码" class="form-body_form--input"
					 placeholder-class="form-body_form--placeholder" />
				</view>
			</view>
			<button class="form-body_button" @tap="changePwd">确定修改</button>
		</view>
	</uni-clayout>
</template>
<script>
	export default {
		data() {
			return {
				form: {
					newPwd: '',
					oldPwd: '',
					newResetPwd: ''
				},
				info: {
					
				}
			}
		},

		onLoad() {
          this.getInit()
		},

		methods: {
			async getInit() {
				const {data} = await this.$api.User.accountInfo()
				this.info = data
			},
			async changePwd() {
				let vaid;
				if (!this.form.oldPwd) {
					vaid = '原密码不能为空'
					return this.toast(vaid)
				} else if (!this.form.newPwd) {
					vaid = '新密码不能为空'
					return this.toast(vaid)
				} else if (!this.form.newResetPwd) {
					vaid = '请再次输入新密码'
					return this.toast(vaid)
				} else if (this.form.newPwd != this.form.newResetPwd) {
					vaid = '两次密码输入不一致请重新输入'
					this.form.newPwd = ''
					this.form.newResetPwd = ''
					return this.toast(vaid)
				}
					const {code} =await this.$api.User.changePwd(this.form)
					if(code!=200) {
						return
					}
					vaid = '密码修改成功，请重新登录'
					this.$store.dispatch('logout')
					setTimeout(()=>{
						this.toast(vaid)	
					},200)
			},
			toast(vaid) {
				uni.showToast({
					title: vaid,
					icon: 'none',
					mask: true
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-body {
		padding: 46rpx 30rpx;
	}

	.form-body_head {
		height: 180rpx;
		background: #0a3765;
		border-radius: 20rpx;
		padding-left: 32rpx;
		font-size: 24rpx;
		margin-bottom: 54rpx;
		color: rgba(255, 255, 255, .6)
	}

	.form-body_head--name {
		font-size: 36rpx;
		margin-bottom: 6rpx;
		color: rgba(255, 255, 255, 1)
	}

	.form-body_head--desc {
		margin-bottom: 6rpx;
	}

	.form-body_form--title {
		font-size: 30rpx;
		margin-bottom: 28rpx;
	}

	.form-body_form {
		margin-bottom: 96rpx;
	}

	.form-body_form--one {
		margin-bottom: 80rpx;
		padding: 0 30rpx;
	}

	.form-body_form--placeholder {
		color: rgba(255, 255, 255, .3)
	}

	.form-body_form--input {
		padding-bottom: 20rpx;
		font-size: 30rpx;
		border-bottom: 2rpx solid rgba(255, 255, 255, .3);
		box-sizing: content-box;
	}

	.form-body_button {
		background: #356fe5;
		border-radius: 46rpx;
		height: 90rpx;
		font-size: 30rpx;
		line-height: 90rpx;
		color: rgba(255, 255, 255, 1);
	}
</style>
