<template>
	<view class="list_collect">
		<view class="item_collect" v-for="(o, i) in list" :key="i">
			<navigator class="collect_box" :url="'/pages/'+o[vm.source_table]+'/details?'+o[vm.source_field]+'='+o[vm.source_id]">
				<view class="left_block">
					<image style="width: 3rem;height: 3rem;" :src="$fullUrl(o[vm.img]) || '/static/img/avatar.jpg'"></image>
				</view>
				<view class="right_block">
					<view class="top_comment">
						<view class="title">
							{{o[vm.title]}}
						</view>
					</view>
				</view>
			</navigator>
			<button class="btn_del" @click="del_collect(o[vm.collect_id],i)" type="default" size="mini">删除</button>
			<view class="time">
				{{$toTime(o[vm.create_time],"yyyy-MM-dd hh:mm:ss")}}
			</view>
		</view>
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
			},
			vm: {
				type: Object,
				default: function() {
					return {
						img: "img",
						title: "title",
						create_time: "create_time",
						collect_id: "collect_id",
						source_table: "source_table",
						source_field: "source_field",
						source_id: "source_id"
					}
				}
			}
		},
		methods: {
			del_collect(collect_id, index) {
				this.$get("~/api/collect/del", {
					collect_id
				}, (res) => {
					this.list.splice(index, 1);
				})
			}
		}
	}
</script>

<style scoped>
	.item_collect {
		position: relative;
		background-color: #fff;
		margin: 0.6rem;
		border-radius: 0.5rem;
		border: 1px solid #eee;
		box-shadow: 2px 2px 2px #eee;
	}

	.collect_box {
		display: flex;
		padding: 0.3rem 0.6rem;
		padding-bottom: 0rem;
		/* border-top: 1px solid #eee; */
	}

	.left_block {
		display: inline-block;
		width: 20%;
		padding: 0.2rem;
		padding-bottom: 0rem;
		padding-right: 0.5rem;
	}

	.right_block {
		display: inline-block;
		width: 80%;
	}

	.top_comment {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.2rem;
	}
	.top_comment .title {
		font-size: 0.8rem;
	}
	.time {
		padding-left: 0.8rem;
		padding-bottom: 0.3rem;
		color: #999;
		font-size: 0.5rem;
	}

	.btn_del {
		position: absolute;
		right: 0.7rem;
		bottom: 0.3rem;
		color: var(--color_warning);
		background-color: #fff;
	}
	.btn_del::after{
		border: 1px solid var(--color_warning);
		border-radius: 3rem;
	}
</style>
