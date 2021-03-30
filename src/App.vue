<template>
  <div id="app">
    <keep-alive exclude="detail,profile,login,comment">
      <router-view />
    </keep-alive>
    <!-- 底部导航区域 -->
    <van-tabbar
      route
      active-color="#ee0a24"
      inactive-color="#000"
      v-if="isVanTabbarShow"
    >
      <van-tabbar-item replace to="/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
			<van-tabbar-item replace to="/menu" icon="points"
        >菜单</van-tabbar-item
      >
      <van-tabbar-item replace to="/category" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/shopcart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
			<van-tabbar-item replace to="/comment" icon="comment-o"
        >评论</van-tabbar-item
      >
      <van-tabbar-item replace to="/profile" icon="contact"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  data() {
    return {
      isVanTabbarShow: true,
    };
  },
  methods: {},
  watch: {
    //通过监听路由的变化来操作导航的隐藏
    $route(to, from) {
      if (to.name == "detail" || to.name== "register" || to.name=="login" || to.name=="editpersonalinfo") {
        this.isVanTabbarShow = false;
      } else {
        this.isVanTabbarShow = true;
      }
    },
  },
};
</script>
<style lang="scss">
@import "./assets/css/base.css";
.van-tabbar {
  width: 100vw;
  background-color: #eee !important;
	z-index: 999;
}
.van-tabbar-item--active {
  background-color: #eee;
}
</style>
