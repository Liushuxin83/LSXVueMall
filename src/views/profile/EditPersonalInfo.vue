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
      <van-cell title="昵称" @click="editNameDialogShow">
        <template #right-icon>
          {{ userInfo.name }}
        </template>
      </van-cell>
      <van-cell title="ID">
        <template #right-icon>
          {{ userInfo.id }}
        </template>
      </van-cell>
      <van-cell title="性别" @click="genderShow">
        <template #right-icon>
          <div v-if="userInfo.gender==1">男</div>
					<div v-else="userInfo.gender==0">女</div>
        </template>
      </van-cell>
      <van-cell title="个性签名" @click="editPersonalSignDialogShow">
        <template #right-icon>
          <p class="user-desc">{{ userInfo.user_desc }}</p>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 编辑昵称dialog -->
    <van-dialog
      v-model="isEditNameDialogShow"
      title="昵称"
      show-cancel-button
      @confirm="confirmName"
      @cancel="cancelName"
    >
      <van-field v-model="name" autofocus />
    </van-dialog>
    <!-- 编辑个性签名对话框 -->
    <van-dialog
      v-model="isEditPersonalSignDialogShow"
      title="个性签名"
      show-cancel-button
      @confirm="confirmPersonalSign"
      @cancel="personalSign = ''"
    >
      <van-field
        v-model="personalSign"
        type="textarea"
        autofocus
        maxlength="30"
        show-word-limit
      />
    </van-dialog>
    <!-- 选择性别 -->
    <van-action-sheet
      v-model="selectGenderShow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="genderCancel"
      @select="selectGender"
    />
  </div>
</template>
<script>
import Vue from "vue";
import {
  NavBar,
  Cell,
  CellGroup,
  Icon,
  Uploader,
  Dialog,
  Field,
  ActionSheet,
} from "vant";

Vue.use(NavBar)
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Uploader)
  .use(Dialog)
  .use(Field)
  .use(ActionSheet);
export default {
  data() {
    return {
      userInfo: {},
      isEditNameDialogShow: false,
      //昵称
      name: "",
      isEditPersonalSignDialogShow: false,
      personalSign: "",
      selectGenderShow: false,
      actions: [
        { name: "男", value: 1 },
        { name: "女", value: 0 },
      ],
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
    //   username        否
    //   name            否
    //   head_img        否
    //   gender          否
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
          message: "修改失败",
          duration: 2000,
        });
      return this.$Toast({
        type: "success",
        message: "修改成功",
        duration: 2000,
      });
    },
    //点击之后  编辑昵称对话框显示
    editNameDialogShow() {
      this.isEditNameDialogShow = true;
    },
    //编辑昵称后点击了确认按钮触发该函数 ，把输入框的值赋值给name，先更改前端中userInfo中的name，然后在更新后端数据
    confirmName() {
      // console.log(111);
      this.userInfo.name = this.name;
      this.updateBackData();
      this.name = "";
    },
    //点击了编辑昵称对话框的取消
    cancelName() {
      this.name = "";
    },
    //编辑个性签名显示
    editPersonalSignDialogShow() {
      this.isEditPersonalSignDialogShow = true;
    },
    //编辑个性签名  点击了确认
    confirmPersonalSign() {
      // console.log(111);
      this.userInfo.user_desc = this.personalSign;
      this.updateBackData();
      this.personalSign = "";
    },
    //点击性别  展示对话框s
    genderShow() {
      this.selectGenderShow = true;
    },
    genderCancel() {
      this.selectGenderShow = false;
    },
    //选择了性别
    selectGender(selected) {
      // console.log(selected);
      this.userInfo.gender = selected.value;
			this.updateBackData();
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
  .user-desc {
    width: 40vw;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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