<template>
	<uni-clayout :isBack="true" navTitle="概况信息">
		<view class="me-fx-col" style="height: 100%;">
				<rich-text :nodes="richText"></rich-text>
			</view>
		</view>
	</uni-clayout>
</template>
<script>  
	export default {
		data() {
			return {
			
				richText: ''
			}
		},
		 
		onLoad() {
			this.getInit()
		},

		methods: {
			async getInit() {
				const {data} = await this.$api.User.summaryInfo({
					type: 0
				})
				this.richText=data
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
