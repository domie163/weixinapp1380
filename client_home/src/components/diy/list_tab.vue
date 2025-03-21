<template>
	<view :id="elId" class="wt-tabs">
		<!-- scroll-x是否滚动，scroll-left滚动位置 scroll-with-animation滚动动画 -->
		<scroll-view id="scrollContainer" :scroll-x="scroll" :scroll-left="scroll ? scrollLeft : 0"
			:scroll-with-animation="scroll" :style="{ position: fixed ? 'fixed' : 'relative', zIndex: 1993 }">
			<view class="wt-tabs__container" :style="{
				  display: scroll ? 'inline-flex' : 'flex',
				  whiteSpace: scroll ? 'nowrap' : 'normal',
				  background: bgColor,
				  height,
				  padding
				}">
				<!-- 滚动项 -->
				<view class="wt-tabs__container-item" v-for="(obj, idx) in tabs" :key="idx" :style="{
					color: current == idx ? activeColor : color,
					fontSize: current == idx ? activeFontSize : fontSize,
					fontWeight: bold && current == idx ? 'bold' : '',
					justifyContent: !scroll ? 'center' : '',
					flex: scroll ? '' : 1,
					padding: paddingItem,
					width:itemWidth?itemWidth:'transparent'
				  }" @click="change(obj, idx)">
					{{ field ? obj[field] : obj }}
				</view>
				<view v-if="!pills" class="wt-tabs__container-line" :style="{
					background: lineColor,
					width: lineWidth + 'px',
					height: lineHeight,
					borderRadius: lineRadius,
					left: lineLeft + 'px',
					transform: `translateX(-${lineWidth / 2}px)`
				  }"></view>
				<view v-else class="wt-tabs__container-pills" :style="{
					background: pillsColor,
					borderRadius: pillsBorderRadius,
					left: pillsLeft + 'px',
					width: currentWidth + 'px',
					height
				  }"></view>
			</view>
		</scroll-view>
		<!-- 用来fixed定位时占位置 -->
		<view class="wt-tabs__placeholder" :style="{
			height: fixed ? height : '0',
			padding
		  }"></view>
	</view>
</template>

