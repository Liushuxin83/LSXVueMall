<template>
  <div class="footerNav">
    <!-- 加入购物车小球动画   半场动画 需要使用动画的钩子函数-->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="ball" v-show="ballFlag"></div>
    </transition>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="cartListLength"
        @click="toCartPage"
      />
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
import { mapGetters } from "vuex";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
Vue.use(GoodsAction);
Vue.use(GoodsActionIcon);
Vue.use(GoodsActionButton);
export default {
  data() {
    return {
      //控制小球的显示与隐藏
      ballFlag: false,
    };
  },
  methods: {
    //点击了添加到购物车
    addToCart() {
      //添加商品的话在父组件可以拿到商品
      // console.log(11);
      setTimeout(() => {
				this.$emit("addToCart");
			}, 700);
      this.ballFlag = !this.ballFlag;
    },
    toCartPage() {
      this.$router.push("/shopcart");
    },
    beforeEnter(el) {
      // console.log(el);
			//起始位置
			el.style.transform = "translate(0,0)"
    },
    enter(el, done) {
			el.offsetWidth;
			//最终位置
			el.style.transform = "translate(-127px,-4px)"
			el.style.transition = "all .7s cubic-bezier(0,1.03,1,-0.18)"
			done()
		},
    afterEnter(el) {
			//动画完成之后 执行
			this.ballFlag = !this.ballFlag
		},
  },
  computed: {
    ...mapGetters(["cartListLength"]),
  },
};
</script>
<style lang="scss" scoped>
.footerNav {
  position: relative;
  .ball {
    position: absolute;
    z-index: 999;
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 100%;
    left: 200px;
    top: 6px;
  }
}
</style>