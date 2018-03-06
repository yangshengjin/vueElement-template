<!--日期选择组件
@prop: value 可通过v-model绑定的数据
@prop: pickerOptions 当前时间日期选择器特有的选项参考下表
@prop: disabled 是否禁用

@ps <cm-date-picker v-model="model.date"></cm-date-picker>
-->
<template>
  <div>
    <el-date-picker :disabled="disabled" :clearable="false" ref="el-date-picker" :picker-options="pickerOptions" type="date" @change="onChangeDate" v-model="dateVal" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'CmDatePicker',
  props: {
    value: [String, Object],
    pickerOptions: {
      type: [Object],
      default: null
    },
    disabled: {
      type: [Boolean],
      default: false
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
