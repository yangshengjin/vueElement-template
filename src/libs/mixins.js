
export default {
  data () {
    return {
      exVisible: {
        show: false,
        path: ''
      }
    }
  },
  methods: {
    message (text) {
      this.$message({
        message: text,
        type: 'info',
        showClose: true,
        duration: 2000
      })
    },
    showSuccess (text) {
      this.$message({
        message: text,
        type: 'success',
        showClose: true,
        duration: 2000
      })
    },
    showError (text) {
      this.$message({
        message: text,
        type: 'error',
        showClose: true,
        duration: 2000
      })
    },
    showAlert (text) {
      this.$alert(text, '提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      })
    },
    showConfirm (text, callback) {
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        callback()
      }).catch(() => { })
    },
    checkPhoneReg (phone) {
      let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/ // 手机号码正则表达式
      return !phoneReg.test(phone)
    },
    checkIdCardReg (idcard) {
      var IdNumberReg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/ // 身份证号码正则表达式
      return !IdNumberReg.test(idcard)
    },
    checkTel (tel) {
      var telReg = /^0\d{2,3}-?\d{7,8}$/ // 固定电话正则表达式
      return !telReg.test(tel)
    },
    goBack () {
      // 返回
      this.$router.go(-1)
    },
    parse (model) {
      return JSON.parse(JSON.stringify(model))
    },
    exportData (path, params) {
      console.log(this)
      const h = this.$createElement
      this.$msgbox({
        title: '导出类型',
        message: h('<p>123123</p>'),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        })
      })
    }
  }
}
