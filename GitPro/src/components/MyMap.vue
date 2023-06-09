<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import Map from '@arcgis/core/Map.js'
import MapView from '@arcgis/core/views/MapView'
import WebTileLayer from '@arcgis/core/layers/WebTileLayer'
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle'
import Sketch from "@arcgis/core/widgets/Sketch";
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery'
import Search from "@arcgis/core/widgets/Search"
import GraphicLayer from '@arcgis/core/layers/GraphicsLayer'
import Graphic from '@arcgis/core/Graphic'
import { myPoint, myPolyline, myPolygon } from '@/data/dataJson'

console.log(myPoint)
const mygraphic = new Graphic({
    geometry: myPoint
})
const mygraphic_line = new Graphic({
    geometry: myPolyline
})
const mygraphic_polygon = new Graphic({
    geometry: myPolygon,
    symbol: {
        type: "simple-fill",
        color: "blue"
    }
})

var tiledLayer = new WebTileLayer({
    // urlTemplate:
    //     "http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=08f979691499718e21beb83ec2b4c",
    // subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
})

var tiledLayer_poi = new WebTileLayer({
    // urlTemplate:
    //     "http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=08f979691499718e21beb83ec2b4c",
    // subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
})

const graphlayer = new GraphicLayer()
graphlayer.add(mygraphic)
graphlayer.add(mygraphic_line)

const ZoomIn = function () {
    console.log("ZoomIn")
}

const ZoomOut = function () {
    console.log("ZoomOut")
}

const createToolBar = function () {
    const el = document.createElement('div')
    el.style.height = "44px"
    el.style.width = "300px"
    el.style.display = 'flex'
    el.style.alignItems = 'center'
    el.style.justifyContent = 'start'
    el.style.backgroundColor = "white"
    el.appendChild(createToolBarBtn("div", ZoomIn))
    el.appendChild(createToolBarBtn("div", ZoomOut))
    return el
}

const createToolBarBtn = function (nodeType: string, callback?: Function) {
    const el = document.createElement(nodeType)
    const elchild = document.createElement('span')
    el.style.marginLeft = '10px'
    el.style.marginRight = '10px'
    el.style.height = "32px"
    el.style.width = "32px"
    el.style.display = 'flex'
    el.style.alignItems = 'center'
    el.style.justifyContent = 'center'
    //el.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.3)'

    elchild.className = "esri-icon-expand"
    el.appendChild(elchild)

    //el.style.backgroundColor = "#394853"
    el.addEventListener('click', () => {
        console.log("btn")
    }, false)
    if (callback) {
        el.addEventListener('click', callback as EventListenerOrEventListenerObject, false)
    }
    return el
}





// 地图框选缩放、地图漫游、清空、量算工具

// 地图比例尺控件
// 地图显示坐标
// 地图鹰眼

onMounted(() => {
    const map = new Map({
        basemap: "oceans"
        //baseLayers: [tiledLayer, tiledLayer_poi] \
    });

    const view = new MapView({
        map: map,
        zoom: 10,
        center: [104.072619, 30.663776], // longitude, latitude
        container: "viewDiv",
        navigation: {
            gamepad: {
                enabled: false
            }
        }
    });


    const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: 'statellite'
    })
    view.ui.add(basemapToggle, "bottom-right")

    view.ui.components = ["zoom", "compass"]



    const sketch = new Sketch({
        layer: graphlayer,
        view: view
    })

    sketch.on("create", function (event) {
        // check if the create event's state has changed to complete indicating
        // the graphic create operation is completed.
        console.log(event)

        if (event.state === "complete") {
            // remove the graphic from the layer. Sketch adds
            // the completed graphic to the layer by default.
            //graphicsLayer.remove(event.graphic);
            console.log("huizhijiesu")
            // use the graphic.geometry to query features that intersect it
            //selectFeatures(event.graphic.geometry);
        }
    });
    view.ui.add(sketch, "top-right")
    view.ui.add(createToolBar(), "top-right")
    view.graphics.add(mygraphic)
    view.graphics.add(mygraphic_line)
    view.graphics.add(mygraphic_polygon)

    // 查看视图下的地图图层
    console.log(view.map.layers)

    // const basemapGallery = new BasemapGallery ({
    //     view: view,
    //     source: {
    //         query: {
    //             title: "World Basemaps for DEvelopers AND owner:esri"
    //         }
    //     }
    // })
    //view.ui.add(basemapGallery,"bottom-right")

    //const searchWidget = new Search({ view: view })
    //view.ui.add(searchWidget, "top-right")
})
</script>

<template>
    <div id="viewDiv" style="height: 100%; width: 100%;" ref="viewDiv"></div>
</template>

<style scoped>
.rtt {
    align-items: start;
}
</style>
