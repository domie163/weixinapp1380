<template>
	<view class="container account_login">
		<view class="left-bottom-sign"></view>
		<!-- <view class="back-btn newfont icon-Chevron-Left" @click="navBack"></view> -->
		<view class="right-top-sign"></view>
		<view class="wrapper">
      		<view class="top-sign-title">私家车位共享系统小程序</view>
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">用户名</text>
					<input type="text" v-model="form.username" placeholder="请输入用户名" maxlength="11"
						data-key="username" />
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="password" v-model="form.password" placeholder="6-18位不含特殊字符的数字、字母组合"
						placeholder-class="input-empty" maxlength="20" password data-key="password" @confirm="login" />
				</view>
			</view>
			<button class="confirm-btn" @click="login" :disabled="logining">登录</button>
			<view class="forget-section">
				<navigator url="./forgot">忘记密码?</navigator>
			</view>
		</view>
		<view class="register-section">
			还没有账号?<navigator url="./register" class="text">马上注册</navigator>
		</view>
	</view>
</template>


<script>
	import mixin from "@/libs/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				logining: false,
				form: {
					username: "",
					password: "",
				},
				rules: {
					username: {
						rules: [{
								required: true,
								errorMessage: "请输入用户名",
							},
							{
								minLength: 5,
								maxLength: 16,
								errorMessage: "用户名长度在 {minLength} 到 {maxLength} 个字符",
							},
						],
					},
					password: {
						rules: [{
								required: true,
								errorMessage: "请输入密码",
							},
							{
								minLength: 5,
								maxLength: 16,
								errorMessage: "密码长度在 {minLength} 到 {maxLength} 个字符",
							},
						],
					},
				},
			};
		},
		methods: {
			/**
			 * 手动提交
			 * @param {Object} form
			 */
			login() {
				this.logining = true;
				var form = Object.assign({}, this.form);
				this.$post("~/api/user/login?", form, (res) => {
					if (res.result && res.result.obj) {
						var obj = res.result.obj;
						// 缓存token
						uni.db.set("token", obj.token);
						// 存储用户信息
						this.$store.commit("user_set", obj);
						// 获取权限集
						this.$get_auth(this.user.user_group);
						// 前往首页
						this.$nav("/pages/index/index");
					} else if (res.error) {
						this.$toast(res.error.message, "error");
					}
					this.logining = false;
				});
			},
			/**
			 * 手动重置表单
			 */
			resetForm() {
				this.$refs.form.resetFields();
			},
		},
		onBackPress() {
			var bl = false;
			var user_id = this.user.user_id;
			if (user_id == null || user_id < 1) {
				// this.$nav('/pages/index/index');
				bl = true;
			}
			return false;
		},
	};
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
		box-sizing: border-box;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		.text {
			display: inline-block;
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
