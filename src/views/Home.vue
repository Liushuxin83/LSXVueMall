<template>
  <div>
    <!-- 顶部吸顶区域 -->
    <top-sticky>购物街</top-sticky>
    <!-- better-scroll封装的组件使用 -->
    <scroll id="scroll">
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
      <home-recommend-view :recommends="recommend"></home-recommend-view>
      <!-- 本周推荐区域 -->
      <feature></feature>
      <!-- 选项卡区域 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClicks="tabClicks"
      ></tab-control>
      <!-- 商品上拉加载更多组件 -->
      <!-- <goods-list-view :goods="goods['pop'].list"></goods-list-view> -->
      <goods-list-view :goods="goods[currentType].list"></goods-list-view>
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
    </scroll>
  </div>
</template>
<script>
import Vue from "vue";
import TopSticky from "../components/TopSticky";
import { getHomeMultiData, getHomeGoods } from "../network/home";

import homeSwiper from "../views/home/HomeSwiper";
import HomeRecommendView from "../views/home/HomeRecommendView";
import Feature from "../views/home/Feature";
import TabControl from "../components/TabControl";
import GoodsListView from "../components/goods/GoodsListView";
import Scroll from "../components/BetterScroll/Scroll";

import { Notify } from "vant";
Vue.use(Notify);
export default {
  data() {
    return {
      banner: [],
      recommend: [],
      // 关于下拉加载更多的数据结构
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  components: {
    TopSticky,
    homeSwiper,
    HomeRecommendView,
    Feature,
    TabControl,
    GoodsListView,
    Scroll,
  },
  created() {
    this.getHomeMultiData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 网络请求相关！！！！！！！！！！！！！！！！！！
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        if (res.returnCode !== "SUCCESS")
          return Notify({ type: "danger", message: "获取home首页数据失败" });
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
        // console.log(res.data);
      });
    },
    //获取首页商品数据,传入形参可以是这个方法复用性更强,不能硬编码
    getHomeGoods(type) {
      // getHomeGoods("pop", 1).then((res) => {
      //   console.log(res);
      // });
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },

    //事件监听！！！！！！！！！！！！！！！！！！！
    //选项卡的点击事件，由TabControl组件 子传父而来
    tabClicks(i) {
      console.log(i);
      switch (i) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#scroll{
	position: relative;
	height: 300px;
	// overflow: hidden;
}
</style>