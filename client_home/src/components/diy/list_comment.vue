<template>
	<view class="list_comment">
		<view class="item_comment" v-for="(o, i) in list" :key="i"
			:to="'/pages/article/details?' + vm.comment_id + '=' + o[vm.comment_id]">
			<view class="comment_box">
				<view class="left_block">
					<image style="width: 2rem;height: 2rem;border-radius: 4px"
						:src="$fullImgUrl(o[vm.avatar])||'@/static/img/avatar.jpg'"></image>
				</view>
				<view class="right_block">
					<view class="top_comment">
						<view class="nickname">
							{{o[vm.nickname]}}
						</view>
						<navigator class="link" :url="goto_edit(o)">
							回复</navigator>
					</view>
					<rich-text class="content" :nodes="$setRichTextImage(o[vm.content])"></rich-text>
					<view class="time">
						{{$toTime(o[vm.create_time],"yyyy-MM-dd hh:mm:ss")}}
					</view>
				</view>
			</view>

			<!-- 回复内容 -->
			<view class="list_reply_block" v-if="o.list_reply">
				<view class="list_reply_box" v-for="(obj, idx) in o.list_reply" :key="idx">
					<view class="reply_left">
            <image style="width: 2rem;height: 2rem;border-radius: 4px"
                   :src="$fullImgUrl(obj[vm.avatar])||'@/static/img/avatar.jpg'"></image>
						<text class="nickname">{{ obj[vm.nickname] }}</text>
						<text class="reply_time">{{ $toTime(obj[vm.create_time],"yyyy-MM-dd hh:mm:ss") }}</text>
					</view>
					<rich-text class="content" :nodes="$setRichTextImage(obj[vm.content])"></rich-text>

				</view>
			</view>
			<!-- /回复内容 -->
			<view class="line"></view>
		</view>

	</view>
</template>

<script scoped>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				}
			},
			obj: {
				type: Object,
				default: function() {
					return {};
				},
			},
			vm: {
				type: Object,
				default: function() {
					return {
						avatar: "avatar",
						nickname: "nickname",
						comment_id: "comment_id",
						create_time: "create_time",
						content: "content"
					}
				}
			},
		},
		data() {
			return {
				active_index: -1,
				reply_comment: '',
			}
		},
		methods: {
			goto_edit(o) {
				var vm = this.vm
				return '/pages/comment/edit?source_table=' + o.source_table + '&source_field=' + o.source_field +
					'&source_id=' + o.source_id + '&reply_to_id=' + o[vm.comment_id] + '&nickname=' + o[vm.nickname]
			}
		},

	}
</script>

<style scoped>
	.list_comment {
		padding: 0 0.6rem;
	}

	.comment_box {
		display: flex;
		padding: 0.5rem 0;
	}

	.comment_box+.comment_box {
		border-top: 1px solid #DBDBDB;
	}

	.left_block {
		display: inline-block;
		padding: 0.3rem;
		padding-right: 0.5rem;
	}

	.right_block {
		display: inline-block;
		width: calc(100% - 2.5rem);
	}


	.time {
		color: #999;
	}

	.time {
		text-align: right;
		margin-top: 3px;
		font-size: 12px;



	}

	.top_comment {
		margin-bottom: 0.6rem;
		display: flex
	}

	.top_comment .nickname {
		color: var(--color_grey);
		font-size: 0.8rem;
		width: 60%;
	}

	.top_comment .link {
		width: 40%;
		text-align: right;
		margin-top: 3px;
		font-size: 12px;
		transform: scale(0.8);
		border: 0;
	}

	.content {
		font-size: 0.8rem;
	}

	.reply_comment {
		display: none;
	}

	.reply_comment.active {
		display: block;
	}

	.list_reply_block {
		margin-left: 4rem;
	}

	.list_reply_block .list_reply_box {
		padding: 5px 0;

	}


	.list_reply_block .reply_left .nickname {
		color: var(--color_grey);
		font-size: 0.8rem;
	}

	.list_reply_block .reply_left .reply_time {
		float: right;
		font-size: 10px;
		transform: scale(0.8);
		color: var(--color_grey);
	}

	.list_reply_block .content {
		word-break: break-all;
	}

	.line {
		border-bottom: 1px solid var(--color_border);
	}
</style>
