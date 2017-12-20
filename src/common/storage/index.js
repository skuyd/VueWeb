// exports.install = function(Vue, options) {
//     Vue.prototype.storageGetJson = function(storageKey) {
//         return JSON.parse(window.localStorage.getItem(storageKey));
//     };
//     Vue.prototype.storagePutJson = function(storageKey, items) {
//         window.localStorage.setItem(storageKey, JSON.stringify(items));
//     };
//     Vue.prototype.storageGet = function(storageKey) {
//         return window.localStorage.getItem(storageKey);
//     };
//     Vue.prototype.storagePut = function(storageKey, items) {
//         window.localStorage.setItem(storageKey, items);
//     };
// }
// 浏览器 Storange 操作类
export default {
    storageGetJson: function(storageKey) {
        return JSON.parse(window.localStorage.getItem(storageKey));
    },
    storageSetJson: function(storageKey, items) {
        window.localStorage.setItem(storageKey, JSON.stringify(items));
    },
    storageGet: function(storageKey) {
        return window.localStorage.getItem(storageKey);
    },
    storageSet: function(storageKey, items) {
        window.localStorage.setItem(storageKey, items);
    }
}