<template>
	<div style="position: relative; height: 100%; width: 170px; transition: all 0.3s;" :class="transform ? 'aside-show': 'aside-hide'">
	  <div class="aside">
	  	<el-menu :default-active="currentPath" :default-openeds="defaultOpeneds" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleselect" theme="dark">
	      <template v-for="(nav, index) in menus" v-if="!nav.hidden">
		     <el-submenu :index="index+''">
		        <template slot="title"><i :class="nav.iconCls"></i>{{nav.name}}</template>
		          <el-menu-item v-for="child in nav.children" :key="nav.id" :index="child.url" v-if="!child.hidden">{{child.name}}</el-menu-item>
		      </el-submenu>
		    </template>
	   </el-menu>
	  </div>
	  
	  <!--<div class="cuttle el-icon-arrow-left" @click="cuttleClick"></div>-->
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ['currentPath'],
    data () {
      return {
        defaultOpeneds: ['0', '1', '2', '3', '4'],
        transform: true
      }
    },
    computed: {
      ...mapGetters([
        'menus'
      ])
    },
    methods: {
      handleOpen (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleselect (key, keyPath) {
        // this.$router.push(key)
        // console.log(key, keyPath)
      },
      cuttleClick () {
        this.transform = false
      }
    },
    created () {
      if (this.menus.length === 0) {
        const menus = require('../../libs/menus').default
        this.$store.commit('GET_MENUS', {menus: menus})
      }
    }
  }
</script>

<style scoped lang="less">
  .aside {
    width: 100%;
    overflow: auto;
    height: 100%;
    .el-menu {
      margin-bottom: 150px;
    }
  }
  .cuttle {
    width: 26px;
    height: 26px;
    position: absolute;
    /* margin-left: 233px; */
    right: 0;
    top: 0;
    margin-top: -1px;
    font-size: 20px;
    color: #20a0ff;
    background: #ffffff;
    cursor: pointer;
    text-align: center;
    line-height: 26px;
    box-shadow: -8px 8px 20px 0 #324157;
  }
  .aside-show {
    transform: none;
  }
  .aside-hide {
    transform: translateX(-278px);
  }
</style>
