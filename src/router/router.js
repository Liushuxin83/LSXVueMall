import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Home = () =>
    import ('../views/Home.vue')
const Category = () =>
    import ('../views/Category.vue')
const ShopCart = () =>
    import ('../views/ShopCart.vue')
const Profile = () =>
    import ('../views/Profile.vue')
const Detail = () =>
    import ('../views/detail/Detail.vue')
const Menu = () =>
    import ('../views/menu/Menu.vue')
const routes = [
    //首页重定向
    //网址中如果乱写入一些字母也会跳到film
    {
        path: '*',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/shopcart',
        component: ShopCart
    },
    {
        path: '/profile',
        component: Profile
    },
		{
		    path:'/menu',
				component:Menu
		},
    {
        name: 'detail',
        path: '/detail/:detailId',
        component: Detail
    }
]
export default new Router({
    routes,
})