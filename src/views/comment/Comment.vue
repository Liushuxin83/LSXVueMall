<template>
  <div class="wraper">
		<div>评论（{{length}}）</div>
    <div class="myCommentArea">
      <van-image
        v-if="myUserInfo"
        round
        fit="cover"
        width="3rem"
        height="3rem"
        :src="myUserInfo.user_img"
      />
      <div v-else>
        <van-image
          round
          fit="cover"
          width="3rem"
          height="3rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="inputComment">
        <van-search
          v-model="commentValue"
          placeholder="说点什么吧"
          shape="round"
          :clearable="true"
        />
        <button class="btn" @click="publishComment">发表</button>
      </div>
    </div>
		<comment-data @commentLength="commentLength"/>
  </div>
</template>
<script>
import Vue from "vue";
import CommentData from '../comment/CommentData'
import { Image as VanImage, Search } from "vant";

Vue.use(VanImage).use(Search);
export default {
	name:'comment',
  data() {
    return {
      myUserInfo: null,
      commentValue: "",
			length:0,
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.getUserInfo();
    }
  },
	components:{
		CommentData
	},
  methods: {
    //获取用户信息
    async getUserInfo() {
      const res = await this.$http({
        url: "/user/" + localStorage.getItem("id"),
      });
      console.log(res[0]);
      this.myUserInfo = res[0];
    },
    publishComment() {
      if (!localStorage.getItem("token") && !localStorage.getItem("id")) {
        this.$Toast({
          type: "fail",
          message: "请先登录",
          position: "top",
        });
      }
    },
		//用来获取由子组件发出来的事件中的 评论数组的长度
		commentLength(length){
			// console.log(length);
			this.length = length;
		},
  },
};
</script>
<style lang="scss" scoped>
.myCommentArea {
  padding: 10px 10px;
  display: flex;
  .inputComment {
    display: flex;
    flex: 1;
    .btn {
      margin-top: 5px;
      background-color: rgb(255, 182, 182);
      border: 0;
      outline: none;
      width: 70px;
      height: 40px;
      border-radius: 20px;
    }
  }
}
.wraper /deep/ .van-icon-search::before {
  display: none;
}
</style>