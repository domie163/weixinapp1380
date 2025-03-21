// 引用富文本编辑器
// import VueQuillEditor from 'vue-quill-editor'
// // 引入富文本样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

import host_config from './port_config'

var host = host_config;

export default {
	/**
	 * 安装
	 * @param {Object} Vue vue类
	 * @param {Object} optons 配置参数
	 */
	install(Vue, optons) {
		// 富文本编辑器实例化
		// Vue.use(VueQuillEditor)
		if (optons && optons.host) {
			host = optons.host;
		}

		var redirect_url = "";
		Vue.mixin({
			data() {
				return {}
			},
			methods: {

				/**
				 *  改变时间
				 */
				$changeTime(o) {
					for (var k in o) {
						if (k.indexOf('time') !== -1) {
							if (typeof (k) == 'string') {
								var val = o[k];
								if (val || val.indexOf('T') !== -1) {
									var v = new Date(o[k]);
									o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
								} else if (/\d+/.test(val)) {
									if (o[k].length == 10) {
										var v = new Date(o[k] * 1000);
										o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
									} else if (o[k].length == 13) {
										var v = new Date(o[k] * 1000);
										o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
									}
								} else if (typeof (k) == 'number') {
									var v = new Date(o[k]);
									o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
								}
							}
						}
					}
				},

				$message(content, type = "none") {
					uni.showToast({
						title: content,
						icon: type,
						duration: 2000
					});
				},
				$get_rand(len) {
					var rand = Math.random();
					return Math.ceil(rand * 10 ** len);
				},
				/**
				 * 获取当前时间戳
				 */
				$get_stamp() {
					return new Date().getTime();
				},
				/**
				 * 下载
				 * @param {String} url 下载地址
				 * @param {String} name 保存的名字
				 */
				$download(url, name) {
					var anchor = document.createElement('a');
					if (!name) {
						var arr = url.split("/");
						name = arr[arr.length - 1];
					}
					if ('download' in anchor) {
						anchor.href = url.replace("~/", host);
						anchor.setAttribute("download", name);
						anchor.className = "download-js-link";
						anchor.style.display = "none";
						document.body.appendChild(anchor);
						setTimeout(function () {
							anchor.click();
							document.body.removeChild(anchor);
						}, 66);
						return true;
					}
				},
				/**
				 * 导航跳转
				 * @param {String} url 链接地址
				 */
				$nav(url) {
					if (url.indexOf("/") === 0) {
						var _uni = uni;
						uni.switchTab({
							url,
							fail: () => {
								console.log("switchTab接口跳转失败", url)
							}
						});
						uni.navigateTo({
							url,
							fail: () => {
								console.log("navigateTo接口跳转失败", url)
							}
						})

					} else {
						uni.navigateBack({
							delta: 1
						});
					}
				},

				/**
				 * 跳转地址
				 * @param {String} url
				 */
				$redirect(url) {
					if (url) {
						redirect_url = url;
					} else {
						return redirect_url;
					}
				},
				/**
				 * @description 提示框
				 * @param {String} text 提示内容
				 * @param {String} type 显示类型
				 */
				$toast(text, type = 'dark') {
					uni.showToast({
						title: text,
						icon: "none",
						duration: 2000
					});
				},
				/**
				 * 转换时间格式
				 * @param {String} time 时间字符串
				 * @param {String} format 格式
				 */
				$toTime(time, format) {
					var s_time = time.toString();
					if (s_time.length == 13) {
						time = time / 1000;
					}
					return time.toTime().toStr(format);
				},
				/**
				 * @description 过滤数组
				 * @param {Array} arr 被过滤的数组
				 * @param {String} key 判断的键
				 * @param {Object} value 判断的值
				 * @return {Array} 返回过滤后的数组
				 */
				$filter(arr, key, value) {
					var ar = [];
					for (var i = 0; i < arr.length; i++) {
						var o = arr[i];
						if (o[key] === value) {
							ar.push(o);
						}
					}
					return ar;
				},

				/**
				 * @description 转url字符串
				 * @param {Object} obj 被转换的对象
				 * @param {String} url 请求地址
				 * @return {String} url参数格式字符串
				 */
				$toUrl(obj, url) {
					var queryStr = "";
					for (var key in obj) {
						var value = obj[key];
						if (typeof (value) === 'number') {
							if (value > 0) {
								queryStr += "&" + key + "=" + obj[key];
							}
						} else if (value) {
							queryStr += "&" + key + "=" + encodeURI(value);
						}
					}
					if (url) {
						if (url.endWith('?') || url.endWith('&')) {
							return url + queryStr.replace('&', '');
						} else if (url.indexOf('?') === -1) {
							return url + queryStr.replace('&', '?');
						} else {
							return url + queryStr;
						}
					} else {
						return queryStr.replace('&', '');
					}
				},
				/**
				 * 转换名称
				 * @param {Array} list 数组
				 */
				$toName(list, value, value_key = 'name', key = 'value') {
					var ret = "";
					for (var i = 0; i < list.length; i++) {
						var o = list[i];
						if (o[key] === value) {
							ret = o[value_key];
						}
					}
					return ret;
				},
				/**
				 * 补全请求url
				 * @param {String} url 现地址
				 * @return {String} 新地址
				 */
				$fullUrl(url) {
					var url_new = "";
					if (url) {
						if (url.indexOf("~/") === 0) {
							url_new = url.replace('~/', host);
						} else if (url.indexOf("/http://") === 0) {
							url_new = url.replace('/http://', 'http://');
						} else if (url.indexOf("/") === 0) {
							url_new = url.replace('/', host);
						} else {
							url_new = url;
						}
					}
					return url_new;
				},
				/**
				 * 补全请求url
				 * @param {String} url 现地址
				 * @return {String} 新地址
				 */
				$fullImgUrl(url) {
					if (url) {
						return this.$fullUrl(url)
					} else {
						return "/static/img/logo.png"
					}
				},

				/**
				 * GET请求
				 * @param {String} url 请求地址
				 * @param {Object} body 请求参数
				 * @param {Funciton} func 回调函数，可以为空，为空则采用await返回值
				 * @return {Object} 返回请求结果
				 */
				async $get(url, body, func) {
					url = url.replace('~/', host);
					if (body) {
						url = this.$toUrl(body, url);
					}
					if (func) {
						uni.request({
							url, // 仅为示例，并非真实接口地址。
							method: "GET",
							header: {
								'x-auth-token': this.$store.state.user.token
							},
							dataType: "json",
							success: function (res) {
								func(res.data);
							},
							error: function (err) {
								func(err);
							}
						});
					} else {
						var [error, res] = await uni.request({
							url, // 仅为示例，并非真实接口地址。
							header: {
								'x-auth-token': this.$store.state.user.token
							},
							dataType: "json",
							data: body
						});
						return res.data;
					}
				},
				/**
				 * POST请求
				 * @param {String} url 请求地址
				 * @param {Object} data 请求参数
				 * @param {Funciton} func 回调函数，可以为空，为空则采用await返回值
				 * @return {Object} 返回请求结果
				 */
				async $post(url, data, func) {
					url = url.replace('~/', host);
					if (func) {
						uni.request({
							url, // 仅为示例，并非真实接口地址。
							method: "POST",
							header: {
								"accept": "application/json, text/plain, */*",
								'x-auth-token': this.$store.state.user.token || null,
								'Content-Type': 'application/json'
							},
							dataType: "json",
							data,
							success: function (res) {
								func(res.data);
							},
							error: function (err) {
								func(err);
							}
						});
					} else {
						var [error, res] = await uni.request({
							url, // 仅为示例，并非真实接口地址。
							method: "POST",
							header: {
								"accept": "application/json, text/plain, */*",
								'x-auth-token': this.$store.state.user.token || null,
								'Content-Type': 'application/json'
							},
							dataType: "json",
							data
						});
						return res.data;
					}
				},
				/**
				 * 上传文件
				 * @param {String} url 请求地址
				 * @param {Object} body 请求参数
				 * @param {Funciton} func 回调函数，可以为空，为空则采用await返回值
				 * @return {Object} 返回请求结果
				 */
				async $upload(url, body, func) {
					url = url.replace('~/', host);
					// 设置请求头 - 临时访问牌
					uni.setHeader('x-auth-token', this.$store.state.user.token);
					// 设置请求头 - 发送的内容类型
					uni.setHeader('Content-Type', 'multipart/form-data', ['post']);
					if (func) {
						// 如果回调函数存在, 则采用异步
						uni.post(url, body).then((res) => {
							func(res.data);
						}).catch((res) => {
							func(res);
						});
					} else {
						// 否则采用同步
						var res = await uni.post(url, body);
						return res.data;
					}
				},

				/**
				 * @description 获取用户信息
				 * @param {Function} func 回调函数
				 */
				$get_user(func) {
					var _this = this;

					this.$get('~/api/user/state', null, function (json, status) {
						if (json.result) {
							var user = json.result;
							if (user.obj) {
								user = user.obj;
							}
							_this.$store.commit('user_set', user);

							// 获取用户权限
							_this.$get_auth(user.user_group, () => {
								// 传入回调函数
								if (func) {
									func(user);
								}
							});
						} else if (json.error) {
							// 非法访问或未登录
							_this.$store.commit('sign_out');
						} else {
							_this.$toast('服务器连接失败！');
						}
					});
				},

				/**
				 * 获取用户组权限
				 * @param {String} user_group 用户组
				 */
				async $get_auth(user_group = "游客", func) {
					// 查询权限
					this.$get("~/api/auth/get_list?", {
						user_group
					}, (json) => {
						// 清空权限
						this.$store.commit("set_auth", []);
						uni.db.set("auth", []);
						// 判断查询结果
						if (json.result) {
							var auth = json.result;
							if (auth.list) {
								auth = auth.list;
							}
							// 权限缓存
							this.$store.commit("set_auth", auth);
							uni.db.set("auth", auth);
							// 如果有回调函数则执行回调函数
							if (func) {
								func();
							}
						} else if (json.error) {
							console.error(json.error)
						}
					});
				},

				/**
				 * 获取权限
				 * @param {String} path 路由路径
				 */
				$get_power(path) {
					var auth = this.$store.state.web.auth;
					if (!auth || auth.lenght < 1) {
						auth = uni.db.get("auth");
					}
					var obj;
					if (auth && auth.length > 0) {
						for (var i = 0; i < auth.length; i++) {
							var o = auth[i];
							if (o.path === path) {
								obj = o;
								break;
							}
						}
					}
					return obj;
				},

				/**
				 * 判断是否具备操作权限 鉴权
				 * @param {String} action 操作名
				 */
				$check_action(path, action = "get") {
					// console.log("鉴权页面",path,"鉴别权限",action);
					var o = this.$get_power(path);
					if (!o) {
						let index = path.lastIndexOf("/");
						let path_last = path.substring(index + 1, path.length);
						if (path_last === "edit"){
							return false;
						}
						return true;
					}
					if (["add", "set", "del", "get"].indexOf(action) !== -1 && o[action] != 0) {
						return o[action];
					} else if (o.option) {
						return o.option[action];
					} else {
						return false;
					}
				},

				/**
				 * 获取路径对应操作权限 鉴权
				 * @param {String} action 操作名
				 */
				$check_exam(path, action = "get") {
					var paths = this.$mp.page.route || this.$route.path
					var path = paths.replaceAll("pages", "");
					var o = this.$get_power(path);
					if (o) {
						var option = JSON.parse(o.option);
						if (option[action])
							return true
					}
					return false;
				},

				/**
				 * 是否有支付字段的权限
				 */
				$check_pay() {
					var paths = this.$mp.page.route || this.$route.path
					var path = paths.replaceAll("pages", "");
					var o = this.$get_power(path);
					if (o) {
						var option = JSON.parse(o.option);
						if (option.pay)
							return true
					}
					return false;
				},

				/**
				 * 是否有审核字段的权限
				 */
				$check_examine() {
					var paths = this.$mp.page.route || this.$route.path
					let index = paths.lastIndexOf("/");
					let path_pre = paths.substring(0, index+1);
					let path_last = paths.substring(index + 1, paths.length);
					path_pre = path_pre.replace("pages", "")
					path_last = path_last.replace("view", "table").replace("edit", "table")
					var path = path_pre+path_last;
					var o = this.$get_power(path);
					if (o) {
						var option = JSON.parse(o.option);
						if (option.examine)
							return true
					}
					return false;
				},

				/**
				 * 是否有审核字段的权限
				 */
				$check_cart_page(path) {
					var o = this.$get_power(path);
					if (o) {
						var option = JSON.parse(o.option);
						if (option.cart_page)
							return true
					}
					return false;
				},

				/**
				 * 注册时是否有显示或操作字段的权限
				 * @param {String} action 操作名
				 * @param {String} field 查询的字段
				 * @param {String} path 路径
				 */
				$check_register_field(action, field, path) {
					var o = this.$get_power(path);
					var auth;
					if (o && o[action] != 0 && o[action] != false) {
						auth = o["field_" + action];
					}
					if (auth) {
						return auth.indexOf(field) !== -1;
					}
					return false;
				},

				/**
				 * 是否有显示或操作字段的权限
				 * @param {String} action 操作名
				 * @param {String} field 查询的字段
				 */
				$check_field(action, field) {
					// console.log("鉴权字段",field,"鉴别权限",action);
					var paths = this.$mp.page.route || this.$route.path
					var path = paths.replace(/pages/, "")
					var o = this.$get_power(path);
					var auth;
					if (o && o[action]) {
						auth = o["field_" + action];
					}
					if (auth) {
						return auth.indexOf(field) !== -1;
					}
					return false;
				},
				/**
				 * 是否有显示或操作字段的权限
				 * @param {String} action 操作名
				 * @param {String} field 查询的字段
				 * @param {String} path 路径
				 */
				$check_index_field(action, field, path) {
					// console.log("鉴权字段",field,"鉴别权限",action);
					// var path = this.$route.path.replace(/\/pages/, "")
					console.log(path)
					var o = this.$get_power(path);
					var auth;
					if (o && o[action]) {
						auth = o["field_" + action];
					}
					if (auth) {
						return auth.indexOf(field) !== -1;
					}
					return false;
				},
				/**
				 * 小程序rich-text图片统一
				 * @param {Sting} content 数据内容
				 */
				$setRichTextImage(content) {
					var new_content = content.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img$1')
						.replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img$1')
						.replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img$1')
						.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img$1')
						.replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img style="width: 100%;" $1');

					return new_content
				},
				/**
				 * 选择文件公共方法
				 */
				$chooseFile() {
					return new Promise((resolve, reject) => {
						let platform = uni.getSystemInfoSync().platform
						if (platform == "android") { // 区分安卓端调用原生插件
							uni.chooseVideo({
								sourceType: ['camera', 'album'],
								success: function (res) {
									resolve([{
										path: res.tempFilePath
									}])
								}
							});
						} else {
							let chooseFile = uni.chooseFile;
							if (typeof wx !== 'undefined' &&
								typeof wx.chooseMessageFile === 'function') {
								chooseFile = wx.chooseMessageFile;
							}
							chooseFile({
								count: 1,
								sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ["album"], //从相册选择
								success: function (res) {
									resolve(res.tempFiles)
								},
								error: function (e) {
									reject(e);
								},
							})
						}
					})
				}
			}
		})
	}
}
