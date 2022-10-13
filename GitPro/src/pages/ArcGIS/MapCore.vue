
<script lang="ts" setup>
import { My_Key } from '../../utils/MyApiKey'
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle'
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery'
import config from '@arcgis/core/config'
import { onMounted } from "vue";


onMounted(() => {
    const map = new Map({
        basemap: "oceans" // Basemap layer service
    });
    config.apiKey = My_Key
    const view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv" // Div element
    });


    const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "oceans"
    });

    view.ui.add(basemapToggle, 'bottom-right')

    const basemapGallery = new BasemapGallery({
        view: view,
        source: {
            query: {
                title: '"World Basemaps for Developers" AND owner:esri'
            }
        }
    });

    view.ui.add(basemapGallery, "top-right");
    // view.on('click',() => {
    //     console.log("click")
    // })

    console.log("first")
    
})

console.log("second")

</script>

<template>
    <div id="viewDiv" style="height: 100%; width: 100%;">
    </div>
</template>
