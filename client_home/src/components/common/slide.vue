<template>
	<view class="swiper_img">
		<swiper class="swiper" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor"
			:indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(o, i) in list" :key="i">
				<image v-if="o[vm.img]" :src="$fullImgUrl(o[vm.img])"></image><text class="title"
					v-if="show_title && o[vm.title]">{{ o[vm.title] }}</text>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
        name: "SwiperImg",
		props: {
			show_title: {
				type: String,
				default: ""
			},
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
						title: "title"
					}
				}
			}
		},
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				indicatorColor: "rgba(0, 0, 0, .3)",
				indicatorActiveColor: "#fff",
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			}
		}
	}
</script>

<style lang="scss" scoped>
@media (min-width:768px) {
    .swiper_img .swiper {
        height: 250px;
    }
}

.swiper_img {
    image {
        width: 100%;
        height: 100%;
    }
    .title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
    }
}
</style>
