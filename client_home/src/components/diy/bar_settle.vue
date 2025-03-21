<template>
	<view class="bar_settle">
		<view class="choose_btn" :class="{active:selectedAll}">
			<view class="btn_circle" @click="select_all()">
				<uni-icons style="color: #fff;font-size: 0.3rem;" v-if="selectedAll" type="checkmarkempty"></uni-icons>
			</view>
			<text>全选</text>
		</view>
		<view class="right_settle">
			<view class="sum_block">
				<text>共计：</text>
				<text class="sum">￥{{count}}</text>
			</view>
			<view class="settle">
				<button class="btn_settle" color="#fff" @click="settle_all()" size="mini">购买</button>
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
					return []
				}
			},
			vm: {
				type: Object,
				default: function() {
					return {
						cart_id: "cart_id",
						title: "title",
						img: "img",
						user_id: "user_id",
						state: "state",
						price: "price",
						price_ago: "price_ago",
						price_count: "price_count",
						num: "num",
						goods_id: "goods_id",
						description: "description",
						selected: "selected"
					}
				}
			}
		},
		data() {
			return {
				sum_price: 0
			}
		},
		computed: {
			count() {
				var sum_price = 0
				this.list.map(o => {
					if (o.selected) {
						sum_price += o.price_count
					}
				})
				return sum_price
			},
			selectedAll() {
				return this.list.every(o => o.selected)
			}
		},
		methods: {
		}
	}
</script>

<style scoped>
</style>
