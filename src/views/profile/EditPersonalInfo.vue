<template>
  <div>
    <van-nav-bar
      title="个人资料"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <div class="uploadImg">
        <van-uploader
          class="upload"
          preview-size="100vw"
          :after-read="afterRead"
        />
        <van-cell title="头像" class="head-lineheight">
          <template #right-icon>
            <div class="touxiang">
              <img v-if="userInfo.user_img" :src="userInfo.user_img" />
              <img v-else src="../../assets/img/profile/touxiang.jpg" />
            </div>
          </template>
        </van-cell>
      </div>
      <van-cell title="昵称">
        <template #right-icon>
          {{ userInfo.name }}
        </template>
      </van-cell>
      <van-cell title="ID">
        <template #right-icon>
          {{ userInfo.id }}
        </template>
      </van-cell>
      <van-cell title="性别">
        <template #right-icon>
          {{ userInfo.gender }}
        </template>
      </van-cell>
      <van-cell title="个性签名">
        <template #right-icon>
          {{ userInfo.user_desc }}
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Cell, CellGroup, Icon, Uploader } from "vant";

Vue.use(NavBar).use(Cell).use(CellGroup).use(Icon).use(Uploader);
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async getUserInfo() {
      const res = await this.$http({
        url: `/user/${localStorage.getItem("id")}`,
      });
      console.log(res);
      this.userInfo = res[0];
    },
    //上传图片
    async afterRead(imgFile) {
      console.log(imgFile);
      const formdata = new FormData();
      formdata.append("file", imgFile.file); //这个键名file是后端规定的
      const res = await this.$http({
        method: "post",
        url: "/upload",
        data: formdata,
      });
      // console.log(res);
      this.userInfo.user_img = res.url; //这只是在前端中该了userinfo这个对象中的图片  并没有更新后端的数据
      //更新后端数据
      this.updateBackData();
    },
    //更新后端数据
    //   /updata/:id
    //   参数 | 默认值 | 必传 | 说明
    //   ---- |-------|----|----
    //   :id    全为空   是
    //   username       否
    //   name           否
    //   head_img       否
    //   gender         否
    async updateBackData() {
      const res = await this.$http({
        method: "post",
        url: `/update/${localStorage.getItem("id")}`,
        data: this.userInfo,
      });
      console.log(res);
      if (res.code !== 200)
        return this.$Toast({
          type: "fail",
          message: res.msg,
          duration: 2000,
        });
      return this.$Toast({
        type: "success",
        message: '修改头像成功',
        duration: 2000,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.van-nav-bar {
  border-bottom: 5px solid #eee;
}
.van-cell {
  border-bottom: 1px solid #eee;
  line-height: 40px;
  font-size: 16px;
}
.head-lineheight {
  line-height: 80px;
}
.touxiang {
  width: 80px;
  height: 80px;
  border-radius: 100%;
  overflow: hidden;
  img {
    width: 80px;
  }
}
.uploadImg {
  position: relative;
  overflow: hidden;
  .upload {
    position: absolute;
    z-index: 2;
    opacity: 0;
  }
}
</style>