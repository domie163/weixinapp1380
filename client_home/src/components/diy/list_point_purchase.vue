<template>
	<view class="list_point_purchase list_com--new" style="background-color: #fff;">
		<!-- 视图 -->
		<view class="point_purchase_block box_wrap" >
			<navigator class="item_point_purchase box_style" v-for="(o, i) in list"  :key="i" :url="'/pages/point_purchase/details?point_purchase_id=' + o['point_purchase_id']">
					<view class="view" v-if="0 && $check_index_field('get','user','/point_purchase/list')">
					<view class="title" v-if="true">
						<span>用户</span>
					</view>
							<view class="diy_field time" >
						<span>{{ get_user_user(o['user']) }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','user_name','/point_purchase/list')">
					<view class="title" v-if="true">
						<span>用户姓名</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["user_name"] }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','credit_card_number','/point_purchase/list')">
					<view class="title" v-if="true">
						<span>积分卡号</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["credit_card_number"] }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','purchase_points','/point_purchase/list')">
					<view class="title" v-if="true">
						<span>购买积分</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["purchase_points"] }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','purchase_instructions','/point_purchase/list')">
					<view class="title" v-if="true">
						<span>购买说明</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["purchase_instructions"] }}</span>
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
				this.$nav('/pages/point_purchase/details?point_purchase_id=' + id)
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
	.list_point_purchase {
		/* padding: 0 1rem; */
		margin-bottom: 1rem;
	}

	.list_point_purchase .list_point_purchase_table {
		width: 100%;
		padding: 5px 0;
	}

	.list_point_purchase .list_point_purchase_table .btn_change_table {
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

	.list_point_purchase .list_point_purchase_table .point_purchase_table_block .uni-table-td{
		padding: 8px;
	}

	.list_point_purchase .list_point_purchase_table .point_purchase_table_block .image {
		width: 10%;
	}

	.list_point_purchase .list_point_purchase_table .point_purchase_table_block .text {
		overflow: hidden;
		width: 30%;
		font-size: 0.5rem;
	}

	.list_point_purchase .list_point_purchase_table .point_purchase_table_block .hits {
		width: 12%;
		font-size: 0.5rem;
	}

	.list_point_purchase .list_point_purchase_table .point_purchase_table_block .praise {
		width: 12%;
		font-size: 0.5rem;
	}

	.list_point_purchase .list_point_purchase_table .point_purchase_table_block .create_time {
		width: 26%;
		font-size: 0.5rem;
	}
	.list_point_purchase .item_point_purchase {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		padding: 0.75rem 1rem;

	}
	.list_point_purchase .item_point_purchase+.item_point_purchase{
		border-top: 1px solid #dbdbdb;
	}
	.list_point_purchase .item_point_purchase .left>image {
		position: relative;
		top: 50%;
		transform: translate(0, -50%);
		border-radius: 0.5rem;
	}

	.list_point_purchase .item_point_purchase .right_block {
		width: calc(100% - 5rem);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.list_point_purchase .top {
		font-size: 0.9rem;
	}


	.list_point_purchase .time {
		font-size: 0.6rem;
		color: var(--color_grey)
	}

	.list_point_purchase .bottom {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-size: 0.5rem;
		color: var(--color_grey)
	}

	.list_point_purchase .see {
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

