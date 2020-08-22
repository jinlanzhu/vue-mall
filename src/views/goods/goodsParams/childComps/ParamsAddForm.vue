<template>
  <el-form
    :model="addParamsForm"
    :rules="addParamsRules"
    ref="addParamsRef"
    label-width="70px"
    class="demo-ruleForm"
  >
    <el-form-item :label="getTitleText" prop="attr_name">
      <el-input v-model="addParamsForm.attr_name" name="attr_name"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      //验证规则
      addParamsRules: {
        arrr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      activeName: ''
    }
  },
  props: {
    //添加参数对象
    addParamsForm: {
      //参数名称
      attr_name: ''
    },
    activeTagName: {
      type: String,
      default: 'many'
    }
  },
  computed: {
    getTitleText() {
      console.log(this.activeName)
      if (this.activeTagName === 'many') {
        return '动态参数'
      } else if (this.activeTagName === 'only') {
        return '静态属性'
      }
    }
  },
  components: {}
}
</script>

<style scoped>
</style>
