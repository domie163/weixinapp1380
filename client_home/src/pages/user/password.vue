<template>
  <view class="page_user" id="user_password">
    <!-- 修改密码模块(开始) -->

    <view class="">
      <!-- 修改密码模块(结束) -->
      <uni-forms
        :rules="rules"
        :value="form"
        ref="form"
        validate-trigger="bind"
        err-show-type="undertext"
      >
        <group title="" top="0">
          <uni-forms-item name="o_password" required label="原密码">
            <uni-easyinput
              type="password"
              :inputBorder="true"
              v-model="form.o_password"
              placeholder="请输入原密码"
            ></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item name="password" required label="密码">
            <uni-easyinput
              type="password"
              :inputBorder="true"
              v-model="form.password"
              placeholder="请输入新密码"
            ></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item name="confirm_password" required label="确认密码">
            <uni-easyinput
              type="password"
              :inputBorder="true"
              v-model="confirm_password"
              placeholder="请再次输入密码"
            ></uni-easyinput>
          </uni-forms-item>
        </group>
      </uni-forms>
    </view>

    <view class="">
      <view class="btns">
        <button class="button" @click="change_password()">登录</button>
      </view>
    </view>
  </view>
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
      form: {
        o_password: "",
        password: "",
      },
      confirm_password: "",
      rules: {
        o_password: {
          rules: [
            {
              required: true,
              errorMessage: "请输入原密码",
            },
            {
              minLength: 5,
              maxLength: 16,
              errorMessage: "密码长度在 {minLength} 到 {maxLength} 个字符",
            },
          ],
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: "请输入修改密码",
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
      },
    };
  },
  methods: {
    change_password() {
      var form = this.form;
      if (form.password !== this.confirm_password) {
        this.$toast("密码不相同", "error");
        return;
      }
      this.$refs["form"].submit().then((res) => {
        this.$post("~/api/user/change_password?", form, (res) => {
          if (res.result) {
            this.$nav("/pages/index/index");
          } else if (res.error) {
            this.$toast(res.error.message, "error");
          }
        });
      });
    },
  },
};
</script>

<style scoped>
</style>
