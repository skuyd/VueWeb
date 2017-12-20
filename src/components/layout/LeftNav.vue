<template>
   <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar" >
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img :src="headPic" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <!-- <p>{{userInfo.TrueName}}</p> -->
          <!-- <a href="#"> -->
            <i class="fa fa-circle text-success"></i> {{userInfo.ServerUnitName}}
            <!-- </a> -->
        </div>
      </div>
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="快速搜索交付... ...">
          <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree" >
        <li class="header">我的菜单</li>
        <li class="treeview">
          <router-link :to="'/Dashboard'"><i class="fa fa-child"></i> <span>欢迎使用51交付</span></router-link >      
        </li>
      
        <treeMenu v-for="nav in navList" :key="nav.Id" :menu="nav"></treeMenu>
       
 
        <li class="header">服务中心</li>
        <li>  <router-link :to="'/ServiceCenter/SysInfo'" ><i class="fa fa-circle-o text-red"></i> <span>系统使用指南</span></router-link></li>
        <li> <router-link :to="'/ServiceCenter/FAQ'" ><i class="fa fa-circle-o text-yellow"></i> <span>常见问题(FAQ)</span></router-link></li>
        <li> <router-link :to="'/ServiceCenter/FeedBack'" ><i class="fa fa-circle-o text-aqua"></i> <span>意见反馈</span></router-link></li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
import headPic from "@/assets/dist/img/user2-160x160.jpg"
import treeMenu from "../Layout/treeMenu"
import nav from "../../api/navlist.js"
export default {
  name:"LeftNav",
  data(){
    return {
    headPic:headPic,
    navList:nav.getNavList()
    }
  },
  props:["userInfo"],
  methods:{},
  created(){},
  watch:{},
  components:{treeMenu}
}
</script>