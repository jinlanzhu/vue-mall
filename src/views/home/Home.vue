<template>
  <div id="home">
    <el-container class="home-container">
      <!-- 头部 -->
      <el-header>
        <div class="logo-box">
          <img src="~assets/img/avatar.jpg" />
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>-->
    </el-container>
  </div>
</template>

<script>
// import HomeHeader from './childcomps/HomeHeader'
// import HomeAside from './childcomps/HomeAside'
// import HomeMain from './childcomps/HomeMain'

export default {
  data() {
    return {}
  },
  components: {
    // HomeHeader,
    // HomeAside,
    // HomeMain
  },
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
.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  padding: 0;
  padding-right: 20px;
  align-items: center;
  justify-content: space-between;
  background-color: #373d41;
}
.logo-box {
  color: #fff;
  display: flex;
  font-size: 22px;
  align-items: center;
}
.logo-box img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 10px;
}
/* .logo-box span {
  height: 60px;
  display: inline-block;
  line-height: 60px;
} */
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>
