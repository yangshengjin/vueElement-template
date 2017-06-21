<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created: function () {
    let UserInfo = localStorage.getItem('UserInfo')
    if (UserInfo === null || UserInfo === undefined) {
      this.$router.replace('/login')
      return
    } else {
      UserInfo = JSON.parse(UserInfo)
      this.$store.commit('POST_LOGIN', { UserInfo: UserInfo })
    }
  }
}
</script>

<style lang="less">
@import './styles/themes.less';
@import './styles/base.less';
.el-message {
  top: 33.3%;
}
</style>
