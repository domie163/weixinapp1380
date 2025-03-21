export default {
  state() {
    return {
      "user_id": 0,
      "token": "",
      "username": "",
      "referee_id": 0,
      "vip": 0,
      "gm": 0,
      "mc": 0,
      "phone": "",
      "phone_state": 0,
      "email": "",
      "email_state": 0,
      "login_ip": "",
      "login_time": "",
      "user_group": "游客",
      "user_admin": "",
      "signature": "",
      "nickname": "",
      "avatar": "",
      "invite_code": "",
      "friends": "",
      "state": 0
    }
  },
  mutations: {
    user_set(state, obj) {
      for (var k in obj) {
        state[k] = obj[k]
      }
      if (obj.token) {
        uni.db.set("token", obj.token, 120);
      }
    },
    sign_out(state) {
      state.token = "";
      state.username = "";
      // var path = location.pathname;
	  let pages = getCurrentPages();
	  let path = pages[pages.length - 1].route;
	  console.log(path);
      uni.db.del("token");
      if (path.indexOf('/sign_in') !== 0) {
		uni.redirectTo({
		    url: '/pages/account/login'
		});
      }
    }
  }
}
