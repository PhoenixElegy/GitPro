
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const activeIndex = ref('0')
const route = useRouter()
const handleSelect = ( key: string, keyPath: string[]) => {
  console.log( key, keyPath)
  if(key === "0"){
    route.push("/home/page1")
  }
  if(key === "2-3"){
    route.push("/login")
  }
}
</script>


<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    style="height:100%"
    @select="handleSelect"
  >
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2" popper-class="head-sub-menu"  class="sta">
      <template #title>Administrator</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">Log out</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>