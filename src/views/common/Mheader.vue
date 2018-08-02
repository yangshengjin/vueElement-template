<template>
  <el-header>
    <h2 class="header-logo">车务管理系统</h2>
    <ul class="header-operations">
      <li>
        {{roleName}}
        <em style="padding:0 5px">-</em>
        {{username}}
      </li>
      <li>
        <a href="javascript:" @click="logout">退出系统</a>
      </li>
    </ul>
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'm-header',
  data () {
    return {
      username: '',
      roleName: ''
    }
  },
  methods: {
    logout () {
      this.$confirm('确认退出吗？', '提示', {
      }).then(() => {
        this.$store.commit('POST_LOGIN_OUT')
      }).catch(() => {
        console.log('取消')
      })
    }
  },
  computed: {
    ...mapGetters([
      'UserInfo'
    ])
  },
  created () {
    if (this.UserInfo !== null) {
      this.username = this.UserInfo.name
      this.roleName = this.UserInfo.role
    }
  }
}
</script>

<style scope lang="less">
.header-logo {
  display: inline-block;
  vertical-align: middle;
}
.header-operations {
  display: inline-block;
  float: right;
  padding-right: 30px;
  height: 100%;
  li {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    padding: 0 10px;
    margin: 0 5px;
    line-height: 60px;
    cursor: pointer;
    a {
      color: #ffffff;
    }
  }
}
</style>
