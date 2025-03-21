<template>
	<view class="list_parking_reservation list_com--new" style="background-color: #fff;">
		<!-- 视图 -->
		<view class="parking_reservation_block box_wrap" >
			<navigator class="item_parking_reservation box_style" v-for="(o, i) in list"  :key="i" :url="'/pages/parking_reservation/details?parking_reservation_id=' + o['parking_reservation_id']">
					<view class="view" v-if="0 && $check_index_field('get','order_number','/parking_reservation/list')">
					<view class="title" v-if="true">
						<span>订单号</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["order_number"] }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','parking_space_number','/parking_reservation/list')">
					<view class="title" v-if="true">
						<span>车位编号</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["parking_space_number"] }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','position','/parking_reservation/list')">
					<view class="title" v-if="true">
						<span>位置</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["position"] }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','the_measure_of_area','/parking_reservation/list')">
					<view class="title" v-if="true">
						<span>面积</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["the_measure_of_area"] }}</span>
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','user','/parking_reservation/list')">
					<view class="title" v-if="true">
						<span>用户</span>
					</view>
							<view class="diy_field time" >
						<span>{{ get_user_user(o['user']) }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','user_name','/parking_reservation/list')">
					<view class="title" v-if="true">
						<span>用户姓名</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["user_name"] }}</span>
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','contact_number','/parking_reservation/list')">
					<view class="title" v-if="true">
						<span>联系电话</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["contact_number"] }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','start_time','/parking_reservation/list')">
					<view class="title" v-if="true">
						<span>开始时间</span>
					</view>
							<view class="diy_field time" >
						<span>{{ $toTime(o["start_time"] ,"yyyy-MM-dd hh:mm:ss") }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','end_time','/parking_reservation/list')">
					<view class="title" v-if="true">
						<span>结束时间</span>
					</view>
							<view class="diy_field time" >
						<span>{{ $toTime(o["end_time"] ,"yyyy-MM-dd hh:mm:ss") }}</span>
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','appointment_instructions','/parking_reservation/list')">
					<view class="title" v-if="true">
						<span>预约说明</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["appointment_instructions"] }}</span>
					</view>
						</view>
					<view class="bottom-view">
				</view>
				<view class="view">
					<view class="create_time_block diy_field number">
						<span>{{ $toTime(o["create_time"],"yyyy-MM-dd hh:mm:ss") }}</span>
					</view>
				</view>
			</navigator>
		</view>
		<!-- /视图 -->
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				}
			}
		},
		data() {
			return {
									// 用户列表
				list_user_user: [],
									}
		},
		methods: {
			/**
			 *  跳转链接
			 *  @param {Object} id
			 */
			to_nav(id) {
				this.$nav('/pages/parking_reservation/details?parking_reservation_id=' + id)
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
								}
	}
</script>

<style scoped>
	.list_parking_reservation {
		/* padding: 0 1rem; */
		margin-bottom: 1rem;
	}

	.list_parking_reservation .list_parking_reservation_table {
		width: 100%;
		padding: 5px 0;
	}

	.list_parking_reservation .list_parking_reservation_table .btn_change_table {
		margin-left: auto;
		font-weight: bold;
		padding: 0.5rem 0;
		width: 100px;
		text-align: center;
		font-size: 0.875rem;
		border: 1px solid #CCCCCC;
		border-radius: 1rem;
		margin-bottom: 0.25rem;
	}

	.list_parking_reservation .list_parking_reservation_table .parking_reservation_table_block .uni-table-td{
		padding: 8px;
	}

	.list_parking_reservation .list_parking_reservation_table .parking_reservation_table_block .image {
		width: 10%;
	}

	.list_parking_reservation .list_parking_reservation_table .parking_reservation_table_block .text {
		overflow: hidden;
		width: 30%;
		font-size: 0.5rem;
	}

	.list_parking_reservation .list_parking_reservation_table .parking_reservation_table_block .hits {
		width: 12%;
		font-size: 0.5rem;
	}

	.list_parking_reservation .list_parking_reservation_table .parking_reservation_table_block .praise {
		width: 12%;
		font-size: 0.5rem;
	}

	.list_parking_reservation .list_parking_reservation_table .parking_reservation_table_block .create_time {
		width: 26%;
		font-size: 0.5rem;
	}
	.list_parking_reservation .item_parking_reservation {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		padding: 0.75rem 1rem;

	}
	.list_parking_reservation .item_parking_reservation+.item_parking_reservation{
		border-top: 1px solid #dbdbdb;
	}
	.list_parking_reservation .item_parking_reservation .left>image {
		position: relative;
		top: 50%;
		transform: translate(0, -50%);
		border-radius: 0.5rem;
	}

	.list_parking_reservation .item_parking_reservation .right_block {
		width: calc(100% - 5rem);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.list_parking_reservation .top {
		font-size: 0.9rem;
	}


	.list_parking_reservation .time {
		font-size: 0.6rem;
		color: var(--color_grey)
	}

	.list_parking_reservation .bottom {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-size: 0.5rem;
		color: var(--color_grey)
	}

	.list_parking_reservation .see {
		margin-left: 1rem;
	}
	.box_wrap{
		padding: 0.75rem;
	}
	.box_style{
		margin-bottom: 0.75rem;
		padding: 0.375rem;
		display: inline-block !important;
		border: 0.075rem solid #ccc;
		border-radius: 0.375rem;
		overflow: hidden;
	}
	.box_style:nth-child(even){
		margin-left: 0.60rem;
	}
	.box_style:nth-child(even){
		margin-left: 0.60rem;
	}
	.bottom-view,.create_time_block{
		font-size: 12px;
		color: #666666;
	}
	.bottom-view view{
		display: inline-block;
	}
	.bottom-view span{
		margin-left: 5px;
		margin-right: 10px;
	}
/* new style start */
	.list_com--new .box_wrap{
		display: flex;
		flex-wrap: wrap;
		padding-left: 0 !important;
		padding-right: 0 !important;
		justify-content: space-between;
	}
	.list_com--new .box_style:nth-child(even) {
    	margin-left: 0 !important;
	}
    .list_com--new .box_wrap .box_style{
		display: inline-block !important;
		width: 48%;
		max-width: 48%;
		overflow: hidden;
		border-color: var(--color_primary);
		box-sizing: border-box;
		padding:8px!important;
    }
    .list_com--new .view{
        display: flex;
        overflow: hidden;
		width:100%;
    }

    .list_com--new .view .title span{
       white-space: nowrap;
    }
    .list_com--new .view .text{
        display: flex;
        color: var(--color_primary);
        margin-left: 10px;
        border-bottom: 1px solid #ccc;
        white-space: nowrap;
    }
     .list_com--new .view .text span{
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

     .list_com--new .view .number{
        color: var(--color_primary);
    }

    .list_com--new .view .image{
        width: 100%;
        border-bottom: 1px solid #ccc;
		margin-top:5px;
    }

	.list_com--new .diy_field.text{
		overflow: hidden;
		margin-right: -8px;
	}

/* new style start */

</style>

