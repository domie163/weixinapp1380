<template>
  <view id="home" class="home--new">
    <!-- 广告模块(开始) -->
    <view>
      <list_ad :list="list_ad" location="店招"></list_ad>
    </view>
    <!-- 广告模块(结束) -->

    <!-- 轮播图模块(开始) -->
    <view class="swiper">
      <Slide :list="list_slide" />
    </view>
    <!-- 轮播图模块(结束) -->

    <!-- 菜单模块(开始) -->
    <view class="menu">
      <list_menu :list="list_menu"></list_menu>
    </view>
    <!-- 菜单模块(结束) -->

    <!-- 公告模块(开始) -->
    <view class="notice">
      <navigator url="/pages/notice/list">
        <Notice :list="list_notice" />

      </navigator>
    </view>
    <!-- 公告模块(结束) -->

    <!-- 广告模块(开始) -->
    <view>
      <list_ad :list="list_ad" location="顶部广告"></list_ad>
    </view>
    <!-- 广告模块(结束) -->

	<!-- 停车资讯模块(开始) -->
    <Card
      title="停车资讯"
      url="/pages/article/list"
      :list="list_article"
      v-if="$check_action('/article/list', 'get')"
      class="article_list"
    >
      <list_article :list="list_article"></list_article>
    </Card>
	<!-- 停车资讯模块(结束) -->



    <!-- 广告模块(开始) -->
    <view>
      <list_ad :list="list_ad" location="中部广告"></list_ad>
    </view>
    <!-- 广告模块(结束) -->


				<!-- 推荐共享车位模块(开始) -->
    <Card
      class="list_diy"
      title="共享车位推荐"
      url="/pages/shared_parking_spaces/list"
      :list="list_article"
      v-if="$check_action('/shared_parking_spaces/list', 'get')"
    >
	  <list_shared_parking_spaces :list="list_shared_parking_spaces"></list_shared_parking_spaces>

    </Card>
    <!-- 推荐共享车位模块(结束) -->
							

    <!-- 广告模块(开始) -->
    <view>
      <list_ad :list="list_ad" location="底部广告"></list_ad>
    </view>
    <!-- 广告模块(结束) -->

    <!-- 链接模块(开始) -->
    <!-- <view>
      <list_link :list="list_link"></list_link>
    </view> -->
    <!-- 链接模块(结束) -->

    <!-- 版权模块(开始) -->
    <view class="copyright">
      <text>@版权归属 XX 所有</text>
    </view>
    <!-- 版权模块(结束) -->


  </view>
</template>

<script>


				import list_shared_parking_spaces from "@/components/diy/list_shared_parking_spaces.vue";
							import Card from "@/components/common/card.vue";
import bar_title from "@/components/diy/bar_title.vue";
import list_menu from "@/components/diy/list_menu.vue";
import list_ad from "@/components/diy/list_ad.vue";
	import list_article from "@/components/diy/list_article.vue";
import list_link from "@/components/diy/list_link.vue";
import Slide from "@/components/common/slide.vue";
import Notice from "@/components/common/notice.vue";


