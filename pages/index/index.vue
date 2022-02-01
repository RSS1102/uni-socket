<template>
	<view>
		<div class="prompt">请登陆</div>
		<div class="photo">
			<image :class="{img:img1}" src="../../static/photo/renwu-01.png" @click="changeImg1">
			</image>
			<image :class="{img:img2}" src="../../static/photo/renwu-02.png" @click="changeImg2">
			</image>
		</div>
		<div class="image-plac">请选择您的头像</div>
		<div class=center>
			<u--input class="u-input" placeholder="请输入姓名" border="surround" v-model="user.name" maxlength="8">
			</u--input>
			<u-button class="u-button" type="primary" @click="onLogin">登陆</u-button>
		</div>
	</view>
</template>

<script>
	import {
		io
	} from "socket.io-client";
	export default {
		data() {
			return {
				img1: false,
				img2: false,
				user: {
					img: 0,
					name: '',
				}
			}
		},
		onLoad() {
			
		},
		methods: {
			changeImg1() {
				this.img1 = true;
				this.img2 = false;
				this.user.img = "01"
			},
			changeImg2() {
				this.img1 = false;
				this.img2 = true;
				this.user.img = "02"
			},
			onLogin() {
				if (this.user.name === "") {
					uni.showToast({
						title: "请输入姓名！",
						icon: "none"
					})
				};
				if (this.user.img === 0) {
					uni.showToast({
						title: "请选择头像！",
						icon: "none"
					})
				};

				if (this.user.name !== "" && this.user.img !== 0) {
					uni.setStorageSync('user', this.user)
					uni.switchTab({
						url: '../talk/talk'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.prompt {
		margin-top: 100rpx;
		font-size: 60rpx;
		font-weight: bolder;
		color: #FF8917;
		text-align: center;
	}

	.photo {
		display: flex;
		justify-content: space-evenly;
	}

	image {
		width: 150rpx;
		height: 150rpx;
		border: 1rpx solid #55aaff;
		border-radius: 80rpx;
	}

	.img {
		border: 2rpx solid #ff5500;
	}

	.image-plac {
		text-align: center;
		margin: 50rpx;
		font-size: 22rpx;
	}

	.center {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
	}

	// 输入框
	.u-input {
		width: 330rpx;
		background: rgba(242, 242, 242, 1);
		border-radius: 22rpx;
		margin-top: 50rpx;
	}

	.u-button {
		width: 150rpx;
		margin-top: 150rpx;
	}
</style>
