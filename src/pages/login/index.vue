<template>
	<view class="contain">
		<view class="login_title me-fx-col-c-c">
			<image src="/static/sign_logo@2x.png"></image>
			<view class="">
				欢迎使用紫金环保
			</view>
		</view>
		<view class="login_form">
			<view class="login_form_one">
				<view class="login_form_one_title">
					账号
				</view>
				<input type="text" v-model="loginForm.account" placeholder="请输入账号" placeholder-class="input_placeholder" />
			</view>
			<view class="login_form_one">
				<view class="login_form_one_title">
					密码
				</view>
				<input type="text" v-model="loginForm.password" password placeholder="请输入密码" placeholder-class="input_placeholder" />
			</view>
		</view>
		<button class="login_button" @tap="toLogin">登录</button>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					account: '',
					password: ''
				}
			}
		},
		onLoad() {


		},
		onShow() {

		},
		methods: {
			toLogin() {
              if(!this.loginForm.account||!this.loginForm.password){
				  return uni.showToast({
				  	title:'账号或密码不能为空！',
					icon :'none',
					mask:true
				  })
			  }
			  this.$store.dispatch('login',this.loginForm)
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>
