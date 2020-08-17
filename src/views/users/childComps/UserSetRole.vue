<template>
  <div>
    <p>当前用户：{{ userInfo.username}}</p>
    <p>当前角色：{{userInfo.role_name}}</p>
    <p>
      分配新角色：
      <el-select ref="setRoleRef" v-model="selectRoleId" default-first-option placeholder="请选择文章标签">
        <el-option
          v-for="item in rolesList"
          :value="item.id"
          :label="item.roleName"
          :key="item.value"
        ></el-option>
      </el-select>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectRoleById: this.selectRoleId
    }
  },
  model: {
    prop: 'selectRoleId',
    event: 'up'
  },
  props: {
    userInfo: {
      type: Object
    },
    rolesList: {
      type: Array
    },
    // selectRoleId: ''
    selectRoleId: {
      type: String
    }
  },
  conputed: {},
  watch: {
    selectRoleId(newSelectRoleId) {
      this.selectRoleById = newSelectRoleId
    },
    selectRoleId(newSelectRoleId) {
      this.$emit('change', newSelectRoleId)
    }
  },
  components: {},
  methods: {}
}
</script>

<style scoped>
</style>
