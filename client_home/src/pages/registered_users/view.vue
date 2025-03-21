<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">
              <uni-forms-item label="头像" name="avatar">
                <view class="diy_field diy_img" v-if="form_user['avatar']">
                  <image :src="$fullUrl(form_user['avatar'])" @click="change_avatar()" />
                </view>
                <view class="diy_field diy_img" v-else-if="!form_user['avatar']">
                  <view class="btn_add_img" @click="change_avatar()">
                    <text>+</text>
                  </view>
                </view>
                <uni-icons style="display: none;" class="forward" type="forward" id="form_user_img_avatar"></uni-icons>
              </uni-forms-item>

              <uni-forms-item label="账号" name="username">
                <span v-if="obj_user.username">{{obj_user.username}}</span>
                <uni-easyinput v-else type="text" v-model="form_user.username" placeholder="请输入账号" />
              </uni-forms-item>

              <uni-forms-item label="密码" name="password">
                <span v-if="obj_user.password">{{obj_user.password}}</span>
                <uni-easyinput v-else type="password" v-model="form_user.password" placeholder="请输入密码" />
              </uni-forms-item>

              <uni-forms-item label="昵称" name="nickname">
                <uni-easyinput type="text" v-model="form_user.nickname" placeholder="请输入昵称" />
              </uni-forms-item>

              <uni-forms-item label="手机号码" name="phone">
                <uni-easyinput type="number" v-model="form_user.phone" placeholder="请输入手机号码" />
              </uni-forms-item>

              <uni-forms-item label="邮箱" name="email">
                <uni-easyinput type="text" v-model="form_user.email" placeholder="请输入邮箱" />
              </uni-forms-item>

              <uni-forms-item label="手机认证" name="phone_state">
                <uni-data-select
                    v-model="form_user.phone_state"
                    :localdata="list_state"
                ></uni-data-select>
              </uni-forms-item>

              <uni-forms-item label="邮箱认证" name="email_state">
                <uni-data-select
                    v-model="form_user.email_state"
                    :localdata="list_state"
                ></uni-data-select>
              </uni-forms-item>

              <uni-forms-item label="状态" name="state">
                <uni-data-select
                    v-model="form_user.state"
                    :localdata="list_user_state"
                ></uni-data-select>
              </uni-forms-item>

              <uni-forms-item v-if="$check_field('get','user_name') || ($check_field('add','user_name') || $check_field('set','user_name'))" label="用户姓名" name="user_name">
                            <uni-easyinput type="text" v-model="form['user_name']" v-if="user_group === '管理员' || (form['registered_users_id'] && $check_field('set','user_name')) || (!form['registered_users_id'] && $check_field('add','user_name'))" :disabled="disabledObj['user_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','user_name')">
                  {{ form['user_name'] }}
                </text>
                          </uni-forms-item>


            </uni-forms>
            <view class="form_button">
              <button size="mini" type="primary" @click="submit()" class="primary_btn">提交</button>
              <button size="mini" @click="cancel()">取消</button>
            </view>
          </view>
        </view>
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
      field_user: "user_id",
      url_add_user: "~/api/user/register?",
      url_set_user: "~/api/user/set?",
      url_get_obj_user: "~/api/user/get_obj?",
      url_upload_user: "~/api/user/upload?",
      form_user:{
        user_id: 0,
        username: '',
        nickname: '',
        password: '',
        avatar: '',
        phone: '',
        email: '',
        user_group: "注册用户",
        phone_state: 0,
        email_state: 0,
        state: 1
      },
      obj_user: {
        user_id: 0,
        username: '',
        nickname: '',
        password: '',
        avatar: '',
        phone: '',
        email: '',
        user_group: "注册用户",
        phone_state: 0,
        email_state: 0,
        state: 1
      },
      query_user: {
        "user_id": 0,
      },
      list_state: [{value:0,text:"未认证"},{value:1,text:"审核中"},{value:2,text:"已认证"}],

      list_user_state: [{value: 1,text: "可用"},{value: 2,text: "异常"},{value: 3,text: "已冻结"},{value: 4,text: "已注销"}],
      group_table: "registered_users",
      is_password: true,
      field: "registered_users_id",
      url_add: "~/api/registered_users/add?",
      url_set: "~/api/registered_users/set?",
      url_get_obj: "~/api/registered_users/get_obj?",
      url_upload: "~/api/registered_users/upload?",

      query: {
        "registered_users_id": 0,
      },

      form: {
            "user_name":  '', // 用户姓名
                                "user_id": 0,
                "registered_users_id": 0, // ID
                
              },
          disabledObj:{
                        "user_name_isDisabled": false,
                                  },
                                          }
  },
  methods: {
    changeLog(v,value){
      this.form[value] = v
    },
    /**
     * 上传文件
     * @param {Object} param文件参数
     */
    change_file(key_name){
      var _self = this;
      // 选择图像方法
      uni.chooseFile({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: function(res) {
          const tempFilePaths = res.tempFilePaths;
          const uploadTask = uni.uploadFile({
            url: _self.$fullUrl('/api/registered_users/upload?'),
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'i_want_to_customize': 'test'
            },
            header: {
              'x-auth-token': _self.$store.state.user.token
            },
            success: function(uploadFileRes) {
              var filename = JSON.parse(uploadFileRes.data).result.url
              _self.form[key_name] = filename
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
    /**
     * 上传图片
     * @param {Object} param文件参数
     */
    change_img(key_name){
      var _self = this;
      _self.upload_img_flag = false
      // 选择图像方法
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: function(res) {
          const tempFilePaths = res.tempFilePaths;
          const uploadTask = uni.uploadFile({
            url: _self.$fullUrl('/api/registered_users/upload?'),
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'i_want_to_customize': 'test'
            },
            header: {
              'x-auth-token': _self.$store.state.user.token
            },
            success: function(uploadFileRes) {
              var filename = JSON.parse(uploadFileRes.data).result.url
              _self.form[key_name] = filename
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
    /**
     * 获取对象后获取缓存表单
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_before(param){
      var form = uni.db.get("form");
      if (form) {
        delete(form.examine_state)
        delete(form.examine_reply)
        this.obj = uni.push(this.obj ,form);
        this.form = uni.push(this.form ,form);
      }
      var arr = []
      for (let key in form) {
        arr.push(key)
      }
      for (var i=0;i<arr.length;i++){
        this.disabledObj[arr[i] + '_isDisabled'] = true
      }
              uni.db.del("form");
      return param;
    },
        
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
              let user_id = this.form.user_id;
      this.$get("~/api/user/get_obj?" ,{user_id} ,(res)=>{
        if(res.result && res.result.obj){
          let o = res.result.obj;
          delete o["create_time"];
          delete o["login_time"];
          this.form_user = o;
          this.obj_user = o;
          this.is_password = this.obj_user.password ? false : true;
          this.query_user.user_id = user_id
        }else if(res.error){
          console.log(res.error);
          console.log("获取不到相关信息");
        }
      })
    },
    /**
     * 修改头像
     * @param {Object} param文件参数
     */
    change_avatar(){
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
            formData: {
              'i_want_to_customize': 'test'
            },
            header: {
              'x-auth-token': _self.$store.state.user.token
            },
            success: function(uploadFileRes) {
              var filename = JSON.parse(uploadFileRes.data).result.url
              _self.form_user.avatar = filename
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
    async submit(param, func){
      if (!param) {
        param = this.form_user;
      }
      var pm = this.events("submit_before", Object.assign({}, param)) || param;
      var msg = await this.events("submit_check", pm);
      var ret;
      if (msg) {
        this.$toast(msg, 'danger');
      } else {
        ret = this.events("submit_main", pm, func);
      }
      return ret;
    },

    // 提交前校验
    async submit_check(param){
      var ret = null;

      var email_regular = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var phone_regular = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

      var {username ,password ,nickname ,user_group ,email ,phone} = param;

      var confirm_password = this.confirm_password;

      console.log("表单校验username ,password ,email ,nickname ,user_group" ,username ,password ,email ,nickname ,user_group);

      if(!username){
        ret = "账号不能为空";
      }
      else if(username.length > 16 || username.length < 5){
        ret = "账号长度应为5到16个字符之间！";
      }
      else if(!password){
        ret = "密码不能为空!";
      }
      else if(this.is_password && (password.length > 16 || password.length < 5)){
        ret = "密码长度应为5到16个字符之间！";
      }
      else if(nickname && nickname.length > 12 || nickname.length < 2){
        ret = "昵称长度应为2个字符到12个字符之间";
      }
      else if(email && !email_regular.test(email)){
        ret = "请输入正确的邮箱地址 例：test@test.com!";
      }
      else if(phone && !phone_regular.test(phone)){
        ret = "请输入正确的手机号码 例：18955552312!";
      }
      else if(!user_group){
        ret = "请选择用户组!";
      }

      var p = {"username": param.username};

      return ret;
    },

    submit_main(param, func) {
      var url = this.url;
      if (url) {
        if (this.field_user) {
          var id = param[this.field_user];
          if (id) {
            var q = {
              method: 'set'
            };
            q[this.field_user] = id;
            url = this.toUrl(q, url);
          } else {
            url += "method=add"
          }
        } else {
          url += "method=submit"
        }
      } else if (this.url_submit) {
        url = this.url_submit;
      } else if (this.field_user) {
        var id = param[this.field_user];
        if (id) {
          url = this.url_set_user;
        } else {
          url = this.url_add_user;
        }
      }

      // console.log('提交', url);
      if (url) {
        var _this = this;
        this.$post(this.$toUrl(this.query_user, url), param, function(json, status) {
          if (json.result) {
            _this.events("submit_after", json, func);
          } else if (json.error) {
            _this.$toast(json.error.message, 'danger');
          } else {
            _this.$toast("服务器连接失败！", "danger");
          }
        });
      }
    },

    // 提交成功后
    submit_after(json,func){
      var form = Object.assign({} ,this.form_user);
      console.log("查询表单form",form)
      this.get_register(form);
    },

    /**
     * 获取注册表信息
     * @param {Object} form
     * @param {Object} table
     */
    get_register(form){
      var form = this.form;
      var form_user = this.form_user;
      delete form_user.password;
      this.$get("~/api/user/get_obj?",form_user,(res)=>{
        console.log("注册表信息res",res);
        if(res.result && res.result.obj){
          form.user_id = res.result.obj.user_id;
          this.submit_sub(form);
        }else if(res.error){
          console.error(res.error);
          this.$toast(res.error.message,"error");
        }
      })
    },

    submit_sub(form_sub){
      if(form_sub["registered_users_id"]){
        // 提交事件
        this.$post("~/api/" + this.group_table + "/set?registered_users_id=" + form_sub["registered_users_id"],form_sub,(res)=>{
          console.log("提交结果：" ,res)
          if(res.result){
            this.$toast("修改成功!" ,"success");
            this.$router.go(-1);
          }else if(res.error){
            console.error(res.error);
            this.$toast(res.error.message,"error");
          }
        });
      }
      else{
        // 提交事件
        this.$post("~/api/" + this.group_table + "/add?",form_sub,(res)=>{
          console.log("提交结果：" ,res)
          if(res.result){
            this.$toast("添加成功!" ,"success");
            this.$router.go(-1);
          }else if(res.error){
            var user_id = form_sub["user_id"];
            this.$get("~/api/user/del?",{user_id});
            console.error(res.error);
            this.$toast(res.error.message,"error");
          }
        });
      }
    },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/registered_users/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/registered_users/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/registered_users/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/registered_users/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/registered_users/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },

  },
  created() {
          },
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.form_button{
  padding-bottom: 15px;
  display: flex;
}
.form_button button{
  width: 40%;
}
.query_select{
  border-color: rgb(229, 229, 229);
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  line-height: 2;
  font-size: 14px;
  height: 2.4em;
  min-height: 2.4em;
  display: block;
  outline:none;
}

.query_option{
  width: 100%;
}

.btn_add_img{
  color: #D3D3D3;
  text-align: center;
  border: 1px solid #eee;
  height: 5rem;
  width: 5rem;
  position: relative;
}
.btn_add_img text{
  font-size: 35px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.form_button {
  padding-bottom: 15px;
  display: flex;
}
.form_button button {
  width: 40%;
}
.query_select {
  border-color: rgb(229, 229, 229);
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  line-height: 2;
  font-size: 14px;
  height: 2.4em;
  min-height: 2.4em;
  display: block;
  outline: none;
}

.query_option {
  width: 100%;
}

.btn_add_img {
  color: #d3d3d3;
  text-align: center;
  border: 1px solid #eee;
  height: 5rem;
  width: 5rem;
  position: relative;
}
.btn_add_img text {
  font-size: 35px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/*新样式*/
.uni-forms{
padding-top:1rem;
}
.uni-forms-item {
	padding: 6px 10px;
    background: #f8f6fc;
}
.uni-forms .is-input-border{
	border: 0;
}
.container{
	    -webkit-box-shadow: 0px 0px 0px #888888;
	    box-shadow: 0px 0px 0px #888888;
}
.form_button .primary_btn{
		background-color: #22B8B8;
		color: #FFFFFF;
	}
</style>
