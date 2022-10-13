<script lang="ts" setup>
import { My_Key } from '../../utils/MyApiKey'
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import config from '@arcgis/core/config'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import { onMounted, reactive } from "vue";
import Query from "@arcgis/core/rest/support/Query";
import SceneView from "@arcgis/core/views/SceneView";
import { ref } from 'vue'
import Map2DUrl from "../../assets/2d-02.png"
import Map3DUrl from "../../assets/3d-02.png"

const mapType = ref("2D")
let opts = {
    duration: 2000  // Duration of animation will be 2 seconds
}

const map3D = new Map({
    //basemap: "arcgis-topographic" // Basemap layer service
    basemap: "satellite",
    ground: "world-elevation"
});

const map2D = new Map({
    //basemap: "arcgis-topographic" // Basemap layer service
    basemap: "satellite",
    // ground: "world-elevation"
});

const createDom = function (str: string) {
    const btn = document.createElement('div')
    btn.innerHTML = str
    btn.style.backgroundColor = 'white'
    btn.style.width = "32px"
    btn.style.height = "32px"
    btn.style.fontSize = "17px"
    btn.style.textAlign = "center"
    btn.style.lineHeight = "32px"
    btn.style.cursor = "pointer"
    return btn
}

const trailheadsLayer = new FeatureLayer({
        //apiKey: My_Key,
        url: "https://services7.arcgis.com/bVI3DntuuPfC2UnE/arcgis/rest/services/point_samples/FeatureServer/0"
    });

const query = new Query();
query.where = "1=1";

interface appConfigAll {
    mapView : MapView | null,
    sceneView : SceneView | null,
    activeView: MapView | SceneView | null,
    container: string | null | HTMLDivElement
}

const appConfig : appConfigAll = {
    mapView : null,
    sceneView : null,
    activeView: null,
    container : "viewDiv"
}

const initialViewParams = { 
    map: new Map,
    center: [-118.805, 34.027], // Longitude, latitude
    zoom: 13, // Zoom level
    container: appConfig.container
}

const createView = function (params : {},type : string ){
    let view
    if(type == "2D"){
        view = new MapView(params)
        return view
    } else {
        view = new SceneView(params)
    }
    return view
}

const switchMapBtn = function (str :string ) {
    const btn = createDom(str)

    btn.onclick = () => {
        const activeViewPoint  = (appConfig.activeView as any).viewpoint.clone()

        appConfig.activeView.container = null
        //appConfig.activeView.container = document.createElement("div")

        if(mapType.value == "3D"){
            appConfig.mapView.viewpoint = activeViewPoint
            //这里appConfig.container本质上还是string，只是为了躲避检查，或许有更好的办法；
            appConfig.mapView.container = appConfig.container as HTMLDivElement
            appConfig.activeView = appConfig.mapView
            mapType.value = "2D"
            
            //2DMap Add | remove Function
            // AddRemove2DMap()
        }
        else {
            appConfig.sceneView.viewpoint = activeViewPoint
            appConfig.sceneView.container = appConfig.container as HTMLDivElement
            appConfig.activeView = appConfig.sceneView
            mapType.value = "3D"
            //appConfig.sceneView.map.add(trailheadsLayer)

            //3DMap Add | remove Function
            // AddRemove3DMap()
        }

    }
    return btn
}

onMounted(() => {
    config.apiKey = My_Key
    appConfig.mapView = createView(initialViewParams,"2D") as MapView
    appConfig.mapView.ui.add(switchMapBtn("3D"), 'top-left')
    appConfig.mapView.map = map2D
    appConfig.activeView = appConfig.mapView

    initialViewParams.container = null
    initialViewParams.map = map3D
    appConfig.sceneView = createView(initialViewParams,"3D") as SceneView
    appConfig.sceneView.ui.add(switchMapBtn("2D"), 'top-left')

    // const view2D = new MapView({
    //     map: map3D,
    //     center: [-118.805, 34.027], // Longitude, latitude
    //     zoom: 13, // Zoom level
    //     container: attr.attr2D.container
    // }

    // );

    // const view3D = new SceneView({
    //     map: map3D,
    //     center: [-118.805, 34.027], // Longitude, latitude
    //     zoom: 13, // Zoom level
    //     container: attr.attr3D.container
    //     //container: "viewDiv" // Div element
    // });

    // const view2D = new MapView({
    //     map: map2D,
    //     center: [-118.805, 34.027], // Longitude, latitude
    //     zoom: 13, // Zoom level
    //     container: "viewDiv" // Div element
    // });
    //view2D.container = mainMap.value
    // view2D.ui.add(switchMapBtn(), 'top-left')
    // view3D.ui.add(switchMapBtn(), 'top-left')


    // trailheadsLayer.queryExtent(query).then(function (results) {
    //     if(appConfig.mapView.container) {
    //         appConfig.mapView.map.add(trailheadsLayer)
    //         appConfig.mapView.goTo(results.extent, opts);  // go to the extent of the results satisfying the query
    //     }
    //     if(appConfig.sceneView.container){
    //         appConfig.sceneView.map.add(trailheadsLayer)
    //         appConfig.sceneView.goTo(results.extent, opts);  // go to the extent of the results satisfying the query
    //     } 
    // });
    map3D.add(trailheadsLayer)
    map2D.add(trailheadsLayer)
    

})



</script>

<template>
    <div id="viewDiv" style="height: 100%; width: 100%;" ref="mainMap">
    </div>
</template>
