<template>
  <uni-card padding="10px 0">
    <!-- <template v-slot:title> -->
      <view class="card-title">
        <text>{{ title }}</text>
        <navigator :url="url" v-if="url" class="more"> 更多 </navigator>
      </view>
    <!-- </template> -->
    <slot></slot>
  </uni-card>
</template>
<script>
export default {
  name: "CardList",
  props: {
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding: 10px;
  border-bottom: 1px solid $uni-border-color;
  color:  $uni-text-color;
  .more {
    color: $uni-color-primary;
    font-size: 14px;
  }
}
</style>