<template>
  <el-form :model="addCateForm" :rules="addCateRules" ref="addCateRef" label-width="100px">
    <el-form-item label="活动名称：" prop="cat_name">
      <el-input v-model="addCateForm.cat_name"></el-input>
    </el-form-item>
    <el-form-item label="父级分类：">
      <el-cascader
        v-model="selectedKeysById"
        :options="parentCatesList"
        :props="cascaderProps"
        change-on-select
        clearable
        @change="parantCateChanged"
      ></el-cascader>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      selectedKeysById: [],
      addCateRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      options: [
        {
          value: '',
          label: '',
          children: []
        }
      ]
    }
  },
  props: {
    addCateForm: {
      //分类名称
      cat_name: '',
      cat_pid: 0,
      cat_level: 0
    },
    //父级分类的列表
    parentCatesList: {
      type: Array
    },
    //指定联级选择器的配置对象
    cascaderProps: {
      // 配置触发选项 hover/click
      expandTrigger: 'hover',
      value: 'cat_id',
      label: 'cat_name',
      children: 'children'
    },
    selectedKeys: {
      type: Array
    }
  },
  created() {
    //回显
    this.selectedKeysById = this.selectedKeys
  },
  components: {},
  methods: {
    parantCateChanged() {
      console.log(this.selectedKeysById)
      this.$emit('parantCateChanged', this.selectedKeysById)
    }
  }
}
</script>

<style scoped>
</style>
