<template>
  <div>
    <!-- 顶部吸顶区域 -->
    <van-sticky>
      <van-button type="primary">
        <slot></slot>
      </van-button>
    </van-sticky>
  </div>
</template>
<script>
import Vue from "vue";
import { Sticky, Button } from "vant";

Vue.use(Sticky).use(Button);
export default {};
</script>
<style lang="scss" scoped>
.van-button--primary {
  width: 100%;
  font-size: 20px;
}
</style>