<template>
  <div>111</div>
</template>
<script>
export default {
  created() {
    this.getCommentData();
  },
  methods: {
    //获取评论数据
    async getCommentData() {
      const res = await this.$http({
        url: "/comment/23",
      });
			console.log(res);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>