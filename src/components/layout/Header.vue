<template>

  <header class="main-header"  >
    <!-- Logo -->
    <router-link :to="'/'" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini">
        <b>51</b>
      </span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">{{this.getSysName()}}</span>
    </router-link>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">隐藏导航</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- <li >
              <span class="label"> <timeclock/></span>           
           </li> -->
          <!-- Messages: style can be found in dropdown.less-->
          <li class="dropdown messages-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-envelope-o"></i>
              <span class="label label-success">{{noticeDynamic.newNum}}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">{{noticeDynamic.newNum}}条新消息</li>
              <li>
                <!-- inner menu: contains the actual data -->

                <ul class="menu">
                  <li v-for="notice in noticeDynamic.noticeList" :key="notice.Id">
                    <!-- start message -->
                    <a :href="'/Notice/'+notice.Id">
                      <div class="pull-left">
                        <img :src="headPic" class="img-circle" alt="User Image">
                      </div>
                      <h4>
                        {{notice.CreatorName}}
                        <small>
                          <i class="fa fa-clock-o"></i>{{notice.CreateTime}}</small>
                      </h4>
                      <p>{{notice.Title}}</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer">
                <a href="/Notice">查看全部</a>
              </li>
            </ul>
          </li>
          <!-- Notifications: style can be found in dropdown.less -->
          <li class="dropdown notifications-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning">{{workspointDynamic.newNum}}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">{{workspointDynamic.newNum}}条新交付动态</li>
              <li>
                <ul class="menu">
                  <template v-for="wpDynamic in workspointDynamic.noticeList">
                    <li :key="wpDynamic.Id">
                      <a :href="'/wpDynamic/'+wpDynamic.Id">
                        <i class="fa fa-users text-aqua"></i> {{wpDynamic.Title}}
                      </a>
                    </li>
                  </template>
                </ul>
              </li>
              <li class="footer">
                <a href="/wpDynamic">查看全部</a>
              </li>
            </ul>
          </li>
          <!-- Tasks: style can be found in dropdown.less -->
          <li class="dropdown tasks-menu ">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-qrcode"></i>
              <span class="label label-danger"></span>
            </a>
            <ul class="dropdown-menu code-menu">
              <li class="code-header">扫描二维码下载安卓App 关注微信公众号</li>
              <li class="code-contain">
                <img :src="androidCode" class="img androidcode" alt="安卓 二维码">
                <img :src="wechatCode" class="img androidcode" alt="安卓 二维码">
              </li>
              <li class="code-footer">
                <div class="row">
                  <div class="col-md-6"><i class="fa fa-android" aria-hidden="true"></i> 下载安卓App</div>
                  <div class="col-md-6"><i class="fa fa-weixin" aria-hidden="true"></i> 关注微信公众号</div>
                </div>
              </li>
            </ul>
          </li>
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img :src="headPic" class="user-image" alt="User Image">
              <span class="hidden-xs"> {{userInfo.TrueName}} </span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->

              <li class="user-header">
                <img :src="headPic" class="img-circle" alt="User Image">
                <p>
                  {{userInfo.UserName}}
                  <small>
                    <timeclock/>
                  </small>
                  <small>
                    <router-link :to="{name:'个人中心',params: {UserName: userInfo.UserName,TrueName:userInfo.TrueName}}" style="color:#fff">
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i> 个人中心</router-link>
                  </small>
                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">

                <div class="row">
                  <div class="col-xs-12 text-center">
                    {{userInfo.CompanyName}}
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 text-center">
                    {{userInfo.DepartmentName}}
                  </div>
                </div>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">切换区域</a>
                </div>
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat">退出登录</a>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
          <li>
            <a href="#" data-toggle="control-sidebar">
              <i class="fa fa-gears"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
  import headPic from "@/assets/dist/img/user2-160x160.jpg";
  import androidCode from "../../assets/androidCode.png";
  import wechatCode from "../../assets/wechatCode.jpg";
  import timeclock from "../clock/timeClock";
  import moackapi from "../../api/mockapi";

  export default {
    name: "Header",
    data() {
      return {
        headPic: headPic,
        wechatCode: wechatCode,
        androidCode: androidCode,
        noticeDynamic: moackapi.getnewNotice(),
        workspointDynamic: moackapi.getnewwpDynamic()
      };
    },
    props: ["userInfo"],
    methods: {},
    created() {},
    watch: {},
    components: {
      timeclock
    }
  };

</script>
<style>
  .androidcode {
    width: 150px;
    height: 150px;
    margin-left: 15px;
  }

  .code-header {
    padding: 15px 0px;
    text-align: center;
  }

  .code-footer {
    background-color: #fff;
    color: #eb9e05;
    margin: 0px 2px 5px 2px;
    text-align: center;
    padding-bottom: 5px;
  }

  .code-contain {
    padding: 15px 0px;
    margin: 0px 2px 0px 2px;
    background-color: #fff;
  }

  .code-menu {
    /* border-left: 2px #EB9E05 solid; 
   border-right: 2px #EB9E05 solid;  */
    background: #eb9e05;
    color: #fff;
  }

</style>
