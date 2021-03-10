<template>
  <div id="home">
    <!-- 顶部吸顶区域 -->
    <top-sticky class="top-sticky">购物街</top-sticky>
    <!-- better-scroll封装的组件使用 -->
    <scroll
      id="scroll"
      ref="betterScrollRef"
      :probe-type="3"
      @scrollPosition="scrollPosition"
			:pullUpLoad="true"
			@pullingUp="loadMore"
    >
      <!-- 轮播图区域 -->
			<div>下拉刷新</div>
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
    </scroll>
    <!-- 回到顶部组件   如果为组件添加原生事件，必须要加.native  监听组件根元素的原生事件-->
    <back-top @click.native="backTopClick" v-show="isBackTopShow"></back-top>
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
import BackTop from "../components/BackTop";

import { Notify} from "vant";
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
      isBackTopShow: false,
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
    BackTop,
  },
  created() {
    this.getHomeMultiData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refreshs = this.debounce(this.$refs.betterScrollRef.refresh)
    this.$bus.$on("itemImgLoad", () => {
      // console.log('2222222222');
      //这里的refresh函数调用的有些频繁，需要用防抖函数处理一下（优化），比如模糊查询，每次往输入框输入一个字母都要想服务器发送请求，频繁的请求（这个时候需要使用防抖函数）
      // this.$refs.betterScrollRef.scroll.refresh();
			// console.log(refresh);
      refreshs();
			console.log('---');
    });
  },
  methods: {
    debounce(fnc, delay) {
      //形参：fac为函数，delay为延迟事件
      let timer = null;
      return function () {
        if (timer) {
					clearTimeout(timer);
				};
        timer = setTimeout(() => {
          fnc.apply();
        }, delay);
      };
    },
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
    //监听backtop的函数
    backTopClick() {
      // console.log(this.$refs.betterScrollRef.scroll);
      this.$refs.betterScrollRef.scroll.scrollTo(0, 0, 500);
    },
    scrollPosition(position) {
      // console.log(-position.y);
      this.isBackTopShow = -position.y > 1000;
      // -position.y > 1000
      //   ? (this.isBackTopShow = true)
      //   : (this.isBackTopShow = false);
    },
		//下拉加载更多
		loadMore(){
			// console.log(111);
			this.getHomeGoods(this.currentType);
			this.$refs.betterScrollRef.scroll.finishPullUp();
		},
  },
};
</script>
<style lang="scss" scoped>
#home {
  position: relative;
  height: 100vh;
}
#scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 42px;
  bottom: 50px;
}
.top-sticky {
  z-index: 99;
}
</style>