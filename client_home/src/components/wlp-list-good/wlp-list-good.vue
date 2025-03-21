<template>
    <view class="listGood" :class="{ listGoodRow: type == 'row' }" :style="{ width: resWidth }">
        <view class="listGood__left" @tap="_click('img')">
            <view class="listGood__label">{{ data.label }}</view>
            <image class="listGood__img" lazy-load :src="data.imgUrl" mode="aspectFill"></image>
        </view>
        <view class="listGood__content">
            <text class="listGood__title" @tap="_click('title')">{{ data.title }}</text>
            <text class="listGood__titleSub" v-if="data.titleSub" @tap="_click('titleSub')">{{ data.titleSub }}</text>
            <view class="listGood__sku" v-if="data.sku!=null" @tap="_click('sku')">
                {{ data.sku[0].name }}
                <uni-icon v-if="data.sku.length > 1" type="arrowdown" size="12" color="#fff"></uni-icon>
            </view>
            <slot></slot>
        </view>
        <view class="listGood__bottom">
            <view class="listGood__price">
                {{ data.price }}
                <text v-if="data.originalPrice" class="listGood__price--original">{{ data.originalPrice }}</text>
            </view>
            <view class="listGoodNumbox" :style="{ 'padding-bottom': type == 'column' ? '0' : '8px' }" v-if="inputValue != null">
                <template v-if="(data.sku != null && data.sku.length > 1) || inputValue == 0">
                    <view class="listGoodNumbox__empty" @tap="_calcValue('add')">
                        <uni-icon size="20" type="plusempty" color="#fff"></uni-icon>
                        购物车
                        <uni-badge v-if="inputValue > 0" :text="inputValue" type="error">
                        	{{inputValue}}
                        </uni-badge>
                    </view>
                </template>
                <template v-else-if="inputValue > 0">
                    <view class="listGoodNumbox__minus" @click="_calcValue('subtract')">-</view>
                    <input class="listGoodNumbox__value" type="number" :disabled="disabled" :value="inputValue" @blur="_onBlur" />
                    <view class="listGoodNumbox__plus" :class="{ listGoodNumbox__disabled: disableAdd }" @click="_calcValue('add')">+</view>
                </template>
                <template v-else>
                    <view class="listGoodNumbox__helper" :class="{ 'listGoodNumbox__helper--error': inputValue < -1 }" @tap="_click('numbox')"><slot name="numbox"></slot></view>
                </template>
            </view>
        </view>
    </view>
</template>

<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import uniBadge from '@/components/uni-badge/uni-badge.vue';

export default {
    components: {
        uniIcon,
        uniBadge
    },
    props: {
        type: {
            type: String,
            default: 'column'
        },
        data: {
            type: Object
        },
        index: {
            type: [Number, Array],
            default: 0
        },
        width: {
            type: String,
            default: '50%'
        },
        // 购物车按钮
        max: {
            type: Number,
            default: Infinity
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
            inputValue: this.data.size
        };
    },
    computed: {
        resWidth() {
            if (this.type === 'column') {
                return 'auto';
            } else {
                return this.width;
            }
        },
        disableAdd() {
            return this.value >= this.max;
        }
    },
    watch: {
        value(val) {
            this.inputValue = val;
        },
        inputValue(val) {
            this.$emit('change', val, this.index);
        }
    },
    methods: {
        _click(type) {
            this.$emit('click', this.index, type);
        },
        _calcValue(type) {
            const scale = this._getDecimalScale();
            let value = this.inputValue * scale;
            let step = this.step * scale;

            if (type === 'subtract') {
                value -= step;
            } else if (type === 'add') {
                value += step;
            }
            if (value > this.max) {
                return;
            }
            this.inputValue = value / scale;
        },
        _getDecimalScale() {
            let scale = 1;
            // 浮点型
            if (~~this.step !== this.step) {
                scale = Math.pow(10, (this.step + '').split('.')[1].length);
            }
            return scale;
        },
        _onBlur(event) {
            let value = event.detail.value;
            if (!value) {
                this.inputValue = 0;
                return;
            }
            value = +value;
            if (value > this.max) {
                value = this.max;
            } else if (value < 0) {
                value = 0;
            }
            this.inputValue = value;
        }
    }
};
</script>

