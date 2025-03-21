<template>
  <view class="div_article">
    <view class="title">{{ obj[vm.title] }}</view>
    <view class="aside">
      
      <navigator class="source_block" :url="obj[vm.url]">
        <text class="source">{{ obj[vm.source] }}</text>
      </navigator>
      <text class="time"><uni-tag :text="obj[vm.tag]"  type="success" inverted style="margin-right:20px;"></uni-tag>  {{ $toTime(obj[vm.create_time],"yyyy-MM-dd hh:mm:ss") }}</text>
    </view>
    <view class="desc">{{ obj[vm.description] }}</view>
    <!-- 文本内容 -->
    <rich-text class="rich_text" :nodes="$setRichTextImage(obj[vm.content])"></rich-text>
    <view class="doc">
      <view class="left_block">
		  
		  <view
		            @click="add_praise()"
		            v-if="$check_action('/praise/list', 'add') && !check_praised"
		            class="praise"
		          >
		            <text
		              class="icon_praise"
		              style="margin-right: 0.2rem"
		              size="14"
		            ></text>
		            <text>点赞</text>
		          </view>
		          <view
		            @click="add_praise()"
		            v-if="$check_action('/praise/list', 'del') && check_praised"
		            class="praise"
		          >
		            <text
		              class="icon_praise"
		              style="margin-right: 0.2rem"
		              size="14"
		            ></text>
		            <text>已点赞</text>
		          </view>
		          <view
		            @click="add_collect()"
		            v-if="$check_action('/collect/list', 'add') && !check_collected"
		            class="collect"
		          >
		            <uni-icons style="margin-right: 0.2rem" type="star" size="14"></uni-icons>
		            <text>收藏</text>
		          </view>
		          <view
		            @click="add_collect()"
		            v-if="$check_action('/collect/list', 'del') && check_collected"
		            class="collect"
		          >
		            <uni-icons
		              style="margin-right: 0.2rem"
		              type="star-filled"
		              size="14"
		            ></uni-icons>
		            <text>已收藏</text>
		          </view>
				  

      </view>
      <text class="see">
        <text v-if="obj[vm.hits] && obj[vm.hits] >= 0" style="padding-right: 1rem;">{{ obj[vm.hits] }}点击</text>
        <text v-if="obj[vm.praise_len] && obj[vm.praise_len] >= 0">{{ obj[vm.praise_len] }}点赞</text>
      </text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
      obj: {
        type: Object,
        default: function() {
          return {}
        }
      },
      vm: {
        type: Object,
        default: function() {
          return {
            img: "img",
            tag: "tag",
            url: "url",
            title: "title",
            source: "source",
            description: "description",
            content: "content",
            create_time: "create_time",
            hits: "hits",
            praise_len: "praise_len"
          }
        }
      },
    },
    data() {
      return {
        // 是否已点赞
        check_praised: false,
        // 是否已收藏
        check_collected: false
      }
    },
    methods: {
      /**
       * 获取点赞
       * @param {Object} obj
       */
      get_praise(obj) {
        var user_id = this.$store.state.user.user_id;
  
        this.$get("~/api/praise/count?", {
          source_table: "article",
          source_field: "article_id",
          source_id: obj["article_id"]
        }, (res) => {
  		  console.log(res)
          if (res.result || res.result === 0) {
            this.praise = res.result;
            console.log("点赞数：" ,res.result);
          }
          else if (res.error){
            this.$toast(res.error.message);
            console.error(res.error);
          }
        });
  
        this.$get("~/api/praise/count?", {
          source_table: "article",
          source_field: "article_id",
          source_id: obj["article_id"],
          user_id
        }, (res) => {
          if (res.result || res.result === 0) {
            this.check_praised = res.result ? true : false;
            console.log("点赞状态：" ,res.result);
          }
          else if (res.error){
            this.$toast(res.error.message);
            console.error(res.error);
          }
        })
      },
      // 添加点赞
      add_praise() {
        var body = {
          source_table: "article",
          source_field: "article_id",
          source_id: this.obj.article_id,
          user_id: this.$store.state.user.user_id
        }
        this.obj.praise_len = parseInt(this.obj.praise_len)
        let _this = this;
        if (!this.check_praised) {
          this.check_praised = true
          this.$post('~/api/praise/add?', body, (res) => {
            if (res.result) {
              _this.obj.praise_len += 1;
              let praise_len = _this.obj.praise_len;
              this.$post('~/api/article/set?article_id=' + _this.obj["article_id"], {
                praise_len
              }, (res) => {
                if(res.result){
                  console.log("添加点赞数状态：" ,res.result);
                }
                else if(res.error){
                  console.error(res.error);
                }
              });
              this.$toast("点赞成功");
            }
            else if (res.error) {
              this.$toast(res.error.message);
              console.error(res.error);
            }
          })
        } else {
          this.check_praised = false
          this.$get('~/api/praise/del', body, (res) => {
            if(res.result){
              _this.obj.praise_len -= 1;
              let praise_len = _this.obj.praise_len;
              this.$post('~/api/article/set?article_id=' + _this.obj["article_id"], {
                praise_len
              }, (res) => {
  				console.log(res)
                if(res.result){
                  console.log("取消点赞数状态：" ,res.result);
                }
                else if(res.error){
                  console.error(res.error);
                }
              });
              this.$toast("取消点赞");
            }
            else if (res.error){
              this.$toast(res.error.message);
              console.error(res.error);
            }
          })
        }
      },
      /**
       * 初始化收藏状态
       * @param {Object} obj
       */
      get_collect(obj) {
        var user_id = this.$store.state.user.user_id;
  
        var query = {
          source_table: "article",
          source_field: "article_id",
          source_id: obj["article_id"],
          user_id
        };
  
        this.$get('~/api/collect/count?', query, (res) => {
          console.log(res);
          if (res.result || res.result === 0) {
            var bl = res.result ? true : false;
            this.check_collected = bl;
            console.log("收藏状态：" + bl);
          }
          else if(res.error) {
            console.error(res.error);
          }
        });
      },
      // 添加收藏
      add_collect() {
        var {
          title,
          img,
          article_id
        } = this.obj
        var body = {
          title,
          img,
          source_table: "article",
          source_field: "article_id",
          source_id: article_id,
          user_id: this.$store.state.user.user_id
        }
        if (!this.check_collected) {
          this.check_collected = true
          this.$post('~/api/collect/add?', body, (res) => {
            this.$toast("收藏成功");
            console.log(res);
          })
        } else {
          this.check_collected = false
          this.$get('~/api/collect/del', body, (res) => {
            this.$toast("取消收藏");
          })
        }
      }
    },
    computed: {
      praise_len() {
        return this.obj.praise_len
      }
    },
    created() {
      setTimeout(() => {
        this.get_praise(this.obj);
        this.get_collect(this.obj);
      }, 1000);
    }
  }
