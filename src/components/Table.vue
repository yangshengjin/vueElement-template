<!--
  封装Table表格组件
-->
<template>
  <div>
    <!--列表-->
    <el-table 
    :max-height="maxHeight" 
    v-loading="tableLoading" 
    :data="tableData" 
    border style="width: 100%" 
    :default-sort="{prop: 'date', order: 'descending'}" 
    @selection-change="handleSelectionChange"
    :highlight-current-row="highlightCurrentRowRef"
    @current-change="handleCurrentRowChange"
    >
  
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
    <el-col v-show="pagingTotal >= 0" :span="24" class="toolbar" style="padding-bottom:10px;">
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
    /*
     * 自定义表头数据
     */
    tableHeader: {
      default: [],
      type: Array
    },
    /*
     * 表格数据，主要从数据接口拿来渲染
     */
    tableData: {
      default: [],
      type: Array
    },
    /*
     * 分页时用到的总页数
     */
    pagingTotal: {
      default: 0,
      type: Number
    },
    /*
     * 是否显示编辑或操作面板
     */
    editPanel: {
      default: true,
      type: Boolean
    },
    /*
     * 是否显示多选按钮
     */
    Selection: {
      default: true,
      type: Boolean
    },
    // 是否支持单选
    highlightCurrentRow: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      showEditPanel: true,
      showSelection: true,
      highlightCurrentRowRef: false,
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
    },
    editRow (i, data) {
      this.$emit('editRow', i, data)
    },
    // 选择每一行时触发
    handleCurrentRowChange (currentRow) {
      if (currentRow !== null) {
        var key = 0
        this.tableData.forEach((el, index) => {
          if (el.id === currentRow.id) {
            key = index
          }
        })
        this.$emit('handleCurrentRowChange', currentRow, key)
      }
    }
  },
  created () {
    this.highlightCurrentRowRef = this.highlightCurrentRow
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
    this.maxHeight = window.innerHeight - 325
    // 判断是否需要展示主营车队列
    this.tableHeader.forEach(el => {
      if ((el.prop === 'mainBusPartnerCode' || el.prop === 'mainBusPartnerName') && this.UserInfo.token !== 'admin123456' && this.UserInfo.appObj !== 1) {
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
