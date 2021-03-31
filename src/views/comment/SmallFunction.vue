<template>
  <div>
    <van-divider
      :hairline="false"
      dashed
      :style="{
        fontSize: '20px',
        color: '#1989fa',
        borderColor: '#1989fa',
        padding: '0 16px',
        height: '20px',
      }"
      >现有栏目</van-divider
    >
    <div class="have">
      <van-button
        type="primary"
        v-for="(item, index) in categoryData"
        :key="item._id"
        @click="del(index)"
        >{{ item.title }}</van-button
      >
    </div>
    <van-divider
      :hairline="false"
      dashed
      :style="{
        fontSize: '20px',
        color: '#1989fa',
        borderColor: '#1989fa',
        padding: '0 16px',
        height: '20px',
      }"
      >已删除栏目</van-divider
    >
    <div class="have">
      <van-button
        type="primary"
        v-for="(item, index) in deleteCategoryData"
        :key="item.id"
        @click="add(index)"
        >{{ item.title }}</van-button
      >
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Button, Divider } from "vant";

Vue.use(Button).use(Divider);
export default {
  data() {
    return {
      categoryData: [],
      deleteCategoryData: [],
    };
  },
  created() {
    //第一次进这个页面需要调用这个方法，但是如果本地localStorage中有数据，就不需要调用，直接拿本地存储中的数据
    if (
      localStorage.getItem("categoryData") &&
      localStorage.getItem("deleteCategoryData")
    ) {
      this.categoryData = JSON.parse(localStorage.getItem("categoryData"));
      this.deleteCategoryData = JSON.parse(
        localStorage.getItem("deleteCategoryData")
      );
    } else {
      this.getCategoryData();
    }
  },
  methods: {
    async getCategoryData() {
      const res = await this.$http({
        url: "/category",
      });
      console.log(res);
      this.categoryData = res;
    },
    del(index) {
      // console.log(index);
      this.deleteCategoryData.push(this.categoryData[index]);
      this.categoryData.splice(index, 1);
    },
    add(index) {
      // console.log(index);
      this.categoryData.push(this.deleteCategoryData[index]);
      this.deleteCategoryData.splice(index, 1);
    },
  },
  watch: {
    categoryData() {
      localStorage.setItem("categoryData", JSON.stringify(this.categoryData));
      localStorage.setItem(
        "deleteCategoryData",
        JSON.stringify(this.deleteCategoryData)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.van-divider::after,
.van-divider::before {
  border-width: 2px 0 0;
}
.have {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .van-button {
    margin: 10px 10px 0px 10px;
  }
}
</style>