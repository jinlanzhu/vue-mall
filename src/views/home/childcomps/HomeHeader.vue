<template>
  <el-container>
    <el-header>
      <div class="logo-box">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
  </el-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  methods: {
    /**
     * 退出
     */
    logout() {
      // 1. 清除token值
      window.sessionStorage.clear()
      // 2. 跳转到登录页面
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.el-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #373d41;
}
</style>
