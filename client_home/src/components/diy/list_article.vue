<template>
  <view class="list row">
    <navigator
      v-for="(o, i) in list"
      :key="i"
      class="item"
      :url="'/pages/article/details?' + vm.article_id + '=' + o[vm.article_id]"
    >
      <image
        class="image"
        :style="{ width: img_width, height: img_width }"
        :src="$fullImgUrl(o[vm.img])"
        mode="scaleToFill"
      >
      </image>
      <view class="right_block">
        <view class="top_info">
          {{ o[vm.title] }}
        </view>
        <view class="mid_info">{{
          $toTime(o[vm.create_time], "yyyy-MM-dd hh:mm:ss")
        }}</view>
        <view class="bottom_info">
          <text class="praise">{{ o[vm.praise_len] }}点赞</text>
          <text class="see"> {{ o[vm.hits] }}点击 </text>
        </view>
      </view>
    </navigator>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    vm: {
      type: Object,
      default: function () {
        return {
          img: "img",
          article_id: "article_id",
          title: "title",
          description: "description",
          title: "title",
          create_time: "create_time",
          content: "content",
          praise_len: "praise_len",
          hits: "hits",
        };
      },
    },
    img_width: {
      type: String,
      default: "5rem",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.list {
  .item {
    display: flex;
    padding: 0.5rem;
    .image {
      margin-right: 1rem;
      &:hover {
        transform: rotateY(360deg);
        transition: all 0.5s ease-in-out;
      }
    }
    .right_block {
      flex: 1;
      display: flex;
      flex-direction: column;
	  line-height: normal;
      .top_info {
        flex: 1;
        font-size: 0.8rem;
        color: $uni-text-color;
      }
      .mid_info {
		  flex: 1;
        font-size: 0.5rem;
        color: $uni-text-color-grey;
      }
      .bottom_info {
		flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: 0.5rem;
        color: $uni-text-color-grey;
      }
    }
  }
}
</style>
