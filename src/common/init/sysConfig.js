// export default{
//     install(Vue,options)
//     {
//       Vue.prototype.getSysName = function () {
//         return "51交付";
//       }
//     }
//     // getSysName:() =>{
//     //     return "51交付";
//     // },
//     // getDevCompanyName:()=>{
//     //     return "深圳市都信建设监理有限公司"
//     // },
//     // getDevDepartmentName:()=>{
//     //     return "IT室"
//     // },
//     // getLogoUrl:()=>{
//     //     return '@/asserts/logo.jpg';
//     // }
// }

exports.install = function (Vue, options) {
    Vue.prototype.getSysName = function (){
        return '51交付';
    };
    Vue.prototype.getDevCompanyName = function (){
        return "深圳市都信建设监理有限公司";
    };
    Vue.prototype.getDevDepartmentName = function (){
        return "IT室";
    };
    Vue.prototype.getLogoUrl = function (){
        return '@/asserts/logo.jpg';
    };

};