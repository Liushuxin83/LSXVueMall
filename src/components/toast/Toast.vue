<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>
<script>
export default {
  // props:{
  // 	message:{
  // 		type:String,
  // 		default:''
  // 	}
  // }
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, duration) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>
<style lang="scss" scoped>
.toast {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 50px;
  width: 150px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>