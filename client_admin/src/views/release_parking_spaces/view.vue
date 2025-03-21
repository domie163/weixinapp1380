<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','publish_users') || $check_field('add','publish_users') || $check_field('set','publish_users')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="发布用户" prop="publish_users">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_publish_users(form['publish_users']) }}
							<!--<el-input id="business_name" v-model="form['publish_users']" placeholder="请输入发布用户"-->
							<!--v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','publish_users')) || (!form['release_parking_spaces_id'] && $check_field('add','publish_users'))" :disabled="disabledObj['publish_users_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','publish_users')">{{form['publish_users']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','publish_users')) || (!form['release_parking_spaces_id'] && $check_field('add','publish_users'))" id="publish_users" v-model="form['publish_users']" :disabled="disabledObj['publish_users_isDisabled']">
								<el-option v-for="o in list_user_publish_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','publish_users')" id="publish_users" v-model="form['publish_users']" :disabled="true">
								<el-option v-for="o in list_user_publish_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="publish_users" v-model="form['publish_users']" :disabled="disabledObj['publish_users_isDisabled']">
							<el-option v-for="o in list_user_publish_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','user_name') || $check_field('add','user_name') || $check_field('set','user_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户姓名" prop="user_name">
												<el-input id="user_name" v-model="form['user_name']" placeholder="请输入用户姓名"
							  v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','user_name')) || (!form['release_parking_spaces_id'] && $check_field('add','user_name'))" :disabled="disabledObj['user_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','user_name')">{{form['user_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','parking_address') || $check_field('add','parking_address') || $check_field('set','parking_address')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="车位地址" prop="parking_address">
												<el-input id="parking_address" v-model="form['parking_address']" placeholder="请输入车位地址"
							  v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','parking_address')) || (!form['release_parking_spaces_id'] && $check_field('add','parking_address'))" :disabled="disabledObj['parking_address_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','parking_address')">{{form['parking_address']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','parking_space_number') || $check_field('add','parking_space_number') || $check_field('set','parking_space_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="车位号" prop="parking_space_number">
												<el-input id="parking_space_number" v-model="form['parking_space_number']" placeholder="请输入车位号"
							  v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','parking_space_number')) || (!form['release_parking_spaces_id'] && $check_field('add','parking_space_number'))" :disabled="disabledObj['parking_space_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','parking_space_number')">{{form['parking_space_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','parking_space_image') || $check_field('add','parking_space_image') || $check_field('set','parking_space_image')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="车位图片" prop="parking_space_image">
								<el-upload :disabled="disabledObj['parking_space_image_isDisabled']" id="parking_space_image" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_parking_space_image"
						:show-file-list="false" v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','parking_space_image')) || (!form['release_parking_spaces_id'] && $check_field('add','parking_space_image'))">
						<img v-if="form['parking_space_image']" :src="$fullUrl(form['parking_space_image'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','parking_space_image')" style="width: 100px; height: 100px"
						:src="$fullUrl(form['parking_space_image'])" :preview-src-list="[$fullUrl(form['parking_space_image'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','shared_time') || $check_field('add','shared_time') || $check_field('set','shared_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="共享时间" prop="shared_time">
												<el-input id="shared_time" v-model="form['shared_time']" placeholder="请输入共享时间"
							  v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','shared_time')) || (!form['release_parking_spaces_id'] && $check_field('add','shared_time'))" :disabled="disabledObj['shared_time_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','shared_time')">{{form['shared_time']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','lease_instructions') || $check_field('add','lease_instructions') || $check_field('set','lease_instructions')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="租借说明" prop="lease_instructions">
								<el-input type="textarea" id="lease_instructions" v-model="form['lease_instructions']" placeholder="请输入租借说明"
						v-if="user_group === '管理员' || (form['release_parking_spaces_id'] && $check_field('set','lease_instructions')) || (!form['release_parking_spaces_id'] && $check_field('add','lease_instructions'))" :disabled="disabledObj['lease_instructions_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','lease_instructions')">{{form['lease_instructions']}}</div>
							</el-form-item>
			</el-col>
					
	
				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="计时器标题" prop="timer_title">
					<el-input id="timer_title" v-model="form['timer_title']" placeholder="请输入计时器标题"
							  v-if="user_group === '管理员' || $check_action('/release_parking_spaces/view','set') || $check_action('/release_parking_spaces/view','add')" :disabled="disabledObj['timer_title_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','timer_title')">{{form['timer_title']}}</div>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="计时开始时间" prop="timing_start_time">
					<el-date-picker id="timing_start_time" v-model="form['timing_start_time']" placeholder="选择计时器开始时间"
						v-if="user_group === '管理员' || $check_action('/release_parking_spaces/view','set') || $check_action('/release_parking_spaces/view','add')" :disabled="disabledObj['timing_start_time_isDisabled']" type="datetime" >
					</el-date-picker>
					<div v-else-if="$check_field('get','timing_start_time')">{{form['timing_start_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="计时结束时间" prop="timing_end_time">
					<el-date-picker id="timing_end_time" v-model="form['timing_end_time']" placeholder="选择计时器开始时间"
						v-if="user_group === '管理员' || $check_action('/release_parking_spaces/view','set') || $check_action('/release_parking_spaces/view','add')" :disabled="disabledObj['timing_end_time_isDisabled']" type="datetime" >
					</el-date-picker>
					<div v-else-if="$check_field('get','timing_end_time')">{{form['timing_end_time']}}</div>
				</el-form-item>
			</el-col>
	
				<el-col
					v-if="user_group === '管理员' || $check_action('/release_parking_spaces/view', 'set') || $check_action('/release_parking_spaces/view', 'add')"
					:xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="当前位置" prop="location_address">
					<el-input style="width: 80%" id="location_address" v-model="form['location_address']"
							  :disabled="true"></el-input>
					<el-button size="mini" @click="getLongitudeLatitude()">定位</el-button>
				</el-form-item>
			</el-col>
	
	
	
	
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item>
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
			</el-col>

		</el-form>
	</el-main>
</template>

<script>
	import mixin from "@/mixins/page.js";

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
							"location_address": "", // 定位地址
					"location_lng": "", // 定位地址经度
					"location_lat": "", // 定位地址纬度
								"timer_title":'', // 计时器标题
					"timing_start_time":'', // 计时开始时间
					"timing_end_time":'', // 计时结束时间
			
				},
				disabledObj:{
								"publish_users_isDisabled": false,
										"user_name_isDisabled": false,
										"parking_address_isDisabled": false,
										"parking_space_number_isDisabled": false,
										"parking_space_image_isDisabled": false,
										"shared_time_isDisabled": false,
										"lease_instructions_isDisabled": false,
										"timer_title_isDisabled": false,
					"timing_start_time_isDisabled": false,
					"timing_end_time_isDisabled": false,
						},

	
					// 用户列表
				list_user_publish_users: [],
						// 用户组
				group_user_publish_users: "",
				
		
		
		
		
		
	
			}
		},
		methods: {


	
	
				/**
			 * 获取注册用户用户列表
			 */
			async get_list_user_publish_users() {
                // if(this.user_group !== "管理员" && this.form["publish_users"] === 0) {
                //     this.form["publish_users"] = this.user.user_id;
                // }
                var json = await this.$get("~/api/user/get_list?user_group=注册用户");
                if(json.result && json.result.list){
                    this.list_user_publish_users = json.result.list;
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
												_this.form["publish_users"] = id
									_this.disabledObj['publish_users' + '_isDisabled'] = true
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
					get_user_publish_users(id){
				var obj = this.list_user_publish_users.getObj({"user_id":id});
				var ret = "";
				if(obj){
					if(obj.nickname){
						ret = obj.nickname;}
					else{
						ret = obj.username;
					}
				}
				return ret;
			},
			
	
			
	
			
	
						/**
			 * 上传车位图片
			 * @param {Object} param 图片参数
			 */
			upload_parking_space_image(param){
						this.uploadFile(param.file, "parking_space_image");
					},
	
	
			
	
			
	
		
			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
																		
				if(this.form && form){
					Object.keys(this.form).forEach(key => {
						Object.keys(form).forEach(dbKey => {
							// if(dbKey === "charging_standard"){
							// 	this.form['charging_rules'] = form[dbKey];
							// 	this.disabledObj['charging_rules_isDisabled'] = true;
							// };
							if(key === dbKey){
								this.disabledObj[key+'_isDisabled'] = true;
							}
						})
					})
				}
																		$.db.del("form");
				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){


																					
				if (this.form["timing_end_time"] && JSON.stringify(this.form["timing_end_time"]).indexOf("-")===-1) {
					this.form["timing_end_time"] = this.$toTime(parseInt(this.form["timing_end_time"]), "yyyy-MM-dd hh:mm:ss")
				}
				if (this.form["timing_start_time"] && JSON.stringify(this.form["timing_start_time"]).indexOf("-")===-1) {
					this.form["timing_start_time"] = this.$toTime(parseInt(this.form["timing_start_time"]), "yyyy-MM-dd hh:mm:ss")
				}


			},

			/**
			 * 提交前验证事件
			 * @param {Object} 请求参数
			 * @return {String} 验证成功返回null, 失败返回错误提示
			 */
			submit_check(param) {
				let msg = null
																											return msg;
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
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},
			getLongitudeLatitude() {
				let _this = this;
				_this.form.location_address = "广东省深圳市南山区科技园";
				_this.form.location_lng = "113.946782";
				_this.form.location_lat = "22.556481";
				//如果该对象存在，那么地理位置服务可用。
				if ('geolocation' in navigator) {
					/* 地理位置服务可用 */
					let options = {
						enableHighAccuracy: true, //布尔值，表示系统是否使用最高精度来表示结果，注意，这会导致较慢的响应时间或者增加电量消耗（比如对于支持gps的移动设备来说）。如果值为false ，设备会通过更快响应以及/或者使用更少的电量等方法来尽可能的节约资源。默认值fasle
						timeout: 5000, //它表明的是设备必须在多长时间（单位毫秒）内返回一个位置。默认直到获取到位置才会返回值。
						maximumAge: 0 //表明可以返回多长时间（即最长年龄，单位毫秒）内的可获取的缓存位置。如果设置为 0, 说明设备不能使用一个缓存位置，而且必须去获取一个真实的当前位置。默认0
					}
					function success(position) {
						//position.coords (只读) 返回一个定义了当前位置的Coordinates对象。
						//position.timestamp (只读) 返回一个时间戳DOMTimeStamp， 这个时间戳表示获取到的位置的时间。
						let lat = position.coords.latitude //当前位置的纬度
						let lng = position.coords.longitude //当前位置精度
						let location=lng+","+lat;
						let url = "http://restapi.amap.com/v3/geocode/regeo?key=b6eb2819a6ba4c5119591614272fe7ca&location="+location;
						_this.$axios.get(url, {
						}).then((res) => {
							if (res.status===200){
								let data = res.data;
								if (data.status==='1'){
									_this.form.location_address = data.regeocode.formatted_address;
									_this.form.location_lng = JSON.stringify(lng);
									_this.form.location_lat = JSON.stringify(lat);
								}else {
									console.log(data.info)
								}
							}
						}).catch((res) => {
							console.log(res);
						});
					}
					function error(err) {
						let errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时']
						console.log(errorType[err.code - 1])
					}
					navigator.geolocation.getCurrentPosition(success, error, options)
				} else {
					/* 地理位置服务不可用 */
					console.log('无法获取您的位置，请检查定位是否开启或刷新重试')
				}
			},

		},
		created() {
					this.get_list_user_publish_users();
					this.get_group_user_publish_users();
																	},
	}
</script>

<style>
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

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}




</style>
