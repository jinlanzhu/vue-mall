<template>
  <el-form :model="editCateForm" :rules="editCateRules" ref="editCateRef" label-width="100px">
    <el-form-item label="活动名称：" prop="cat_name">
      <el-input v-model="editCateForm.cat_name"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      editCateRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    //修改的参数
    editCateForm: {
      cat_name: ''
    }
  },
  components: {},

  methods: {}
}
</script>

<style scoped>
</style>
