<!--
  封装上传图片组件，适用于7牛云上传
-->
<template>
  <div>
    <el-upload class="upload-demo" :action="uploadUrl" :data="uploadData" list-type="picture" :on-success="onSuccess" :on-error="onError" :before-upload="beforeUpload">
      <el-button type="primary" :loading="loading">浏览</el-button>
      <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      <!--<div v-show="img1" class="u-img"><img :src="img1" alt="" /></div>-->
      <span slot="tip" class="el-upload__tip" style="color: #13ce66" v-show="status === 1">上传成功</span>
      <span slot="tip" class="el-upload__tip" style="color: #ce132b" v-show="status === -1">上传失败</span>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'CmUpload',
  props: {
    value: {
      default: undefined
    }
  },
  data () {
    return {
      loading: false,
      status: 0,
      uploadUrl: 'http://up-z2.qiniu.com',
      uploadData: null
    }
  },
  methods: {
    beforeUpload (file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.message('上传头像图片只能是 JPG 格式!')
        return false
      }
      if (!isLt2M) {
        this.message('上传头像图片大小不能超过 2MB!')
        return false
      }
      const params = {
        fileName: file.name,
        userId: this.model.userId,
        roleId: this.model.roleId,
        icon: this.model.icon
      }
      this.loading = true
      return this.commom.FileUpLoad(params).then(res => {
        this.reqData = {
          key: res.fileNameKey,
          token: res.upToken,
          'x:userId': this.model.userId,
          'x:roleId': this.model.roleId,
          'x:icon': this.model.icon
        }
      })
    },
    onSuccess (res, file, fileList) {
      this.loading = false
      if (res.status === 1) {
        this.status = 1
        if (this.model.icon === 1) {
          this.img1 = res.fileUrl
        } else {
          this.img2 = res.fileUrl
        }
        if (fileList.length > 1) {
          fileList.shift()
        }
      } else {
        this.status = -1
        this.showError('上传失败')
      }
    },
    onError () {
      this.loading = false
      this.status = -1
      this.showError('上传失败,服务出错')
    }
  },
  created () {

  }
}
</script>

<style lang="less">
.u-img {
  width: 130px;
  height: auto;
  padding: 10px 0 0 0;
  img {
    width: inherit;
    height: auto;
  }
}
.el-upload__tip {
  padding: 0 0 0 20px;
}
</style>
