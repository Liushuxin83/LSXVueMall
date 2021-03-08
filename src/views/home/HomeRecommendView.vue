<template>
	<div class="recommend">
		<div v-for="v in recommends" :key='v.sort'>
			<a :href="v.link">
				<img :src="v.image">
			</a>
			<div>{{v.title}}</div>
		</div>
	</div>
</template>
<script>
export default {
	props:{
		recommends:{
			type:Array,
			default(){
				return []
			}
		}
	},
}
</script>
<style lang="scss" scoped>
.recommend{
	width: 100%;
	display: flex;
	justify-content: space-around;
	padding: 15px 0 20px 0;
	text-align: center;
	border-bottom: 10px solid #eee;
	font-size: 14px;
	img{
		width: 90px;
		height: 90px;
		margin-bottom: 5px;
	}
}
</style>