<template>
	<view class="diy_details diy_div_parking_reservation">
		<view v-if="Object.keys(obj).length!==0" class="warp">
			<view class="container">
				<view class="row">
					<view v-if="$check_field('get','order_number')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>订单号:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["order_number"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','parking_space_number')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>车位编号:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["parking_space_number"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','position')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>位置:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["position"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','the_measure_of_area')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>面积:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["the_measure_of_area"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','user')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>用户:</span>
						</view>
							<view class="diy_field diy_uid">
							<text>
								{{ get_user_user(obj['user']) }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','user_name')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>用户姓名:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["user_name"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','contact_number')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>联系电话:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["contact_number"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','start_time')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>开始时间:</span>
						</view>
							<view class="diy_field diy_datetime">
							<text>
								{{ $toTime(obj["start_time"],"yyyy-MM-dd hh:mm:ss") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','end_time')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>结束时间:</span>
						</view>
							<view class="diy_field diy_datetime">
							<text>
								{{ $toTime(obj["end_time"],"yyyy-MM-dd hh:mm:ss") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','appointment_instructions')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>预约说明:</span>
						</view>
							<view class="diy_field diy_desc">
							<text>
								{{ obj["appointment_instructions"] }}
							</text>
						</view>
						</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import mixin from "@/libs/mixins/component.js";
	export default {
		mixins: [mixin],
		props: {
			obj_goods: {
				type: Object,
				default(){
					return {}
				}
			},
			query:{
				type: Object,
				default(){
					return {
						parking_reservation_id: 0
					}
				}
			}
		},
		data() {
			return {
				obj_goods_type: {},
				obj: {},
									// 用户列表
				list_user_user: [],
									}
		},
		methods: {
			async get_obj_goods_type() {
				var res = await this.$get("~/api/goods_type/get_obj", {
					name: this.obj_goods.type
				})

				if (res.result.obj) {
					this.obj_goods_type = res.result.obj
				} else {
					console.log("没有请求到商品分类");
				}
			},
			async get_obj_by_goods() {
				var {
					source_table,
					source_field
				} = this.obj_goods_type
				var {
					source_id
				} = this.obj_goods
				var query = {}
				query[source_field] = source_id
				this.$get("~/api/" + source_table + "/get_obj", {}, (res) => {
					if (res.result.obj) {
						this.obj = res.result.obj
					} else {
						console.log("没有请求到商品分类");
					}
				})
			},
			async get_obj_by_id(){
				var res = await this.$get("~/api/parking_reservation/get_obj", {
					parking_reservation_id:this.query.parking_reservation_id
				})

				if (res.result && res.result.obj) {
					this.obj = res.result.obj
				} else {
					console.log("没有请求到商品分类");
				}
			},
								/**
			 * 获取注册用户用户列表
			 */
			async get_list_user_user() {
				var json = await this.$get("~/api/user/get_list?user_group=注册用户");
				if(json.result && json.result.list){
					this.list_user_user = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_user(id){
				let obj = this.list_user_user;
				let ret = "";
				for(let i=0;i<obj.length;i++){
					if(obj[i].user_id==id){
						ret = obj[i].nickname+"-"+obj[i].username;
					}
				}
				return ret;
			},
								},
		created() {
								this.get_list_user_user();
								},
		async onLoad(){
			if (Object.keys(this.obj_goods).length !== 0) {
				await this.get_obj_goods_type();
				await this.get_obj_by_goods();
			} else if (this.query["parking_reservation_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_parking_reservation_details {}

	.details {
		background-color: #fff;
		margin-bottom: 0.5rem;
		padding: 1rem;
		font-size: 10px;
	}

	.item {
		display: flex;
		padding: 0.2rem 0;
		border-bottom: 1px solid #eee;
	}

	.left_text {
		flex: 0 0 25%;
	}

	.right_text {
		flex: 0 0 75%;
	}
	.edit_nav{
		text-align: center;
		background-color: #fff;
		padding: 0.3rem;
		margin: 0.1rem 1rem;
		border: 1px solid #eee;
		border-radius: 0.5rem;
	}
</style>
