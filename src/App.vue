<template>
  <div id="app">
    <router-view />
    <!-- 底部导航区域 -->
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item replace to="/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/category" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/shopcart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
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
      active: "1",
    };
  },
  methods: {},
};
</script>
<style lang="scss">
@import "./assets/css/base.css";
.van-tabbar {
  background-color: #eee !important;
}
.van-tabbar-item--active {
  background-color: #eee;
}
</style>
