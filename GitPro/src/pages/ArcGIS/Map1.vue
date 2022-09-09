<script lang="ts" setup>
import { MapApp , Map3DApp } from '../../utils/ArcGIS'
import { onMounted } from 'vue';


onMounted(() => {
    const mapApp = new Map3DApp()
    mapApp.loadScript()
    mapApp.initMap('viewDiv')
})

</script>
<template>
    <div id="viewDiv" style="height: 100%; width: 100%;">
    </div>
</template>