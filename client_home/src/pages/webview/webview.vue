<template>
  <view>
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    };
  },
  onLoad(item) {
    this.url = item.url
  }
}
</script>

<style>
</style>
