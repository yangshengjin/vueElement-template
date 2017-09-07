<!--
  封装时间选择组件
-->
<template>
  <div>
    <el-time-picker
      ref="el-time-picker"
      style="width: 100%;"
      v-model="timeVal"
      format="HH:mm"
      @change="onChange"
      :clearable="false"
      :disabled="disabled">
    </el-time-picker>
  </div>
</template>

<script>
export default {
  name: 'CmTimePicker',
  props: {
    value: [String],
    disabled: {
      type: [Boolean],
      default: false
    }
  },
  data () {
    return {
      timeVal: '',
      newVal: ''
    }
  },
  methods: {
    onChange (val) {
      this.newVal = val
      this.$emit('input', val)
    }
  },
  created () {
    this.newVal = this.value
    if (this.value !== '') {
      var timeArr = this.value.split(':')
      this.timeVal = new Date(2017, 8, 5, timeArr[0], timeArr[1])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
