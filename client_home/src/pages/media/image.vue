<template>
  <view class="page_media" id="media_image">
    <view class="image">
      <image :mode="mode" :src="src" @error="imageError"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      mode: "aspectFit",
    };
  },
  methods: {
    imageError: function (e) {
      console.error("image发生error事件，携带值为" + e.detail.errMsg);
    },
  },
};
</script>

<style scoped>
#media_image {
  background: #000;
  height: calc(100vh - 2.75rem);
  position: relative;
  width: 100%;
}

#media_image .image-show {
  position: absolute;
  top: 50%;
  left: 0%;
  right: 0%;
  transform: translate(0, -50%);
}

#media_image .image-show image {
  width: 100%;
}
</style>