</script>


<style scoped>
.float-right {
  float: right;
}

.div_article {
  padding: 1.5rem 1rem;
  overflow: hidden;
}

.aside {
  border: 1px solid #eee;
  border-radius: 5px;
  vertical-align: middle;
  margin: 0.625rem 0;
  padding: 0.625rem;
  font-size: 0.875rem;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0.3);
}

.aside .time {
  font-size: 0.5rem;
  color: #999;
}

.aside .source {
  font-size: 1.3rem;
  color: #576b95;
}


.tag {
  vertical-align: middle;
  margin-right: 0.5rem;
  padding: 0.1rem 0.25rem;
  font-size: 0.75rem;
  line-height: 1.67;
  border-radius: 0.125rem;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  max-width: 70%;
  font-style: normal;
  letter-spacing: normal;
  background: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.3);
}


.title {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}


.div_article .tag_block {
  font-size: 0.9rem;
  padding: 0.7rem 0;
}

.div_article .doc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777;
  padding-top: .5rem;
}

.div_article .left_block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.div_article .left_block>view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  font-size: 0.75rem;
  padding: .125rem 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid #DBDBDB;
}

.icon_praise {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: url("@/static/img/praise.png") no-repeat;
  background-size: 100% 100%;
}

.div_article .see {
  font-size: 0.6rem;
  margin-left: 1rem;
}
.rich_text{
  word-break: break-all;
}
</style>
