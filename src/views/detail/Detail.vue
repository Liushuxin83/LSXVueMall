<template>
  <div id="detail">
    <tab-control
      :titles="['商品', '参数', '评论', '推荐']"
      @tabClicks="tabClicks"
      ref="tabControlRef"
    >
      <template slot="icon">
        <van-icon name="arrow-left" @click="backClick" />
      </template>
    </tab-control>
    <better-scroll
      class="betterscroll"
      ref="betterScrollRef"
      @scrollPosition="contentScroll"
      :probeType="3"
    >
      <detail-swiper :key="topSwiperImg.length" :options="{ loop: true }">
        <div class="swiper-slide" v-for="(v, i) in topSwiperImg" :key="i">
          <img :src="v" class="detailSwiperImg" @load="detailSwiperImgLoad" />
        </div>
        <template #pagination>
          <div class="swiper-pagination"></div>
        </template>
      </detail-swiper>
      <!-- 基础信息组件   这里的动态绑定属性goods-base-info的名字 需要与组件baseInfo中props的goodsBaseInfo相呼应-->
      <base-info :goods-base-info="goodsBaseInfo" />
      <!-- 店铺信息展示 -->
      <shop-info :shop-info="shopInfo" class="shopinfo" />
      <!-- 描述（图片）信息展示 -->
      <description-info :descriptionInfo="descriptionInfo" />
      <!-- 参数信息 -->
      <params-info ref="paramsInfoRef" :paramsInfo="paramsInfo" />
      <!-- 评论信息展示组件 -->
      <comment ref="commentRef" :commentData="commentData" />
      <!-- 推荐商品图片组件 -->
      <goods-list-view ref="goodsListViewRef" :goods="recommendInfo" />
    </better-scroll>
    <!-- 底部商品导航 -->
    <footer-nav />
    <!-- 回到顶部组件   如果为组件添加原生事件，必须要加.native  监听组件根元素的原生事件-->
    <back-top @click.native="backTopClick" v-show="isBackTopShow"></back-top>
  </div>
</template>
<script>
import TabControl from "../../components/TabControl";
import DetailSwiper from "../home/HomeSwiper";
import BaseInfo from "../../views/detail/BaseInfo";
import BetterScroll from "../../components/BetterScroll/Scroll";
import ShopInfo from "../../views/detail/ShopInfo";
import DescriptionInfo from "../../views/detail/DescriptionInfo";
import ParamsInfo from "../../views/detail/ParamsInfo";
import GoodsListView from "../../components/goods/GoodsListView";
import Comment from "../../views/detail/Comment";
import FooterNav from "../../views/detail/FooterNav";
import { backTopMixin } from "../../common/mixin";

