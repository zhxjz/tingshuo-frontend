<template>
	<div class="teaind">
		

<el-aside>
<div class="container">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo fill"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#6495ED">

      <el-submenu index="1">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <span>试题管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">听力试题管理</template>
          <el-menu-item index="1-1">
      	<a href="/teaindex/add" target="_blank" style="text-decoration:none;color:white;">
          		添加听力试题</a>
      </el-menu-item>
          <el-menu-item index="1-2">
        <a href="/tests/list" target="_blank" style="text-decoration:none;color:white;"> 
         查看当前列表</a>
        </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="阅读试题管理">
          <el-menu-item index="1-3">
                   <a href="/teaindex/readadd" target="_blank" style="text-decoration:none;color:white;"> 添加阅读试题</a>
          </el-menu-item>
            <el-menu-item index="1-4">
                   <a href="/read/list" target="_blank" style="text-decoration:none;color:white;">查看当前列表</a>
            </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/test">
        <!-- <i class="el-icon-document"></i> -->
        <a href="/test" target="_blank" style="text-decoration:none;color:white;"> 
        <span slot="title">课件管理</span></a>
       
      </el-menu-item>
      <el-menu-item index="3">
        <!-- <i class="el-icon-setting"></i> --><a href="/test" target="_blank" style="text-decoration:none;color:white;"> 
        <span slot="title">
          视频管理</span></a>
      </el-menu-item>
    </el-menu>
    </div>
	</el-aside>
  <el-main>
    <div class="wow">
      <h2 class="textcenter">---欢迎来到教师主页---</h2>
      <img src="../assets/bg001.jpg"/>
      
    </div>
  </el-main>
</div>
</template>

<script>
export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
    }
  }
</script>

<style scoped>
.textcenter{
  text-align: center;
}
.teaind{
    background-color:#F0FFF0;
}
.container{
		margin-top: 63px;
	}
  .wow{
    top: 100px;
    left: 600px;
    position: fixed !important;
  }
  img{
    max-width: 350px;
    border-radius: 50px;
  }
  .container{
    /*border-bottom: 50px;*/
    /*padding-bottom: 50px;*/
    /*margin-bottom: 50px;*/
  }
  .fill{
    /*margin-bottom: 50px;*/
  }
</style>