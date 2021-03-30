<template>
  <div class="comment-item">
    <div
      class="commentItem"
      v-for="(item, index) in commentItemChild"
      :key="index"
    >
      <div class="header">
        <div class="userTouxiang">
          <img
            v-if="item.userinfo && item.userinfo.user_img"
            :src="item.userinfo.user_img"
          />
          <img v-else src="../../assets/img/profile/touxiang.jpg" alt="" />
        </div>
        <p>
          <span>{{ item.userinfo.name }}</span>
          <span>{{ item.comment_date }}</span>
        </p>
      </div>
      <div class="userInfoContent">
        <div class="commentContent" v-if="!flag">{{ item.comment_content }}</div>
				<div class="commentContent" v-else>回复
					<span class="replyUser">@{{item.parent_user_info.name}}：</span>
					{{ item.comment_content }}</div>
      </div>
      <div>
        <comment-item :comment-item-child="item.child" :flag="true"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommentItem",
  props: {
    commentItemChild: {
      type: Array,
      default() {
        return [];
      },
    },
		flag:{
			type:Boolean,
			default:false
		}
  },
};
</script>
<style lang="scss">
.comment-item {
  // padding: 0px 40px;
  .commentItem {
    display: flex;
    padding: 10px 0px;
    flex-direction: column;
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
			margin-left: 40px;
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
			.replyUser{
				font-size: 14px;
				color: lightseagreen;
			}
    }
  }
	.header{
		display: flex;
		p{
			flex: 1;
			display: flex;
			justify-content: space-between;
			line-height: 40px;
		}
	}
}
</style>