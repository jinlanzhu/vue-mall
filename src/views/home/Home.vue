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
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-bar" @click="collapseBtn">|||</div>
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath"
          >
            <!-- 一级菜单 -->
            <el-submenu v-for="item in menuList" :key="item.id" :index="item.id + ''">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="saveNavState('/' + subItem.path)"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- main部分 -->
        <el-main>
          <!-- <welcome></welcome>
          <users></users>-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getMenusList } from '../../network/home'
import Welcome from './childComps/Welcome'
import Users from 'views/users/Users'

export default {
  data() {
    return {
      //左侧菜单数据
      menuList: [],
      //一级菜单图标
      iconObj: {
        '125': 'iconfont icon-users',
        '103': 'iconfont icon-Jurisdiction',
        '101': 'iconfont icon-shop',
        '102': 'iconfont icon-orderclick',
        '145': 'iconfont icon-dataanalysis'
      },
      //是否合并
      isCollapse: false,
      // 激活的链接
      activePath: ''
    }
  },
  components: {
    Welcome,
    Users
  },
  created() {
    this.getMenusList()
    this.activePath = window.sessionStorage.getItem('activePath')
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
    },
    //获取左侧菜单栏数据
    getMenusList() {
      getMenusList().then(res => {
        if (res.meta.status !== 200) {
          return this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
        this.menuList = res.data
      })
    },
    //菜单栏的合并与展开
    collapseBtn() {
      this.isCollapse = !this.isCollapse
    },
    //保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373f41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  /* background-color: #373d41; */
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
.el-aside {
  background-color: #333744;
}
.toggle-bar {
  color: #fff;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  line-height: 25px;
  box-sizing: border-box;
  letter-spacing: 0.1em;
  background-color: #4a5064;
}
.el-menu {
  border: none;
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
</style>
