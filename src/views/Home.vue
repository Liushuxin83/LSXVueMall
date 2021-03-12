<template>
  <div id="home">
    <!-- 顶部吸顶区域 -->
    <top-sticky class="top-sticky">购物街</top-sticky>
    <!-- better-scroll封装的组件使用 -->
    <!-- 复制的一份tabControl组件 -->
    <tab-control
      v-show="isTabControl1Show"
      :titles="['流行', '新款', '精选']"
      @tabClicks="tabClicks"
      ref="tabControl1"
      class="tabControl1"
    ></tab-control>
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
          <a :href="v.link"
            ><img :src="v.image" @load="homeSwiperImgLoadComplete"
          /></a>
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
        ref="tabControl2"
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

import { debounce } from "../common/util";
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
      isBackTopShow: false,
      //tab-control组件距离父元素顶端的距离
      tabControlOffsetTop: 0,
      //控制 homeswiper的图片加载完后 函数执行的次数
      isLoad: false,
      //控制tabControl1是否显示
      isTabControl1Show: false,
      //为了保持home组件的状态，当离开home组件时保存滚动位置
      saveY: 0,
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

    // this.getHomeGoods("pop");
    // this.getHomeGoods("new");
    // this.getHomeGoods("sell");
  },
  mounted() {
    //图片加载完成之后的事件监听
    const refreshs = debounce(this.$refs.betterScrollRef.refresh, 200);
    this.$bus.$on("itemImgLoad", () => {
      // console.log('2222222222');
      //这里的refresh函数调用的有些频繁，需要用防抖函数处理一下（优化），比如模糊查询，每次往输入框输入一个字母都要想服务器发送请求，频繁的请求（这个时候需要使用防抖函数）
      // this.$refs.betterScrollRef.refresh();
      // console.log(refresh);
      refreshs();
    });
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
        // console.log(res.data.list);
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
          this.getHomeGoods("pop");
          break;
        case 1:
          this.currentType = "new";
          this.getHomeGoods("new");
          break;
        case 2:
          this.currentType = "sell";
          this.getHomeGoods("sell");
          break;
      }

      //会出现一个小bug，使得两个tabControl的currentIndex不同,所以当点击tabControl时通过refs来设置其currentIndex为点击的下标
      this.$refs.tabControl1.currentIndex = i;
      this.$refs.tabControl2.currentIndex = i;
    },
    //监听backtop的函数
    backTopClick() {
      // console.log(this.$refs.betterScrollRef.scroll);
      this.$refs.betterScrollRef.scroll.scrollTo(0, 0, 500);
    },
    //监听betterscroll滚动
    scrollPosition(position) {
      // console.log(-position.y);
      //判断backTop组件是否显示
      this.isBackTopShow = -position.y > 1000;
      // -position.y > 1000
      //   ? (this.isBackTopShow = true)
      //   : (this.isBackTopShow = false);

      //判断tabControl组件是否吸顶,注意不能为tabControl添加class样式fixed，因为betterscroll内部实现原理是translate，也会改变fixed的top值,所以解决方法是：在用一个tabControl组件（先隐藏）并且放到scroll组件上方，当滑动到指定位置时，显示该组件
      this.isTabControl1Show =
        Math.floor(-position.y) >= this.tabControlOffsetTop;
    },
    //下拉加载更多
    loadMore() {
      // console.log(111);
      this.getHomeGoods(this.currentType);
      this.$refs.betterScrollRef.scroll.finishPullUp();
    },
    //home组件轮播图图片加载完成 执行此方法       获取tab-control组件的offsetTop(如果在mounted中获取该值是不准确的)
    homeSwiperImgLoadComplete() {
      if (!this.isLoad) {
        console.log(this.$refs.tabControl2.$el.offsetTop); //这里执行了四次，其实我们只需要它执行一次
        this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        this.isLoad = true;
      }
    },
  },
  //让home组件保持原来的状态 解决方案：离开时，保存一个位置信息，进来时将位置设置为原来保存的位置信息
  activated() {
    // console.log('进入home');
    this.$refs.betterScrollRef.scrollTo(0, this.saveY);
    //最好对better-scroll做一次刷新，避免出现不必要的bug
    this.$refs.betterScrollRef.refresh();
  },
  deactivated() {
    // console.log('离开shome');
    // console.log(this.$refs.betterScrollRef.scroll);
    this.saveY = this.$refs.betterScrollRef.scroll.y;
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
  background-color: pink;
}
.tabControl1 {
  position: relative;
  z-index: 2;
}
</style>