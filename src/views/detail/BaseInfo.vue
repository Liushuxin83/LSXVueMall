<template>
  <div class="goodsBaseInfo" v-if="Object.keys(goodsBaseInfo).length">
    <!-- 第一层 -->
    <div>{{ goodsBaseInfo.title }}</div>
    <!-- 第二层 -->
    <div>
      <span>{{ goodsBaseInfo.price }}</span>
      <span v-if="goodsBaseInfo.oldPrice">{{ goodsBaseInfo.oldPrice }}</span>
      <span v-if="goodsBaseInfo.discount">{{ goodsBaseInfo.discount }}</span>
    </div>
    <!-- 第三层 -->
    <div>
      <span v-for="(item, i) in goodsBaseInfo.columns" :key="i">{{
        item
      }}</span>
      <span v-if="goodsBaseInfo.services">{{
        goodsBaseInfo.services[goodsBaseInfo.services.length - 1].name
      }}</span>
    </div>
    <!-- 第四层 -->
    <div v-if="goodsBaseInfo.services">
      <span v-for="n in goodsBaseInfo.services.length - 1" :key="n">
        <img :src="goodsBaseInfo.services[n - 1].icon" class="iconImg" />
        <span>{{ goodsBaseInfo.services[n - 1].name }}</span>
      </span>
    </div>
    <div>
      <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    goodsBaseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
.iconImg {
  width: 15px;
}
</style>