<template>
  <div class="footerNav">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartListLength" @click="toCartPage" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addToCart"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
import Vue from "vue";
import {mapGetters} from 'vuex'
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
Vue.use(GoodsAction);
Vue.use(GoodsActionIcon);
Vue.use(GoodsActionButton);
export default {
  methods: {
    //点击了添加到购物车
    addToCart() {
      //添加商品的话在父组件可以拿到商品
      // console.log(11);
      this.$emit("addToCart");
    },
    toCartPage() {
      this.$router.push("/shopcart");
    },
  },
	computed:{
		...mapGetters(['cartListLength'])
	}
};
</script>
<style lang="scss" scoped>
</style>