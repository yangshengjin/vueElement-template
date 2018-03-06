<template>
  <div>
    <el-dialog :title="title" :visible.sync="status" :width="width">
      <slot name="header">
      </slot>
      <slot></slot>
      <slot name="footer">
      </slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'cm-dialog',
  props: {
    value: [String, Boolean, Number],
    title: {
      type: [String, Number],
      default: ''
    },
    'close-on-click-modal': {
      type: Boolean,
      default: false
    },
    'width': {
      type: String,
      default: '50%'
    }
  },
  data () {
    return {
      status: false
    }
  },
  watch: {
    'status' (e) {
      this.$emit('input', e)
    }
  },
  created () {
    this.status = this.value
  }
}
</script>
<style lang="less">
.dialog-footer {
  text-align: right;
}
</style>
