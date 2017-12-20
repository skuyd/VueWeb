<template>

  <body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">
      <AppHeader :userInfo="userInfo" />
      <LeftNav :userInfo="userInfo" />
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <!-- <BreadCrumb :list="list" /> -->
        <el-main>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </div>
      <RightBar/>
      <AppFooter/>
    </div>
  </body>
</template>
<script>
  // 导航数据
  // import nav from "@/common/init/_loadNav";

  // import {
  //   Header as AppHeader,
  //   SideBar,
  //   LeftNav as AppAside,
  //   Footer as AppFooter,
  //   BreadCrumb
  // } from "@/components/Layout/";

  import AppHeader from "../components/Layout/Header.vue";
  import RightBar from "../components/Layout/SideBar.vue";
  import LeftNav from "../components/Layout/LeftNav.vue";
  import AppFooter from "../components/Layout/Footer.vue";
  import BreadCrumb from "../components/Layout/BreadCrumb.vue";


  //-- 模拟数据引入
  import mockapi from "../api/mockapi.js";

  export default {
    name: "Full",
    components: {
      AppHeader,
      RightBar,
      LeftNav,
      AppFooter,
      BreadCrumb
    },
    data() {
      return {
        navlist: [{
          navName: "导航",
          navUrl: '/Test'
        }],
        userInfo: mockapi.getUserInfo()
      }

    },
    computed: {
      name() {
        return this.$route.name
      },
      list() {
        return this.$route.matched
      }
    }
  };

</script>
<style>


</style>
