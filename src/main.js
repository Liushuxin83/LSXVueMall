import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import toast from './components/toast/toast'
//解决移动端300ms延迟
import FastClick from 'fastclick'
//图片懒加载
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//解决移动端300ms延迟
FastClick.attach(document.body)
//使用图片懒加载   用在img标签上  把:src改为v-lazy
Vue.use(VueLazyload,{
	loading:require('./assets/lsxcode.png')
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// import { request } from '@/network/request.js'
// request({
//     url: 'home/multidata',
// }, (res) => {
//     console.log(res);
// }, (err) => {
//     console.log(err);
// })
// request({
//     url: 'home/multidata'
// }).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })