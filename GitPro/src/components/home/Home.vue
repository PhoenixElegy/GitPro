<script lang="ts" setup>
import { ref } from "vue"

const isCollapse = ref(true);
function openMapTree(){
    isCollapse.value = !isCollapse.value
}

</script>

<template>
  <el-container id="container">
    <el-aside width="auto">
      <el-container id="top">
        <img
          style="
            width: 25px;
            height: 25px;
            margin: auto;
            margin-left: 12.5px;
            margin-left: 20px;
          "
          src="../../assets/head.jpg"
          @click="openMapTree"
        />
        <div
          style="margin: auto; margin-left: 10px; font-size: 17px; width: 500px"
          v-show="!isCollapse"
        >
          Test
        </div>
        <div
          style="
            width: 25px;
            height: 25px;
            font-size: 25px;
            border: 1px solid #ffffff;
            border-radius: 4px;
            margin-top: 10px;
            margin-right: 10px;
          "
          v-show="!isCollapse"
          @click="openMapTree"
        >
          <el-icon><DArrowLeft /></el-icon>
        </div>
      </el-container>
      <el-menu
        style="height: 94%"
        text-color="#000000"
        :collapse="isCollapse"
        active-text-color="#ffd04b"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>应用</span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Tickets /></el-icon>
            <span>工具</span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><MoreFilled /></el-icon>
            <span>更多</span>
          </template>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <router-view></router-view>
  </el-container>
</template>

<style scoped>
#container {
  height: 100%;
  width: 100%;
  position: absolute;
}
#top {
  background-color: #ffffff;
  margin-right: 1px;
  text-align: center;
  height: 6%;
}
.el-menu {
  background-color: "#ffffff";
  transition: all 10ms;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.slider {
  width: 70px;
  /* margin-right: 100px; */
}

.mapDataControl{
  margin-left: 200px;
}
.mapDataControl div{
  margin-left: 10px;
  display: inline;
}

.el-aside{
    transition: width 0.5s;
    -webkit-transition: width 0.5s;
    -moz-transition: width 0.5s;
    -o-transition: width 0.5s;
}
</style>
