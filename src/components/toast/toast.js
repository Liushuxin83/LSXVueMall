import Toast from './Toast.vue'
const obj = {}
obj.install = function(Vue) {
    // console.log('执行了install',Vue);
    // Vue.prototype.$toast = toast对象
    // console.log(toast);
    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast);
}
export default obj