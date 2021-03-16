<template>
  <div>
    <van-submit-bar :price="3050" :button-text="'提交订单 ' + checkedCount">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import Vue from "vue";

import { SubmitBar } from "vant";
Vue.use(SubmitBar);
export default {
  data() {
    return {
      //控制全选和全不选
      checked: false,
    };
  },
  mounted() {
  },
  computed: {
    checkedCount() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
  },
};
</script>
<style lang="scss" scoped>
.van-submit-bar__bar {
  margin-bottom: 50px;
}
</style>