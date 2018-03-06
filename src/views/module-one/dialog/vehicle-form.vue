<template>
  <div>
    <cm-dialog :title="dialogTitle" v-model="dialogFormVisible.status" :close-on-click-modal="false">

      <el-form class="m-form-inline" :model="model" :inline="true" :label-position="'right'" label-width="100px">

        <el-form-item label="下属车队简称">
          <el-select v-model="model.busPartnerId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="el.name" :value="el.id" v-for="el in busPartnerOptions" :key="el.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="车辆属性">
          <el-select v-model="model.propertyId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="el.name" :value="el.id" v-for="el in BusPropertyOptions" :key="el.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="model.plateNum"></el-input>
        </el-form-item>

        <el-form-item label="车牌颜色">
          <el-select v-model="model.plateColorId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="el.name" :value="el.id" v-for="el in PlateColorOptions" :key="el.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营运范围">
          <el-select v-model="model.operationRangeId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="el.name" :value="el.id" v-for="el in OperationRangeOptions" :key="el.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="车型">
          <el-select v-model="model.busTypeId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="el.name" :value="el.id" v-for="el in BusTypeOptions" :key="el.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="核定座位数">
          <el-input v-model="model.seatNum"></el-input>
        </el-form-item>

        <el-form-item label="售票座位数">
          <el-input v-model="model.ticketNum"></el-input>
        </el-form-item>
        <el-form-item label="驾驶资格要求">
          <!--<el-input v-model="model.drivingQualification"></el-input>-->
          <el-select v-model="drivingQualification" multiple placeholder="请选择">
            <el-option v-for="item in drivingQualificationOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="运营单位">
          <el-select v-model="model.operationDeptId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="el.name" :value="el.id" v-for="el in busPartnerOptions" :key="el.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算单位">
          <el-select v-model="model.checkUnitId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="el.name" :value="el.id" v-for="el in busPartnerOptions" :key="el.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="GPS设备编号">
          <el-input v-model="model.gpsNum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="车辆购置日期">
          <cm-date-picker v-model="model.purchaseTime"></cm-date-picker>
        </el-form-item>

        <el-form-item label="启用日期">
          <cm-date-picker v-model="model.startTime"></cm-date-picker>
        </el-form-item>

        <el-form-item label="停用日期" v-show="!long_use">
          <cm-date-picker v-model="model.endTime"></cm-date-picker>
        </el-form-item>

        <el-form-item label-width="10px">
          <el-checkbox v-model="long_use">长期</el-checkbox>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" :loading="loading">确 定</el-button>
      </div>

    </cm-dialog>

  </div>
</template>

