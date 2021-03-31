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
const Regesiter = () =>
    import ('../views/refisterandlogin/Register.vue')
const Login = () =>
    import ('../views/refisterandlogin/Login.vue')
const EditPersonalInfo = () =>
    import ('../views/profile/EditPersonalInfo.vue')
const Comment = () =>
    import ('../views/comment/Comment.vue')
const SmallFunction = () =>
    import ('../views/comment/SmallFunction.vue')
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
        path: '/menu',
        component: Menu
    },
    {
        name: 'detail',
        path: '/detail/:detailId',
        component: Detail
    },
    {
        name: "register",
        path: '/register',
        component: Regesiter
    },
    {
        name: "login",
        path: '/login',
        component: Login
    },
    {
        name: 'editpersonalinfo',
        path: '/editpersonalinfo',
        component: EditPersonalInfo
    },
    {
        name: 'comment',
        path: '/comment',
        component: Comment,
    },
    {
        path: '/smallfunction',
        component: SmallFunction
    }
]
const router = new Router({
    routes,
})


export default router
router.beforeEach((to, from, next) => {
    const willingPath = ['/shopcart', '/editpersonalinfo']; //若多个地方需要授权的话，设置全局路由守卫
    if (willingPath.includes(to.fullPath)) {
        //来验证token
        if (!localStorage.getItem('token')) {
            Vue.prototype.$Toast({
                type: "fail",
                message: '请您先登录',
                duration: 2000,
            })
            next('/profile')
        } else {
            next()
        }
    } else {
        next()
    }
})