import {
  getDetailData,
  GoodsBaseInfo,
  getRecommendInfo,
} from "../../network/detail";
import { debounce } from "../../common/util";
import Vue from "vue";
import { Icon } from "vant";
Vue.use(Icon);
export default {
  name: "detail",
  data() {
    return {
      iid: null,
      topSwiperImg: [],
      goodsBaseInfo: {},
      shopInfo: {},
      descriptionInfo: {},
      paramsInfo: {},
      recommendInfo: [],
      commentData: {},
      //保存商品，参数，评论，推荐的offsetTop
      themeTopY: [],
			//用来存取 导航的四个标题对应主题的offsetTop
      getThemeTopY: null,
      //记录在滚动时的i值
      currentIndex: 0,
    };
  },
  created() {
    //保存传出详情的id
    this.iid = this.$route.params.detailId;
    //根据id请求数据
    this.getDetailData();
    //请求推荐数据
    this.getRecommendInfo();
  },
  mounted() {
    this.getThemeTopY = debounce(() => {
      //每次把这个数组设为空，是为了避免频繁的往这个数组中push数据
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.paramsInfoRef.$el.offsetTop);
      this.themeTopY.push(this.$refs.commentRef.$el.offsetTop);
      this.themeTopY.push(this.$refs.goodsListViewRef.$el.offsetTop);
      this.themeTopY.push(Number.MAX_VALUE); //用空间换时间，多一些变量占据了一些空间，但目的是为了提高性能效率
      // console.log(Number.MAX_VALUE);
      console.log(this.themeTopY);
    }, 100);
    //图片加载完成之后的事件监听
    const refreshs = debounce(this.$refs.betterScrollRef.refresh, 200);
    this.$bus.$on("detailItemImgLoad", () => {
      // console.log('2222222222');
      //这里的refresh函数调用的有些频繁，需要用防抖函数处理一下（优化），比如模糊查询，每次往输入框输入一个字母都要想服务器发送请求，频繁的请求（这个时候需要使用防抖函数）
      // this.$refs.betterScrollRef.refresh();
      refreshs();
    });
    this.$bus.$on("descriptionInfoImgLoad", () => {
      refreshs();
      this.getThemeTopY();
    });
  },
  mixins: [backTopMixin],
  components: {
    TabControl,
    DetailSwiper,
    BaseInfo,
    BetterScroll,
    ShopInfo,
    DescriptionInfo,
    ParamsInfo,
    GoodsListView,
    Comment,
    FooterNav,
  },
  methods: {
    backClick() {
      this.$router.back();
    },
    detailSwiperImgLoad() {
      const refreshs = debounce(this.$refs.betterScrollRef.refresh, 200);
      refreshs();
    },
    //请求详情数据
    async getDetailData() {
      const { result } = await getDetailData(this.iid);
      console.log(result);
      //轮播图数据
      this.topSwiperImg = result.itemInfo.topImages;
      //基本信息数据
      this.goodsBaseInfo = new GoodsBaseInfo(
        result.itemInfo,
        result.columns,
        result.shopInfo.services
      );
      //店铺信息
      this.shopInfo = result.shopInfo;
      //描述（图片）信息
      this.descriptionInfo = result.detailInfo;
      //评论信息
      this.commentData = result.rate;
      //参数信息
      this.paramsInfo = result.itemParams;
      // this.$nextTick(() => {
      // 	//根据最新的数据，对应的Dom已经被渲染出来了，但是图片依然是没有加载完的，所以在这里获取的offsetTop是不准确的
      //   this.themeTopY.push(0);
      //   this.themeTopY.push(this.$refs.paramsInfoRef.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.commentRef.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.goodsListViewRef.$el.offsetTop);
      //   console.log(this.themeTopY);
      // });
    },
    getRecommendInfo() {
      getRecommendInfo().then((res) => {
        // console.log(res.data.list);
        this.recommendInfo = res.data.list;
      });
    },
    //顶部导航点击,与主题实现滚动联动,用定时器是为了解决获取不到$el问题，
    tabClicks(index) {
      setTimeout(() => {
        console.log(index);
        this.$refs.betterScrollRef.scrollTo(0, -this.themeTopY[index], 500);
        console.log(this.themeTopY);
      }, 300);
    },
    //监听betterscroll的滚动  记录位置   这里不能滚动因为在封装betterscroll时，probeType为0，所以得传个属性
    contentScroll(position) {
      // console.log(position);
      // [0,商品0 5878,参数1 6345,评论2 6676, 推荐3__ob__: Observer]
      // console.log(-position.y);
      const y = -position.y;
      // for(let i = 0;i<this.themeTopY.length;i++){
      // 	//这是普通做法
      //   if ((this.currentIndex!==i)&&(i<this.themeTopY.length-1&&y >= this.themeTopY[i] && y < this.themeTopY[i + 1])||(i==this.themeTopY.length-1&&y >= this.themeTopY[i])) {
      // 		console.log(i);
      // 		this.currentIndex = i;
      // 		//其中this.currentIndex!==i用来防止赋值过于频繁
      // 		//通过this.$refs来修改子组件中的数据!!!!!!!!!
      // 		this.$refs.tabControlRef.currentIndex = this.currentIndex;
      //   }
      // }

      for (let i = 0; i < this.themeTopY.length - 1; i++) {
        //这是第二种做法
        if (
          this.currentIndex !== i &&
          y >= this.themeTopY[i] &&
          y < this.themeTopY[i + 1]
        ) {
          console.log(i);
          this.currentIndex = i;
          //其中this.currentIndex!==i用来防止赋值过于频繁
          //通过this.$refs来修改子组件中的数据!!!!!!!!!
          this.$refs.tabControlRef.currentIndex = this.currentIndex;
        }
      }
      //判断backTop组件是否显示
      this.isBackTopShow = -position.y > 1000;
    },
  },
};
</script>
<style lang="scss" scoped>
.van-icon-arrow-left::before {
  width: 50px !important;
  font-size: 24px;
  margin: 7px 20px 0 0;
}
.detailSwiperImg {
  height: 350px !important;
}
.detail {
  position: relative;
  height: 100vh;
}
.betterscroll {
  position: relative;
  // margin-bottom: 40px;
  height: calc(
    100vh - 40px - 50px
  ); //切记使用 calc 的时候，里面的 - 左右两边一定要有个空格，快被这个bug搞死了,而且不能是%;
}
.shopinfo {
  padding: 0 0 10px 0;
  border-bottom: 5px solid #eee;
}
</style>