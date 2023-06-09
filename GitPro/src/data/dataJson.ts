import Point from "@arcgis/core/geometry/Point"
import Polyline from "@arcgis/core/geometry/Polyline"
import Polygon from '@arcgis/core/geometry/Polygon'

/**
 *  了解一份数据的最好方法，就是伪造它
 *  Point
 *  import Point from "@arcgis/core/geometry/Point"
 */
export const myPoint = new Point({
    x: 104.072619,
    y: 30.663776
})

/**
 *  了解一份数据的最好方法，就是伪造它
 *  PolyLinel
 *  import Point from "@arcgis/core/geometry/Poiyline"
 */
export const myPolyline = new Polyline({
    paths: [
        [
            [103.072619, 31.663776],
            [103.072619, 29.663776],
            [105.072619, 29.663776],
            [105.072619, 31.663776],
            [103.072619, 31.663776],
        ],
    ]
})

/**
 *  了解一份数据的最好方法，就是伪造它
 *  PolyLine
 *  import Point from "@arcgis/core/geometry/Polygon"
 */
export const myPolygon = new Polygon({
    rings: [
        [
            [103, 31],
            [103, 29],
            [105, 29],
            [105, 31],
            [103, 31],
        ],
    ]
})