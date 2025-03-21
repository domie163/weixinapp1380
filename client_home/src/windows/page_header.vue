<template>
	<view class="page_header">
		<view class="wrap_header">
		<view class="mm_container container">
			<view class="content">
					<view class="logo">
						<image :src="logo" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="list_menu">
						<view class="item_menu" v-for="(o, i) in list_menu" :key="i">
							<view class="btn_nav" @click="$nav(o.url)">
								{{o.name}}
							</view>
						</view>
					</view>
					<view class="account">
						<template v-if="this.user.user_id !== 0">
							<view class="btn_logout" @click="logout()">
								<uni-icons style="margin-right: .125rem;" type="person" size="20" color="#fff">
								</uni-icons>
								<text>退出登录</text>
							</view>
						</template>
						<template v-else>
							<view class="btn_login" @click="nav_pages('/pages/account/login')">
								<uni-icons style="margin-right: .125rem;" type="person" size="20" color="#fff">
								</uni-icons>
								<text>登录</text>
							</view>
							<view class="btn_register" @click="nav_pages('/pages/account/register')">
								<uni-icons style="margin-right: .125rem;" type="compose" size="20" color="#fff">
								</uni-icons>
								<text>注册</text>
							</view>
						</template>
					</view>
				</view>
		</view>
		</view>
	</view>
</template>

<script>
	import mixin from "@/libs/mixins/component.js"
	export default {
		mixins: [mixin],
		data() {
			return {
				logo: "@/static/img/web_logo.png",
				list_menu: [{
					name: "首页",
					url: "/pages/index/index"
				},
				{
					name: "我的",
					url: "/pages/user/index"
				}, ],
			}
		},
		props: {},
		methods: {
			nav_pages(url) {
				this.$nav(url)
			},
			logout() {
				this.$store.commit('sign_out');
				this.user.user_id=0
			},

		}
	}
</script>

<style>
	.page_header {
		color: #FFFFFF;
	}

	.page_header .wrap_header {
		background-color: #0154BA;
		color: #FFFFFF;
		z-index: 100;
	}

	.page_header .content {
		min-height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.page_header .logo {
		width: 12rem;
		height: 1.5rem;
	}

	.page_header .list_menu {
		display: flex;
	}

	.page_header .item_menu {
		padding: 0px 25px;
	}

	.page_header .account {
		display: flex;
	}

	.page_header .account>view+view {
		margin-left: 1.5rem;
	}

	.page_header .account>view {
		display: flex;
		align-items: flex-start;
	}
</style>
