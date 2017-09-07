<!--
  封装日期选择组件
-->
<template>
  <div>
    <el-date-picker :clearable="false" ref="el-date-picker" :picker-options="pickerOptions" type="date" @change="onChangeDate" v-model="dateVal" format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'CmDatePicker',
  props: {
    value: [String],
    pickerOptions: {
      type: [Object],
      default: null
    }
  },
  data () {
    return {
      dateVal: ''
    }
  },
  watch: {
    'value' (v) {
      this.dateVal = v
    }
  },
  methods: {
    onChangeDate (val) {
      this.dateVal = val
      if (this.dateVal === undefined) this.dateVal = ''
      this.$emit('input', this.dateVal)
    }
  },
  created () {
    this.dateVal = this.value
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
