<script lang="ts" setup>
import { ref } from "vue"
import Heard from "../header.vue"
import { useRouter } from 'vue-router'

const isCollapse = ref(true);
const route = useRouter()
function openMapTree() {
    isCollapse.value = !isCollapse.value
}

function handleSelect(){
}

const handleClick = () => {

}

// function handleClick(){

// }

</script>

<template>
    <el-container id="container">
        <el-aside width="auto">
            <el-container id="top">
                <img style="
            width: 25px;
            height: 25px;
            margin: auto;
            margin-left: 12.5px;
            margin-left: 20px;
           " src="../../assets/head.jpg" @click="openMapTree" />
                <div style="margin: auto; margin-left: 10px; font-size: 17px; width: 500px" v-show="!isCollapse">
                    Test
                </div>
                <div style="
            width: 25px;
            height: 25px;
            font-size: 25px;
            border: 1px solid #ffffff;
            border-radius: 4px;
            margin-top: 10px;
            margin-right: 10px;
          " v-show="!isCollapse" @click="openMapTree">
                    <el-icon>
                        <DArrowLeft />
                    </el-icon>
                </div>
            </el-container>
            <el-menu style="height: 94%" 
                    text-color="#000000" 
                    :collapse="isCollapse" 
                    active-text-color="#ffd04b"
                    @select="handleSelect"
                    @click="handleClick"
                    router>
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>Echart</span>
                    </template>
                    <el-menu-item index="/home/page1">chart</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <Tickets />
                        </el-icon>
                        <span>Game</span>
                    </template>
                    <el-menu-item index="/home/game1">game1</el-menu-item>
                    <el-menu-item index="/home/game2">game2</el-menu-item>
                    <el-menu-item index="/home/game3">game3</el-menu-item>
                    <el-menu-item index="/home/game4">game4</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <MoreFilled />
                        </el-icon>
                        <span>Picture</span>
                    </template>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header id="header">
                <Heard></Heard>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
#container {
    height: 100%;
    width: 100%;
    position: absolute;
}

#header {
    height: 6%;
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

.mapDataControl {
    margin-left: 200px;
}

.mapDataControl div {
    margin-left: 10px;
    display: inline;
}

.el-aside {
    transition: width 0.5s;
    -webkit-transition: width 0.5s;
    -moz-transition: width 0.5s;
    -o-transition: width 0.5s;
}
</style>
