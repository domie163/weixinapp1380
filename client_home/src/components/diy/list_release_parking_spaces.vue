<template>
	<view class="list_release_parking_spaces list_com--new" style="background-color: #fff;">
		<!-- 视图 -->
		<view class="release_parking_spaces_block box_wrap" >
			<navigator class="item_release_parking_spaces box_style" v-for="(o, i) in list"  :key="i" :url="'/pages/release_parking_spaces/details?release_parking_spaces_id=' + o['release_parking_spaces_id']">
					<view class="view" v-if="0 && $check_index_field('get','publish_users','/release_parking_spaces/list')">
					<view class="title" v-if="true">
						<span>发布用户</span>
					</view>
							<view class="diy_field time" >
						<span>{{ get_user_publish_users(o['publish_users']) }}</span>
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','user_name','/release_parking_spaces/list')">
					<view class="title" v-if="true">
						<span>用户姓名</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["user_name"] }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','parking_address','/release_parking_spaces/list')">
					<view class="title" v-if="true">
						<span>车位地址</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["parking_address"] }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','parking_space_number','/release_parking_spaces/list')">
					<view class="title" v-if="true">
						<span>车位号</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["parking_space_number"] }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','parking_space_image','/release_parking_spaces/list')">
					<view class="title" v-if=" false">
						<span>车位图片</span>
					</view>
							<view class="diy_field image" >
						<image style="width:100%;height: 5rem;" :src="$fullUrl(o['parking_space_image']) || '/static/img/default.png'" mode="scaleToFill" />
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','shared_time','/release_parking_spaces/list')">
					<view class="title" v-if="true">
						<span>共享时间</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["shared_time"] }}</span>
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','lease_instructions','/release_parking_spaces/list')">
					<view class="title" v-if="true">
						<span>租借说明</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["lease_instructions"] }}</span>
					</view>
						</view>
					<view class="bottom-view">
					<view class="praise-title">点赞数<span>{{ o["praise_len"] }}</span></view>
					<view class="hits-title">点击数<span>{{ o["hits"] }}</span></view>
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
				list_user_publish_users: [],
										}
		},
		methods: {
			/**
			 *  跳转链接
			 *  @param {Object} id
			 */
			to_nav(id) {
				this.$nav('/pages/release_parking_spaces/details?release_parking_spaces_id=' + id)
			},
				/**
			 * 获取注册用户用户列表
			 */
			async get_list_user_publish_users() {
				var json = await this.$get("~/api/user/get_list?user_group=注册用户");
				if(json.result && json.result.list){
					this.list_user_publish_users = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_publish_users(id){
				let obj = this.list_user_publish_users;
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
				this.get_list_user_publish_users();
									}
	}
</script>

<style scoped>
	.list_release_parking_spaces {
		/* padding: 0 1rem; */
		margin-bottom: 1rem;
	}

	.list_release_parking_spaces .list_release_parking_spaces_table {
		width: 100%;
		padding: 5px 0;
	}

	.list_release_parking_spaces .list_release_parking_spaces_table .btn_change_table {
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

	.list_release_parking_spaces .list_release_parking_spaces_table .release_parking_spaces_table_block .uni-table-td{
		padding: 8px;
	}

	.list_release_parking_spaces .list_release_parking_spaces_table .release_parking_spaces_table_block .image {
		width: 10%;
	}

	.list_release_parking_spaces .list_release_parking_spaces_table .release_parking_spaces_table_block .text {
		overflow: hidden;
		width: 30%;
		font-size: 0.5rem;
	}

	.list_release_parking_spaces .list_release_parking_spaces_table .release_parking_spaces_table_block .hits {
		width: 12%;
		font-size: 0.5rem;
	}

	.list_release_parking_spaces .list_release_parking_spaces_table .release_parking_spaces_table_block .praise {
		width: 12%;
		font-size: 0.5rem;
	}

	.list_release_parking_spaces .list_release_parking_spaces_table .release_parking_spaces_table_block .create_time {
		width: 26%;
		font-size: 0.5rem;
	}
	.list_release_parking_spaces .item_release_parking_spaces {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		padding: 0.75rem 1rem;

	}
	.list_release_parking_spaces .item_release_parking_spaces+.item_release_parking_spaces{
		border-top: 1px solid #dbdbdb;
	}
	.list_release_parking_spaces .item_release_parking_spaces .left>image {
		position: relative;
		top: 50%;
		transform: translate(0, -50%);
		border-radius: 0.5rem;
	}

	.list_release_parking_spaces .item_release_parking_spaces .right_block {
		width: calc(100% - 5rem);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.list_release_parking_spaces .top {
		font-size: 0.9rem;
	}


	.list_release_parking_spaces .time {
		font-size: 0.6rem;
		color: var(--color_grey)
	}

	.list_release_parking_spaces .bottom {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-size: 0.5rem;
		color: var(--color_grey)
	}

	.list_release_parking_spaces .see {
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

