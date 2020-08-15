<template>
  <!-- <div class="demo-ruleForm"> -->
  <el-form
    class="demo-ruleForm"
    :model="addForm"
    :rules="addFormRules"
    ref="addFormRef"
    label-width="70px"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="addForm.username" name="username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="addForm.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="addForm.email"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="addForm.mobile"></el-input>
    </el-form-item>
  </el-form>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    //自定义邮箱规则
    let checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        //合法邮箱
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    //自定义手机规则
    let checkMobile = (rule, value, callback) => {
      const regBobile = /^1[34578]\d{9}$/
      if (regBobile.test(value)) {
        return callback()
      }
      //返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }
    return {
      // 验证规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    // 表单属性
    addForm: {
      username: '',
      password: '',
      email: '',
      mobile: ''
    }
  },
  components: {}
}
</script>

<style scoped>
</style>
