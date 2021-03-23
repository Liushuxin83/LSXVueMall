<template>
	<div class="menuList">
		<menu-list-item v-for="(item,index) in changeDataList" :dataListItem="item" :key="index"></menu-list-item>
	</div>
</template>
<script>
import MenuListItem from '../menu/MenuListItem'
export default {
	props:{
		changeDataList:{
			type:Array,
			default(){
				return []
			}
		}
	},
	components:{
		MenuListItem
	}
}
</script>
<style lang="scss" scoped>
.menuList{
	display: flex;
	flex-wrap: wrap;
	height: 321px;
	overflow: hidden;
	justify-content: space-around;
}
</style>