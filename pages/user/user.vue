<template>
	<div>
		<div class="user">
			<image class="u-avatar" :src="img"></image>
			<view class="name">{{user.name}}</view>
		</div>
		<u-cell-group>
			<u-cell title="用户退出" value="退出" isLink @click="unLogin"></u-cell>
		</u-cell-group>
		<!-- 退出确认 -->
		<u-modal :show="unLoginShow" @confirm="confirmUnLogin" buttonReverse showCancelButton @cancel="cancelUnLogin">
			<view>确定要退出吗？</view>
		</u-modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				img: '',
				unLoginShow: false,
				user: {},
			}
		},
		onLoad() {
			this.user = uni.getStorageSync('user')
			this.user.img === 1 ? this.img = "../../static/sex/boy.svg" : this.img = "../../static/sex/girl.svg"
		},
		methods: {
			// 用户退出
			unLogin() {
				this.unLoginShow = true
			},
			confirmUnLogin() {
				uni.navigateBack({
					delta: 1
				})
				// uni.redirectTo({
				// 	url: 'pages/index/index'
				// })
				this.unLoginShow = false,
					uni.removeStorageSync("user")

			},
			cancelUnLogin() {
				this.unLoginShow = false
			}

		}
	}
</script>

<style lang="scss">
	.user {
		position: relative;
		left: 50%;
		transform: translate(-50%, 0);
		width: 200rpx;
		margin: 180rpx 0 50rpx 0;
	}

	.u-avatar {
		width: 200rpx;
		height: 200rpx;
		border: 2rpx solid #ff951c;
		border-radius: 80rpx;

	}

	.name {
		margin-top: 20rpx;
		font-size: 45rpx;
		font-weight: bold;
		text-align: center;
	}

	.popup {
		display: flex;
		align-items: center;
		width: 500rpx;
		height: 400rpx;
		background: #ebebeb;
	}

	.button-style {
		width: 200rpx;
		height: 100rpx;
	}
</style>
