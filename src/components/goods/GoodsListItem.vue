<template>
  <div class="goodsItem">
    <img :src="goodsItem.show.img" />
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
};
</script>
<style lang="scss" scoped>
.goodsItem{
	width: 47%;
	height: 40vh;
	img{
	width: 100%;
	height: 80%;
	// height: 100%;
	border-radius: 5%;
	}
	.paragraph{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 10px;
	}
}
</style>