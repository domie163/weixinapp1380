<template>
	<view class="swiper_notice">
		<uni-icons class="icon_sound" type="sound" size="20" color="var(--color_primary)"></uni-icons>
		<swiper class="notice" :autoplay="autoplay" :interval="interval" :duration="duration" :vertical="true">
			<swiper-item v-for="(o, i) in list" :key="i">
				<view class="swiper-item">
					<text>{{ o[vm.title] }}</text>
				</view>
			</swiper-item>
		</swiper>
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
					}
				}
			}
		},
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
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

<style scoped>
	.swiper_notice {
		position: relative;
		padding: 0.5rem .75rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.icon_sound {
		position: absolute;
		left: 1rem;
	}
	.notice {
		margin-left: 5px;
		height: 1.5rem;
		text-align: center;
		width: 100%;
	}
</style>
