import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue';
import login from '../views/login.vue';
import forgot from '../views/forgot.vue';
Vue.use(VueRouter)

const routes = [
	// 主页
	{
		path: '/',
		name: 'index',
		component: index,
		meta: {
			index: 0,
			title: '首页'
		}
	},

	// 登录
	{
		path: '/login',
		name: 'login',
		component: login,
		meta: {
			index: 0,
			title: '登录'
		}
	},


	// 忘记密码
	{
		path: '/forgot',
		name: "forgot",
		component: forgot,
		meta: {
			index: 0,
			title: '忘记密码'
		}
	},

	// 修改密码
	{
		path: '/user/password',
		name: "password",
		component: () => import("../views/user/password.vue"),
		meta: {
			index: 0,
			title: '修改密码'
		}
	},

	// 视频播放页
	{
		path: "/media/video",
		name: "video",
		component: () => import('../views/media/video.vue'),
		meta: {
			index: 0,
			title: "视频"
		}
	},

	// 音频播放页
	{
		path: "/media/audio",
		name: "audio",
		component: () => import('../views/media/audio.vue'),
		meta: {
			index: 0,
			title: "音频"
		}
	},



	// 友情链接路由
	// {
	// 	path: '/link/table',
	// 	name: 'link_table',
	// 	component: () => import('../views/link/table.vue'),
	// 	meta: {
	// 		index: 0,
	// 		title: '链接列表'
	// 	}
	// },
	// {
	// 	path: '/link/view',
	// 	name: 'link_view',
	// 	component: () => import('../views/link/view.vue'),
	// 	meta: {
	// 		index: 0,
	// 		title: '链接详情'
	// 	}
	// },

	// 轮播图路由
	{
		path: '/slides/table',
		name: 'slides_table',
		component: () => import('../views/slides/table.vue'),
		meta: {
			index: 0,
			title: '轮播图列表'
		}
	},
	{
		path: '/slides/view',
		name: 'slides_view',
		component: () => import('../views/slides/view.vue'),
		meta: {
			index: 0,
			title: '轮播图详情'
		}
	},
		// 文章路由
	{
		path: '/article/table',
		name: 'article_table',
		component: () => import('../views/article/table.vue'),
		meta: {
			index: 0,
			title: '文章列表'
		}
	},
	{
		path: '/article/view',
		name: 'article_view',
		component: () => import('../views/article/view.vue'),
		meta: {
			index: 0,
			title: '文章详情'
		}
	},

	// 文章分类路由
	{
		path: '/article_type/table',
		name: 'article_type_table',
		component: () => import('../views/article_type/table.vue'),
		meta: {
			index: 0,
			title: '文章分类列表'
		}
	},
	{
		path: '/article_type/view',
		name: 'article_type_view',
		component: () => import('../views/article_type/view.vue'),
		meta: {
			index: 0,
			title: '文章分类详情'
		}
	},
	
	// 广告路由
	// {
	// 	path: '/ad/table',
	// 	name: 'ad_table',
	// 	component: () => import('../views/ad/table.vue'),
	// 	meta: {
	// 		index: 0,
	// 		title: '广告列表'
	// 	}
	// },
	// {
	// 	path: '/ad/view',
	// 	name: 'ad_view',
	// 	component: () => import('../views/ad/view.vue'),
	// 	meta: {
	// 		index: 0,
	// 		title: '广告详情'
	// 	}
	// },



	// 公告路由
	{
		path: '/notice/table',
		name: 'notice_table',
		component: () => import('../views/notice/table.vue'),
		meta: {
			index: 0,
			title: '公告列表'
		}
	},
	{
		path: '/notice/view',
		name: 'notice_view',
		component: () => import('../views/notice/view.vue'),
		meta: {
			index: 0,
			title: '公告详情'
		}
	},


	// 评论路由
	{
		path: '/comment/table',
		name: 'comment_table',
		component: () => import('../views/comment/table.vue'),
		meta: {
			index: 0,
			title: '评论列表'
		}
	},
	{
		path: '/comment/view',
		name: 'comment_view',
		component: () => import('../views/comment/view.vue'),
		meta: {
			index: 0,
			title: '评论详情'
		}
	},

	// 注册用户路由
	{
		path: '/registered_users/table',
		name: 'registered_users_table',
		component: () => import('../views/registered_users/table.vue'),
		meta: {
			index: 0,
			title: '注册用户列表'
		}
	},
	{
		path: '/registered_users/view',
		name: 'registered_users_view',
		component: () => import('../views/registered_users/view.vue'),
		meta: {
			index: 0,
			title: '注册用户详情'
		}
	},
	// 车辆信息路由
	{
		path: '/vehicle_information/table',
		name: 'vehicle_information_table',
		component: () => import('../views/vehicle_information/table.vue'),
		meta: {
			index: 0,
			title: '车辆信息列表'
		}
	},
	{
		path: '/vehicle_information/view',
		name: 'vehicle_information_view',
		component: () => import('../views/vehicle_information/view.vue'),
		meta: {
			index: 0,
			title: '车辆信息详情'
		}
	},
	// 共享车位路由
	{
		path: '/shared_parking_spaces/table',
		name: 'shared_parking_spaces_table',
		component: () => import('../views/shared_parking_spaces/table.vue'),
		meta: {
			index: 0,
			title: '共享车位列表'
		}
	},
	{
		path: '/shared_parking_spaces/view',
		name: 'shared_parking_spaces_view',
		component: () => import('../views/shared_parking_spaces/view.vue'),
		meta: {
			index: 0,
			title: '共享车位详情'
		}
	},
	// 车位预约路由
	{
		path: '/parking_reservation/table',
		name: 'parking_reservation_table',
		component: () => import('../views/parking_reservation/table.vue'),
		meta: {
			index: 0,
			title: '车位预约列表'
		}
	},
	{
		path: '/parking_reservation/view',
		name: 'parking_reservation_view',
		component: () => import('../views/parking_reservation/view.vue'),
		meta: {
			index: 0,
			title: '车位预约详情'
		}
	},
	// 用户积分路由
	{
		path: '/user_points/table',
		name: 'user_points_table',
		component: () => import('../views/user_points/table.vue'),
		meta: {
			index: 0,
			title: '用户积分列表'
		}
	},
	{
		path: '/user_points/view',
		name: 'user_points_view',
		component: () => import('../views/user_points/view.vue'),
		meta: {
			index: 0,
			title: '用户积分详情'
		}
	},
	// 订单信息路由
	{
		path: '/order_information/table',
		name: 'order_information_table',
		component: () => import('../views/order_information/table.vue'),
		meta: {
			index: 0,
			title: '订单信息列表'
		}
	},
	{
		path: '/order_information/view',
		name: 'order_information_view',
		component: () => import('../views/order_information/view.vue'),
		meta: {
			index: 0,
			title: '订单信息详情'
		}
	},
	// 发布车位路由
	{
		path: '/release_parking_spaces/table',
		name: 'release_parking_spaces_table',
		component: () => import('../views/release_parking_spaces/table.vue'),
		meta: {
			index: 0,
			title: '发布车位列表'
		}
	},
	{
		path: '/release_parking_spaces/view',
		name: 'release_parking_spaces_view',
		component: () => import('../views/release_parking_spaces/view.vue'),
		meta: {
			index: 0,
			title: '发布车位详情'
		}
	},
	// 积分购买路由
	{
		path: '/point_purchase/table',
		name: 'point_purchase_table',
		component: () => import('../views/point_purchase/table.vue'),
		meta: {
			index: 0,
			title: '积分购买列表'
		}
	},
	{
		path: '/point_purchase/view',
		name: 'point_purchase_view',
		component: () => import('../views/point_purchase/view.vue'),
		meta: {
			index: 0,
			title: '积分购买详情'
		}
	},
	// 财务信息路由
	{
		path: '/financial_information/table',
		name: 'financial_information_table',
		component: () => import('../views/financial_information/table.vue'),
		meta: {
			index: 0,
			title: '财务信息列表'
		}
	},
	{
		path: '/financial_information/view',
		name: 'financial_information_view',
		component: () => import('../views/financial_information/view.vue'),
		meta: {
			index: 0,
			title: '财务信息详情'
		}
	},

	// 用户路由
	{
		path: '/user/table',
		name: 'user_table',
		component: () => import('../views/user/table.vue'),
		meta: {
			index: 0,
			title: '用户列表'
		}
	},
	{
		path: '/user/view',
		name: 'user_view',
		component: () => import('../views/user/view.vue'),
		meta: {
			index: 0,
			title: '用户详情'
		}
	},
	{
		path: '/user/info',
		name: 'user_info',
		component: () => import('../views/user/info.vue'),
		meta: {
			index: 0,
			title: '个人信息'
		}
	},
	// 用户组路由
	{
		path: '/user_group/table',
		name: 'user_group_table',
		component: () => import('../views/user_group/table.vue'),
		meta: {
			index: 0,
			title: '用户组列表'
		}
	},
	{
		path: '/user_group/view',
		name: 'user_group_view',
		component: () => import('../views/user_group/view.vue'),
		meta: {
			index: 0,
			title: '用户组详情'
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	let token = to.query.token;
	if (token){
		$.db.set("token",token,120);
	}
	next();
})

router.afterEach((to, from, next) => {
	let title = "私家车位共享系统小程序-admin";
	document.title = title;
})

export default router
