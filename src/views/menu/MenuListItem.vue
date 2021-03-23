<template>
  <div class="item">
    <!-- {{dataListItem}} -->
    <img :src="dataListItem.wareImg" />
    <div class="wrap">
      {{ dataListItem.wareName }}
    </div>
		<span>{{ price }}</span>
  </div>
</template>
<script>
export default {
  props: {
    dataListItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
	computed:{
		price(){
			return `￥${this.dataListItem.warePrice}`
		}
	}
};
</script>
<style lang="scss" scoped>
.item {
  text-align: center;
  img {
    width: 140px;
		height: 120px;
  }
  .wrap {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>