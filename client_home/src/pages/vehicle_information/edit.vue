<template>
	<view class="diy_edit page_vehicle_information" id="vehicle_information_edit">
		<view class='warp'>
			<view class='container'>
				<view class='row'>
						<view v-if="$check_field('set','user') || $check_field('add','user') || $check_field('get','user')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								用户:
							</text>
						</view>
						<view class="diy_field diy_down diy_text_row diy_select_flex">
							<uni-data-select
									id="form_user"
									v-model="form['user']"
									:localdata="list_user_user"
									:clear="!disabledObj['user_isDisabled']"
									:disabled="disabledObj['user_isDisabled']"
									v-if="(form['user'] && $check_field('set','user')) || (!form['user'] && $check_field('add','user'))"
							></uni-data-select>
							<text v-else-if="$check_field('get','user')">{{ form['user'] }}</text>
						</view>
					</view>
							<view v-if="$check_field('set','license_plate_number') || $check_field('add','license_plate_number') || $check_field('get','license_plate_number')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								车牌号:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_license_plate_number" v-model="form['license_plate_number']" placeholder="请输入车牌号" v-if="(form['license_plate_number'] && $check_field('set','license_plate_number')) || (!form['license_plate_number'] && $check_field('add','license_plate_number'))" :disabled="disabledObj['license_plate_number_isDisabled']" />
							<text v-else-if="$check_field('get','license_plate_number')">{{ form['license_plate_number'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','owners_name') || $check_field('add','owners_name') || $check_field('get','owners_name')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								车主姓名:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_owners_name" v-model="form['owners_name']" placeholder="请输入车主姓名" v-if="(form['owners_name'] && $check_field('set','owners_name')) || (!form['owners_name'] && $check_field('add','owners_name'))" :disabled="disabledObj['owners_name_isDisabled']" />
							<text v-else-if="$check_field('get','owners_name')">{{ form['owners_name'] }}</text>
						</view>
										</view>
							<view v-if="$check_field('set','vehicle_photos') || $check_field('add','vehicle_photos') || $check_field('get','vehicle_photos')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								车辆照片:
							</text>
						</view>
								<!-- 图片 -->
						<!-- 修改权限 -->
						<view class="diy_field diy_img diy_text_row" v-if="form['vehicle_photos'] && $check_field('set','vehicle_photos')">
							<image v-if="disabledObj['vehicle_photos_isDisabled']" :src="$fullUrl(form['vehicle_photos'])" />
							<image v-if="!disabledObj['vehicle_photos_isDisabled']" :src="$fullUrl(form['vehicle_photos'])" @click="change_img('vehicle_photos')" />
						</view>
						<!-- 添加权限 -->
						<view class="diy_field diy_img diy_text_row" v-else-if="!form['vehicle_photos'] && $check_field('add','vehicle_photos')">
							<view v-if="disabledObj['vehicle_photos_isDisabled']" class="btn_add_img">
								<text>+</text>
							</view>
							<view v-if="!disabledObj['vehicle_photos_isDisabled']" class="btn_add_img diy_text_row" @click="change_img('vehicle_photos')">
								<text>+</text>
							</view>
						</view>
						<!-- 查询权限 -->
						<view class="diy_field diy_img diy_text_row" v-else-if="$check_field('get','vehicle_photos')">
							<image :src="$fullUrl(form['vehicle_photos'])" />
						</view>
						<uni-icons style="display: none;" class="forward" type="forward" id="form_img_vehicle_photos"></uni-icons>
							</view>
							<view v-if="$check_field('set','contact_number') || $check_field('add','contact_number') || $check_field('get','contact_number')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								联系电话:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_contact_number" v-model="form['contact_number']" placeholder="请输入联系电话" v-if="(form['contact_number'] && $check_field('set','contact_number')) || (!form['contact_number'] && $check_field('add','contact_number'))" :disabled="disabledObj['contact_number_isDisabled']" />
							<text v-else-if="$check_field('get','contact_number')">{{ form['contact_number'] }}</text>
						</view>
										</view>
	
				</view>
				<view class="row">
					<view class="col-12">
						<view class="btn_box">
							<button class="btn_submit primary_btn" @click="submit()">提交</button>
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
	mixins:[mixin],
	components:{},
	data(){
		return{
			url_get_obj:"~/api/vehicle_information/get_obj?",
			url_add:"~/api/vehicle_information/add?",
			url_set:"~/api/vehicle_information/set?",

			// 登录权限
			oauth: {
				"signIn": true,
				"user_group": []
			},

			// 查询条件
			query: {
					"user": 0,
						"license_plate_number": "",
						"owners_name": "",
						"vehicle_photos": "",
						"contact_number": "",
					"vehicle_information_id": 0
			},

			obj: {
					"user": 0, // 用户
						"license_plate_number":  '', // 车牌号
						"owners_name":  '', // 车主姓名
						"vehicle_photos":  '', // 车辆照片
						"contact_number":  '', // 联系电话
					"vehicle_information_id": 0,

			},

			// 表单字段
			form: {
					"user": 0, // 用户
						"license_plate_number":  '', // 车牌号
						"owners_name":  '', // 车主姓名
						"vehicle_photos":  '', // 车辆照片
						"contact_number":  '', // 联系电话
					"vehicle_information_id": 0,
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
									
			field:"vehicle_information_id",
			table_key:"vehicle_information",

		}
	},
	methods: {
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
				async get_user_session_user(){
			var _this = this;
			var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
			if(json.result && json.result.obj){
				var source_table = json.result.obj.source_table;
				var user_id = _this.$store.state.user.user_id;
				if (user_id){
					var url = "~/api/"+source_table+"/get_obj?"
					this.$get(url, {"user_id":_this.$store.state.user.user_id}, function(res) {
						if (res.result && res.result.obj) {
							var arr = []
							for (let key in res.result.obj) {
								arr.push(key)
							}
							var arrForm = []
							for (let key in _this.form) {
								arrForm.push(key)
							}
							_this.form["user"] = user_id
							_this.disabledObj['user' + '_isDisabled'] = true
							for (var i=0;i<arr.length;i++){
                if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                  for (var j = 0; j < arrForm.length; j++) {
                    if (arr[i] === arrForm[j]) {
                      if (arr[i] !== "user") {
                        _this.form[arrForm[j]] = res.result.obj[arr[i]]
                        _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                        break;
                      }
                    }
                  }
                }
							}
						}
					});
				}
			}
			else if(json.error){
				console.error(json.error);
			}
		},
	
	
				
	
				
	
				
	
				
	
			change_file(key_name){
			var _self = this;
				this.$chooseFile().then(res=>{
					console.log(res)

						const uploadTask = uni.uploadFile({
							url: _self.$fullUrl("/api/feedback/upload?"),
							filePath: res[0].path,
							name: "file",
							formData: {
								i_want_to_customize: "test",
							},
							header: {
								"x-auth-token": _self.$store.state.user.token,
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes)
								var filename = JSON.parse(uploadFileRes.data).result.url;
								_self.form[key_name] = filename;
							},
						});

						uploadTask.onProgressUpdate(function(res) {
							_self.percent = res.progress;
							console.log("上传进度" + res.progress);
							console.log("已经上传的数据长度" + res.totalBytesSent);
							console.log(
								"预期需要上传的数据总长度" + res.totalBytesExpectedToSend
							);
						});

				})
		},
		change_img(key_name) {
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
							'vehicle_information': 'test'
						},
						header: {
							'x-auth-token': _self.$store.state.user.token
						},
						success: function(uploadFileRes) {
							var filename = JSON.parse(uploadFileRes.data).result.url
							var img_url = filename
							_self.form[key_name] = img_url
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
		 * 获取对象后获取缓存表单
		 * @param {Object} json
		 * @param {Object} func
		 */
		get_obj_after(json ,func){
			var form = uni.db.get("form");
			var obj = Object.assign({} ,form ,this.obj);
			if (form) {
				this.obj = uni.push(this.obj ,obj);
			}
			if (form) {
				this.form = uni.push(this.form ,form);
			}
			if(func){
				func(json);
			}
		},

	},
	onLoad(){
				this.get_user_session_user();
				this.get_list_user_user();
														},
}
</script>

<style scoped>
	input{
		font-size: 10px;
	}

	.form_edit {
		background-color: #fff;
		margin-bottom: 0.5rem;
		padding: 1rem;
		font-size: 10px;
	}

	.item {
		display: flex;
		padding: 0.2rem 0;
	}

	.left_text {
		flex: 0 0 25%;
		display: flex;
		align-items: center;
	}

	.right_text {
		flex: 0 0 75%;
		border-bottom: 1px solid #eee;
	}
	.right_text.btn_warp{
		border-bottom: 0;
	}

	.btn_submit {
		text-align: center;
		background-color: #fff;
		padding: 0.3rem;
		margin: 0.1rem 1rem;
		border: 1px solid #eee;
		border-radius: 0.5rem;
	}

	.btn_submit:hover {
		opacity: 0.5;
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




</style>
<style scoped>
/*新样式*/
.diy_text_row {
  display: inline-block;
}
.container {
	margin-top:1rem ;
	padding: 1rem;
    -webkit-box-shadow: 0px 0px 0px #888888;
    box-shadow: 0px 0px 0px #888888;
}
.primary_btn{
		background-color: #22B8B8;
		color: #FFFFFF;
	}
	.btn_submit{
		padding: 0;
		margin-top:1rem ;
	}
	.row-item {
		padding: 10px 10px;
	    background: #f8f6fc;
		margin-bottom: 1rem;
	}
	.diy_field{
		padding-left: 1rem;
	}
	.diy_title{
		align-items: center;
        font-size: 14px;
        color: #333;
	}

	.row-item{
		display: flex !important;
		align-items: baseline;
	}
	.diy_select_flex{
		flex: 1;
	}
	.query_select{
		flex: 1;
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
</style>