import mixin from "@/libs/mixins/page.js";
export default {
  mixins: [mixin],
  components: {
					list_shared_parking_spaces,
							    Card,
    bar_title,
	list_ad,
    list_menu,
			list_article,
    list_link,
    Slide,
    Notice,
  },
  data() {
    return {
      isSmall: false,
      sendValue: "",
      chatList: [],
      showChat: false,
      isAdmin: false,
      token: "",
      scrollTop: 0,
      oldScrollTop: 0,

      str: "<div>测试一下</div>",
							list_shared_parking_spaces: [],
							      list_ad: [],
      list_slide: [],
	  list_article: [],
      list_menu: [],
      list_link: [],
      list_notice: [],
    };
  },
  methods: {
    // toggle
    toToggle() {
      this.isAdmin = !this.isAdmin;
    },

					/**
		*  获取共享车位
		*/
		get_shared_parking_spaces() {
			let url = "~/api/shared_parking_spaces/get_list?";
									
			this.$get(url, {
											}, (json) => {
					if (json.result && json.result.list) {
					console.log("共享车位" ,json.result.list);
					this.list_shared_parking_spaces = json.result.list;
											this.list_shared_parking_spaces.map((o)=>{
							o["praise_len"];
						});
						this.get_praise(this.list_shared_parking_spaces ,"shared_parking_spaces" ,"42456");
									}
			});
		},
    						
    /**
     * 当前年月日时分秒方法
     * @param {Object} fmt
     */
    dateFormat(fmt) {
      var myDate = new Date();
      var o = {
        "M+": myDate.getMonth() + 1, // 月份
        "d+": myDate.getDate(), // 日
        "h+": myDate.getHours(), // 小时
        "m+": myDate.getMinutes(), // 分
        "s+": myDate.getSeconds(), // 秒
        "q+": Math.floor((myDate.getMonth() + 3) / 3), // 季度
        S: myDate.getMilliseconds(), // 毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (myDate.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },

    /**
     *  获取轮播图
     */
    get_slides() {
      this.$get("~/api/slides/get_list?", {}, (json) => {
        if (json.result && json.result.list) {
          console.log("轮播图", json.result.list);
          this.list_slide = json.result.list;
          this.list_slide.map((o) => {
            o["praise_len"];
          });
          this.get_praise(this.list_slides, "slides", "slides_id");
        }
      });
    },

    /**
     *  获取导航栏
     */
    get_menu() {
      var user_group = this.$store.state.user.user_group;
      console.log(user_group,6666)
      this.$get(
        "~/api/auth/get_list?",
        { size: "0", get: "", user_group, get: 1, position: "top" },
        (json) => {
          if (json.result && json.result.list) {
            this.list_menu = json.result.list;
            this.list_menu.map((o) => {
              o["praise_len"];
            });
            this.get_praise(this.list_auth, "auth", "auth_id");
          }
        }
      );
    },

    /**
     *  获取文章
     */
    get_article() {
      this.$get("~/api/article/get_list?", { page: 1, size: 5 }, (json) => {
        console.log(json, 5666);
        if (json.result && json.result.list) {
          console.log("文章", json.result.list);
          this.list_article = json.result.list;
          this.list_article.map((o) => {
            o["praise_len"];
          });
          this.get_praise(this.list_article, "article", "article_id");
        }
      });
    },

    /**
     *  获取广告
     */
    get_ad() {
      this.$get("~/api/ad/get_list?", { page: 1, size: 5 }, (json) => {
        if (json.result && json.result.list) {
          console.log("广告", json.result.list);
          this.list_ad = json.result.list;
          this.list_ad.map((o) => {
            o["praise_len"];
          });
          this.get_praise(this.list_ad, "ad", "ad_id");
        }
      });
    },



    /**
     *  获取链接列表
     */
    get_link() {
      this.$get("~/api/link/get_list?", { page: 1, size: 3 }, (json) => {
        if (json.result && json.result.list) {
          console.log("链接", json.result.list);
          this.list_link = json.result.list;
          this.list_link.map((o) => {
            o["praise_len"];
          });
          this.get_praise(this.list_link, "link", "link_id");
        }
      });
    },

    /**
     *  获取公告列表
     */
    get_notice() {
      this.$get("~/api/notice/get_list?", { page: 1, size: 3 }, (json) => {
        if (json.result && json.result.list) {
          console.log("公告", json.result.list);
          this.list_notice = json.result.list;
          this.list_notice.map((o) => {
            o["praise_len"];
          });
          this.get_praise(this.list_notice, "notice", "notice_id");
          console.log(this.list_notice);
        }
      });
    },

    /**
     *  获取点赞数
     *  @param {Object} list
     */
    get_praise(list, table, idName) {
      this.$get(
        "~/api/praise/count_group?source_table=" + table + "&groupby=source_id",
        {},
        (res) => {
          if (res.result) {
            res.result.map((o) => {
              for (let i = 0; i < list.length; i++) {
                let oj = list[i];
                if (oj[idName] === o["source_id"]) {
                  oj["praise_len"] = o["count"];
                  break;
                }
              }
            });
          } else if (res.error) {
            console.error(res.error);
          }
        }
      );
    },
  },
  onShow() {
    						this.get_shared_parking_spaces();
							    this.get_menu();
    this.get_slides();
			this.get_article();
    // this.get_link();
    this.get_notice();
    // this.get_ad();

    // this.get_praise();
  },
};
</script>
<style lang="scss" scoped>
	.support_icon {
		width: 50px;
		height: 50px;
		position: fixed;
		right: 0%;
		bottom: 10%;
		z-index: 9999;
	}
	  .support_module .container{
	    height: 64%;
	    width: 19.4rem;
	    border-radius: 4px;
	    border: 0.5px solid #e0e0e0;
	    background-color: #f5f5f5;
	    overflow: hidden;
	    position: fixed;
	    padding: 0;
	    margin-left: -9.7rem;
	    z-index: 99999999;
	    }
		.support_module	.small_css{
			height: 40px;
	    width: 200px;
	    right: -15px;
	    bottom: 0px;
		}
		.support_module	.big_css{
					top: 12%;
					left: 50%;
					}
	    .support_module .content{
	        width: calc(100% - 0px);
	        overflow-y: scroll;
					height: 64%;
					padding: 0 10px 10px 0;
	    }
			.support_module .content::-webkit-scrollbar{
		display: none
	}
	.support_module_title{
		text-align: right;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #ccc;

	}
	.support_module_title .title_btn{
		font-size: 20px;
		cursor: pointer;
		margin-right: 20px;
		color: #888;

	}
	    .support_module .content:hover::-webkit-scrollbar-thumb{
	        background:rgba(0,0,0,0.1);
	    }
	    .support_module .bubble{
	        max-width: 182px;
	        padding: 10px;
	        border-radius: 5px;
	        position: relative;
	        color: #000;
	        word-wrap:break-word;
	        word-break:normal;
					font-size: 12px;
	    }
	    .support_module .item_left .bubble{
	        margin-left: 10px;
	        background-color: #fff;
	    }
	    .support_module .item_left .bubble:before{
	        content: "";
	        position: absolute;
	        width: 0;
	        height: 0;
	        border-left: 10px solid transparent;
	        border-top: 10px solid transparent;
	        border-right: 10px solid #fff;
	        border-bottom: 10px solid transparent;
	        left: -20px;
	    }
	    .support_module .item_right .bubble{
	        margin-right: 10px;
	        background-color: #9eea6a;
	    }
	    .support_module .item_right .bubble:before{
	        content: "";
	        position: absolute;
	        width: 0;
	        height: 0;
	        border-left: 10px solid #9eea6a;
	        border-top: 10px solid transparent;
	        border-right: 10px solid transparent;
	        border-bottom: 10px solid transparent;
					left: none;

					        right: -20px;
	    }
	    .support_module .item{
	        margin-top: 15px;
	        display: flex;
	        width: 100%;
	    }
	    .support_module .item.item_right{
	        justify-content: flex-end;
	    }
	    .support_module .item.item-center{
	        justify-content: center;
	    }
	    .support_module .item.item-center span{
	        font-size: 12px;
	        padding: 2px 4px;
	        color: #fff;
	        background-color: #dadada;
	        border-radius: 3px;
	        -moz-user-select:none; /*火狐*/
	        -webkit-user-select:none; /*webkit浏览器*/
	        -ms-user-select:none; /*IE10*/
	        -khtml-user-select:none; /*早期浏览器*/
	        user-select:none;
	    }

	    .support_module .avatar image{
	        width: 42px;
	        height: 42px;
	        border-radius: 50%;
	    }
	    .support_module .input-area{
	        border-top:0.5px solid #e0e0e0;
	        height: 15%;
	        background-color: #fff;
	    }
	    .support_module textarea{
	        flex: 1;
	        padding: 10px;
	        font-size: 12px;
	        border: none;
	        overflow-y: auto;
	        overflow-x: hidden;
	        outline:none;
	        resize:none;
					width: 102%;
					height: 100%;
					min-height: 100%;
					max-height: 100%;
					box-sizing: border-box;
	    }
	    .support_module .button-area{
	      display: flex;
	    height: 50px;
	    line-height: 50px;
	    padding: 5px;
	    justify-content: flex-end;
	    text-align: right;
	    width: 100%;
			background: #fff;
	    }
	    .support_module .button-area .send-btn{
	           width: 80px;
	    height: 28px;
	    line-height: 28px;
	    border: none;
	    outline: none;
	    border-radius: 4px;
	    float: right;
	    cursor: pointer;
	    background: #9eea6a;
	    font-size: 12px;
	    color: #333;
	    margin: 0px;
	    text-align: center;
	    }
</style>

