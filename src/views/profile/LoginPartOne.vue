<template>
  <div @click="toRegisterPage">
    <div class="headArea">
      <span>
        <div class="headImg">
					<img :src="personalInfo.user_img" v-if="personalInfo.user_img">
					<img v-else src="../../assets/img/profile/touxiang.jpg">
					</div>
				<div class="loginPart">
					<div v-if="personalInfo.id">
						<div class="loginFont">{{personalInfo.name}},id:{{personalInfo.id}}</div>
					  <div class="phoneFont">暂无绑定手机号</div>
					</div>
					<div v-else>
						<div class="loginFont">登录/注册</div>
					  <div class="phoneFont">暂无绑定手机号</div>
					</div>
				</div>
				<div class="loginArrow">
					<van-icon name="arrow" />
				</div>
      </span> 
			<div class="signature" v-if="personalInfo.user_desc">{{personalInfo.user_desc}}</div>
			<div class="signature" v-else>这个人很神秘，神秘也没有写</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Icon } from "vant";

Vue.use(Icon);
export default {
	props:{
		personalInfo:{
			type:Object,
			default(){
				return{}
			}
		}
	},
	methods: {
		toRegisterPage(){
			this.$router.push('/register')
		}
	},
};
</script>
<style lang="scss" scoped>
.headArea{
	position: relative;
	height: 104px;
	padding: 15px 20px;
	// background-color: #07C160;
	background-color: #07C160;
	.headImg{
		display: inline-block;
		width: 70px;
		height: 70px;
		border-radius: 100%;
		overflow: hidden;
		background-color: #eee;
		img{
			width: 100%;
		}
	}
	.loginPart{
		position: absolute;
		left: 115px;
		top: 30px;
		display: inline-block;
		color: #fff;
		.loginFont{
			font-size: 20px;
			margin-bottom: 5px;
		}
		.phoneFont{
			font-size: 14px;
		}
	}
	.loginArrow{
		position: absolute;
		right: 20px;
		top: 40px;
		display: inline-block;
		font-size: 25px;
		color: #fff;
	}
	.signature{
		font-size: 14px;
		margin-left: -10px;
	}
}
</style>