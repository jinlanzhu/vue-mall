<template>
  <el-form
    ref="editRoleFormRef"
    :model="editRoleForm"
    :rules="roleRules"
    label-width="80px"
    class="demo-ruleForm"
  >
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="editRoleForm.roleName"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
      <el-input v-model="editRoleForm.roleDesc"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      roleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    editRoleForm: {
      type: Object
    }
  },
  components: {}
}
</script>

<style scoped>
</style>
