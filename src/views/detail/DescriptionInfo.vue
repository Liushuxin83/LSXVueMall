<template>
  <div class="descriptionInfo">
		<div>{{descriptionInfo.desc}}</div>
		<div v-for="(item,i) in descriptionInfo.detailImage" :key="i">
			<div>{{item.key}}</div>
			<img v-for="v in item.list" :src="v" @load="descriptionInfoImgLoad">
		</div>
	</div>
</template>
<script>
export default {
  props: {
    descriptionInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
	methods: {
		descriptionInfoImgLoad(){
		this.$bus.$emit('descriptionInfoImgLoad')
		}
	},
};
</script>
<style lang="scss" scoped>
.descriptionInfo{
	img{
		width: 100%;
	}
}
</style>