<script>
	/**
	 * wt-tabs
	 * @property {Number} value 选中的下标
	 * @property {Array} tabs tabs 列表
	 * @property {String} bgColor = '#fff' 背景颜色
	 * @property {String} color = '#333' 默认颜色
	 * @property {String} activeColor = '#2979ff' 选中文字颜色
	 * @property {String} fontSize = '28rpx' 默认文字大小
	 * @property {String} activeFontSize = '28rpx' 选中文字大小
	 * @property {Boolean} bold = [true | false] 选中文字是否加粗
	 * @property {Boolean} scroll = [true | false] 是否滚动
	 * @property {String} height = '60rpx' tab 的高度
	 * @property {String} lineHeight = '10rpx' 下划线的高度
	 * @property {String} lineColor = '#2979ff' 下划线的颜色
	 * @property {Number} lineScale = 0.5 下划线的宽度缩放比例
	 * @property {String} lineRadius = '10rpx' 下划线圆角
	 * @property {Boolean} pills = [true | false] 是否胶囊样式
	 * @property {String} pillsColor = '#2979ff' 胶囊背景色
	 * @property {String} pillsBorderRadius = '10rpx' 胶囊圆角大小
	 * @property {String} field 如果是对象，显示的键名
	 * @property {Boolean} fixed = [true | false] 是否固定
	 * @property {String} paddingItem = '0 22rpx' 选项的边距
	 *
	 * @event {Function(current)} change 改变标签触发
	 * @event {Function(current)} input 改变标签触发
	 */
	export default {
		model: {
			prop: "value",
			event: "change"
		},
		props: {
			// 对应v-model
			value: {
				type: String,
				default: ""
			},
			tabs: {
				type: Array,
				default () {
					return []
				}
			},
			bgColor: {
				type: String,
				default: '#fff'
			},
			padding: {
				type: String,
				default: '0'
			},
			color: {
				type: String,
				default: '#333'
			},
			activeColor: {
				type: String,
				default: '#2979ff'
			},
			fontSize: {
				type: String,
				default: '14px'
			},
			activeFontSize: {
				type: String,
				default: '14px'
			},
			bold: {
				type: Boolean,
				default: true
			},
			scroll: {
				type: Boolean,
				default: true
			},
			height: {
				type: String,
				default: '30px'
			},
			lineColor: {
				type: String,
				default: '#2979ff'
			},
			lineHeight: {
				type: String,
				default: '5px'
			},
			lineScale: {
				type: Number,
				default: 0.25
			},
			lineRadius: {
				type: String,
				default: '15px'
			},
			pills: {
				type: Boolean,
				deafult: false
			},
			pillsColor: {
				type: String,
				default: '#2979ff'
			},
			pillsBorderRadius: {
				type: String,
				default: '5px'
			},
			field: {
				type: String,
				default: ''
			},
			fixed: {
				type: Boolean,
				default: false
			},
			paddingItem: {
				type: String,
				default: '0 11px'
			},
			itemWidth: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				elId: '',
				lineWidth: 30,
				currentWidth: 0, // 当前选项的宽度
				lineLeft: 0, // 滑块距离左侧的位置
				pillsLeft: 0, // 胶囊距离左侧的位置
				scrollLeft: 0, // 距离左边的位置
				containerWidth: 0, // 容器的宽度
				current: -1 // 当前选中项
			}
		},
		watch: {
			tabs(newVal) {
				this.$nextTick(() => {
					this.getTabItemWidth()
				})
			}
		},
		methods: {
			change(obj,idx){
				this.current = idx;
				this.$nextTick(() => {
					this.getTabItemWidth()
				})
				var field = this.field;
				field ? this.$emit('change',obj[field]) : this.$emit('change',obj);
			},
			// 产生随机字符串
			randomString(len) {
				len = len || 32
				let $chars =
					'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
				let maxPos = $chars.length
				let pwd = ''
				for (let i = 0; i < len; i++) {
					pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
				}
				return pwd
			},
			// 获取左移动位置(也就是标签项的宽度)
			getTabItemWidth() {
				let query = uni
					.createSelectorQuery()
					// #ifndef MP-ALIPAY
					.in(this)
				// #endif

				// 获取容器的宽度containerWidth
				query
					.select(`#scrollContainer`)
					.boundingClientRect((data) => {
						if (!this.containerWidth && data) {
							this.containerWidth = data.width
						}
					})
					.exec()

				// 获取所有的 tab-item 的宽度
				query
					.selectAll('.wt-tabs__container-item')
					.boundingClientRect((data) => {
						if (!data) {
							return
						}
						let lineLeft = 0
						let currentWidth = 0
						if (data) {
							for (let i = 0; i < data.length; i++) {
								if (i < this.current) {
									lineLeft += data[i].width
								} else if (i == this.current) {
									currentWidth = data[i].width
								} else {
									break
								}
							}
						}
						// 当前滑块的宽度
						this.currentWidth = currentWidth
						// 缩放后的滑块宽度
						this.lineWidth = currentWidth * this.lineScale * 1
						// 滑块作移动的位置
						this.lineLeft = lineLeft + currentWidth / 2
						// 胶囊距离左侧的位置
						this.pillsLeft = lineLeft
						// 计算滚动的距离左侧的位置
						if (this.scroll) {
							this.scrollLeft = this.lineLeft - this.containerWidth / 2
						}
					})
					.exec()
			}
		},
		mounted() {
			this.elId = 'randomId_' + this.randomString()
			this.current = this.value
			this.$nextTick(() => {
				this.getTabItemWidth()
			})
		}
	}
</script>

<style>
	.wt-tabs {
		box-sizing: border-box;
		overflow: hidden;
		margin-top: 10px;
	}

	::-webkit-scrollbar {
		display: none;
	}

	.wt-tabs__container {
		position: relative;
		display: inline-flex;
		align-items: center;
		white-space: nowrap;
		overflow: hidden;
	}

	.wt-tabs__container-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		position: relative;
		z-index: 10;
		// padding: 0 11px;
		transition: all 0.2s;
		white-space: nowrap;
	}
	.wt-tabs__container-item+.wt-tabs__container-item{
		border-left: 1px solid #ccc;
	}

	.wt-tabs__container-line {
		position: absolute;
		bottom: 0;
		transition: all 0.2s linear;
	}

	.wt-tabs__container-pills {
		position: absolute;
		transition: all 0.2s linear;
		z-index: 9;
	}
</style>
