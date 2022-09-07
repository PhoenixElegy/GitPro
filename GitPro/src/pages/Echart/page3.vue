<script lang="ts" setup>
// import { ref } from 'vue'
// import * as echarts from 'echarts';
// import 'echarts-gl';
// import { onMounted, onUpdated } from 'vue';

// var ROOT_PATH = 'https://echarts.apache.org/examples';
// const geo3D = ref<HTMLElement>()

// onMounted(() => {
//     const myChart = echarts.init(geo3D.value as HTMLElement);
//     let option;

//     option = {
//         backgroundColor: '#000',
//         globe: {
//             baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
//             heightTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
//             displacementScale: 0.04,
//             shading: 'realistic',
//             environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
//             realisticMaterial: {
//                 roughness: 0.9
//             },
//             postEffect: {
//                 enable: true
//             },
//             light: {
//                 main: {
//                     intensity: 5,
//                     shadow: true
//                 },
//                 ambientCubemap: {
//                     texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
//                     diffuseIntensity: 0.2
//                 }
//             }
//         }
//     };

//     option && myChart.setOption(option);
//})

</script>

<template>

    <div class="mainDiv">
        <div ref="geo3D">Later</div>
    </div>

</template>