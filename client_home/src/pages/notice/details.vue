<template>
  <uni-card
    :title="obj.title"
    :extra="$toTime(obj.create_time, 'yyyy-MM-dd hh:mm:ss')"
    class="notice_details"
  >
    <rich-text style="word-break: break-all;" :nodes="$setRichTextImage(obj.content)"></rich-text>
  </uni-card>
</template>

<script>
import mixin from "@/libs/mixins/page.js";

export default {
  mixins: [mixin],
  data() {
    return {
      url_get_obj: "~/api/notice/get_obj?",
      field: "notice_id",
      query: {
        notice_id: 0,
      },
      href: "https://uniapp.dcloud.io/component/README?id=uniui",
      obj: {
        title: "标题",
        create_time: "时间",
        content: "文本",
      },
    };
  },
  methods: {
    get_obj_after(json) {
      console.log(JSON.stringify(json));
    },
  },
};
</script>

<style>

</style>
