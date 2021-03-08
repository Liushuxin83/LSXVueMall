<template>
  <div>
    <!-- 顶部吸顶区域 -->
    <top-sticky>购物街</top-sticky>
    <!-- 轮播图区域 -->
    <home-swiper :key="banner.length" :options="{ loop: true }">
      <div class="swiper-slide" v-for="(v, i) in banner" :key="i">
        <a :href="v.link"><img :src="v.image" /></a>
      </div>
      <template #pagination>
        <div class="swiper-pagination"></div>
      </template>
    </home-swiper>
		<!-- 推荐视图区域 -->
		<home-recommend-view :recommends='recommend'></home-recommend-view>
		<!-- 本周推荐区域 -->
		<feature></feature>
		<!-- 选项卡区域 -->
		<tab-control :titles="['流行','新款','精选']"></tab-control>
		<ul>
			<li>列表1</li>
			<li>列表2</li>
			<li>列表3</li>
			<li>列表4</li>
			<li>列表5</li>
			<li>列表6</li>
			<li>列表7</li>
			<li>列表8</li>
			<li>列表9</li>
			<li>列表10</li>
		</ul>
  </div>
</template>
<script>
import Vue from "vue";
import TopSticky from "../components/TopSticky";
import { getHomeMultiData } from "../network/home";

import homeSwiper from "../views/home/HomeSwiper";
import HomeRecommendView from '../views/home/HomeRecommendView';
import Feature from '../views/home/Feature'
import TabControl from '../components/TabControl'

import { Notify } from "vant";
Vue.use(Notify);
export default {
  data() {
    return {
      banner: [],
      recommend: [],
    };
  },
  components: {
    TopSticky,
    homeSwiper,
		HomeRecommendView,
		Feature,
		TabControl
  },
  created() {
    getHomeMultiData().then((res) => {
      if (res.returnCode !== "SUCCESS")
        return Notify({ type: "danger", message: "获取home首页数据失败" });
      this.banner = res.data.banner.list;
      this.recommend = res.data.recommend.list;
			console.log(res.data);
    });
  },
};
</script>
<style lang="scss" scoped>
.swiper-slide{
	margin: 0;
}
</style>