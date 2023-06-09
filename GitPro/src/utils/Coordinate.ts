
// 角度转弧度
const angleToRad = (angle : number) => {
    return angle * (Math.PI / 180)
}

// 弧度转角度
const radToAngle = (rad : number) => {
    return rad * (180 / Math.PI)
}

// 地球半径
const EARTH_RAD = 6378137

// 4326转3857
const lngLat2Mercator = (lng : number, lat : number) => {
    // 经度先转弧度，然后因为 弧度 = 弧长 / 半径 ，得到弧长为 弧长 = 弧度 * 半径 
    let x = angleToRad(lng) * EARTH_RAD; 
    // 纬度先转弧度
    let rad = angleToRad(lat)
    // 下面我就看不懂了，各位随意。。。
    let sin = Math.sin(rad)
    let y = EARTH_RAD / 2 * Math.log((1 + sin) / (1 - sin))
    return [x, y]
}

// 3857转4326
const mercatorTolnglat  = (x : number, y : number) : [number,number] => {
    let lng = radToAngle(x) / EARTH_RAD
    let lat = radToAngle((2 * Math.atan(Math.exp(y / EARTH_RAD)) - (Math.PI / 2)))
    return [lng, lat]
}

export { angleToRad, radToAngle ,lngLat2Mercator , mercatorTolnglat}