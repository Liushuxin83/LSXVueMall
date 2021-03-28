<template>
  <div>
    <top-sticky class="topNav">个人中心</top-sticky>
    <login-part-one :personalInfo="personalInfo" />
    <van-cell icon="coupon" title="编辑资料" is-link @click="$router.push('/editpersonalinfo')"/>
		<quit @quitLogin="quitLogin"/>
  </div>
</template>
<script>
import TopSticky from "../components/TopSticky";
import LoginPartOne from "../views/profile/LoginPartOne";
import Quit from '../views/profile/Quit'
import { Cell } from "vant";
import Vue from 'vue'
Vue.use(Cell);
export default {
	name:'profile',
  data() {
    return {
      personalInfo: {},
    };
  },
  components: {
    TopSticky,
    LoginPartOne,
		Quit
  },
  mounted() {
    this.userInfoData();
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to);
    // console.log(from);
    if (from.fullPath == "/login" && to.fullPath == "/profile") {
      next((vm) => {
        vm.userInfoData();
      });
    } else {
      next();
    }
  },
  methods: {
    //等用户登录之后来获取用户数据
    async userInfoData() {
      if (localStorage.getItem("id")) {
        const res = await this.$http({
          url: `/user/${localStorage.getItem("id")}`,
          // Headers: {
          //   Authorization: "Bearer " + localStorage.getItem("token"),
          // },
        });
        // console.log(res);
        this.personalInfo = res[0];
        // console.log(this.personalInfo);
      } else {
        this.personalInfo = {};
      }
    },
		//退出登录
		quitLogin(){
			this.userInfoData();
		},
  },
};
</script>
<style lang="scss" scoped>
.topNav {
  border-bottom: 2px solid #eee;
}
.van-cell{
	border-top: 10px solid #eee;
	border-bottom: 1px solid #eee;
}
</style>