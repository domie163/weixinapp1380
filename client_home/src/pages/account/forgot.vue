<template>
  <view class="container forgot_account">
    <view class="left-bottom-sign"></view>
    <view class="back-btn newicon icon-zuojiantou-up" @click="navBack"></view>
    <view class="right-top-sign"></view>
    <view class="wrapper">
      <view class="left-top-sign">FORGOT</view>
      <view class="welcome">找回密码！</view>
      <view class="input-content">
        <view class="input-item">
          <text class="tit">用户名</text>
          <input
            type="text"
            v-model="form.username"
            placeholder="请输入用户名"
            maxlength="11"
            data-key="username"
          />
        </view>
        <view class="input-item">
          <text class="tit">密码</text>
          <input
            type="password"
            v-model="form.password"
            placeholder="6-18位不含特殊字符的数字、字母组合"
            placeholder-class="input-empty"
            maxlength="20"
            password
            data-key="password"
          />
        </view>
        <view class="input-item">
          <text class="tit">确认密码</text>
          <input
            type="password"
            v-model="form.confirm_password"
            placeholder="6-18位不含特殊字符的数字、字母组合"
            placeholder-class="input-empty"
            maxlength="20"
            password
            data-key="password"
          />
        </view>
        <view class="input-item">
          <text class="tit">邮箱</text>
          <input
            type="text"
            v-model="form.email"
            placeholder="请输入邮箱"
          />
        </view>
        <view class="input-item">
          <text class="tit">验证码</text>
          <input
            style="width: 50%"
            type="text"
            v-model="form.code"
            placeholder="请输入验证码"
            maxlength="10"
          />
          <button
            class="btn_send"
            type="primary"
            style="width: 40%; margin: 0 10px"
            size="mini"
            @click="get_code()"
          >
            发送
          </button>
        </view>
      </view>
      <button class="confirm-btn" @click="forgot" :disabled="logining">
        找回密码
      </button>
      <!-- <view class="forget-section">
        <navigator url="./forgot">忘记密码?</navigator>
      </view> -->
    </view>
    <view class="register-section">
      还没有账号?<navigator url="./register" class="text">立即注册</navigator>
    </view>
  </view>
</template>


<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        code: "",
      },
      confirm_password: "",
      rules: {
        username: {
          rules: [
            {
              required: true,
              errorMessage: "请输入用户名",
            },
            {
              minLength: 5,
              maxLength: 16,
              errorMessage: "用户名长度在 {minLength} 到 {maxLength} 个字符",
            },
          ],
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: "请输入密码",
            },
            {
              minLength: 5,
              maxLength: 16,
              errorMessage: "密码长度在 {minLength} 到 {maxLength} 个字符",
            },
          ],
        },
        confirm_password: {
          rules: [
            {
              required: true,
              errorMessage: "请输入确认密码",
            },
            {
              minLength: 5,
              maxLength: 16,
              errorMessage: "确认密码长度在 {minLength} 到 {maxLength} 个字符",
            },
          ],
        },
        code: {
          rules: [
            {
              required: true,
              errorMessage: "请输入验证码",
            },
            {
              minLength: 1,
              maxLength: 4,
              errorMessage: "验证码长度为{maxLength} 个字符",
            },
          ],
        },
        email: {
          rules: [
            {
              format: "email",
              errorMessage: "请输入正确的邮箱地址",
            },
          ],
        },
      },
    };
  },
  onLoad() {},
  onReady() {},
  methods: {
    get_code() {
      var random = Math.floor(Math.random() * 9999);
      for (var i = random.length; i < 4; i++) {
        random = "0" + random;
      }
      this.form.code = random.toString();
    },
    /**
     * 忘记密码
     * @param {Object} form
     */
    forgot() {
      var form = Object.assign({}, this.form);
      // this.$refs["form"]
      //   .submit()
      //   .then((res) => {
          this.$post("~/api/user/forget_password?", form, (res) => {
            if (res.result) {
              var url = this.$redirect();
              this.$nav(url);
            } else if (res.error) {
              this.$toast(res.error.message, "error");
            }
          });
        // })
        // .catch((errors) => {
        //   console.error("提交失败：", errors);
        // });
    },
    /**
     * 手动重置表单
     */
    resetForm() {
      this.$refs.form.resetFields();
    },
    navBack() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss">
page {
  background: #fff;
}

.container {
  padding-top: 120upx;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #fff;
  box-sizing: border-box;
}

.wrapper {
  position: relative;
  z-index: 90;
  background: #fff;
  padding-bottom: 40upx;
}

.back-btn {
  position: absolute;
  left: 40upx;
  z-index: 9999;
  padding-top: var(--status-bar-height);
  top: 40upx;
  font-size: 40upx;
  color: $font-color-dark;
}

.left-top-sign {
  font-size: 120upx;
  color: $page-color-base;
  position: relative;
  left: -16upx;
}

.right-top-sign {
  position: absolute;
  top: 80upx;
  right: -30upx;
  z-index: 95;

  &:before,
  &:after {
    display: block;
    content: "";
    width: 400upx;
    height: 80upx;
    background: #b4f3e2;
  }

  &:before {
    transform: rotate(50deg);
    border-radius: 0 50px 0 0;
  }

  &:after {
    position: absolute;
    right: -198upx;
    top: 0;
    transform: rotate(-50deg);
    border-radius: 50px 0 0 0;
    /* background: pink; */
  }
}

.left-bottom-sign {
  position: absolute;
  left: -270upx;
  bottom: -320upx;
  border: 100upx solid #d0d1fd;
  border-radius: 50%;
  padding: 180upx;
  z-index: 99;
}

.welcome {
  position: relative;
  left: 50upx;
  top: -90upx;
  font-size: 46upx;
  color: #555;
  text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}

.input-content {
  padding: 0 60upx;
  max-height: 580upx;
  overflow-y: auto;
}

.input-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30upx;
  background: $page-color-light;
  min-height: 80upx;
  border-radius: 4px;
  margin-bottom: 20upx;

  &:last-child {
    margin-bottom: 0;
  }

  .tit {
    width: 150upx;
    height: 50upx;
    margin-right: 20upx;
    text-align: justify;
    text-align-last: justify;
    line-height: 50upx;
    font-size: $font-sm + 2upx;
    color: $font-color-base;
  }

  input,
  .flex_sb {
    height: 60upx;
    font-size: $font-base + 2upx;
    color: $font-color-dark;
    width: 100%;
  }
}

.confirm-btn {
  width: 630upx;
  height: 76upx;
  line-height: 76upx;
  border-radius: 50px;
  margin-top: 70upx;
  background: $uni-color-primary;
  color: #fff;
  font-size: $font-lg;

  &:after {
    border-radius: 100px;
  }
}

.forget-section {
  font-size: $font-sm + 2upx;
  color: $font-color-spec;
  text-align: center;
  margin-top: 40upx;
}

.register-section {
  position: absolute;
  left: 0;
  bottom: 50upx;
  width: 100%;
  font-size: $font-sm + 2upx;
  color: $font-color-base;
  text-align: center;
  z-index: 999;

  .text {
    display: inline-block;
    color: $font-color-spec;
    margin-left: 10upx;
  }
}
</style>

