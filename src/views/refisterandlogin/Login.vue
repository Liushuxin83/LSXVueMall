<template>
  <div class="register">
    <van-nav-bar
      title="登录账号"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form ref="formRef">
      <van-field
        v-model="username"
        name="账号"
        label="账号"
        placeholder="请输入账号"
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
			<!-- 记住密码 -->
			<van-checkbox v-model="passwordChecked" shape="square" class="rememberPassword" @change="changeRemember">记住密码</van-checkbox>
    </van-form>
    <div style="margin: 16px" class="footerButton">
      <van-button round :block="false" type="info" size="large" @click="login"
        >登录</van-button
      >
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Form, Field, Button,Checkbox} from "vant";
Vue.use(NavBar).use(Form).use(Field).use(Button).use(Checkbox);
export default {
	name:'login',
  data() {
    return {
      username: "",
      password: "",
      //要预验证的数组name
      predictValidator: ["账号", "密码"],
			//是否勾选记住密码
			passwordChecked:false,
    };
  },
	created(){
		//账号信息自动填充到登录输入框中  取cookie
		let username = window.atob(this.getCookie('username'));
		let password = window.atob(this.getCookie('password'));
		// console.log(username);
		// console.log(password);
		if(username){
			this.username = username;
			this.password = password;
			this.passwordChecked = true
		}
	},
  methods: {
    onClickLeft() {
      this.$router.replace("/register");
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validatorUsername(val) {
      return /^[a-zA-Z0-9_-]{4,12}$/.test(val);
    },
    validatorPassword(val) {
      return /^[a-zA-Z0-9_-]{6,16}$/.test(val);
    },
    //点击登录   注意如果使用async await时，捕获错误要用try catch
    async login() {
      try {
        const result = await this.$refs.formRef.validate(this.predictValidator);
        // console.log(result);
        if (result == undefined) {
          const login = await this.$http({
            method: "post",
            url: "/login",
            data: { username: this.username, password: this.password },
          });
          console.log(login);
          switch (login.code) {
            case 200:
							localStorage.setItem('id',login.id);
							localStorage.setItem('token',login.token)
							//登录成功 把账号密码存入cookie
							this.changeRemember();
              setTimeout(() => {
                this.$router.push("/profile");
              }, 1000);
              this.$Toast({
                type: "success",
                message: login.msg,
                position: "top",
                duration: 1500,
              });
              break;
            case 302:
              this.$Toast({
                type: "fail",
                message: login.msg,
                position: "top",
                duration: 2000,
              });
              break;
            case 301:
              this.$Toast({
                type: "fail",
                message: login.msg,
                position: "top",
                duration: 2000,
              });
              break;
          }
        }
      } catch (error) {
        // console.log(error);
        return false;
      }
    },
		changeRemember(){
			console.log(this.passwordChecked);
			if(this.passwordChecked){
				this.setCookie('username',window.btoa(this.username),7);
				this.setCookie('password',window.btoa(this.password),7);
				this.setCookie('rememberPasswordCheck',this.passwordChecked,7);
			}else{
				//清空cookie账号信息
				this.setCookie('username','',-1)
				this.setCookie('password','',-1)
				this.setCookie('rememberPasswordCheck',this.passwordChecked,7)
			}
		},
		// 设置cookie
		setCookie(cName,value,expiredays){
			let exdate = new Date()
			exdate.setDate(exdate.getDate() + expiredays);
			document.cookie = cName + '=' + value +
			((expiredays==null)?'':';expires=' + exdate.toGMTString())
		},
		getCookie(key){
			if(document.cookie.length>0){
				let start = document.cookie.indexOf(key + '=')
				if(start !== -1){
					start = start + key.length +1
					let end = document.cookie.indexOf(';',start)
					if(end == -1){
						end = document.cookie.length
					}
					return unescape(document.cookie.substring(start,end))
				}
			}
			return ''
		},
  },
	// activated(){
	// 	console.log('login 活跃');
	// },
	// deactivated(){
	// 	console.log('login 不活跃');
	// 	//由于在输入账号密码之后，login组件没有被销毁，所以在再次访问login的时候，依然可以看到账号密码（未选择记住密码）
	// 	this.$destroy('login')
	// },
	// destroyed(){
	// 	console.log('login组件销毁s');
	// }
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
	.rememberPassword{
		margin-top: 10px;
		margin-left: 70vw;
	}
}
</style>