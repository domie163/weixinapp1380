<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">

							<el-col v-if="user_group === '管理员' || $check_field('get','report_name') || $check_field('add','report_name') || $check_field('set','report_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="报表名称" prop="report_name">
												<el-input id="report_name" v-model="form['report_name']" placeholder="请输入报表名称"
							  v-if="user_group === '管理员' || (form['financial_information_id'] && $check_field('set','report_name')) || (!form['financial_information_id'] && $check_field('add','report_name'))" :disabled="disabledObj['report_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','report_name')">{{form['report_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','statistical_period') || $check_field('add','statistical_period') || $check_field('set','statistical_period')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="统计周期" prop="statistical_period">
								<el-select id="statistical_period" v-model="form['statistical_period']"
						v-if="user_group === '管理员' || (form['financial_information_id'] && $check_field('set','statistical_period')) || (!form['financial_information_id'] && $check_field('add','statistical_period'))">
						<el-option v-for="o in list_statistical_period" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','statistical_period')">{{form['statistical_period']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','income_amount') || $check_field('add','income_amount') || $check_field('set','income_amount')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="收入金额" prop="income_amount">
												<el-input id="income_amount" v-model="form['income_amount']" placeholder="请输入收入金额"
							  v-if="user_group === '管理员' || (form['financial_information_id'] && $check_field('set','income_amount')) || (!form['financial_information_id'] && $check_field('add','income_amount'))" :disabled="disabledObj['income_amount_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','income_amount')">{{form['income_amount']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','revenue_description') || $check_field('add','revenue_description') || $check_field('set','revenue_description')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="收入说明" prop="revenue_description">
								<el-input type="textarea" id="revenue_description" v-model="form['revenue_description']" placeholder="请输入收入说明"
						v-if="user_group === '管理员' || (form['financial_information_id'] && $check_field('set','revenue_description')) || (!form['financial_information_id'] && $check_field('add','revenue_description'))" :disabled="disabledObj['revenue_description_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','revenue_description')">{{form['revenue_description']}}</div>
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
				field: "financial_information_id",
				url_add: "~/api/financial_information/add?",
				url_set: "~/api/financial_information/set?",
				url_get_obj: "~/api/financial_information/get_obj?",
				url_upload: "~/api/financial_information/upload?",

				query: {
					"financial_information_id": 0,
				},

				form: {
								"report_name":  '', // 报表名称
										"statistical_period":  '', // 统计周期
										"income_amount":  '', // 收入金额
										"revenue_description":  '', // 收入说明
											"financial_information_id": 0, // ID
						
				},
				disabledObj:{
								"report_name_isDisabled": false,
										"statistical_period_isDisabled": false,
										"income_amount_isDisabled": false,
										"revenue_description_isDisabled": false,
										},

	
						// 统计周期选项列表
				list_statistical_period: ['月','年'],
	
		
		
	
			}
		},
		methods: {


	
	
			
	
			
	
			
	
		
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
					bl = this.$check_action('/financial_information/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/financial_information/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/financial_information/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/financial_information/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/financial_information/view','get');
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
