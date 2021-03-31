<template>
  <div class="wraper">
		<div style="color:red;fontSize:20px" @click="$router.push('/comment/smallfunction')">另外一个小功能</div>
    <div>评论（{{ length }}）</div>
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
          :placeholder="placeholder"
          shape="round"
          :clearable="true"
        />
        <button class="btn" @click="publishComment">发表</button>
      </div>
    </div>
    <comment-data
      @commentLength="commentLength"
      ref="commentData"
      @reply="reply"
      @deepComment="deepComment"
    />
  </div>
</template>
<script>
import Vue from "vue";
import CommentData from "../comment/CommentData";
import { Image as VanImage, Search } from "vant";

Vue.use(VanImage).use(Search);
export default {
  name: "comment",
  data() {
    return {
      myUserInfo: null,
      commentValue: "",
      length: 0,
      //发表评论在请求数据的时候需要传参  参数为comment_content   comment_date  parent_id
      publishCommentUserModel: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: 23,
      },
      placeholder: "说点什么吧",
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.getUserInfo();
    }
  },
  components: {
    CommentData,
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
    async publishComment() {
      if (!localStorage.getItem("token") && !localStorage.getItem("id")) {
        this.$Toast({
          type: "fail",
          message: "请先登录",
          position: "top",
        });
      } else {
        // console.log(this.commentValue);
        this.publishCommentUserModel.comment_content = this.commentValue;
        const date = new Date();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        if (m < 10) {
          m = `0${m}`;
        }
        if (d < 10) {
          d = `0${d}`;
        }
        let str = `${m}-${d}`;
        // console.log(str);
        this.publishCommentUserModel.comment_date = str;
        const res = await this.$http({
          method: "post",
          url: `/comment_post/${localStorage.getItem("id")}`,
          data: this.publishCommentUserModel,
        });
        // console.log(res);
        if (res.serverStatus == 2) {
          this.$refs.commentData.getCommentData();
					//在发表评论请求完成之后 ，需要把某些数据变成初始的样子
          this.commentValue = "";
          this.placeholder = "说点什么吧";
          this.publishCommentUserModel.parent_id = null;
        }
      }
    },
    //用来获取由子组件发出来的事件中的 评论数组的长度
    commentLength(length) {
      // console.log(length);
      this.length = length;
    },
    //可以获取由子组件传过来的comment_id   字传父  这个时候需要把要回复的commen_id赋值给要发送请求中的publishCommentUserModel.parent_id
    reply(comment_id, userName) {
      console.log(comment_id, userName);
      this.publishCommentUserModel.parent_id = comment_id;
      this.placeholder = `@${userName}`;
    },
    deepComment(comment_id, userName) {
      console.log(comment_id, userName);
      this.publishCommentUserModel.parent_id = comment_id;
      this.placeholder = `@${userName}`;
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