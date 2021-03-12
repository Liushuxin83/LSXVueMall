<template>
  <div>
		<div>
			<img :src="shopInfo.shopLogo" alt="">
			<span>{{shopInfo.name}}</span>
		</div>
		<div>{{shopInfo.cSells}}
			<span>总销量</span>
		</div>
		<div>{{shopInfo.cGoods}}
			<span>全部宝贝</span>
		</div>
		<div v-for="item in shopInfo.score">
			<span>{{item.name}}</span>
			<span>{{item.score}}</span>
			<span>{{item.isBetter}}</span>
		</div>
		<div>进店逛一逛</div>
	</div>
</template>
<script>
export default {
	props:{
		shopInfo:{
			type:Object,
			default(){
				return {}
			}
		}
	}
};
</script>
<style lang="scss" scoped>
</style>