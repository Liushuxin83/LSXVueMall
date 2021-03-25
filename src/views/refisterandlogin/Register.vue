<template>
  <div class="register">
    <van-nav-bar
      title="注册账号"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form ref="formRef">
      <van-field
        v-model="yourName"
        name="姓名"
        label="姓名"
        placeholder="请输入您的姓名"
        :rules="[{ required: true, message: '请填写您的姓名' }]"
        class="yourName"
      />
      <van-field
        v-model="username"
        name="账号"
        label="账号"
        placeholder="请输入用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          {
            validator: validatorUsername,
            message: '账号必须是4到12位（字母，数字，下划线，减号）',
          },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          {
            validator: validatorPassword,
            message: '密码必须是6到16位（字母，数字，下划线，减号）',
          },
        ]"
      />
      <van-field
        v-model="secondPassword"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="请再次输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          {
            validator: validatorSecondPassword,
            message: '两次输入密码不合法或不相同',
          },
        ]"
      />
    </van-form>
    <div style="margin: 16px" class="footerButton">
      <van-button round :block="false" type="info" @click="login"
        >登录</van-button
      >
      <van-button round :block="false" type="info" @click="register"
        >注册</van-button
      >
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Form, Field, Button } from "vant";

Vue.use(NavBar).use(Form).use(Field).use(Button);
export default {
  data() {
    return {
      username: "",
      password: "",
      secondPassword: "",
      yourName: "",
      //要预验证的数组name
      predictValidator: ["姓名", "账号", "密码", "确认密码"],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.replace("/profile");
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validatorUsername(val) {
      return /^[a-zA-Z0-9_-]{4,12}$/.test(val);
    },
    validatorPassword(val) {
      return /^[a-zA-Z0-9_-]{6,16}$/.test(val);
    },
    validatorSecondPassword(val) {
      // console.log(val);
      return this.password == val;
    },
    //点击注册   注意如果使用async await时，捕获错误要用try catch
    register() {
      const result = this.$refs.formRef.validate(this.predictValidator);
      result.then(
        (res) => {
          if (res == undefined) {
            this.$http({
              method: "post",
              url: "/register",
              data: {
                name: this.yourName,
                username: this.username,
                password: this.password,
              },
            }).then((res) => {
              // console.log(res);
              if (res.code !== 200) {
                return this.$Toast({
                  type: "fail",
                  message: res.msg,
                  position: "top",
                  duration: 2000,
                });
              }
							localStorage.setItem('id',res.id);
							localStorage.setItem('token',res.objtoken);
							// console.log(res);
				      setTimeout(()=>{
								this.$router.push('/login')
							},1000)
							console.log(res);
              return this.$Toast({
                type: "success",
                message: res.msg,
                position: "top",
                duration: 1500,
              });
            });
          }
        },
        (err) => {
          if (err.length > 0) {
            return false;
          }
        }
      );
    },
    //点击登录
    login() {
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.register {
  height: 100vh;
  background-color: #eee;
  .van-form {
    margin-top: 20px;
    .yourName {
      margin-bottom: 10px;
    }
  }
  .footerButton {
    display: flex;
    justify-content: space-around;
    .van-button--round {
      width: 150px;
    }
  }
}
</style>