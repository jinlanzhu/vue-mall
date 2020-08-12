<template>
  <div class="login-avatar">
      <img src="~assets/img/login/avatar.jpg" />
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    components: {

    }
  }
</script>

<style scoped>
  .login-avatar {
    width: 130px;
    height: 130px;
    padding: 8px;
    border-radius: 50%;
    border: 1px solid #eee;
    box-shadow: 0 0 10px #eee;
    left: 50%;
    position: absolute;
    background-color: #fff;
    transform: translateX(-50%) translateY(-50%);
  }
  .login-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
</style>
