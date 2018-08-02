<template>
  <div :class="['aside-containter',transform ? 'aside-show': 'aside-hide']">
    <div class="aside">
      <el-menu :default-active="currentPath" :default-openeds="defaultOpeneds" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleselect" background-color="#324157" text-color="#fff">
        <template v-for="nav in menus" v-if="!nav.hidden">
          <el-menu-item :index="nav.url" v-if="!nav.children" :key="nav.id">
            <i :class="nav.icon"></i>{{nav.name}}</el-menu-item>

          <el-submenu :index="nav.id+''" v-if="nav.children" :key="nav.id">
            <template slot="title">
              <i :class="nav.icon"></i>{{nav.name}}
            </template>

            <template v-for="child in nav.children">
              <el-menu-item :index="child.url" v-if="!child.children" :key="child.id">
                {{child.name}}
              </el-menu-item>

              <el-submenu :index="child.id+''" v-if="child.children" :key="child.id">
                <template slot="title">{{child.name}}</template>
                <el-menu-item v-for="subchild in child.children" :key="subchild.id" :index="subchild.url" v-if="!subchild.hidden">{{subchild.name}}</el-menu-item>
              </el-submenu>

            </template>

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
      defaultOpeneds: [],
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
    // 展开菜单
    openMenus () {
      this.defaultOpeneds = []
      this.menus.forEach((el) => {
        this.defaultOpeneds.push(el.id + '')
      })
    },
    // 折叠菜单
    packupMenus () {
      this.defaultOpeneds = []
    },
    cuttleClick () {
      this.transform = false
    }
  },
  created () {
    this.openMenus()
  }
}
</script>

<style scoped lang="less">
.aside-containter {
  position: relative;
  height: 100%;
  width: 200px;
  transition: all 0.3s;
}
.aside {
  width: 100%;
  overflow: auto;
  height: 100%;
  .el-menu {
    margin-bottom: 150px;
    border: 0;
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
