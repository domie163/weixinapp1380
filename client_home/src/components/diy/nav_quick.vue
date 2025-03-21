<template>
	<view class="nav_quick">
		<view class="my_menu">
			<view style="background-color: #fff;" class="list_menu" v-for="(o, i) in list" :key="i"  v-if="o[vm.title]">
				<navigator class="menu" :url="o[vm.url]">
					<text>{{o[vm.title]}}</text>
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
						url: "url",
						desc: "desc"
					}
				}
			},
			span: {
				type: Number,
				default: 4
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
	image {
		border-radius: 1rem;
		overflow: hidden;
	}

	.list_menu {
		text-align: center;
	}

	.menu {
		padding: 0.75rem;
	}

	.menu text {
		font-size: 0.875rem;
	}
	
	.my_menu .list_menu+.list_menu{
		border-top: 2px solid #F4F4F4;
	}
</style>