<script>
import CmDatePicker from '@/components/CmDatePicker'
import CmDialog from '@/components/CmDialog'
export default {
  components: {
    CmDatePicker,
    CmDialog
  },
  name: 'vehicle-form',
  props: {
    dialogFormVisible: {
      default: null,
      type: Object
    },
    formModel: {
      default: null,
      type: Object
    },
    needSel: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      loading: false,
      long_use: false,
      model: {
        mainBusPartnerId: -1,
        busPartnerId: -1,
        propertyId: -1,
        plateNum: '',
        plateColorId: -1,
        operationRangeId: -1,
        busTypeId: -1,
        seatNum: '',
        ticketNum: '',
        drivingQualification: '',
        operationDeptId: -1,
        checkUnitId: -1,
        gpsNum: '',
        startTime: '',
        endTime: ''
      },
      drivingQualificationOptions: [
        { value: 'A1', label: 'A1' },
        { value: 'A2', label: 'A2' },
        { value: 'A3', label: 'A3' },
        { value: 'B1', label: 'B1' },
        { value: 'B2', label: 'B2' },
        { value: 'C1', label: 'C1' },
        { value: 'C2', label: 'C2' }
      ],
      drivingQualification: []
    }
  },
  watch: {
    'long_use' (e) {
      this.model.endTime = e ? '9999-01-01' : ''
    },
    'drivingQualification' (e) {
      this.model.drivingQualification = e.join('_')
    }
  },
  computed: {
    dialogTitle () {
      return this.formModel.id > 0 ? '修改车辆' : '新增车辆'
    },
    busPartnerOptions () {
      return this.$store.state.responseData.busPartnerOptions
    },
    BusPropertyOptions () {
      return this.$store.state.responseData.BusPropertyOptions
    },
    OperationRangeOptions () {
      return this.$store.state.responseData.OperationRangeOptions
    },
    BusTypeOptions () {
      return this.$store.state.responseData.BusTypeOptions
    },
    PlateColorOptions () {
      return this.$store.state.responseData.PlateColorOptions
    }
  },
  methods: {
    watchMainBusPartner () {
      this.unwatch = this.$watch('model.mainBusPartnerId', (newVal, oldVal) => {
        this.model.busPartnerId = -1
        this.model.propertyId = -1
        this.model.plateColorId = -1
        this.model.operationRangeId = -1
        this.model.busTypeId = -1
        this.model.operationDeptId = -1
        this.model.checkUnitId = -1
        this.getParams(newVal)
      })
    },
    getParams (newVal, init) {
      // 所有下拉
      return this.base.BusInfoOption({ mainBusPartnerId: newVal }).then(res => {
        this.$store.commit('busPartnerOptions', { param: res.busPartnersParams })
        this.$store.commit('BusPropertyOptions', { param: res.busPropertyParams })
        this.$store.commit('OperationRangeOptions', { param: res.operationRangeParams })
        this.$store.commit('BusTypeOptions', { param: res.busTypeParams })
        this.$store.commit('PlateColorOptions', { param: res.plateColorParams })
      })
    },
    validate (model) {
      let flag = false
      if (model.mainBusPartnerId <= 0) {
        this.showWarning('请选择主营车队')
      } else if (model.busPartnerId <= 0) {
        this.showWarning('请选择下属车队')
      } else if (model.propertyId <= 0) {
        this.showWarning('请选择车辆属性')
      } else if (model.plateNum === '') {
        this.showWarning('请填写车牌号')
      } else if (model.plateColorId <= 0) {
        this.showWarning('请选择车牌颜色')
      } else if (model.operationRangeId <= 0) {
        this.showWarning('请选择营运范围')
      } else if (model.busTypeId <= 0) {
        this.showWarning('请选择车型')
      } else if (model.operationDeptId <= 0) {
        this.showWarning('请选择运营单位')
      } else if (model.checkUnitId <= 0) {
        this.showWarning('请选择结算单位')
      } else if (model.startTime === '') {
        this.showWarning('请选择启用日期')
      } else if (!this.long_use && model.endTime === '') {
        this.showWarning('请选择停用日期')
      } else if (new Date(model.endTime) < new Date(model.startTime)) {
        this.showWarning('开始时间不得大于结束时间')
      } else {
        flag = true
      }
      return flag
    },
    submitForm () {
      const flag = this.validate(this.model)
      if (!flag) return false
      this.loading = true
      this.base.EditBusInfo({ busInfo: this.model })
        .then(res => {
          this.loading = false
          if (res.status === 1) {
            let desc = this.model.id > 0 ? '修改成功' : '新增成功'
            this.showSuccess(desc)
            this.$emit('success')
          } else {
            let desc = this.model.id > 0 ? '修改失败' : '新增失败'
            this.showError(`${desc},${res.desc}`)
          }
        })
    }
  },
  created () {
    if (this.formModel.id > 0) {
      const model = this._getModel(this.formModel)
      // 驾驶证资格
      if (typeof model.drivingQualification === 'string') {
        this.drivingQualification = model.drivingQualification.split('_')
      }
      this.model.mainBusPartnerId = model.mainBusPartnerId
      if (this.needSel) {
        this.getParams(model.mainBusPartnerId).then(() => {
          this.model = model
          this.long_use = this.model.endTime === '9999-01-01 00:00:00'
          this.watchMainBusPartner()
        })
      } else {
        this.model = model
        this.long_use = this.model.endTime === '9999-01-01 00:00:00'
        this.watchMainBusPartner()
      }
    } else {
      this.watchMainBusPartner()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
