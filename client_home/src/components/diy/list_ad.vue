<template>
	<view class="list_ad">
		<rich-text class="ad" v-for="(o, i) in list" v-if="o[vm.location] === location" :key="i" :nodes="$setRichTextImage(o[vm.content])"></rich-text>
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
			location: {
				type: String,
				default: "顶部广告"
			},
			vm: {
				type: Object,
				default: function() {
					return {
						location: "location",
						content: "content"
					}
				}
			}
		}
	}
</script>

<style>
	.list_ad{
		background-color: #fff;
	}
</style>
