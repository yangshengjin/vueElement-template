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
            <!--<el-col :span="24" style="margin-bottom: 15px">
            		<el-breadcrumb separator="/">
  							  <el-breadcrumb-item :to="{ path: '/omInfo' }">首页</el-breadcrumb-item>
  							  <el-breadcrumb-item v-if="currentPathNameParent!=''">{{currentPathNameParent}}</el-breadcrumb-item>
  							  <el-breadcrumb-item v-if="currentPathName!=''">{{currentPathName}}</el-breadcrumb-item>
  							  <a v-if="back" style="color: #20A0FF; cursor: pointer;" @click="goBack">返回上一页</a>
  							</el-breadcrumb>
  							
  							
            	</el-col>-->
            <el-col :span="24" style="background-color:#fff;box-sizing: border-box;">
              <!--<transition name="fade">-->
              <router-view></router-view>
              <!--</transition>-->
            </el-col>
          </div>
        </section>
  
      </el-col>
  
    </el-row>
  </div>
</template>

<script>
import mHeader from './Mheader'
import mNav from './Mnav'
export default {
  components: {
    mHeader,
    mNav
  },
  data () {
    return {
      currentPathNameParent: '',
      currentPathName: '',
      currentPath: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.currentPathNameParent = to.matched[0].name
      this.currentPathName = to.name
      this.currentPath = to.path
    }
  },
  computed: {
    back () {
      return this.$route.meta.back
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    this.currentPathNameParent = this.$route.matched[0].name
    this.currentPathName = this.$route.name
    this.currentPath = this.$route.path

    if (this.$route.path === '/') {
      this.$router.push('/login')
    }
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
  left: 170px;
  overflow: auto;
  padding: 10px 10px 0 10px;
}
</style>
