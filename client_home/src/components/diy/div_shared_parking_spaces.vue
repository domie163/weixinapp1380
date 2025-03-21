<template>
	<view class="diy_details diy_div_shared_parking_spaces">
		<view v-if="Object.keys(obj).length!==0" class="warp">
			<view class="container">
				<view class="row">
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
					<view v-if="$check_field('get','state')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>状态:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["state"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','parking_space_image')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>车位图片:</span>
						</view>
							<view class="diy_field diy_img">
							<image style="width:100%;height:auto;" :src="$fullUrl(obj['parking_space_image'])" mode="widthFix"></image>
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
					<view v-if="$check_field('get','fee_rules')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>收费规则:</span>
						</view>
							<view class="diy_field diy_desc">
							<text>
								{{ obj["fee_rules"] }}
							</text>
						</view>
						</view>
				</view>
			</view>
		</view>

			<view class="warp">
			<view class="container">
				<view class="row">
					<view class="col">
						<button type="button" class="diy_btn" @click="to_form('/pages/parking_reservation/edit')" v-if="$check_action('/parking_reservation/edit','add') || $check_action('/parking_reservation/edit','set')" >预约</button>
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
						shared_parking_spaces_id: 0
					}
				}
			}
		},
		data() {
			return {
				obj_goods_type: {},
				obj: {},
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
				var res = await this.$get("~/api/shared_parking_spaces/get_obj", {
					shared_parking_spaces_id:this.query.shared_parking_spaces_id
				})

				if (res.result && res.result.obj) {
					this.obj = res.result.obj
				} else {
					console.log("没有请求到商品分类");
				}
			},
								},
		created() {
								},
		async onLoad(){
			if (Object.keys(this.obj_goods).length !== 0) {
				await this.get_obj_goods_type();
				await this.get_obj_by_goods();
			} else if (this.query["shared_parking_spaces_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_shared_parking_spaces_details {}

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
