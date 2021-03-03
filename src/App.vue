<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			
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
	@import '@/common/common.scss';
</style>
