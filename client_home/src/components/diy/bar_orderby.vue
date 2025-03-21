<template>
	<view class="bar_orderby" @click="handleOrderby()">
		<view class="text" :style="{fontSize:fontSize}">{{text}}</view>
		<view class="icon_group">
			<view class="icon_up" :class="{active:arrowDirection==='up'}">
				<view class="triangle" :style="{borderWidth:triangleSize}">
				</view>
			</view>
			<view class="icon_down" :class="{active:arrowDirection==='down'}">
				<view class="triangle" :style="{borderWidth:triangleSize}">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from "@/libs/mixins/component.js"
	export default {
		mixins: [mixin],
		model: {
			prop: 'direction',
			event: 'update:direction'
		},
		props: {
			text: {
				type: String,
				default () {
					return "排序"
				}
			},
			direction: {
				type: String,
				default: ""
			},
			fontSize: {
				type: String,
				default: "1rem"
			},
			triangleSize: {
				type: String,
				default: "0.25rem"
			},
		},
		computed: {
			arrowDirection() {
				return this.direction
			}
		},
		methods: {
			// 切换排序
			handleOrderby() {
				var arrowDirection = this.arrowDirection
				if (arrowDirection === "up") {
					this.$emit('update:direction', "down");
				} else if (arrowDirection === "down") {
					this.$emit('update:direction', "");
				} else {
					this.$emit('update:direction', "up");
				}
				this.$nextTick(() => {
					this.emitOut()
				})
			},
			// 暴露handle接收排序状态
			emitOut() {
				var obj = {
					direction: this.direction,
					text: this.text
				}
				this.$emit("handle", obj)
			}
		},
		components: {

		}
	}
</script>

<style>
	.bar_orderby {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bar_orderby .text {
		font-size: 1rem;
		font-weight: 400;
		color: #666666;
		margin-right: 0.5rem;
	}


	.bar_orderby .icon_up {
		margin-bottom: 0.125rem;
	}

	.bar_orderby .triangle {
		display: block;
		border-style: solid;
	}

	.bar_orderby .icon_up .triangle {
		border-color: transparent transparent #ccc;
	}

	.bar_orderby .icon_up.active .triangle {
		border-color: transparent transparent #334F99;
	}

	.bar_orderby .icon_down .triangle {
		border-color: #ccc transparent transparent;
	}

	.bar_orderby .icon_down.active .triangle {
		border-color: #334F99 transparent transparent;
	}
</style>
