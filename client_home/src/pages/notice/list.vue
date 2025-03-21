<template>
  <view class="page_notice" id="notice_list">
    <!-- 公告细节模块(开始) -->

    <!-- 搜索栏 -->
    <uni-search-bar
      placeholder="搜索标题"
      @confirm="search"
      @cancel="cancel"
      cancelText="取消"
      @input="input($event, 'title')"
    >
      <uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
    </uni-search-bar>
    
    <!-- /搜索栏 -->
    <uni-list>
      <uni-list-item
        v-for="(o, i) in list"
        :title="o.title"
        :key="i"
        :to="'./details?notice_id=' + o.notice_id"
        :rightText="$toTime(o.create_time, 'yyyy-MM-dd hh:mm:ss')"
      >
      </uni-list-item>
    </uni-list>

    <uni-pagination
      style="padding: 10px"
      title="分页器"
      show-icon="true"
      :total="count"
      :pageSize="query.size"
      :current="query.page"
      @change="page_change"
    ></uni-pagination>

    <!-- 公告细节模块(结束) -->
  </view>
</template>

<script>
import mixin from "@/libs/mixins/page.js";

export default {
  mixins: [mixin],
  data() {
    return {
      url_get_list: "~/api/notice/get_list?like=0",
      list: [],
      query: {
        title: "",
        page: 1,
        size: 10,
      },
      count: 50,
    };
  },
  methods: {
    page_change(e) {
      console.log(e);
    },
    search() {
      this.query.page = 1;
      this.get_list();
    },
    cancel() {
      this.title = "";
      this.search();
    },
    input(e, key) {
      this.query[key] = e.value;
    },
  },
};
</script>

<style scoped>
.pager {
  margin-top: 1rem;
}
</style>
