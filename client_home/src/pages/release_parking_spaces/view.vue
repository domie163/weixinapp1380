<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','publish_users') || ($check_field('add','publish_users') || $check_field('set','publish_users'))" label="发布用户" name="publish_users">
                    <uni-data-select
                  id="form_publish_users"
                  v-model="form['publish_users']"
                  :localdata="list_user_publish_users"
                  :clear="!disabledObj['publish_users_isDisabled']"
                  :disabled="disabledObj['publish_users_isDisabled']"
                  v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','publish_users')) || (!form['release_parking_spaces_id'] && $check_field('add','publish_users'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['publish_users']"
                  :localdata="list_user_publish_users"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','publish_users')" id="publish_users"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','user_name') || ($check_field('add','user_name') || $check_field('set','user_name'))" label="用户姓名" name="user_name">
                            <uni-easyinput type="text" v-model="form['user_name']" v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','user_name')) || (!form['release_parking_spaces_id'] && $check_field('add','user_name'))" :disabled="disabledObj['user_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','user_name')">
                  {{ form['user_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','parking_address') || ($check_field('add','parking_address') || $check_field('set','parking_address'))" label="车位地址" name="parking_address">
                            <uni-easyinput type="text" v-model="form['parking_address']" v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','parking_address')) || (!form['release_parking_spaces_id'] && $check_field('add','parking_address'))" :disabled="disabledObj['parking_address_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','parking_address')">
                  {{ form['parking_address'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','parking_space_number') || ($check_field('add','parking_space_number') || $check_field('set','parking_space_number'))" label="车位号" name="parking_space_number">
                            <uni-easyinput type="text" v-model="form['parking_space_number']" v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','parking_space_number')) || (!form['release_parking_spaces_id'] && $check_field('add','parking_space_number'))" :disabled="disabledObj['parking_space_number_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','parking_space_number')">
                  {{ form['parking_space_number'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','parking_space_image') || ($check_field('add','parking_space_image') || $check_field('set','parking_space_image'))" label="车位图片" name="parking_space_image">
                    <!-- 修改权限 -->
                <view class="diy_field diy_img" v-if="form['parking_space_image'] && $check_field('set','parking_space_image')">
                  <image v-if="disabledObj['parking_space_image_isDisabled']" :src="$fullUrl(form['parking_space_image'])" />
                  <image v-if="!disabledObj['parking_space_image_isDisabled']" :src="$fullUrl(form['parking_space_image'])" @click="change_img('parking_space_image')" />
                </view>
                <!-- 添加权限 -->
                <view class="diy_field diy_img" v-else-if="!form['parking_space_image'] && $check_field('add','parking_space_image')">
                  <view v-if="disabledObj['parking_space_image_isDisabled']" class="btn_add_img">
                    <text>+</text>
                  </view>
                  <view v-if="!disabledObj['parking_space_image_isDisabled']" class="btn_add_img" @click="change_img('parking_space_image')">
                    <text>+</text>
                  </view>
                </view>
                <!-- 查询权限 -->
                <view class="diy_field diy_img" v-else-if="$check_field('get','parking_space_image')">
                  <image :src="$fullUrl(form['parking_space_image'])" />
                </view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','shared_time') || ($check_field('add','shared_time') || $check_field('set','shared_time'))" label="共享时间" name="shared_time">
                            <uni-easyinput type="text" v-model="form['shared_time']" v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','shared_time')) || (!form['release_parking_spaces_id'] && $check_field('add','shared_time'))" :disabled="disabledObj['shared_time_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','shared_time')">
                  {{ form['shared_time'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','lease_instructions') || ($check_field('add','lease_instructions') || $check_field('set','lease_instructions'))" label="租借说明" name="lease_instructions">
                    <uni-easyinput type="textarea" v-model="form['lease_instructions']" v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','lease_instructions')) || (!form['release_parking_spaces_id'] && $check_field('add','lease_instructions'))" :disabled="disabledObj['lease_instructions_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','lease_instructions')">
                  {{ form['lease_instructions'] }}
                </text>
                  </uni-forms-item>

              <uni-forms-item label="计时器标题" name="timer_title">
                <uni-easyinput v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_action('/release_parking_spaces/view','set')) || (!form['release_parking_spaces_id'] && $check_action('/release_parking_spaces/view','add'))" v-model="form['timer_title']" type="text" :disabled="disabledObj['timer_title_isDisabled']" />
                <text v-else-if="$check_field('get','timer_title')">
                  {{ form['timer_title'] }}
                </text>
              </uni-forms-item>
              <uni-forms-item label="计时开始时间" name="timing_start_time">
                <uni-datetime-picker v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_action('/release_parking_spaces/view','set')) || (!form['release_parking_spaces_id'] && $check_action('/release_parking_spaces/view','add'))" @change="changeLog($event,'timing_start_time')" v-model="form['timing_start_time']" type="datetime" :disabled="disabledObj['timing_start_time_isDisabled']" />
                <text v-else-if="$check_field('get','timing_start_time')">
                  {{ form['timing_start_time'] }}
                </text>
              </uni-forms-item>
              <uni-forms-item label="计时结束时间" name="timing_end_time">
                <uni-datetime-picker v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_action('/release_parking_spaces/view','set')) || (!form['release_parking_spaces_id'] && $check_action('/release_parking_spaces/view','add'))" @change="changeLog($event,'timing_end_time')" v-model="form['timing_end_time']" type="datetime" :disabled="disabledObj['timing_end_time_isDisabled']" />
                <text v-else-if="$check_field('get','timing_end_time')">
                  {{ form['timing_end_time'] }}
                </text>
              </uni-forms-item>
              <uni-forms-item label="当前位置" name="location_address">
                <uni-easyinput type="text" placeholder="当前位置":disabled="true" v-model="form['location_address']" />
                <button size="mini" @click="getLongitudeLatitude()">定位</button>
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
      field: "release_parking_spaces_id",
      url_add: "~/api/release_parking_spaces/add?",
      url_set: "~/api/release_parking_spaces/set?",
      url_get_obj: "~/api/release_parking_spaces/get_obj?",
      url_upload: "~/api/release_parking_spaces/upload?",

      query: {
        "release_parking_spaces_id": 0,
      },

      form: {
            "publish_users": 0, // 发布用户
                    "user_name":  '', // 用户姓名
                    "parking_address":  '', // 车位地址
                    "parking_space_number":  '', // 车位号
                    "parking_space_image":  '', // 车位图片
                    "shared_time":  '', // 共享时间
                    "lease_instructions":  '', // 租借说明
                                "release_parking_spaces_id": 0, // ID
                "timer_title":'', // 计时器标题
            "timing_start_time":'', // 计时开始时间
            "timing_end_time":'', // 计时结束时间
                
                "location_address": "", // 定位地址
            "location_lng": "", // 定位地址经度
            "location_lat": "", // 定位地址纬度
              },
          disabledObj:{
                        "publish_users_isDisabled": false,
                                "user_name_isDisabled": false,
                                "parking_address_isDisabled": false,
                                "parking_space_number_isDisabled": false,
                                "parking_space_image_isDisabled": false,
                                "shared_time_isDisabled": false,
                                "lease_instructions_isDisabled": false,
                            "timer_title_isDisabled": false, // 计时器标题
            "timing_start_time_isDisabled": false, // 计时开始时间
            "timing_end_time_isDisabled": false, // 计时结束时间
                      },
                                // 用户列表
            list_user_publish_users: [],
                        // 用户组
            group_user_publish_users: "",
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
            url: _self.$fullUrl('/api/release_parking_spaces/upload?'),
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
            url: _self.$fullUrl('/api/release_parking_spaces/upload?'),
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
    async get_list_user_publish_users() {
      // if(this.user_group !== "管理员" && this.form["publish_users"] === 0) {
      //     this.form["publish_users"] = this.user.user_id;
      // }
      var json = await this.$get("~/api/user/get_list?user_group=注册用户");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_user_publish_users.push({value:o.user_id,text:o.nickname + '-' + o.username}));
      }
      else if(json.error){
        console.error(json.error);
      }
    },
            /**
     * 获取注册用户用户组
     */
    async get_group_user_publish_users() {
      this.form["publish_users"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
      if(json.result && json.result.obj){
        this.group_user_publish_users = json.result.obj;
        this.get_user_session_publish_users(this.form['publish_users'])
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_session_publish_users(id){
      var _this = this;
      var user_id = {"user_id":id}
      var url = "~/api/"+_this.group_user_publish_users.source_table+"/get_obj?"
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
                  if (arr[i] !== "publish_users") {
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
        bl = this.$check_action('/release_parking_spaces/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/release_parking_spaces/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/release_parking_spaces/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/release_parking_spaces/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/release_parking_spaces/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },
    getLongitudeLatitude() {
        let _this = this;
        _this.form.location_address = "广东省深圳市南山区科技园";
        _this.form.location_lng = "113.946782";
        _this.form.location_lat = "22.556481";
        uni.getLocation({
            type: 'gcj02',
            success: function (res) {
                let lat = res.latitude //当前位置的纬度
                let lng = res.longitude //当前位置精度
                let location=lng+","+lat;
                let url = "http://restapi.amap.com/v3/geocode/regeo?key=b6eb2819a6ba4c5119591614272fe7ca&location="+location;
                uni.request({url, method: "GET",dataType: "json",
                    success: function (res) {
                        if (res.statusCode===200){
                            let data = res.data;
                            if (data.status==='1'){
                                _this.form.location_address = data.regeocode.formatted_address;
                                _this.form.location_lng = JSON.stringify(lng);
                                _this.form.location_lat = JSON.stringify(lat);
                            }else {
                                console.log(data.info)
                            }
                        }
                    },error: function (err) {
                    console.log(err);
                    }
                })
            },error: function (err) {
                console.log(err);
            }
        })
    },

  },
  created() {
            this.get_list_user_publish_users();
            this.get_group_user_publish_users();
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
