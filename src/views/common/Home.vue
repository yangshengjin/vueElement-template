<template>
  <div>
    <el-container>
      <!-- 顶部 -->
      <m-header class="panel-top"></m-header>

      <el-col :span="24" class="panel-center">
        <!-- 左部菜单 -->
        <m-nav :currentPath="currentPath"></m-nav>
        <!-- 中部内容区 -->
        <section class="panel-c-c">
          <el-col :span="24" style="background-color:#fff;box-sizing: border-box;">
            <router-view></router-view>
          </el-col>
        </section>
      </el-col>

    </el-container>
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

<style lang="less">
@import '../../styles/themes.less';
.panel-top {
  width: 100%;
  background: @themes;
  padding: 0 10px;
  height: 60px;
  line-height: 60px;
  color: #ffffff;
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
