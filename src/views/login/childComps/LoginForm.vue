<template>
  <div class="login-form">
    <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" >
        <!-- 用户名 -->
        <el-form-item  prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-seeuser"></el-input>
        </el-form-item>
        <!-- 密码 -->
         <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-row>
            <el-col>
              <el-button type="primary" @click="submitForm">登录</el-button>
              <el-button type="info" @click="resetForm">重置</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        
        //表单的验证规则对象
        loginFormRules: {
           username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
            ]
        },
      }
    },
    props: {
      //表单的数据绑定对象  
      loginForm: {
          username: '',
          password: ''
        },
    },
    components: {

    },
    methods: {
      //重置
      resetForm() {
        this.$refs.loginFormRef.resetFields()
      },
      // 登录验证
      submitForm() {
        this.$refs.loginFormRef.validate((valid) => {
          if(!valid) {
            return
          } 
        //  this.getLogin()
        this.$emit('submitForm')
        }) 
      },
    }
  }
</script>

<style scoped>
  .login-form {
    width: 100%;
    bottom: 0;
    padding: 0 20px;
    position: absolute;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
