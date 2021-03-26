<template>
  <div>
    <van-cell icon="bell" title="退出登录" is-link class="quit" @click="quit" />
  </div>
</template>
<script>
import { Dialog } from 'vant';
export default {
  methods: {
    quit() {
      Dialog.confirm({
        title: "请问您是否退出登录？",
      })
        .then(() => {
          // on confirm
					// console.log(111);
					localStorage.removeItem('id')
					localStorage.removeItem('token')
					this.$emit('quitLogin')
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.quit {
  border-top: 1px solid #eee;
}
</style>