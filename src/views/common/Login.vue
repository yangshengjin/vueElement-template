<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
    <h3 class="title">车务系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="rememberPwd" style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="loading">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      ruleForm2: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      rememberPwd: false
    }
  },
  methods: {
    ...mapActions([
      'PostLogin'
    ]),
    handleReset2 () {
      this.$refs.ruleForm2.resetFields()
    },
    handleSubmit2 () {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.loading = true
          const loginParams = { account: this.ruleForm2.account, pwd: this.ruleForm2.checkPass }
          this.PostLogin(loginParams).then(res => {
            this.loading = false
            if (res.status.code === 1) {
              this.showSuccess('登录成功')
              // let redirect = this.$route.query.redirect
              // if (redirect) {
              //   this.$router.push({ path: redirect })
              // } else {
              //   this.$router.push({ path: '/page1' })
              // }
              // 保存账号密码
              let obj = {
                account: this.ruleForm2.account,
                checkPass: ''
              }
              if (this.rememberPwd) obj.checkPass = this.ruleForm2.checkPass
              localStorage.setItem('loginParams', JSON.stringify(obj))
              this.$router.push({ path: '/index' })
            } else {
              this.showError(res.status.desc)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    const _this = this
    window.addEventListener('keyup', function (e) {
      if (e.keyCode === 13) {
        _this.handleSubmit2()
      }
    })
  },
  created () {
    let loginParams = localStorage.getItem('loginParams')
    if (loginParams !== null && loginParams !== undefined) {
      loginParams = JSON.parse(loginParams)
      this.ruleForm2 = loginParams
      if (loginParams.checkPass !== '') this.rememberPwd = true
    }
  }
}
</script>

<style scoped>
.card-box {
  padding: 20px;
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #f9fafc;
  margin: 180px auto;
  width: 400px;
  border: 2px solid #8492a6;
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.loginform {
  width: 350px;
  padding: 35px 35px 15px 35px;
}
</style>
