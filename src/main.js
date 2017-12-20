// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import XLSX from 'xlsx';
import VueQuillEditor from 'vue-quill-editor'
import 'element-ui/lib/theme-chalk/index.css'

// import bootstrap from 'vue-strap'
// import BootstrapVue from 'bootstrap-vue'
import './assets/common.css'
//bootstrap
import './assets/bootstrap/bootstrap.css'
import './assets/bootstrap/bootstrap.min.js'
//font-awesome
import './assets/font-awesome/css/font-awesome.min.css'
// ---------  引入admin-LTE  -------------
import './assets/dist/css/AdminLTE.min.css'
import './assets/dist/css/skins/_all-skins.min.css'
import './assets/dist/js/adminlte.min.js'
//------------- End ------------------

import store from '@/store/index.js'
// SysConfig
import sysConfig from './common/init/sysConfig.js'

// http (使用 axios 实现)
import $http from './common/http/index.js'
Vue.prototype.$http = $http;


import TableGrid from '@/components/tableGrid/index.vue';
Vue.component('table-grid', TableGrid);


// Vue.prototype.$axios = axios // 修改原型链


Vue.config.productionTip = false

// Vue.use(BootstrapVue)


Vue.use(ElementUI);
Vue.use(sysConfig);
Vue.use(VueQuillEditor)



/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})


// //*路由拦截 ---- 判断是否需要登录权限 以及是否登录
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
//         if (store.getters.token == null || store.getters.token.access_token == null) { // 判断是否登录 // 没登录则跳转到登录界面
//             ElementUI.Message.error({
//                 message: '未登录,请先登录... ...'
//             })
//             next({
//                 path: '/login' // ,
//                     // query: { redirect: to.fullPath }
//             })
//         } else {
//             next()
//         }
//     } else {
//         next()
//     }
// })