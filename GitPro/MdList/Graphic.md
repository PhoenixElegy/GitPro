# Graphic

## 什么是graphic
graphic译为“图形”，是一个在Map（二维）或者scene（三维）中的可视元素。通常被用于展示点、线、面等要素。
+ 显示点、线、面要素
+ 在2D窗口或3D窗口显示不同渲染样式的几何图形
+ 移动要素
+ 当要素被点击时显示一个属性弹窗

## graphic是如何工作的
graphics能被添加到图形层、叠加层或视图等。为了保证它总能被看见，它们通常被添加到图层的最顶层。当一个地图视图显示一个地图时，graphics是最后被显示的。
<img src="./Mdpic/graphicMap.png" />

## graphic组成
graphic主要由geometry、symbol、attributes三部分组成
```JavaScript
const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol,
    attributes: attributes,
    //属性弹窗
    popupTemplate: {
        title: attributes.name,
        content: attributes.description
      }
});
```

### Geometry
geometry决定这个graphic在地球上的显示位置，它通常是点、线和面；
```JavaScript
const point = {
    type: "point",
    longitude: -118.80657463861,
    latitude: 34.0005930608889
};
```

### Symbol
symbol决定graphic的显示风格，它包含所有的样式信息。简单的符号有一个单独的图层并渲染为矢量标志。复杂的符号可以由多个图层组合而成。
```JavaScript
const simpleMarkerSymbol = {
    type: "simple-marker",
    color: [226, 119, 40],  // orange
    outline: {
        color: [255, 255, 255], // white
        width: 1
    }
};
```

### Attributes
Attributes是描述graphic的字段或数据值，如name，ID等。当点击一个graphic时Attributes是显示属性信息的得力助手。
```JavaScript
const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

```

## GraphicLayer
不同于要素要素图层FeatureLayer，一个FeatureLayer只能是一种图形的集合，如点集合；GraphicLayer可以包含多种几何类型；
+ FeatureLayer通常由数据库存储，是永久保存的，不会随着应用程序的关闭而消失；
+ GraphicLayer是暂时的，由应用程序生成，会随着程序的销毁而消失；
```JavaScript
    const graphicsLayer = new GraphicsLayer()
    map.add(graphicsLayer);

    graphicsLayer.add(pointGraphic)
    graphicsLayer.add(polylineGraphic)
    graphicsLayer.add(polygonGraphic)
```
