<template>
  <view class="page_media" id="media_music">
    <!-- 音乐模块(开始) -->

    <view class="audio">
      <audio
        style="text-align: left"
        :src="current.src"
        :poster="current.poster"
        :name="current.name"
        :author="current.author"
        :action="audioAction"
        controls
      ></audio>
    </view>
    <!-- 音乐模块(结束) -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: {
        poster:
          "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png",
        name: "致爱丽丝",
        author: "暂无",
        src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
      },
      audioAction: {
        method: "pause",
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>
