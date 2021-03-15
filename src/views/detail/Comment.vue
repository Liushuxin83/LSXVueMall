<template>
	<div>
		评论信息:
		{{commentData}}
	</div>
</template>
<script>
export default {
	props:{
		commentData:{
			type:Object,
			default(){
				return {}
			}
		}
	}
}
</script>
<style lang="scss" scoped>

</style>