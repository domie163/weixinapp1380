<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','parking_space_number') || $check_field('add','parking_space_number') || $check_field('set','parking_space_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="车位编号" prop="parking_space_number">
												<el-input id="parking_space_number" v-model="form['parking_space_number']" placeholder="请输入车位编号"
							  v-if="user_group === '管理员' || (form['shared_parking_spaces_id'] && $check_field('set','parking_space_number')) || (!form['shared_parking_spaces_id'] && $check_field('add','parking_space_number'))" :disabled="disabledObj['parking_space_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','parking_space_number')">{{form['parking_space_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','position') || $check_field('add','position') || $check_field('set','position')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="位置" prop="position">
												<el-input id="position" v-model="form['position']" placeholder="请输入位置"
							  v-if="user_group === '管理员' || (form['shared_parking_spaces_id'] && $check_field('set','position')) || (!form['shared_parking_spaces_id'] && $check_field('add','position'))" :disabled="disabledObj['position_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','position')">{{form['position']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','state') || $check_field('add','state') || $check_field('set','state')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="状态" prop="state">
								<el-select id="state" v-model="form['state']"
						v-if="user_group === '管理员' || (form['shared_parking_spaces_id'] && $check_field('set','state')) || (!form['shared_parking_spaces_id'] && $check_field('add','state'))">
						<el-option v-for="o in list_state" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','state')">{{form['state']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','parking_space_image') || $check_field('add','parking_space_image') || $check_field('set','parking_space_image')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="车位图片" prop="parking_space_image">
								<el-upload :disabled="disabledObj['parking_space_image_isDisabled']" id="parking_space_image" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_parking_space_image"
						:show-file-list="false" v-if="user_group === '管理员' || (form['shared_parking_spaces_id'] && $check_field('set','parking_space_image')) || (!form['shared_parking_spaces_id'] && $check_field('add','parking_space_image'))">
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
								<el-col v-if="user_group === '管理员' || $check_field('get','the_measure_of_area') || $check_field('add','the_measure_of_area') || $check_field('set','the_measure_of_area')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="面积" prop="the_measure_of_area">
												<el-input id="the_measure_of_area" v-model="form['the_measure_of_area']" placeholder="请输入面积"
							  v-if="user_group === '管理员' || (form['shared_parking_spaces_id'] && $check_field('set','the_measure_of_area')) || (!form['shared_parking_spaces_id'] && $check_field('add','the_measure_of_area'))" :disabled="disabledObj['the_measure_of_area_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','the_measure_of_area')">{{form['the_measure_of_area']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','fee_rules') || $check_field('add','fee_rules') || $check_field('set','fee_rules')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="收费规则" prop="fee_rules">
								<el-input type="textarea" id="fee_rules" v-model="form['fee_rules']" placeholder="请输入收费规则"
						v-if="user_group === '管理员' || (form['shared_parking_spaces_id'] && $check_field('set','fee_rules')) || (!form['shared_parking_spaces_id'] && $check_field('add','fee_rules'))" :disabled="disabledObj['fee_rules_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','fee_rules')">{{form['fee_rules']}}</div>
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
				list_state: ['空闲','停放中'],
	
		
		
		
	
			}
		},
		methods: {


	
	
			
	
			
	
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
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},

		},
		created() {
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
