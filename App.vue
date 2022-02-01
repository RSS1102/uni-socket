<script>
	export default {

		onLaunch: function() {
			// 跳转登陆
			let userStorage = uni.getStorageSync("user")
			if (Object.keys(userStorage).length != 0) {
				uni.navigateTo({
					url: 'pages/talk/talk'
				})
			} else {
				uni.redirectTo({
					url: 'pages/index/index'
				})
			};
		},
		onShow: function() {

		},
		onHide: function() {
			
		}
	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
