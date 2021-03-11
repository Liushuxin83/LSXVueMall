<template>
  <div class="goods-list">
    <goods-list-item v-for="(item, index) in goods" :goodsItem="item" class="goods-list-item" :key="index"/>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>
<style lang="scss" scoped>
.goods-list {
	width: 100vw;
  display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	padding: 2px;
}
</style>