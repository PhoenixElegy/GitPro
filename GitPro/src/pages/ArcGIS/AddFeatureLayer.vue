<script lang="ts" setup>
import { My_Key } from '../../utils/MyApiKey'
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import config from '@arcgis/core/config'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import { onMounted } from "vue";
import Query from "@arcgis/core/rest/support/Query";
import WebTileLayer from '@arcgis/core/layers/WebTileLayer'

let opts = {
  duration: 2000  // Duration of animation will be 2 seconds
};

onMounted(() => {
    const map = new Map({
        basemap: "arcgis-topographic" // Basemap layer service
    });
    config.apiKey = My_Key
    const view = new MapView({
        map: map,
        //center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv" // Div element
    });

    

    const trailheadsLayer = new FeatureLayer({
        //apiKey: My_Key,
        url: "https://services7.arcgis.com/bVI3DntuuPfC2UnE/arcgis/rest/services/point_samples/FeatureServer/0"
    });

    const query = new Query();
    query.where = "1=1";

    trailheadsLayer.queryExtent(query).then(function (results) {
        view.goTo(results.extent,opts);  // go to the extent of the results satisfying the query
    });

    map.add(trailheadsLayer);

})



</script>

<template>
    <div id="viewDiv" style="height: 100%; width: 100%;">
    </div>
</template>
