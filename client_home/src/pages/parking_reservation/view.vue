<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','order_number') || ($check_field('add','order_number') || $check_field('set','order_number'))" label="订单号" name="order_number">
                            <uni-easyinput type="text" v-model="form['order_number']" v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','order_number')) || (!form['parking_reservation_id'] && $check_field('add','order_number'))"  :disabled="true" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','order_number')">
                  {{ form['order_number'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','parking_space_number') || ($check_field('add','parking_space_number') || $check_field('set','parking_space_number'))" label="车位编号" name="parking_space_number">
                            <uni-easyinput type="text" v-model="form['parking_space_number']" v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','parking_space_number')) || (!form['parking_reservation_id'] && $check_field('add','parking_space_number'))" :disabled="disabledObj['parking_space_number_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','parking_space_number')">
                  {{ form['parking_space_number'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','position') || ($check_field('add','position') || $check_field('set','position'))" label="位置" name="position">
                            <uni-easyinput type="text" v-model="form['position']" v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','position')) || (!form['parking_reservation_id'] && $check_field('add','position'))" :disabled="disabledObj['position_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','position')">
                  {{ form['position'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','the_measure_of_area') || ($check_field('add','the_measure_of_area') || $check_field('set','the_measure_of_area'))" label="面积" name="the_measure_of_area">
                            <uni-easyinput type="text" v-model="form['the_measure_of_area']" v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','the_measure_of_area')) || (!form['parking_reservation_id'] && $check_field('add','the_measure_of_area'))" :disabled="disabledObj['the_measure_of_area_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','the_measure_of_area')">
                  {{ form['the_measure_of_area'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','user') || ($check_field('add','user') || $check_field('set','user'))" label="用户" name="user">
                    <uni-data-select
                  id="form_user"
                  v-model="form['user']"
                  :localdata="list_user_user"
                  :clear="!disabledObj['user_isDisabled']"
                  :disabled="disabledObj['user_isDisabled']"
                  v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','user')) || (!form['parking_reservation_id'] && $check_field('add','user'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['user']"
                  :localdata="list_user_user"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','user')" id="user"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','user_name') || ($check_field('add','user_name') || $check_field('set','user_name'))" label="用户姓名" name="user_name">
                            <uni-easyinput type="text" v-model="form['user_name']" v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','user_name')) || (!form['parking_reservation_id'] && $check_field('add','user_name'))" :disabled="disabledObj['user_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','user_name')">
                  {{ form['user_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','contact_number') || ($check_field('add','contact_number') || $check_field('set','contact_number'))" label="联系电话" name="contact_number">
                            <uni-easyinput type="text" v-model="form['contact_number']" v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','contact_number')) || (!form['parking_reservation_id'] && $check_field('add','contact_number'))" :disabled="disabledObj['contact_number_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','contact_number')">
                  {{ form['contact_number'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','start_time') || ($check_field('add','start_time') || $check_field('set','start_time'))" label="开始时间" name="start_time">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','start_time')) || (!form['parking_reservation_id'] && $check_field('add','start_time'))" @change="changeLog($event,'start_time')" v-model="form['start_time']" type="datetime" :disabled="disabledObj['start_time_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','start_time')">
                  {{ form['start_time'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','end_time') || ($check_field('add','end_time') || $check_field('set','end_time'))" label="结束时间" name="end_time">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','end_time')) || (!form['parking_reservation_id'] && $check_field('add','end_time'))" @change="changeLog($event,'end_time')" v-model="form['end_time']" type="datetime" :disabled="disabledObj['end_time_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','end_time')">
                  {{ form['end_time'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','appointment_instructions') || ($check_field('add','appointment_instructions') || $check_field('set','appointment_instructions'))" label="预约说明" name="appointment_instructions">
                    <uni-easyinput type="textarea" v-model="form['appointment_instructions']" v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','appointment_instructions')) || (!form['parking_reservation_id'] && $check_field('add','appointment_instructions'))" :disabled="disabledObj['appointment_instructions_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','appointment_instructions')">
                  {{ form['appointment_instructions'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item label="审核状态" name="examine_state">
                <uni-data-select
                    v-model="form['examine_state']"
                    :localdata="list_examine_state"
                    v-if="user_group === '管理员' || (form['examine_state'] && $check_examine()) || (!form['examine_state'] && $check_examine())"
                ></uni-data-select>
                <text v-else>{{form["examine_state"]}}</text>
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
      field: "parking_reservation_id",
      url_add: "~/api/parking_reservation/add?",
      url_set: "~/api/parking_reservation/set?",
      url_get_obj: "~/api/parking_reservation/get_obj?",
      url_upload: "~/api/parking_reservation/upload?",

      query: {
        "parking_reservation_id": 0,
      },

      form: {
            "order_number": this.$get_stamp(), // 订单号
                    "parking_space_number":  '', // 车位编号
                    "position":  '', // 位置
                    "the_measure_of_area":  '', // 面积
                    "user": 0, // 用户
                    "user_name":  '', // 用户姓名
                    "contact_number":  '', // 联系电话
                    "start_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
                    "end_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
                    "appointment_instructions":  '', // 预约说明
                        "examine_state": "未审核",
                        "parking_reservation_id": 0, // ID
                
              },
          disabledObj:{
                        "order_number_isDisabled": false,
                                "parking_space_number_isDisabled": false,
                                "position_isDisabled": false,
                                "the_measure_of_area_isDisabled": false,
                                "user_isDisabled": false,
                                "user_name_isDisabled": false,
                                "contact_number_isDisabled": false,
                                "start_time_isDisabled": false,
                                "end_time_isDisabled": false,
                                "appointment_instructions_isDisabled": false,
                                  },
                                                                                                                // 用户列表
            list_user_user: [],
                        // 用户组
            group_user_user: "",
                                                                                                                                          list_examine_state:[{value:"未审核",text:"未审核"},{value:"已通过",text:"已通过"},{value:"未通过",text:"未通过"}],
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
            url: _self.$fullUrl('/api/parking_reservation/upload?'),
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
            url: _self.$fullUrl('/api/parking_reservation/upload?'),
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
                                                                  if (this.form["start_time"] && JSON.stringify(this.form["start_time"]).indexOf("-")===-1) {
        this.form["start_time"] = this.$toTime(parseInt(this.form["start_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                  if (this.form["end_time"] && JSON.stringify(this.form["end_time"]).indexOf("-")===-1) {
        this.form["end_time"] = this.$toTime(parseInt(this.form["end_time"]), "yyyy-MM-dd hh:mm:ss")
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
                                                                  if (this.form["start_time"] && JSON.stringify(this.form["start_time"]).indexOf("-")===-1) {
        this.form["start_time"] = this.$toTime(parseInt(this.form["start_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                  if (this.form["end_time"] && JSON.stringify(this.form["end_time"]).indexOf("-")===-1) {
        this.form["end_time"] = this.$toTime(parseInt(this.form["end_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                    },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/parking_reservation/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/parking_reservation/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/parking_reservation/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/parking_reservation/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/parking_reservation/view','get');
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
