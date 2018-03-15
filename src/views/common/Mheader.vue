<template>
  <div class="m-header">
    <el-row class="panel-top">
      <el-col :span="6">
        <h2>车务管理系统</h2>
      </el-col>
      <el-col :span="18" class="rightbar">
        <p>
          <span style="padding-right: 15px">{{roleName}}
            <em style="padding:0 5px">-</em>{{username}}</span>
          <a href="javascript:" @click="logout">退出系统</a>
        </p>
      </el-col>
    </el-row>
  </div>
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
@import '../../styles/themes.less';
.panel-top {
  background: @themes;
  padding: 0 15px;
  height: 60px;
  line-height: 60px;
  color: #ffffff;
  .el-button--text {
    color: #ffffff;
  }
  .rightbar {
    text-align: right;
    padding-right: 35px;
    a {
      color: #ffffff;
    }
  }
}
</style>
