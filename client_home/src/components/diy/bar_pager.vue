<template>
	<view class="bar_pager">
		<view class="nav"><a href="javascript:void(0);" v-if="display==='2' " class="first" @click="first" v-bind:class="{
			 'disabled' : page===1 }"><span
				 v-html="icons[0]"></span></a><a href="javascript:void(0);" class="previous" @click="previous" v-bind:class="{ 'disabled' : page <=1 }"><span
				 v-html="icons[1]"></span></a><a href="javascript:void(0);" v-for="(p, i) in pages" :key="i" v-bind:class="{'active': page==p }"
			 @click="set(p)">{{ p }}</a><a href="javascript:void(0);" class="next" v-bind:class="{ 'disabled' : page>= ct }"
			 @click="next"><span v-html="icons[2]"></span></a><a href="javascript:void(0);" v-if="display==='2' " class="last"
			 v-bind:class="{ 'disabled' : page==ct }" @click="last"><span v-html="icons[3]"></span></a></view>
	</view>
</template>

<script>
	export default {
		model: {
			prop: "page",
			event: "input"
		},
		props: {
			display: {
				type: String,
				default: "1"
			},
			count: {
				type: Number,
				default: 1
			},
			num: {
				type: Number,
				default: 5
			},
			page: {
				type: Number,
				default: 1
			},
			func: {
				type: Function,
				default: function _default(page) {}
			},
			icons: {
				type: Array,
				default: function _default() {
					return ["<<", "<", ">", ">>"];
				}
			}
		},
		data: function data() {
			return {
				pe: this.page
			};
		},
		computed: {
			ct: function ct() {
				var c = this.count ? this.count : 1;
				return Math.ceil(c);
			},
			pages: function pages() {
				var pe = this.page;
				var arr = [pe];
				var len = this.num;
				var end = this.ct;

				for (var i = 0; i < len; i++) {
					var right = pe + i + 1;

					if (right <= end) {
						arr.push(right);
					}

					var left = pe - i - 1;

					if (left > 0) {
						arr.push(left);
					}
				}

				return arr.splice(0, len).sort(function(a, b) {
					return a - b;
				});
			}
		},
		methods: {
			goTo: function goTo(page) {
				if (this.func) {
					this.func(page);
				}
				this.$emit("input", page);
			},
			first: function first() {
				this.pe = 1;
				this.goTo(this.pe);
			},
			previous: function previous() {
				this.pe = this.page - 1;

				if (this.pe < 1) {
					this.pe = 1;
				}
				this.goTo(this.pe);
			},
			set: function set(p) {
				this.pe = p;
				this.goTo(this.pe);
			},
			next: function next() {
				this.pe = this.page + 1;
				if (this.pe > this.ct) {
					this.pe = this.ct;
				}
				this.goTo(this.pe);
			},
			last: function last() {
				this.pe = this.ct;
				this.goTo(this.pe);
			}
		}
	};
</script>

<style scoped>
	/* 分页器 */
	.bar_pager,
	[class*=bar_pager_] {
		text-align: center;
		margin: auto;
	}

	.bar_pager a,
	[class*=bar_pager_] a {
		padding: 0 .5rem;
		position: relative;
		z-index: 1;
		min-width: 2.25rem;
		white-space: nowrap;
		display: inline-block;
		height: 2rem;
		line-height: calc(2rem - 2px);
		color: #333;
		border: 1px solid rgba(125, 125, 125, 0.25);
		margin-left: -1px;
		text-align: center;
	}

	.bar_pager_sm a {
		height: 1.5rem;
		line-height: 1.5rem;
		min-width: 1.5rem;
		font-size: 0.85rem;
	}

	.bar_pager-x a {
		margin-left: .5rem;
		color: #333;
		border-radius: .25rem;
	}

	.bar_pager-x a:last-of-type {
		margin-right: 0;
	}

	.bar_pager a:first-child {
		border-top-left-radius: .25rem;
		border-bottom-left-radius: .25rem;
	}

	.bar_pager a:last-child {
		border-top-right-radius: .25rem;
		border-bottom-right-radius: .25rem;
	}

	.bar_pager-x .active {
		background: #38f;
		color: #fff;
	}

	.bar_pager a:hover,
	.bar_pager a:active {
		z-index: 2;
	}

	.bar_pager .active,
	[class*=bar_pager_] .active {
		background: #38f;
		color: #fff;
		border-color: #38f;
	}

	.bar_pager.group>a,
	[class*=bar_pager_].group>a {
		margin-left: -1px;
	}
</style>
