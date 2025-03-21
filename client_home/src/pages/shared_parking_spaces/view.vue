<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','parking_space_number') || ($check_field('add','parking_space_number') || $check_field('set','parking_space_number'))" label="车位编号" name="parking_space_number">
                            <uni-easyinput type="text" v-model="form['parking_space_number']" v-if="user_group === '管理员' || (form['shared_parking_spaces_id'] && $check_field('set','parking_space_number')) || (!form['shared_parking_spaces_id'] && $check_field('add','parking_space_number'))" :disabled="disabledObj['parking_space_number_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','parking_space_number')">
                  {{ form['parking_space_number'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','position') || ($check_field('add','position') || $check_field('set','position'))" label="位置" name="position">
                            <uni-easyinput type="text" v-model="form['position']" v-if="user_group === '管理员' || (form['shared_parking_spaces_id'] && $check_field('set','position')) || (!form['shared_parking_spaces_id'] && $check_field('add','position'))" :disabled="disabledObj['position_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','position')">
                  {{ form['position'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','state') || ($check_field('add','state') || $check_field('set','state'))" label="状态" name="state">
                    <uni-data-select
                  v-model="form.state"
                  :localdata="list_state"
                  :clear="!disabledObj['state_isDisabled']"
                  :disabled="disabledObj['state_isDisabled']"
                  v-if="user_group === '管理员' || (form['shared_parking_spaces_id'] && $check_field('set','state')) || (!form['shared_parking_spaces_id'] && $check_field('add','state'))"
                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','state')">
                  {{ form['state'] }}
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
              <uni-forms-item v-if="$check_field('get','the_measure_of_area') || ($check_field('add','the_measure_of_area') || $check_field('set','the_measure_of_area'))" label="面积" name="the_measure_of_area">
                            <uni-easyinput type="text" v-model="form['the_measure_of_area']" v-if="user_group === '管理员' || (form['shared_parking_spaces_id'] && $check_field('set','the_measure_of_area')) || (!form['shared_parking_spaces_id'] && $check_field('add','the_measure_of_area'))" :disabled="disabledObj['the_measure_of_area_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','the_measure_of_area')">
                  {{ form['the_measure_of_area'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','fee_rules') || ($check_field('add','fee_rules') || $check_field('set','fee_rules'))" label="收费规则" name="fee_rules">
                    <uni-easyinput type="textarea" v-model="form['fee_rules']" v-if="user_group === '管理员' || (form['shared_parking_spaces_id'] && $check_field('set','fee_rules')) || (!form['shared_parking_spaces_id'] && $check_field('add','fee_rules'))" :disabled="disabledObj['fee_rules_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','fee_rules')">
                  {{ form['fee_rules'] }}
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
      field: "shared_parking_spaces_id",
      url_add: "~/api/shared_parking_spaces/add?",
      url_set: "~/api/shared_parking_spaces/set?",
      url_get_obj: "~/api/shared_parking_spaces/get_obj?",
      url_upload: "~/api/shared_parking_spaces/upload?",

      query: {
        "shared_parking_spaces_id": 0,
      },

      form: {
            "parking_space_number":  '', // 车位编号
                    "position":  '', // 位置
                    "state":  '', // 状态
                    "parking_space_image":  '', // 车位图片
                    "the_measure_of_area":  '', // 面积
                    "fee_rules":  '', // 收费规则
                                "shared_parking_spaces_id": 0, // ID
                
              },
          disabledObj:{
                        "parking_space_number_isDisabled": false,
                                "position_isDisabled": false,
                                "state_isDisabled": false,
                                "parking_space_image_isDisabled": false,
                                "the_measure_of_area_isDisabled": false,
                                "fee_rules_isDisabled": false,
                                  },
                                                              // 状态选项列表
          list_state: [],
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
            url: _self.$fullUrl('/api/shared_parking_spaces/upload?'),
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
            url: _self.$fullUrl('/api/shared_parking_spaces/upload?'),
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
     * 获取状态列表
     */
    async get_list_state() {
          ['空闲','停放中'].map((o) => this.list_state.push({value:o,text:o}));
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
        bl = this.$check_action('/shared_parking_spaces/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/shared_parking_spaces/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/shared_parking_spaces/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/shared_parking_spaces/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/shared_parking_spaces/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },

  },
  created() {
                        this.get_list_state();
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
