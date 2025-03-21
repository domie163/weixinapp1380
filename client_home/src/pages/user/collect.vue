<template>
  <view class="page_user" id="user_collect">
    <!-- 筛选模块(开始) -->

    <view class="">
      <!-- 搜索栏 -->
      <uni-search-bar
        placeholder="搜索"
        @confirm="search"
        @cancel="cancel"
        cancelText="取消"
        @input="input($event, 'title')"
      >
        <uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
      </uni-search-bar>
    </view>

    <!-- 筛选模块(结束) -->
    <!-- 收藏列表模块(开始) -->

    <view class="">
      <list_collect :list="list"></list_collect>
    </view>

    <!-- 收藏列表模块(结束) -->
  </view>
</template>

<script>
import list_collect from "@/components/diy/list_collect.vue";
import mixin from "@/libs/mixins/page.js";

export default {
  mixins: [mixin],
  components: {
    list_collect,
  },
  data() {
    return {
      // 登录权限
      oauth: {
        signIn: true,
        user_group: [],
      },
      url_get_list: "~/api/collect/get_list?",
      query: {
        user_id: 0,
      },
      list: [],
      type_names: [
        {
          name: "全部",
          value: 0,
        },
        {
          name: "文章",
          value: "article",
        },
        {
          name: "商品",
          value: "goods",
        },
        {
          name: "论坛",
          value: "forum",
        },
      ],
      filter_title: "排序",
    };
  },
  methods: {
    /**
     * 下拉收藏选择
     */
    filter_item(o) {
      this.query.source_table = o.name.value;
      this.search();
    },
    get_list_before(param) {
      param.user_id = this.user.user_id;
      return param;
    },
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
.top_handle {
  position: relative;
  height: 2.6rem;
  width: 100%;
}

.dropdown_box {
  width: 100%;
  display: flex;
  position: absolute;
  z-index: 1000;
}

.dropdown_box > * {
  flex: 1;
}

.dropdown_collect {
  line-height: 40px;
}
</style>
