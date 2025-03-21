<template>
  <div>
    <div class="log_box">
        <button class="log_bntx" @click="visLog" >x{{ bntx_text }}</button>
        <div class="log_conter" v-for="item in  History_log" >

          <span class="texts nm"   v-show="showRentPrise">{{ item }}</span>
        
        </div>
       
        <div class="log_conter" v-for="item in  mode_names" >

            <span class="texts nm"   v-show="showRentPrise">{{ item }}</span>
          
        </div>
    </div>
    
  </div>
  
</template>
 
<script>


export default {

  data() {
    name:'gettime'
    return {
      uesr_names:this.$store.state.web.auth[0].user_group,//用户名称
      mode_names:[],//模块
      History_log:[],//历史
      showRentPrise:true,
      bntx_text:''
      
    }
    
  },
  methods: {
    visLog(){
      this.showRentPrise =!this.showRentPrise
      console.log(this.showRentPrise);
      if(this.showRentPrise===true){
        this.bntx_text = '隐藏日志'
        console.log(this.bntx_text);
      }else if(this.showRentPrise===false){
        this.bntx_text = '显示日志'
      }
      console.log(this.$store.state.web.auth[0].user_group );
    }
  },

  mounted() {
    if (this.$store.state.web.auth[0].user_group==='管理员') {
      
    let data_hory =  sessionStorage.getItem('log_msg');
    this.History_log = data_hory ? JSON.parse(data_hory) : []
    }
    else{
      sessionStorage.clear("log_msg")
    }
    if(this.$store.state.web.auth[0].user_group==='商城用户'){
      let data_hory =  sessionStorage.getItem('log_msg');
    this.History_log = data_hory ? JSON.parse(data_hory) : []
    }else{
      sessionStorage.clear("log_msg")
    }
    if(this.$store.state.web.auth[0].user_group==='卖家'){
      let data_hory =  sessionStorage.getItem('log_msg');
    this.History_log = data_hory ? JSON.parse(data_hory) : []
    }
    else{
      sessionStorage.clear("log_msg")
    }
 
    // console.log(this.History_log);
    
    
   
  },

 
  // 动态获取模块
  watch: {

  

    $route(to, from) {
      var timeOne = new Date();
      let year = timeOne.getFullYear();
      let month = timeOne.getMonth() + 1;
      let day = timeOne.getDate();
      let hour = timeOne.getHours();
      let minute = timeOne.getMinutes();
      let second = timeOne.getSeconds();
      month = month > 9 ? month : '0' + month 
      hour  = hour  > 9 ? hour  : '0' + hour 
      minute = minute > 9 ? minute : '0' + minute
      second = second > 9 ? second : '0' + second
			let logs = ` ${year}-${month}-${day} ${hour}:${minute}:${second}`;
      
    
      

    //  //因为router表有些没有meta.title属性做判断
    //   if(this.$route.path === "/mall_center/table"){
    //     this.$route.meta.title='商城中心'
        
    //   }else if(this.$route.path === "/mall_center/view"){
    //     this.$route.meta.title='商城中心详情页'
    //   }
    //   else if(this.$route.path === "/mall_users/table"){
    //     this.$route.meta.title='商城用户'

    //   }else if(this.$route.path === "/mall_users/view"){
    //     this.$route.meta.title='商城用户详情页'
    //   }
    //   else if(this.$route.path === "/seller/table"){
    //     this.$route.meta.title='卖家中心'

    //   }else if(this.$route.path === "/seller/view"){
    //     this.$route.meta.title='卖家中心详情'
    //   }
    //   else if(this.$route.path === "/customized_goods/table"){
    //     this.$route.meta.title='定制商品列表'

    //   }else if(this.$route.path === "/customized_goods/view"){
    //     this.$route.meta.title='定制商品详情'

    //   }else if(this.$route.path === "/i_want_to_customize/table"){
    //     this.$route.meta.title='我要制定商品列表'
        
    //   }else if(this.$route.path === "/i_want_to_customize/view"){
    //     this.$route.meta.title='我要制定商品详情'
        
    //   }else if(this.$route.path === "/classification_information/table"){
    //     this.$route.meta.title='分类信息列表'
       
    //   }else if(this.$route.path === "/classification_information/view"){
    //     this.$route.meta.title='分类信息详情'
      
    //   }else if(this.$route.path === "/website_announcement/table"){
    //     this.$route.meta.title='网站公告列表'
        
    //   }else if(this.$route.path === "/website_announcement/view"){
    //     this.$route.meta.title='网站公告详情'
        
    //   }
    //   else if(this.$route.path === "/hot_books/table"){
    //     this.$route.meta.title='热卖图书列表'
        
    //   }
    //   else if(this.$route.path === "/hot_books/view"){
    //     this.$route.meta.title='热卖图书详情页'
      
    //   } 
      
      
      //存入展示数组
      this.mode_names.push(this.$store.state.web.auth[0].user_group+'--'+this.$route.meta.title+logs)
      //本地储存
      sessionStorage.setItem('log_msg',JSON.stringify(this.mode_names))
;
     
    }
    
    
 },
 

 

}
  
</script>

<style  scoped>
    .log_box{
    height: 157px;
    position: absolute;
    right: 2px;
    background-color: transparent;
    bottom: 2px;
    overflow-y: scroll;
    z-index: 5;
    }
    .log_conter{}
    
    .texts{
      
      height: 40px;
      font-size: 15px;
      font-weight: 700;
      color: #141414;
      display: block;
      background-color: #fffefe;
      border-radius:5px;
      box-sizing: border-box;
      text-align: center;
      line-height: 20px;
      margin-top: 10px;
      box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
      position: relative;
      padding: 10px;
    }
    .hs{
      width: 220px;
    }

</style>