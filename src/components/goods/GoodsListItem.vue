<template>
  <div class="goodsItem" @click="toDetailPage(goodsItem.iid)">
    <img v-lazy="showImage" @load="imgLoad" />
    <div>
      <p class="paragraph">{{ goodsItem.title }}</p>
    </div>
    <div>
      <span>{{ goodsItem.price }}</span
      ><van-icon name="star" /><span>{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Icon } from "vant";
Vue.use(Icon);
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    //这里用到了计算属性，很棒！！！如果有this.goodsItem.image就用this.goodsItem.image，如果没有就用this.goodsItem.show.img
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    imgLoad() {
      // console.log(111);
      if (this.$route.path === "/home") {
        this.$bus.$emit("homeItemImgLoad");
      } else if (this.$route.name === "detail") {
        this.$bus.$emit("detailItemImgLoad");
      }
    },
    //跳转到详情页
    toDetailPage(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.goodsItem {
  width: 47%;
  height: 40vh;
  img {
    width: 100%;
    height: 80%;
    // height: 100%;
    border-radius: 5%;
  }
  .paragraph {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 10px;
  }
}
</style>