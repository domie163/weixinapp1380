/*
 * @Author: winbin
 * @Date: 2022-04-21 20:36:17
 * @LastEditors: winbin
 * @LastEditTime: 2022-04-21 22:47:15
 * @FilePath: \uni_tpl\src\plugins\index.js
 */
import sdk from './sdk.js';
import expand from './expand.js';
import component from './component.js'
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css' // import styles
// import 'quill/dist/quill.snow.css' // for snow theme
// import 'quill/dist/quill.bubble.css' // for bubble theme

uni.db = {
	get(key) {
		var value;
		try {
			value = uni.getStorageSync(key);
		} catch (e) {
			console.log("读取失败！");
		}
		return value;
	},
	set(key, value) {
		try {
			uni.setStorageSync(key, value);
		} catch (e) {
			console.log("保存失败！");
			value = null;
		}
		return value
	},
	del(key) {
		try {
			uni.removeStorageSync(key);
		} catch (e) {
			console.log("读取失败！");
		}
	}
}
export default {
	install(Vue, options) {
		Vue.use(component, options);
		// Vue.use(VueQuillEditor, options)
	}
}
