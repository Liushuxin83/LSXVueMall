import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import toast from './components/toast/toast'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)

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