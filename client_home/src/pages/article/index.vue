<template>
  <view class="page_article" id="article_list">
    <template v-if="$check_action('/article/list', 'get')">
      <!-- 搜索栏 -->
      <uni-search-bar
        placeholder="搜索文章"
        @confirm="search"
        @cancel="cancel"
        cancelText="取消"
        @input="input($event, 'title')"
      >
        <uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
      </uni-search-bar>
	  <view style="padding: 10px;">
      <uni-data-select
        @change="searchType"
        v-model="query.type"
        :localdata="types"
      ></uni-data-select>
	  </view>
      <!-- 文章列表 -->
      <list_article
        style="background-color: #fff"
        :list="list"
        class="mb"
      ></list_article>
      <!-- /文章列表 -->
      <uni-pagination
        style="padding: 10px"
        title="分页器"
        show-icon="true"
        :total="count"
        :pageSize="query.size"
        :current="query.page"
        @change="page_change"
      ></uni-pagination>
    </template>
  </view>
</template>

<script>
import list_article from "@/components/diy/list_article.vue";
import bar_orderby from "@/components/diy/bar_orderby.vue";
import list_tab from "@/components/diy/list_tab.vue";
import mixin from "@/libs/mixins/page.js";

export default {
  mixins: [mixin],
  components: {
    list_article,
    bar_orderby,
    list_tab,
  },
  data() {
    return {
      url_get_list: "~/api/article/get_list?like=0",
      list: [],
      query: {
        title: "",
        page: 1,
        size: 4,
        type: "",
      },
      list_orderby: [
        {
          name: "点击量",
          direction: "",
          command_asc: "`hits` asc",
          command_desc: "`hits` desc",
        },
        {
          name: "日期",
          direction: "",
          command_asc: "`create_time` asc",
          command_desc: "`create_time` desc",
        },
      ],
      // 分类
      types: [{
        value: "",
        text: "全部"
      }],
    };
  },
  methods: {
    /**
     * 添加文章过滤
     */
    get_article_type() {
      this.$get(
        "~/api/article_type/get_list",
        {
          page: 1,
          size: 0,
        },
        (res) => {
          if (res.result) {
            let list = res.result.list;
            list.map((obj) => {
              this.types.push({
                value: obj.name,
                text: obj.name
              });
            });
            console.log(this.types);
          }
        }
      );
    },

    /**
     * 下拉商品筛选选择
     */
    filter_item(name) {
      if (name.name == "全部") {
        this.query = {
          page: 1,
          size: 4,
        };
        this.get_list();
      } else {
        this.query.type = name.name;
        this.search();
      }
    },
    input(e, key) {
      this.query[key] = e.value;
    },
    search() {
      this.query.page = 1;
      this.get_list();
    },
    searchType(v){
      this.query.type = v;
      this.query.page = 1;
      this.get_list();
    },
    cancel() {
      console.log("eer");
      this.query.title = "";
      this.search();
    },
    // 控制排序
    handleOrderby(o) {
      // console.log(o);
      // 取出对应的orderby

      // 重置其他排序的direction
      this.list_orderby.map((val) => {
        if (val.name !== o.text) {
          return (val.direction = "");
        }
      });

      // 找到对应的排序项，发送排序请求
      var obj_orderby = this.list_orderby.find((val) => val.name === o.text);
      if (o.direction === "") {
        this.query.orderby = "";
        this.search();
      } else if (o.direction === "up") {
        this.query.orderby = obj_orderby.command_desc;
        this.search();
      } else if (o.direction === "down") {
        this.query.orderby = obj_orderby.command_asc;
        this.search();
      }
    },
  },
  mounted() {
    this.get_article_type();
  },
};
</script>

<style scoped>
#article_list {
}

#article_list .pager {
  margin-top: 1rem;
}

#article_list .list_orderby {
  display: flex;
  justify-content: flex-end;
  background-color: #ffffff;
  border-top: 5px double #ccc;
  border-bottom: 5px double #ccc;
  margin-right: -1px;
}

#article_list .list_orderby .bar_orderby {
  border-left: 1px solid #ccc;
}
#article_list .warp_article {
  background-color: #fff;
}

#article_list .tab_view {
  background-color: #ffffff;
  margin: 0 auto;
}

#article_list .dropdown_article {
  line-height: 40px;
}
.article_page_down {
  padding-bottom: 60px;
}
</style>
