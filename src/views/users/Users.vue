<template>
  <div>
    <!-- 面包屑导航 -->
    <users-nav></users-nav>
    <users-list></users-list>
  </div>
</template>

<script>
import UsersNav from './childComps/UsersNav'
import UsersList from './childComps/UsersList'

export default {
  data() {
    return {}
  },
  components: {
    UsersNav,
    UsersList
  }
}
</script>

<style scoped>
</style>
