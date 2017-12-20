import axios from 'axios'; // 网络请求
// import t from '@/common/const/index'
import Vue from 'vue'
import {
    Message,
    Loading
} from 'element-ui';
import router from '@/router'
const loginPath = 'http://192.168.6.249:222/Account/Login'
    // var CancelToken = axios.CancelToken;
    // var cancel;
var instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'X-Custom-Header': 'foobar',
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Beae"
    },
    // cancelToken: new CancelToken(function(cancel) {})
});

var loadinginstace;
// 添加请求拦截器
instance.interceptors.request.use(function(config) {

    loadinginstace = Loading.service({
        fullscreen: true
    })
    if (config.headers.Authorization == undefined || config.headers.Authorization.length < 10) {

        // Message.error({
        //     message: '无法验证的请求，正在自动跳转到登录页... ...'
        // });
        // setTimeout(() => {
        //     window.location.href = loginPath;
        // }, 2000);
        return config;
    } else {
        return config;
    }

}, function(error) {
    // 对请求错误做些什么

    loadinginstace.close()
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function(response) {

    // 对响应数据做点什么
    loadinginstace.close();
    if (response.data.Success != undefined && !response.data.Success) {
        Message.error({
                message: '登录已过期，正在自动跳转到登录页... ...'
            })
            // setTimeout(() => {
            //     window.location.href = loginPath;
            // }, 2000);
    }
    return response;
}, function(error) {
    // 对响应错误做点什么
    loadinginstace.close()
    if (error.response) {
        if (error.response.status == 500) {
            Message.error({
                    message: '登录已过期，正在自动跳转到登录页... ...'
                })
                // setTimeout(() => {
                //     window.location.href = loginPath;
                // }, 2000);
        }
    }
    return Promise.reject(error);


});

export default {
    init: function(token, baseUrl) {
        instance.defaults.headers['Authorization'] = "Beae " + token;
        instance.defaults.baseURL = baseUrl;
    },
    $axios: instance,
    /**
     * fetch 请求方法
     * @param url
     * @param params
     * @returns {Promise}
     */
    post: function(url, params = {}) {

        return new Promise((resolve, reject) => {
            instance.get(url, {
                    params: params
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    /**
     * post 请求方法
     * @param url
     * @param data
     * @returns {Promise}
     */
    post: function(url, data = {}) {
        return new Promise((resolve, reject) => {
            instance.post(url, data)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
        })
    },

    /**
     * patch 方法封装
     * @param url
     * @param data
     * @returns {Promise}
     */
    patch: function(url, data = {}) {
        return new Promise((resolve, reject) => {
            instance.patch(url, data)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
        })
    },

    /**
     * put 方法封装
     * @param url
     * @param data
     * @returns {Promise}
     */
    put: function(url, data = {}) {
        return new Promise((resolve, reject) => {
            instance.put(url, data)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
        })
    }
}


// axios_get: function(v, url, params, filter) {
//     var data = [];
//     this.$axios.get(url, {
//             params: params
//         }).then(
//             response => {
//                 data = response.data;
//             }
//         )
//         .catch(function(err) {
//             v.$message.error(err);
//         });
//     // console.log(data);
//     return data;
// },
// // Post
// axios_post: function(v, url, params, formData) {
//     var data = [];
//     this.$axios({
//             method: 'post',
//             url: url,
//             params: params,
//             data: filter
//         }).then(
//             response => {
//                 data = response.data;
//             }
//         )
//         .catch(function(err) {
//             v.$message.error(err);
//         });
//     return data;
// },
// //Get_GridData- 这个无返回值
// axios_getGridData: function(v, url, params, filter) {
//     var param = {};
//     if (v.pagination) {
//         Object.assign(param, params, v.listQuery);

//     }
//     this.$axios.get(url, {
//             params: params
//         }).then(
//             response => {
//                 v.listdata = response.data.rows;
//                 v.total = response.data.total;

//             }
//         )
//         .catch(function(err) {
//             v.$message.error(err);
//         });
//     // console.log('123');

// },
// //Get_message - 这个有返回值
// axios_getmessagedata: function(v, url, params, filter) {
//     var param = {};
//     if (self.pagination) {
//         Object.assign(param, self.params, self.listQuery);
//     }
//     var data = this.axios_get(v, url, params, filter);
//     if (data.success) {
//         v.$message({
//             message: '操作完成',
//             type: 'success'
//         });
//     } else {
//         v.$message.error(data.message);
//     }
//     return data.Data;
// },
// axios_postdata: function(v, url, formData) {
//     var param = {};
//     if (self.pagination) {
//         Object.assign(param, self.params, self.listQuery);
//     }
//     var data = this.axios_post(v, url, params, formData);
//     if (data.success) {
//         v.$message({
//             message: '操作完成',
//             type: 'success'
//         });
//     } else {
//         v.$message.error(data.message);
//     }
//     return data.Data;
// }


// function  handleLogin() {
//     this.$refs.AccountFrom.validate((valid) => {
//      if(valid) {
//       this.logining = true;
// //其中 'm/login' 为调用的接口，this.account为参数
//       this.$post('m/login',this.account).then(res => {
//        this.logining = false;
//        if(res.errCode !== 200) {
//         this.$message({
//          message: res.errMsg,
//          type:'error'
//         });
//        } else {
//         let expireDays = 1000 * 60 * 60 ;
//         this.setCookie('session',res.errData.token,expireDays); //设置Session
//         this.setCookie('u_uuid',res.errData.u_uuid,expireDays); //设置用户编号
//         if(this.$route.query.redirect) {
//          this.$router.push(this.$route.query.redirect);
//         } else {
//          this.$router.push('/home'); //跳转用户中心页
//         }
//        }
//       });
//      } else {
//       console.log('error submit');
//       return false;
//      }
//     });
//    }
