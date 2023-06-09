<script lang="ts" setup>
import { onMounted, ref, onUnmounted, render } from "vue";
import gcoord from 'gcoord';
import { lngLat2Mercator, mercatorTolnglat } from '../../utils/Coordinate'


const canvas = ref<HTMLCanvasElement>(null)
const map = ref<HTMLElement>(null)
let width: number  //存储map容器的宽度
let height: number //存储map容器的高度
let zoom = 17 //缩放层级
const minZoom = 3
const maxZoom = 18
const test_url = 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=105&y=48&z=7'
let isMouseDown = false
//缓存瓦片
let tileCache: { [k: string]: Tile } = {}
//记录当前画布需要的瓦片 
let currentTileCache: { [k: string]: boolean } = {}

// 地球半径
const EARTH_RAD = 6378137

//地球周长
const EARTH_PERIMETER = 2 * EARTH_RAD * Math.PI



// 瓦片像素
const TILE_SIZE = 256

// 获取某一层级下的分辨率，一个像素代表多少米
const getResolution = (n: number) => {
    const tileNums = Math.pow(2, n)
    const tileTotalPx = tileNums * TILE_SIZE
    return EARTH_PERIMETER / tileTotalPx
}

//雷峰塔经纬度，火星坐标系
const test_coor: [number, number] | [number, number, number] = [120.148732, 30.231006]

// 将GCJ02坐标转换为WGS84坐标，4326,经度纬度
let result = gcoord.transform(test_coor, gcoord.GCJ02, gcoord.WGS84)

//将WGS84坐标转为web墨卡托,3857，米
let resultM = lngLat2Mercator(result[0], result[1])

// 拼接瓦片地址
const getTileUrl = (x: number, y: number, z: number) => {
    let domainIndexList = [1, 2, 3, 4]
    let domainIndex = domainIndexList[Math.floor(Math.random() * domainIndexList.length)]
    return `https://webrd0${domainIndex}.is.autonavi.com/appmaptile?x=${x}&y=${y}&z=${z}&lang=zh_cn&size=1&scale=1&style=8`
}

//瓦片类
class Tile {
    ctx: any
    row: number
    col: number
    zoom: number
    x: number
    y: number
    shouldRender: any
    url: string
    cacheKey: string
    img: HTMLImageElement | null
    loaded: boolean

    constructor(ctx?: any, row?: number, col?: number, zoom?: number, x?: number, y?: number, shouldRender?: any, cacheKey?: string, url?: string, img?: HTMLImageElement, loaded?: boolean) {
        this.ctx = ctx
        this.row = row
        this.col = col
        this.zoom = zoom
        this.x = x
        this.y = y
        this.shouldRender = shouldRender
        this.url = url
        this.cacheKey = cacheKey
        this.img = img
        this.loaded = loaded
        this.creatUrl()
        this.load()
    }



    creatUrl() {
        this.url = getTileUrl(this.row, this.col, this.zoom)
    }

    load() {
        this.img = new Image()
        this.img.src = this.url
        this.img.onload = () => {
            this.loaded = true
            this.render()
        }
    }

    render() {
        if (!this.loaded || !this.shouldRender(this.cacheKey)) {
            return
        }
        this.ctx.drawImage(this.img, this.x, this.y)
    }

    updatePos(x: number, y: number) {
        this.x = x
        this.y = y
        return this
    }
}

// 根据3857坐标及缩放层级计算瓦片行列号
const getTileRowAndCol = (x: number, y: number, z: number) => {
    x = x + EARTH_PERIMETER / 2
    y = EARTH_PERIMETER / 2 - y
    let resolution = getResolution(z)
    let row = Math.floor(x / resolution / TILE_SIZE)
    let col = Math.floor(y / resolution / TILE_SIZE)
    return [row, col]
}

// 计算4326经纬度对应的像素坐标
const getPxFromLngLat = (lng: number, lat: number, z: number) => {
    let [_x, _y] = lngLat2Mercator(lng, lat)// 4326转3857
    // 转成世界平面图的坐标
    _x += EARTH_PERIMETER / 2
    _y = EARTH_PERIMETER / 2 - _y
    let resolution = getResolution(z)// 该层级的分辨率
    // 米/分辨率得到像素
    let x = Math.floor(_x / resolution)
    let y = Math.floor(_y / resolution)
    return [x, y]
}

//由3857坐标转来的的中心瓦片行列号
let centerTile = getTileRowAndCol(resultM[0], resultM[1], zoom)

// 中心点对应的像素坐标
let centerPos = getPxFromLngLat(result[0], result[1], zoom)

//中心瓦片左上角对应的像素坐标
let centerTilePos = [centerTile[0] * TILE_SIZE, centerTile[1] * TILE_SIZE]

// 中心像素坐标距中心瓦片左上角的差值
let offset = [
    centerPos[0] - centerTilePos[0],
    centerPos[1] - centerTilePos[1]
]

const clear = function () {
    canvas.value.getContext('2d').clearRect(-width / 2, -height / 2, width, height)
}

const Mapmousedown = function (e: MouseEvent) {
    if (e.button == 0) {
        isMouseDown = true
    }
}