<style lang="scss">
@import '@/style/mixin/flex.scss';
@import '@/style/mixin/hr.scss';
@import '@/style/mixin/text-overflow.scss';
@import '@/style/mixin/price-before.scss';

.listGood {
    position: relative;
    padding: 16upx 16upx 17upx 224upx;
    min-height: 192upx;

    &::before {
        @include hr(bottom, 16upx);
    }

    &:last-child {
        padding-bottom: 16upx;

        &::before {
            display: none;
        }
    }

    &__left {
        position: absolute;
        top: 16upx;
        left: 16upx;
        width: 192upx;
        height: 192upx;
        background-color: #fff;
    }

    &__img {
        display: block;
        width: 100%;
        height: 100%;
    }

    &__label {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        padding: 0 8upx;
        font-size: 20upx;
        color: #fff;
        background-color: $uni-color-error;
        border-radius: 0 0 8upx 0;
    }

    &__content {
        display: flex;
        flex-direction: column;
        min-height: 148upx;
        line-height: 1;
    }

    &__title {
        color: $uni-text-color;
        font-size: $uni-font-size-lg;
        font-weight: 700;
        padding-bottom: 16upx;
        @include text-overflow();
    }

    &__titleSub {
        color: $uni-color-subtitle;
        font-size: $uni-font-size-sm;
        padding-bottom: 16upx;
        @include text-overflow();
    }

    &__sku {
        align-self: flex-start;
        padding: 0 8upx;
        margin-bottom: 16upx;
        font-size: 20upx;
        color: #fff;
        background-color: $uni-text-color-disable;
        border-radius: 8upx;
    }

    &__bottom {
        @include flex(null, bottom, null);
    }

    &__price {
        @include flex-self(full);
        line-height: 1;
        color: #dd524d;
        font-size: 44upx;

        &::before {
            @extend %__priceBefore;
        }

        &--original {
            padding-left: 16upx;
            color: $uni-text-color-grey;
            font-size: $uni-font-size-sm;
            text-decoration: line-through;

            &::before {
                @extend %__priceBefore;
            }
        }
    }

    &Row {
        box-sizing: border-box;
        padding: 8upx;

        &:last-child {
            padding-bottom: 8upx;
        }

        &::before {
            display: none;
        }
    }

    &Row &__left {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: inherit;
        padding-bottom: 100%;
    }

    &Row &__img {
        position: absolute;
        top: 0;
        left: 0;
    }

    &Row &__content {
        padding: 16upx 16upx 0;
        min-height: initial;
        background-color: #fff;
    }

    &Row &__sku {
        display: none;
    }

    &Row &__bottom {
        flex-direction: column;
        align-items: center;
        background-color: #fff;
    }

    &Row &__title {
        font-size: $uni-font-size-base;
    }

    &Row &__price {
        text-align: center;
        margin-bottom: 16upx;
    }

    &Numbox {
        @include flex(center, center);
        height: 40upx;

        &__minus,
        &__plus {
            @include flex-self(keep);
            width: 40upx;
            height: 40upx;
            text-align: center;
            line-height: 40upx;
            border-radius: 50%;
            color: #fff;
            background-color: $uni-color-primary;
        }

        &__value {
            width: 60upx;
            color: $uni-text-color;
            text-align: center;
        }

        &__disabled {
            background-color: $uni-text-color-disable;
        }

        &__empty {
            position: relative;
            @include flex(null, center);
            height: 40upx;
            line-height: 1;
            padding: 0 20upx 0 8upx;
            font-size: 24upx;
            color: #fff;
            background-color: $uni-color-primary;
            border-radius: 40upx;
            
            .uni-badge{
                position: absolute;
                right: 0;
                top: -18upx;
            }
        }

        &__helper {
            @include flex(around, center);
            height: 40upx;
            box-sizing: border-box;
            min-width: 140upx;
            padding: 0 16upx;
            font-size: 24upx;
            color: $uni-color-warning;
            border: 1px solid $uni-color-warning;
            border-radius: 40upx;

            &--error {
                color: $uni-color-error;
                border: 1px solid $uni-color-error;
            }
        }
    }
}
</style>
