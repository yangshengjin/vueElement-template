<template>
  <!--  老人信息   -->
  <div>
    <!--工具条-->
    <el-form class="m-form-inline" :inline="true" :model="filters" :label-position="'right'" label-width="40px">
      <el-col :span="24" class="toolbar">
        <el-form-item label="姓名">
          <el-input v-model="filters.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAdd">新增</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  
    <!-- 列表 -->
    <m-table 
      :tableHeader="tableHeader" 
      :tableData="tableData" 
      @handleCurrentChange="handleCurrentChange" 
      @handleSelectionChange="handleSelectionChange" 
      @editRow="editRow" 
      :pagingTotal="pagingTotal">
      
    </m-table>
  
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import mTable from '../../components/Table'
export default {
  components: {
    mTable
  },
  data () {
    return {
      loading: false,
      maxHeight: 400,
      pageid: 1,
      filters: {
        districtId: -1,
        name: '',
        status: -1,
        stewardUid: ''
      },
      stewardOptions: [],
      familys: [],
      tableHeader: [
        { label: '序号', width: '60', prop: '', type: 'index' },
        { label: '区域', width: '120', prop: 'districtName' },
        { label: '姓名', width: '80', prop: 'username' },
        { label: '性别', width: '60', prop: 'sex' },
        { label: '年龄', width: '60', prop: 'age' },
        { label: '身份证号', width: '120', prop: 'identity' },
        { label: '手机号', width: '110', prop: 'phone' },
        { label: '家庭电话', width: '120', prop: 'tel' },
        { label: '住址', width: '100', prop: 'address' },
        { label: '会员等级', width: '80', prop: 'memberLevel' },
        { label: '管家', width: '80', prop: 'stewardUid' },
        { label: '关联亲人', width: '80', prop: 'family' },
        { label: '账户余额', width: '80', prop: 'amount' },
        { label: '服务记录', width: '80', prop: 'serviceCount' },
        { label: '注册时间', width: '', prop: 'createtime' },
        { label: '修改时间', width: '', prop: 'updatetime' }
      ],
      multipleSelection: [],
      formModel: {
        id: 0
      },
      gridParams: {
        userId: '',
        orderStatus: -1
      }
    }
  },
  computed: {
    ...mapGetters([
      'OlderList',
      'UserInfo'
    ]),
    tableData () {
      return this.OlderList.list
    },
    pagingTotal () {
      return this.OlderList.count || 0
    },
    listLoading () {
      return this.$store.state.comm.listLoading
    }
  },
  methods: {
    ...mapActions([
      'QueryOlderList'
    ]),
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    submitSearch () { // 查询
      this.filters.stewardUid = ''
      const reqData = {
        pageid: this.pageid,
        params: this.filters,
        needSel: 0
      }
      this.QueryOlderList(reqData)
    },
    submitAdd () { // 打开新增窗口
      this.formModel = {
        id: 0
      }
      this.dialogFormVisible.addStatus = true
    },
    editRow (i, data) { // 打开修改窗口
      this.formModel = data[i]
      this.dialogFormVisible.addStatus = true
    },
    submitExport () { // 导出

    },
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {  // 点击页码时触发
      this.pageid = val
      const reqData = {
        pageid: this.pageid,
        params: this.filters,
        needSel: 0
      }
      this.QueryOlderList(reqData)
    },
    submitAddSuccess () {
      this.submitSearch()
    }
  },
  created () {
    const reqData = {
      pageid: this.pageid,
      params: this.filters,
      needSel: 1
    }
    this.QueryOlderList(reqData)
  }
}
</script>

<style>
.el-table .cell,
.el-table th>div {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
