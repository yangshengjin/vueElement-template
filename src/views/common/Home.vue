<template>
  <div>
    <el-row class="panel">
      <el-col :span="24" class="panel-top">
        <!-- 顶部 -->
        <m-header></m-header>
      </el-col>

      <el-col :span="24" class="panel-center">
        <!-- 左部菜单 -->
        <m-nav :currentPath="currentPath"></m-nav>

        <!-- 中部内容区 -->
        <section class="panel-c-c">
          <div class="grid-content bg-purple-light">

            <el-col :span="24" style="background-color:#fff;box-sizing: border-box;">
              <router-view></router-view>
            </el-col>
          </div>
        </section>

      </el-col>

    </el-row>
  </div>
</template>

<script>
import { mNav, mHeader } from '@/views/common'
export default {
  components: {
    mHeader,
    mNav
  },
  data () {
    return {
      currentPath: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.currentPath = to.path
    }
  },
  computed: {
    back () {
      return this.$route.meta.back
    }
  },
  methods: {
  },
  created () {
    this.currentPath = this.$route.path
  }
}
</script>

<style>
.panel {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}

.panel-center {
  background: #324057;
  position: absolute;
  top: 60px;
  bottom: 0px;
  overflow: hidden;
}

.panel-c-c {
  background: #f1f2f7;
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
  left: 200px;
  overflow: auto;
  padding: 10px 10px 0 10px;
}
</style>
