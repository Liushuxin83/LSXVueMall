<template>
<!-- 一级评论 -->
  <div class="comment-data">
		<div v-for="(item,index) in commentData" :key='index' v-if="item.userinfo">
		<div class="commentItem">
		<div class="userTouxiang">
			<img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
			<img v-else src="../../assets/img/profile/touxiang.jpg" alt="">
		</div>
		<div class="userInfoContent">
			<p>
				<span>{{item.userinfo.name}}</span>
				<span>{{item.comment_date}}</span>
				<div class="commentContent">
					{{item.comment_content}}
					<span class="reply" @click="replyOne(item.comment_id,item.userinfo.name)">回复</span>
					</div>
			</p>
		</div>
		</div>
		 <comment-item :comment-item-child="item.child" class="comment-item"  @replyMore="replyMore"/>
		</div>
	</div>
</template>
<script>
import CommentItem from "../comment/CommentItem";
export default {
  data() {
    return {
      commentData: null,
    };
  },
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
      if (res) {
        this.$emit("commentLength", res.length);
      }
      this.commentData = this.changeCommentData(res);
    },
    //改造一下评论数据 为树状结构
    changeCommentData(data) {
      function recursion(temp) {
        let arr1 = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            //为null 说明是一级评论
            // console.log(arr[i]);
            arr1.push(data[i]);
            data[i].child = recursion(data[i].comment_id);
          }
        }
        return arr1;
      }
      return recursion(null);
    },
    //获取一级评论的评论id
    replyOne(comment_id, userName) {
      // console.log(comment_id);
      this.$emit("reply", comment_id, userName);
    },
    replyMore(comment_id, userName) {
      // console.log(comment_id, userName);
      //需要继续往父组件发射事件
      this.$emit("deepComment", comment_id, userName);
    },
  },
  components: {
    CommentItem,
  },
};
</script>
<style lang="scss" scoped>
.comment-data {
  position: relative;
  padding: 20px 10px;
  > div {
    border-bottom: 1px solid rgb(223, 216, 216);
  }
  .commentItem {
    display: flex;
    padding: 10px 0px;
    .userTouxiang {
      width: 35px;
      height: 35px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
      }
    }
    .userInfoContent {
      flex: 1;
      p {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: gray;
        margin-bottom: 10px;
        .commentContent {
          font-size: 14px;
        }
      }
    }
  }
  .comment-item {
    margin-left: 40px;
  }
  .reply {
    position: absolute;
    right: 10px;
    color: red;
  }
}
</style>