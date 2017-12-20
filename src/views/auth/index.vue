<template>
<div class="login-box" style="margin-top:20% auto !important;width:40%;">
  <div class="login-logo">
    <a href="#"><i class="fa fa-lock" aria-hidden="true"></i> <b>51</b>交付 | 认证中心</a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">

  <div class="box box-info">
        <!-- <div class="box-header with-border">
          <h2 class="box-title"> <i class="fa fa-lock" aria-hidden="true"></i> | 验证登陆身份 <small></small></h2>
       
        </div> -->
        <div class="box-body" style="font-size:24px;border:0;padding:40px 8px;text-align:center;">
        {{msg}}       
        </div>
        
      </div>
  </div>
  <!-- /.login-box-body -->
</div>
</template>
<script>
// import Vue from 'vue'
// import t from '@/common/const/index'
// http (使用 axios 实现)
// import $http from '@/common/http/index.js'


export default {
 name:'login',
 tokenId:null,
 data(){
     return {
         msg:' 正在努力验证中,请稍后... ... '
     }
 },
//  props:['tokenId'],
 methods:{
login(){
    var fragments = getFragment();
    // t.settoken(fragments);
    this.$store.commit('modifyToken',fragments);
    // Vue.prototype.$http = $http;

    this.$http.init(this.$store.getters.token.access_token,this.$store.getters.baseUrl);
    this.$router.push({path: '/Participant/User'});
   }
 },
 created(){
    
     this.login();
 }

}

function getFragment() {
            if (window.location.hash.indexOf("#") === 0) {
                return parseQueryString(window.location.hash.substr(1));
            } else {
                return {};
            }
        }
function signin(data) {
            //if (data.state !== nonce) {
            //    return;
            //}

            $('#AccessToken').val(data.access_token);
            $.cookie('token', data.access_token, { path: '/' });
            window.location = "/";

}
        function parseQueryString(queryString) {
            var data = {},
                pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

            if (queryString === null) {
                return data;
            }

            pairs = queryString.split("&");

            for (var i = 0; i < pairs.length; i++) {
                pair = pairs[i];
                separatorIndex = pair.indexOf("=");

                if (separatorIndex === -1) {
                    escapedKey = pair;
                    escapedValue = null;
                } else {
                    escapedKey = pair.substr(0, separatorIndex);
                    escapedValue = pair.substr(separatorIndex + 1);
                }

                key = decodeURIComponent(escapedKey);
                value = decodeURIComponent(escapedValue);

                data[key] = value;
            }

            return data;
        }


</script>




