<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 用户头像 -->
      <login-avatar />
      <!-- 登录验证 -->
      <login-form @submitForm="submitForm" :login-form="loginForm" />
    </div>
  </div>
</template>

<script>
import { getLogin } from 'network/login.js'

import LoginAvatar from './childComps/LoginAvatar'
import LoginForm from './childComps/LoginForm'

export default {
  data() {
    return {
      // //表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  components: {
    LoginAvatar,
    LoginForm
  },
  created() {},
  methods: {
    submitForm() {
      this.getLogin()
    },
    //判断登录状态是否成功
    getLogin() {
      getLogin(this.loginForm.username, this.loginForm.password).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            message: '登录成功',
            type: 'success'
          })

          //将token临时保存在sessionStorage中
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        } else if (res.meta.status === 400) {
          this.$message({
            message: '登录失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100%;
  background: #2b4b6b;
  overflow: hidden;
}
.login-box {
  top: 50%;
  left: 50%;
  width: 450px;
  height: 300px;
  position: absolute;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
</style>
