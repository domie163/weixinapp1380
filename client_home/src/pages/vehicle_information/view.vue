<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','user') || ($check_field('add','user') || $check_field('set','user'))" label="用户" name="user">
                    <uni-data-select
                  id="form_user"
                  v-model="form['user']"
                  :localdata="list_user_user"
                  :clear="!disabledObj['user_isDisabled']"
                  :disabled="disabledObj['user_isDisabled']"
                  v-if="user_group === '管理员' || (form['vehicle_information_id'] && $check_field('set','user')) || (!form['vehicle_information_id'] && $check_field('add','user'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['user']"
                  :localdata="list_user_user"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','user')" id="user"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','license_plate_number') || ($check_field('add','license_plate_number') || $check_field('set','license_plate_number'))" label="车牌号" name="license_plate_number">
                            <uni-easyinput type="text" v-model="form['license_plate_number']" v-if="user_group === '管理员' || (form['vehicle_information_id'] && $check_field('set','license_plate_number')) || (!form['vehicle_information_id'] && $check_field('add','license_plate_number'))" :disabled="disabledObj['license_plate_number_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','license_plate_number')">
                  {{ form['license_plate_number'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','owners_name') || ($check_field('add','owners_name') || $check_field('set','owners_name'))" label="车主姓名" name="owners_name">
                            <uni-easyinput type="text" v-model="form['owners_name']" v-if="user_group === '管理员' || (form['vehicle_information_id'] && $check_field('set','owners_name')) || (!form['vehicle_information_id'] && $check_field('add','owners_name'))" :disabled="disabledObj['owners_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','owners_name')">
                  {{ form['owners_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','vehicle_photos') || ($check_field('add','vehicle_photos') || $check_field('set','vehicle_photos'))" label="车辆照片" name="vehicle_photos">
                    <!-- 修改权限 -->
                <view class="diy_field diy_img" v-if="form['vehicle_photos'] && $check_field('set','vehicle_photos')">
                  <image v-if="disabledObj['vehicle_photos_isDisabled']" :src="$fullUrl(form['vehicle_photos'])" />
                  <image v-if="!disabledObj['vehicle_photos_isDisabled']" :src="$fullUrl(form['vehicle_photos'])" @click="change_img('vehicle_photos')" />
                </view>
                <!-- 添加权限 -->
                <view class="diy_field diy_img" v-else-if="!form['vehicle_photos'] && $check_field('add','vehicle_photos')">
                  <view v-if="disabledObj['vehicle_photos_isDisabled']" class="btn_add_img">
                    <text>+</text>
                  </view>
                  <view v-if="!disabledObj['vehicle_photos_isDisabled']" class="btn_add_img" @click="change_img('vehicle_photos')">
                    <text>+</text>
                  </view>
                </view>
                <!-- 查询权限 -->
                <view class="diy_field diy_img" v-else-if="$check_field('get','vehicle_photos')">
                  <image :src="$fullUrl(form['vehicle_photos'])" />
                </view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','contact_number') || ($check_field('add','contact_number') || $check_field('set','contact_number'))" label="联系电话" name="contact_number">
                            <uni-easyinput type="text" v-model="form['contact_number']" v-if="user_group === '管理员' || (form['vehicle_information_id'] && $check_field('set','contact_number')) || (!form['vehicle_information_id'] && $check_field('add','contact_number'))" :disabled="disabledObj['contact_number_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','contact_number')">
                  {{ form['contact_number'] }}
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
      field: "vehicle_information_id",
      url_add: "~/api/vehicle_information/add?",
      url_set: "~/api/vehicle_information/set?",
      url_get_obj: "~/api/vehicle_information/get_obj?",
      url_upload: "~/api/vehicle_information/upload?",

      query: {
        "vehicle_information_id": 0,
      },

      form: {
            "user": 0, // 用户
                    "license_plate_number":  '', // 车牌号
                    "owners_name":  '', // 车主姓名
                    "vehicle_photos":  '', // 车辆照片
                    "contact_number":  '', // 联系电话
                                "vehicle_information_id": 0, // ID
                
              },
          disabledObj:{
                        "user_isDisabled": false,
                                "license_plate_number_isDisabled": false,
                                "owners_name_isDisabled": false,
                                "vehicle_photos_isDisabled": false,
                                "contact_number_isDisabled": false,
                                  },
                                // 用户列表
            list_user_user: [],
                        // 用户组
            group_user_user: "",
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
            url: _self.$fullUrl('/api/vehicle_information/upload?'),
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
            url: _self.$fullUrl('/api/vehicle_information/upload?'),
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
     * 获取注册用户用户列表
     */
    async get_list_user_user() {
      // if(this.user_group !== "管理员" && this.form["user"] === 0) {
      //     this.form["user"] = this.user.user_id;
      // }
      var json = await this.$get("~/api/user/get_list?user_group=注册用户");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_user_user.push({value:o.user_id,text:o.nickname + '-' + o.username}));
      }
      else if(json.error){
        console.error(json.error);
      }
    },
            /**
     * 获取注册用户用户组
     */
    async get_group_user_user() {
      this.form["user"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
      if(json.result && json.result.obj){
        this.group_user_user = json.result.obj;
        this.get_user_session_user(this.form['user'])
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_session_user(id){
      var _this = this;
      var user_id = {"user_id":id}
      var url = "~/api/"+_this.group_user_user.source_table+"/get_obj?"
      this.$get(url, user_id, function(res) {
        if (res.result && res.result.obj) {
          var arr = []
          for (let key in res.result.obj) {
            arr.push(key)
          }
          var arrForm = []
          for (let key in _this.form) {
            arrForm.push(key)
          }
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arr[i] === arrForm[j]) {
                  if (arr[i] !== "user") {
                    _this.form[arrForm[j]] = res.result.obj[arr[i]]
                    _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                    break;
                  } else {
                    _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                  }
                }
              }
            }
          }
        }
      });
    },
            
            
            
            
            
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                            },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/vehicle_information/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/vehicle_information/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/vehicle_information/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/vehicle_information/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/vehicle_information/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },

  },
  created() {
            this.get_list_user_user();
            this.get_group_user_user();
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
