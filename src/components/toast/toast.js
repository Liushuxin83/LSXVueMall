import Toast from './Toast.vue'
const plugin = {}
plugin.install = function(Vue) {
    // console.log('执行了install',Vue);
    // Vue.prototype.$toast = toast对象
    // console.log(toast);
    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    //2.通过new 的方式。根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor();
    //3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'));
    //4.toast.$el就是上面创建的div
    document.body.appendChild(toast.$el);
    Vue.prototype.$toast = toast;
}
export default plugin