<template>
  <div id="detail">
    <tab-control :titles="['商品', '参数', '评论', '推荐']">
      <template slot="icon">
        <van-icon name="arrow-left" @click="backClick" />
      </template>
    </tab-control>
    <better-scroll class="betterscroll" ref="betterScrollRef">
      <detail-swiper :key="topSwiperImg.length" :options="{ loop: true }">
        <div class="swiper-slide" v-for="(v, i) in topSwiperImg" :key="i">
          <img :src="v" class="detailSwiperImg" />
        </div>
        <template #pagination>
          <div class="swiper-pagination"></div>
        </template>
      </detail-swiper>
      <!-- 基础信息组件   这里的动态绑定属性goods-base-info的名字 需要与组件baseInfo中props的goodsBaseInfo相呼应-->
      <base-info :goods-base-info="goodsBaseInfo" />
      <!-- 店铺信息展示 -->
			<shop-info :shop-info="shopInfo" class="shopinfo"/>
			<!-- 描述（图片）信息展示 -->
			<description-info :descriptionInfo="descriptionInfo"/>
			<!-- 参数信息 -->
			<params-info :paramsInfo="paramsInfo"/>
    </better-scroll>
  </div>
</template>
<script>
import TabControl from "../../components/TabControl";
import DetailSwiper from "../home/HomeSwiper";
import BaseInfo from "../../views/detail/BaseInfo";
import BetterScroll from "../../components/BetterScroll/Scroll";
import ShopInfo from '../../views/detail/ShopInfo'
import DescriptionInfo from '../../views/detail/DescriptionInfo'
import ParamsInfo from '../../views/detail/ParamsInfo'

import { getDetailData, GoodsBaseInfo } from "../../network/detail";

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
			shopInfo:{},
			descriptionInfo:{},
			paramsInfo:{},
    };
  },
  created() {
    //保存传出详情的id
    this.iid = this.$route.params.detailId;
    //根据id请求数据
    this.getDetailData();
  },
  mounted() {},
  components: {
    TabControl,
    DetailSwiper,
    BaseInfo,
    BetterScroll,
		ShopInfo,
		DescriptionInfo,
		ParamsInfo,
  },
  methods: {
    backClick() {
      this.$router.back();
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
			//参数信息
			this.paramsInfo = result.itemParams;
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
    100vh - 40px
  ); //切记使用 calc 的时候，里面的 - 左右两边一定要有个空格，快被这个bug搞死了,而且不能是%;
}
.shopinfo{
	padding: 0 0 10px 0;
	border-bottom: 5px solid #eee;
}
</style>