<template>
  <div>
    <div v-for="item in cartList">
      <van-swipe-cell>
				<!-- 在开发中选中和不选中一定是在对象模型中记录的，就是在cartList中的每个对象中记录 -->
        <van-checkbox v-model="item.checked"></van-checkbox>
        <van-card
          :price="item.price"
          :desc="item.desc"
          :title="item.title"
          :thumb="item.image"
          class="goods-card"
        >
          <template #footer>
            <van-stepper v-model="item.count" />
          </template>
        </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

import Vue from "vue";
import { Card } from "vant";
import { Stepper } from "vant";
import { SwipeCell } from "vant";
import { Checkbox, CheckboxGroup } from "vant";
Vue.use(Card).use(Stepper).use(SwipeCell).use(Checkbox).use(CheckboxGroup);
export default {
	data(){
		return {
		}
	},
  computed: {
    ...mapState(["cartList"]),
  },
};
</script>
<style lang="scss" scoped>
.goods-card {
  margin: 0;
  background-color: #eee;
}

.delete-button {
  height: 100%;
}
.van-swipe-cell {
	position: relative;
  margin-top: 7px;
  padding-left: 20px;
  background-color: #eee;
}
.van-checkbox {
 position: absolute;
 z-index: 9;
 top: 35%;
 margin-left: -20px;
}
</style>