const renderTiles = function () {
    // 计算瓦片数量
    let rowMinNum = Math.ceil((width / 2 - offset[0]) / TILE_SIZE)// 左
    let colMinNum = Math.ceil((height / 2 - offset[1]) / TILE_SIZE)// 上
    let rowMaxNum = Math.ceil((width / 2 - (TILE_SIZE - offset[0])) / TILE_SIZE)// 右
    let colMaxNum = Math.ceil((height / 2 - (TILE_SIZE - offset[1])) / TILE_SIZE)// 下

    centerTile = getTileRowAndCol(resultM[0], resultM[1], zoom)

    // 中心点对应的像素坐标
    centerPos = getPxFromLngLat(result[0], result[1], zoom)

    //中心瓦片左上角对应的像素坐标
    centerTilePos = [centerTile[0] * TILE_SIZE, centerTile[1] * TILE_SIZE]

    // 中心像素坐标距中心瓦片左上角的差值
    offset = [
        centerPos[0] - centerTilePos[0],
        centerPos[1] - centerTilePos[1]
    ]

    currentTileCache = {}
    for (let i = -rowMinNum ; i <= rowMaxNum; i++) {
        for (let j = -colMinNum; j <= colMaxNum; j++) {
            let row = centerTile[0] + i
            let col = centerTile[1] + j
            let x = i * TILE_SIZE - offset[0]
            let y = j * TILE_SIZE - offset[1]

            //缓存key
            let cacheKey = row + '_' + col + '_' + zoom

            currentTileCache[cacheKey] = true

            if (tileCache[cacheKey]) {
                tileCache[cacheKey].updatePos(x, y).render()
            }
            else {
                tileCache[cacheKey] = new Tile(
                    canvas.value.getContext('2d'),
                    row,
                    col,
                    zoom,
                    x,
                    y,
                    (key: any) => {
                        return currentTileCache[key]
                    },
                    cacheKey
                )
                tileCache[cacheKey].render()
            }
        }
    }
}

const MapMouseMove = function (e: MouseEvent) {
    if (!isMouseDown) return

    // 计算本次拖动的距离对应的经纬度数据
    let mx = e.movementX * getResolution(zoom)
    let my = e.movementY * getResolution(zoom)
    let [x, y] = lngLat2Mercator(result[0], result[1]);

    result = mercatorTolnglat(x - mx, my + y);

    resultM = [resultM[0] + mx, resultM[1] + my]

    clear()
    renderTiles()
}

const MapMouseUp = function () {
    isMouseDown = false
}

const MapMouseWheel = function (e: WheelEvent) {
    if (e.deltaY > 0) {
        if (zoom > minZoom) zoom--
    }
    else {
        if (zoom < maxZoom) zoom++
    }
    let zoomTimer = setTimeout(() => {
        clear()
        renderTiles()
    }, 300)
}



onMounted(() => {
    document.addEventListener('mousemove', MapMouseMove)
    document.addEventListener('mouseup', MapMouseUp)
    document.addEventListener('wheel', MapMouseWheel)

    let MapContext = map.value.getBoundingClientRect()
    width = MapContext.width
    height = MapContext.height
    let Canvas = canvas.value

    // 计算瓦片数量
    let rowMinNum = Math.ceil((width / 2 - offset[0]) / TILE_SIZE)// 左
    let colMinNum = Math.ceil((height / 2 - offset[1]) / TILE_SIZE)// 上
    let rowMaxNum = Math.ceil((width / 2 - (TILE_SIZE - offset[0])) / TILE_SIZE)// 右
    let colMaxNum = Math.ceil((height / 2 - (TILE_SIZE - offset[1])) / TILE_SIZE)// 下

    //设置canvas的高度，宽度
    Canvas.width = MapContext.width
    Canvas.height = MapContext.height

    //获取上下文
    let canvasContext = Canvas.getContext('2d')

    //移动画布原点到中间
    canvasContext.translate(width / 2, height / 2)

    currentTileCache = {}

    for (let i = -rowMinNum; i <= rowMaxNum; i++) {
        for (let j = -colMinNum; j <= colMaxNum; j++) {
            let row = centerTile[0] + i
            let col = centerTile[1] + j
            let x = i * TILE_SIZE - offset[0]
            let y = j * TILE_SIZE - offset[1]

            //缓存key
            let cacheKey = row + '_' + col + '_' + zoom

            currentTileCache[cacheKey] = true

            if (tileCache[cacheKey]) {
                tileCache[cacheKey].updatePos(x, y).render()
            }
            else {
                tileCache[cacheKey] = new Tile(
                    canvasContext,
                    row,
                    col,
                    zoom,
                    x,
                    y,
                    (key: any) => {
                        return currentTileCache[key]
                    },
                    cacheKey
                )
                tileCache[cacheKey].render()
            }
        }
    }
})

onUnmounted(() => {
    document.removeEventListener('mousemove', MapMouseMove)
    document.removeEventListener('mouseup', MapMouseUp)
    document.removeEventListener('wheel', MapMouseWheel)
})
</script>

<template>
    <div ref="map" style="width: 100%; height: 100%;">
        <canvas ref="canvas" @mousedown="Mapmousedown($event)"></canvas>
    </div>
</template>
