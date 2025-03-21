<template>
	<!-- 数字输入框 -->
	<view class="numbox">
		<view @click="_calcValue('minus')" class="minus">
			<text class="numbox--symbol" :class="{ 'numbox--disabled': inputValue <= min || disabled }">-</text>
		</view>
		<input :disabled="disabled" @blur="_onBlur" class="value" type="number" v-model="inputValue" />
		<view @click="_calcValue('plus')" class="plus">
			<text class="numbox--symbol" :class="{ 'numbox--disabled': inputValue >= max || disabled }">+</text>
		</view>
	</view>
</template>
<script>
	/**
	 * NumberBox 数字输入框
	 * @description 带加减按钮的数字输入框
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=31
	 * @property {Number} value 输入框当前值
	 * @property {Number} min 最小值
	 * @property {Number} max 最大值
	 * @property {Number} step 每次点击改变的间隔大小
	 * @property {Boolean} disabled = [true|false] 是否为禁用状态
	 * @event {Function} change 输入框值改变时触发的事件，参数为输入框当前的 value
	 */

	export default {
		name: "UniNumberBox",
		props: {
			value: {
				type: [Number, String],
				default: 1
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				inputValue: 0
			};
		},
		watch: {
			value(val) {
				this.inputValue += val;
			},
			inputValue(newVal, oldVal) {
				if (+newVal !== +oldVal) {
					this.$emit("change", newVal);
				}
			}
		},
		created() {
			this.inputValue += this.value;
		},
		methods: {
			// 遇见小数先变成整数运算，再变回小数
			_calcValue(type) {
				if (this.disabled) {
					return;
				}
				const scale = this._getDecimalScale();
				let value = this.inputValue * scale;
				//value全为整数了
				let step = this.step * scale;
				if (type === "minus") {
					value -= step;
					if (value < (this.min * scale)) {
						// 太大了不能再减了
						return;
					}
					if (value > (this.max * scale)) {
						// 防止负数当增量用时的情况
						value = this.max * scale
					}
				} else if (type === "plus") {
					value += step;
					if (value > (this.max * scale)) {
						return;
					}
					if (value < (this.min * scale)) {
						value = this.min * scale
					}
				}

				this.inputValue = String(value / scale);
			},
			/**
			 * @example step为0.1或1.1则scale为10,0.123->1000
			 */
			_getDecimalScale() {
				let scale = 1;
				// 浮点型
				// ~~的作用是去掉小数部分，因为位运算的操作值要求是整数
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + "").split(".")[1].length); //10**(小数部分长度)
				}
				return scale;
			},
			_onBlur(event) {
				let value = event.detail.value;
				if (!value) {
					// 啥都没输入
					// this.inputValue = 0;
					return;
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
				} else if (value < this.min) {
					value = this.min;
				}
				this.inputValue = value;
			}
		}
	};
</script>
<style>
	.numbox {
		--box_height: 2rem;
		--text-color-disable: #c0c0c0;
		--text-color: #333;
		--bg-color-grey: #f8f8f8;
		--box_width: 35px;
	}

	.numbox {
		display: flex;
		flex-direction: row;
		/* align-items: center; */
		height: var(--box_height);
		/* line-height: var(--box_height); */
		width: 90px;
	}

	.numbox .value {
		box-sizing: border-box;
		background-color: #ffffff;
		width: 40px;
		height: 100%;
		text-align: center;
		font-size: 16px;
		border-width: 1px;
		border-style: solid;
		border-color: #e5e5e5;
		border-left-width: 0;
		border-right-width: 0;
	}

	.numbox .minus,
	.numbox .plus {
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		color: var(--text-color);
		width: var(--box_width);
		height: 100%;
		background-color: #f8f8f8;
		border-width: 1px;
		border-style: solid;
		border-color: #e5e5e5;
	}

	.numbox .minus {
		border-top-left-radius: 0.25rem;
		border-bottom-left-radius: 0.25rem;
		border-right-width: 0;
	}

	.numbox .plus {
		border-top-right-radius: 0.25rem;
		border-bottom-right-radius: 0.25rem;
		border-left-width: 0;
	}

	.numbox .numbox--symbol {
		font-size: 20px;
		color: var(--text-color);
	}

	.numbox .numbox--disabled {
		color: var(--text-color-disable);
	}
</style>
