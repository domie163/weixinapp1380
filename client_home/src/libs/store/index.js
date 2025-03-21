import Vue from 'vue'
import Vuex from 'vuex'

import user from './user.js'
import web from './web.js'
Vue.use(Vuex)

var vuex = new Vuex.Store({
	state: {
		count: 6
	},
	modules: {
		user,
		web
	}
});

//实例store并导出
export default vuex
