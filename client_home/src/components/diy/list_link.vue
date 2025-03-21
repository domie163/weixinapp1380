<template>
	<view class="list_link">
		<view class="row">
			<view v-for="(o, i) in list" :key="i" :class="'col-' + col">
				<navigator :to="o[vm.url]" class="link">
					<view class="img_box">
						<image class="img" :src="$fullImgUrl(o[vm.img]) || '@/static/img/default.png'" mode="widthFix"></image>
					</view>
					
					<view><text>{{ o[vm.title] }}</text></view>
				</navigator>
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
						url: "url"
					}
				}
			},
			span: {
				type: Number,
				default: 3
			}
		},
		data() {
			var col = 12 / this.span;
			return {
				col
			}
		}
	}
</script>

<style scoped>
	.row {
		justify-content: flex-start;
	}

	.link {
		padding: .75rem;
	}
	.link .img_box{
		width: 100px;
		height: 60px;
		margin: auto;
		
	}
	.link .img_box .img{
		height: 100% !important;
		width: 100% !important;
	}
</style>
