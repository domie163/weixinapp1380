<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','order_number') || $check_field('add','order_number') || $check_field('set','order_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="订单号" prop="order_number">
												<el-input id="order_number" v-model="form['order_number']" placeholder="请输入订单号"
							  v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','order_number')) || (!form['parking_reservation_id'] && $check_field('add','order_number'))" :disabled="true"></el-input>
					<div v-else-if="$check_field('get','order_number')">{{form['order_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','parking_space_number') || $check_field('add','parking_space_number') || $check_field('set','parking_space_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="车位编号" prop="parking_space_number">
												<el-input id="parking_space_number" v-model="form['parking_space_number']" placeholder="请输入车位编号"
							  v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','parking_space_number')) || (!form['parking_reservation_id'] && $check_field('add','parking_space_number'))" :disabled="disabledObj['parking_space_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','parking_space_number')">{{form['parking_space_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','position') || $check_field('add','position') || $check_field('set','position')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="位置" prop="position">
												<el-input id="position" v-model="form['position']" placeholder="请输入位置"
							  v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','position')) || (!form['parking_reservation_id'] && $check_field('add','position'))" :disabled="disabledObj['position_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','position')">{{form['position']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','the_measure_of_area') || $check_field('add','the_measure_of_area') || $check_field('set','the_measure_of_area')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="面积" prop="the_measure_of_area">
												<el-input id="the_measure_of_area" v-model="form['the_measure_of_area']" placeholder="请输入面积"
							  v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','the_measure_of_area')) || (!form['parking_reservation_id'] && $check_field('add','the_measure_of_area'))" :disabled="disabledObj['the_measure_of_area_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','the_measure_of_area')">{{form['the_measure_of_area']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','user') || $check_field('add','user') || $check_field('set','user')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户" prop="user">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_user(form['user']) }}
							<!--<el-input id="business_name" v-model="form['user']" placeholder="请输入用户"-->
							<!--v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','user')) || (!form['parking_reservation_id'] && $check_field('add','user'))" :disabled="disabledObj['user_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','user')">{{form['user']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','user')) || (!form['parking_reservation_id'] && $check_field('add','user'))" id="user" v-model="form['user']" :disabled="disabledObj['user_isDisabled']">
								<el-option v-for="o in list_user_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','user')" id="user" v-model="form['user']" :disabled="true">
								<el-option v-for="o in list_user_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="user" v-model="form['user']" :disabled="disabledObj['user_isDisabled']">
							<el-option v-for="o in list_user_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','user_name') || $check_field('add','user_name') || $check_field('set','user_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户姓名" prop="user_name">
												<el-input id="user_name" v-model="form['user_name']" placeholder="请输入用户姓名"
							  v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','user_name')) || (!form['parking_reservation_id'] && $check_field('add','user_name'))" :disabled="disabledObj['user_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','user_name')">{{form['user_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','contact_number') || $check_field('add','contact_number') || $check_field('set','contact_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="联系电话" prop="contact_number">
												<el-input id="contact_number" v-model="form['contact_number']" placeholder="请输入联系电话"
							  v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','contact_number')) || (!form['parking_reservation_id'] && $check_field('add','contact_number'))" :disabled="disabledObj['contact_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','contact_number')">{{form['contact_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','start_time') || $check_field('add','start_time') || $check_field('set','start_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="开始时间" prop="start_time">
								<el-date-picker :disabled="disabledObj['start_time_isDisabled']" v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','start_time')) || (!form['parking_reservation_id'] && $check_field('add','start_time'))" id="start_time"
						v-model="form['start_time']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','start_time')">{{form['start_time']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','end_time') || $check_field('add','end_time') || $check_field('set','end_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="结束时间" prop="end_time">
								<el-date-picker :disabled="disabledObj['end_time_isDisabled']" v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','end_time')) || (!form['parking_reservation_id'] && $check_field('add','end_time'))" id="end_time"
						v-model="form['end_time']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','end_time')">{{form['end_time']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','appointment_instructions') || $check_field('add','appointment_instructions') || $check_field('set','appointment_instructions')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="预约说明" prop="appointment_instructions">
								<el-input type="textarea" id="appointment_instructions" v-model="form['appointment_instructions']" placeholder="请输入预约说明"
						v-if="user_group === '管理员' || (form['parking_reservation_id'] && $check_field('set','appointment_instructions')) || (!form['parking_reservation_id'] && $check_field('add','appointment_instructions'))" :disabled="disabledObj['appointment_instructions_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','appointment_instructions')">{{form['appointment_instructions']}}</div>
							</el-form-item>
			</el-col>
							<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="审核状态" prop="examine_state">
					<el-select id="examine_state" v-model="form['examine_state']"
						v-if="user_group === '管理员' || (form['examine_state'] && $check_examine()) || (!form['examine_state'] && $check_examine())">
						<el-option key="未审核" label="未审核" value="未审核"></el-option>
						<el-option key="已通过" label="已通过" value="已通过"></el-option>
						<el-option key="未通过" label="未通过" value="未通过"></el-option>
					</el-select>
					<div v-else>{{form["examine_state"]}}</div>
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
										"start_time":  '', // 开始时间
										"end_time":  '', // 结束时间
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
                    this.list_user_user = json.result.list;
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
												_this.form["user"] = id
									_this.disabledObj['user' + '_isDisabled'] = true
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
					get_user_user(id){
				var obj = this.list_user_user.getObj({"user_id":id});
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
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
									// 获取缓存数据附加
				form = $.db.get("form");
							$.push(this.form ,form);
																		
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
															        if (this.form["start_time"].indexOf("-")===-1){
            this.form["start_time"] = this.$toTime(parseInt(this.form["start_time"]),"yyyy-MM-dd hh:mm:ss")
        }
			        if (this.form["end_time"].indexOf("-")===-1){
            this.form["end_time"] = this.$toTime(parseInt(this.form["end_time"]),"yyyy-MM-dd hh:mm:ss")
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


																						        if(this.form["start_time"]=="0000-00-00 00:00:00"){
          this.form["start_time"] = null;
        }
				if(parseInt(this.form["start_time"]) > 9999){
					this.form["start_time"] = this.$toTime(parseInt(this.form["start_time"]),"yyyy-MM-dd hh:mm:ss")
				}
				        if(this.form["end_time"]=="0000-00-00 00:00:00"){
          this.form["end_time"] = null;
        }
				if(parseInt(this.form["end_time"]) > 9999){
					this.form["end_time"] = this.$toTime(parseInt(this.form["end_time"]),"yyyy-MM-dd hh:mm:ss")
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
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},

		},
		created() {
													this.get_list_user_user();
					this.get_group_user_user();
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
