<template>
  <div>
    <!-- 导航 -->
    <rights-nav />
    <!-- 权限列表信息 -->
    <rights-list :rights-list="rightsList" />
  </div>
</template>

<script>
import { getRightsList } from 'network/power.js'

import RightsNav from './childComps/RightsNav'
import RightsList from './childComps/RightsList'
export default {
  data() {
    return {
      //权限列表信息
      rightsList: []
    }
  },
  components: {
    RightsNav,
    RightsList
  },
  created() {
    this.getRightsList()
  },
  methods: {
    getRightsList() {
      getRightsList().then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('获取权限列表失败！')
        }
        this.rightsList = res.data
        console.log(this.rightsList)
        this.$message.success('获取权限列表成功！')
      })
    }
  }
}
</script>

<style scoped>
</style>
