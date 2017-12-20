<template>
  <div class="error-page">
    <h2 class="headline text-yellow"> 404</h2>

    <div class="error-content">
      <h3>
        <i class="fa fa-warning text-yellow"></i> Oops! 页面好像迷路了 ￣へ￣</h3>
      <p>
        <ul>
          <li> 我们好像找不到你要的页面</li>
          <li> 你可能没有当前页面的访问权限... ... </li>
          <li> 请检查下访问地址是否有误 </li>
          <li> 你可以尝试
           <router-link  :to="{ path: '/' }">返回首页 </router-link> 或者
           <router-link :to="-1">返回上一级 </router-link>
          </li>

        </ul>


      </p>


    </div>
    <!-- /.error-content -->
  </div>
</template>
<script>
  export default {
    name: 'notFound',
    method:{
        goBack(){
            this.$route.go(-1);
        },
        goHomePage(){
             this.$route.push('/');
        }
    }
    //  data(){return {}}, 
  }

</script>
