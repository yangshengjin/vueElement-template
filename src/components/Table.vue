<template>
  <div>
    <!--列表-->
    <el-table :max-height="maxHeight" v-loading="tableLoading" :data="tableData" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
  
      <el-table-column fixed="left" type="selection" width="55" v-if="showSelection">
      </el-table-column>
  
      <el-table-column fixed="left" label="操作" width="60" v-if="showEditPanel">
        <template scope="scope">
          <el-button type="text" size="small" @click.native.prevent="editRow(scope.$index, tableData)">编辑</el-button>
        </template>
      </el-table-column>
  
      <el-table-column :sortable="false" v-for="el in newTableHeader" :key="el.prop" :type="el.type" :prop="el.prop" :label="el.label" :width="el.width">
        <template scope="scope" name="temp">
          <span v-if="el.type">{{scope.$index + 1}}</span>
          <span v-if="!el.scope">{{scope.row[el.prop]}}</span>
          <slot :scope="scope" :prop="el.prop" :show="el.scope"></slot>
        </template>
      </el-table-column>
    </el-table>
  
    <!--分页-->
    <el-col :span="24" class="toolbar" style="padding-bottom:10px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="15" layout="total, prev, pager, next" :total="pagingTotal" style="float:right;">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'table',
  // ['tableHeader', 'tableData', 'pagingTotal', 'editPanel', 'Selection'],
  props: {
    tableHeader: {
      default: [],
      type: Array
    },
    tableData: {
      default: [],
      type: Array
    },
    pagingTotal: {
      default: 0,
      type: Number
    },
    editPanel: {
      default: true,
      type: Boolean
    },
    Selection: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      showEditPanel: true,
      showSelection: true,
      filters: {
        region: '',
        name: ''
      },
      multipleSelection: [],
      currentPage: 1,
      maxHeight: 440,
      newTableHeader: []
    }
  },
  computed: {
    tableLoading () {
      return this.$store.state.comm.tableLoading
    },
    ...mapGetters([
      'UserInfo'
    ])
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', this.multipleSelection)
    },
    handleClick () {
      console.log(1)
    },
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {  // 点击页码时触发
      this.currentPage = val
      this.$emit('handleCurrentChange', val)
      // console.log(val)
    },
    editRow (i, data) {
      this.$emit('editRow', i, data)
    }
  },
  created () {
    if (this.editPanel === undefined) {
      this.showEditPanel = true
    } else {
      this.showEditPanel = this.editPanel
    }
    if (this.Selection === undefined) {
      this.showSelection = true
    } else {
      this.showSelection = this.Selection
    }
    this.maxHeight = window.innerHeight - 202

    this.tableHeader.forEach(el => {
      if ((el.prop === 'districtName' || el.label === '区域') && this.UserInfo.appObj !== 1) {
        el = null
      } else {
        this.newTableHeader.push(el)
      }
    })
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
