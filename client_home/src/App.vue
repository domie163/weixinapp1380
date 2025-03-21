<script>
	export default {
		onLaunch: function() {
			console.log("App Launch");
		},
		onShow: function() {
			console.log("App Show");
			var token = uni.db.get("token");
			this.$store.commit("user_set", {
				token: token,
			});
		},
		onHide: function() {
			console.log("App Hide");
		},
	};
</script>


<style lang="scss">
@import "./static/css/icon.css";
@import "./static/css/common.css";
@import "./static/css/theme.css";
@import "./static/css/diy.scss";
</style>
