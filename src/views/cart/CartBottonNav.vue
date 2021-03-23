<template>
  <div>
    <van-submit-bar
      :price="checkedTotalPrice"
      :button-text="'提交订单 ' + checkedCount"
    >
      <van-checkbox v-model="isCheckAll" @click="isTrue">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";

import { SubmitBar } from "vant";
Vue.use(SubmitBar);
export default {
  data() {
    return {
      //控制全选和全不选
      // checked: false,
    };
  },
  computed: {
    //选中的并且商品的总数量
    ...mapGetters(["checkedCount"], ["cartListLength"]),
    //选中的并且商品的总价格
    ...mapGetters(["checkedTotalPrice"]),
    isCheckAll: {
      //v-model，说白了，会触发改变computed计算属性的值，但是以上computed的写法只能获取到属性的值，不支持设置，一般看过官网就会知道computed不仅支持读取，还支持设置：
      get() {
        if (this.$store.state.cartList.length === 0) {
          return false;
        } else {
          return this.$store.state.cartList.every((item) => item.checked);
        }
      },
      set() {
				// console.log(val);
			},
    },
  },
  methods: {
    isTrue() {
      if (this.isCheckAll) {
        //如果其他都选中则反选
        this.$store.state.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        //如果其他都没有选中或者选中了几个 就全选
        this.$store.state.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.van-submit-bar__bar {
  margin-bottom: 50px;
}
</style>