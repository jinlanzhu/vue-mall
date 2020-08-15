<template>
  <div>
    <el-form
      class="demo-ruleForm"
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="70px"
    >
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" name="username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

  </div>
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
      editFormRules: {
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
    editForm: {
      type: Object
    }
  },
  components: {}
}
</script>

<style scoped>
</style>
