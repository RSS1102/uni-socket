<template>
	<view>
		<!-- 用来显示在线用户 -->
		<!-- <scroll-view scroll-x="true" class="scrollv">
			<view class="users">
				<view v-for="(e,index) in users" class="scroll-user">
					<image :src="'../../static/images/'+e.img+'.png'"></image>
				</view>
			</view>
		</scroll-view> -->
		<view class="talk-show">
			<view v-for="(item,index) in talkList" class="talk">
				<view v-if="item.id==1" class="welcome">
					<view class="welcome-item">{{item.data}}</view>
				</view>
				<!-- 本人发言 -->
				<view v-if="item.id==2" class="me-talk">
					<image class="talk-img" :src="'../../static/photo/renwu-'+item.img+'.png'"></image>
					<view>
						<view class="me-talk-name ">{{item.name}}</view>
						<view class="me-talk-data talk-data">{{item.data}}</view>
					</view>
				</view>
				<!-- 其他人发言 -->
				<view v-if="item.id==3" class="other-talk">
					<image class="talk-img" :src="'../../static/photo/renwu-'+item.img+'.png'"></image>
					<view>
						<view class="talk-name">{{item.name}}</view>
						<view class="other-talk-data talk-data">{{item.data}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="message">
			<u--textarea v-model="message" placeholder="请输入内容..." confirm-type="send" count auto-height type="text"
				maxlength="100" class="u--textarea">
			</u--textarea>
			<image src="../../static/fn/send.png" mode="aspectFit" @tap="setTalk"></image>
			<!-- <u--input v-model="message" maxlength="50" placeholder="请输入..." type="textarea" showWordLimit="true"
				confirmType="send">
				<template slot="suffix">
					<u-icon name="arrow-up-fill" @click="setTalk()"></u-icon>
				</template>
			</u--input> -->
		</view>
		<view class="scrollToBottom"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				userList: [],
				message: "",
				talkList: [],

			}
		},
		onLoad() {
			this.user = uni.getStorageSync('user')
			// 连接
			this.$socket.connect();
			this.Login()
			this.getTalk()
		},
		methods: {
			// 登陆
			Login() {
				this.$socket.emit('login', this.user, (result) => {
					/* 登录 成功的情况下，才进行提示 */
					if (result.socketId !== "") {
						console.log('登录成功:', result);
						this.user.socketId = result.socketId
						this.talkList.push({
							time: result.time,
							data: `欢迎 ${result.name} 加入群聊`,
							id: 1
						})
					}
				});
				this.sockets.subscribe('welcome', result => {
					this.talkList.push({
						time: result.time,
						data: `欢迎 ${result.name} 加入群聊`,
						id: 1
					})
				})
			},
			// 发布言论
			setTalk() {
				if (this.message == "") return
				this.$socket.emit('settalk', {
					...this.user,
					message: this.message,
				}, (result) => {
					this.talkList.push({
						name: result.name,
						img: result.img,
						data: result.message,
						socketId: result.socketId,
						id: 2
					});
				})
			},
			getTalk() {
				this.sockets.subscribe('gettalk', result => {
					console.log("getTalk")
					this.talkList.push({
						name: result.name,
						img: result.img,
						data: result.message,
						socketId: result.socketId,
						id: 3
					})
				})
			},
			scrollToBottom() {
				// 让滚动条始终在最底部
				this.$nextTick(() => {
					uni.pageScrollTo({
						// 这里有个问题应该使用selector
						scrollTop: 2000000, //滚动到页面的目标位置（单位px）
						duration: 0 //滚动动画的时长，默认300ms，单位 ms
					});
				})
			},
		},
		updated() {
			this.scrollToBottom()
		},
		// 监听
		// sockets:{
		// 	// 登陆欢迎
		// 	welcome:data=>{
		// 			this.talkList.push({
		// 				time: result.time,
		// 				data: `欢迎 ${result.name} 加入群聊`,
		// 				id: 1
		// 			})
		// 	}
		// },
	}
</script>

<style lang="scss">
	.wrapper {
		height: auto !important;
	}

	.welcome {
		font-size: 25rpx;
		display: flex;
		justify-content: center;
	}

	.welcome-item {
		color: #f0bc52;
		background: rgba($color: #c3c3c3, $alpha: 0.25);
		border-radius: 4%;
		padding: 2rpx;
	}

	// 输入框
	.message {
		width: 100%;
		position: fixed;
		z-index: 1002;
		bottom: 95rpx;
		background: rgba(255, 255, 255, 0.96);
		display: flex;

		.u--textarea {
			flex: 1;
			width: 100%;
			background: rgba(242, 242, 242, 1);
			border-radius: 24rpx;
			font-size: 28rpx;
			padding: 24rpx 80rpx 24rpx 24rpx;
		}

		image {
			width: 58rpx;
			height: 58rpx;
			position: absolute;
			right: 28rpx;
			bottom: 20rpx;
		}
	}

	.talk-show {
		margin-bottom: 100rpx;
	}

	.talk {
		margin: 25rpx 0;
	}

	.me-talk {
		display: flex;
		flex-direction: row-reverse;

		.me-talk-name {
			text-align: right;
			margin-right: 50rpx;
		}

		.me-talk-data {
			background-color: #F0AD4E;
		}
	}

	.other-talk {
		display: flex;

		.other-talk-data {
			background-color: #f0a39c;

		}
	}

	// 聊天公共样式
	.talk-img {
		width: 120rpx;
		height: 120rpx;

	}

	.talk-name {
		margin: 40rpx 0 20rpx 40rpx;
	}

	.talk-data {
		max-width: 40vw;
		word-wrap: break-word;
		padding: 20rpx;
		border-radius: 25rpx;
		color: #FFFFFF;

	}
</style>
