<template>
  <view class="page_user" id="user_info">
    <!-- 信息修改模块(开始) -->

    <view class="">
      <view class="item_info">
        <view class="flex_box">
          <view>
            <text>头像</text>
          </view>
          <view class="right_wrap">
            <image
              style="width: 3rem; height: 3rem"
              :src="$fullImgUrl(user.avatar)"
              mode="scaleToFill"
            ></image>
          </view>
        </view>
      </view>
      <view class="item_info" style="margin-bottom: 5rem">
        <view class="flex_box" style="position: relative">
          <view>
            <text>昵称</text>
          </view>
          <view class="right_wrap" :style="'display:' + display_name + ';'">
            <text style="font-size: 1.2rem; color: var(--color_grey)">{{
              user.nickname
            }}</text>
          </view>

          <view
            class="input_nickname"
            :style="'display:' + display_input + ';'"
          >
            <view class="btn_save" @click="save_nickname()">保存</view>
            <uni-easyinput
              type="text"
              id="nickname"
              v-model="form.nickname"
              :focus="focus_input"
            />
          </view>
        </view>
      </view>
      <view @click="change_avatar()" class="item_info">
        <view class="flex_box" style="height: 1rem; font-size: 0.8rem">
          <view>
            <text>修改头像</text>
          </view>
          <view class="right_wrap">
            <uni-icons class="forward" type="forward" size="20"></uni-icons>
          </view>
        </view>
      </view>
      <view @click="change_nickname()" class="item_info">
        <view class="flex_box" style="height: 1rem; font-size: 0.8rem">
          <view>
            <text>修改昵称</text>
          </view>
          <view class="right_wrap">
            <uni-icons class="forward" type="forward" size="20"></uni-icons>
          </view>
        </view>
      </view>
      <navigator url="./password" class="item_info">
        <view class="flex_box" style="height: 1rem; font-size: 0.8rem">
          <view>
            <text>修改密码</text>
          </view>
          <view class="right_wrap">
            <uni-icons class="forward" type="forward" size="20"></uni-icons>
          </view>
        </view>
      </navigator>
    </view>

    <!-- 信息修改模块(结束) --></view
  >
</template>

<script>
import mixin from "@/libs/mixins/page.js";
export default {
  mixins: [mixin],
  data() {
    return {
      // 登录权限
      oauth: {
        signIn: true,
        user_group: [],
      },
      href: "https://uniapp.dcloud.io/component/README?id=uniui",
      // 输入框是否隐藏
      display_input: "none",
      display_name: "block",
      // 输入聚焦
      focus_input: false,
      // 有昵称的表格对象
      form: {},
    };
  },
  methods: {
    change_avatar() {
      var _self = this;
      // 选择图像方法
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: function(res) {
          const tempFilePaths = res.tempFilePaths;
          const uploadTask = uni.uploadFile({
            url: _self.$fullUrl('/api/user/upload?'),
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              'x-auth-token': _self.$store.state.user.token
            },
            formData: {},
            success: function(uploadFileRes) {
              var filename = JSON.parse(uploadFileRes.data).result.url
              console.log(filename)
              // 改用户表中的头像
              // var avatar = filename
              var avatar = JSON.parse(uploadFileRes.data).result.url;
              _self.$post('~/api/user/set?user_id=' + _self.user.user_id, {
                avatar
              }, res => {
                console.log(res);
                _self.user.avatar = filename
              })
            }
          });

          uploadTask.onProgressUpdate(function(res) {
            _self.percent = res.progress;
            console.log('上传进度' + res.progress);
            console.log('已经上传的数据长度' + res.totalBytesSent);
            console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
          });
        },
        error: function(e) {
          console.log(e);
        }
      });
    },
    // 跳出修改昵称输入框
    change_nickname() {
      this.display_input = "flex";
      this.display_name = "none";
      this.focus_input = true;
    },
    // 保存昵称修改
    save_nickname() {
      var user = this.user;
      var nickname = this.form.nickname;
      this.$post(
        "~/api/user/set?user_id=" + user.user_id,
        {
          nickname,
        },
        (res) => {
          console.log(res);
          this.focus_input = false;
          this.display_input = "none";
          this.display_name = "block";
          this.user.nickname = nickname;
        }
      );
    },
  },
};
</script>

<style>
.page_user {
}

.item_info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 0.8rem;
  border-bottom: 1px solid #eee;
  background-color: #fff;
}

.flex_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 2rem;
}

.right_wrap {
  overflow: hidden;
}

.forward {
  width: 10%;
  color: #dbdbdb !important;
}

.input_nickname {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  display: flex;
  align-items: center;
  width: 10rem;
}

.input_nickname #nickname {
  width: 100%;
  border-bottom: 1px solid #000;
}

.input_nickname .btn_save {
  width: 4rem;
  text-align: center;
  height: 1.5rem;
  line-height: 1.5rem;
  border: 1px solid var(--color_grey);
  border-radius: 5px;
  margin-right: 4px;
}
</style>
