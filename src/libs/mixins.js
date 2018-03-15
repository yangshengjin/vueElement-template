
export default {
  data () {
    return {
      exportData: { show: false, path: '', reqData: {} },
      dialogVisible: { status: false, dialogTitle: '' },
      statusOptions: [{ id: 1, name: '启用' }, { id: 0, name: '停用' }]
    }
  },
  methods: {
    showInfo (text) {
      this.$message({
        message: text,
        type: 'info',
        showClose: true,
        duration: 2000
      })
    },
    showWarning (text) {
      this.$message({
        message: text,
        type: 'warning',
        showClose: true,
        duration: 1500
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
    _getModel (model) {
      return JSON.parse(JSON.stringify(model))
    }
  }
}
