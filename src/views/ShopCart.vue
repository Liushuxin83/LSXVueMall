<template>
  <div>
    <!-- 顶部吸顶区域 -->
    <top-sticky>购物车({{ length }})</top-sticky>
    <!-- 商品列表区域组件 -->
    <cart-list></cart-list>
		<cart-bottom-nav></cart-bottom-nav>
  </div>
</template>
<script>
import TopSticky from "../components/TopSticky";
import CartList from "../views/cart/CartList";
import CartBottomNav from '../views/cart/CartBottonNav'
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    TopSticky,
    CartList,
		CartBottomNav
  },
  mounted() {},
  computed: {
    //这里有两种语法   如果想给getters属性起另外的名字就用对象格式
    // ...mapGetters(['cartListLength']),
    ...mapGetters({ length: "cartListLength" }),
  },
};
</script>
<style lang="scss" scoped>
</style>