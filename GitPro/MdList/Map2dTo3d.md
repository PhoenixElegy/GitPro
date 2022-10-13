# 二维地图与三维地图的切换显示

## 视图理解
+ 使用如下方式定义二维地图和三维地图并加载，绑定的HTMLDOM相同，显示结果为后添加的地图；尽管绑定的dom相同，但是两者似乎不会造成覆盖，控制台的div结果也只有一个地图，另一个地图似乎直接消失了。具体原因不明。
```JavaScript
    const map3D = new Map({
        basemap: "satellite",
        ground: "world-elevation"
    });

    const map2D = new Map({
        basemap: "satellite"
    });

    const view3D = new SceneView({
        map: map3D,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv" // Div element
    });

    const view2D = new MapView({
        map: map2D,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv" // Div element
    });
```

+ 切换地图的方式只需要修改视图的**container**属性即可；
```JavaScript
    view2D.container = null
    view3D.container = "viewDiv"
```

+ 获取当前视图的位置**viewpoint**，以便在切换视图的时候不丢失位置；
```JavaScript
    const activeViewPoint  = view2D.viewpoint.clone()
    //const activeViewPoint  = view3D.viewpoint.clone()
```

## 切换按钮添加到工具栏
+ 创建一个按钮
```JavaScript
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
```

+ 在按钮上绑定点击事件
```JavaScript
const switchMapBtn = function (str :string ) {
    const btn = createDom(str)

    btn.onclick = () => {
        const activeViewPoint  = view2D.viewpoint.clone()
        //const activeViewPoint  = view3D.viewpoint.clone()

        view2D.container = null
        //view3D.container = "viewDiv"

        if(mapType.value == "3D"){
            view2D.viewpoint = activeViewPoint
            //2DMap Add | remove Function
            // AddRemove2DMap()
        }
        else {
            view3D.viewpoint = activeViewPoint
            //3DMap Add | remove Function
            // AddRemove3DMap()
        }
    }
    return btn
}
```

+ 将按钮添加到工具栏中
```JavaScript
    view2D.ui.add(switchMapBtn("3D"), 'top-left')
    //view3D.ui.add(switchMapBtn("2D"), 'top-left')
```



## 视图切换的图层问题
+ 视图切换后加载的FeatureLayer消失，使用的地图加载方法为视图加载，需要重新加载，似乎视图卸载后其上的所有图层都会卸载
```JavaScript
    view3D.map.add(trailheadsLayer)
```
+ 视图切换后加载的FeatureLayer消失，使用的地图加载方法为地图加载
```JavaScript
    map3D.add(trailheadsLayer)
    map2D.add(trailheadsLayer)
```
```JavaScript
    map2D.add(trailheadsLayer)
    map3D.add(trailheadsLayer)
```
两者结果不同，都只加载了最后的地图，且切换视图后只显示最后一个FeatureLayer
+ 目前解决方法就是切换视图之后重新加载所有图层，或许有更好的；
```JavaScript
    if(mapType.value == "3D"){
        //2DMap Add | remove Function
        // AddRemove2DMap()
    }
    else {
        //3DMap Add | remove Function
        // AddRemove3DMap()
    }
```

## TS语法报错
+ 不能将类型“null”分配给类型“HTMLDivElement”
```JavaScript
    view2D.container = null
```
在JS文件中不会报错，TS会；运行结果相同，原因就是TS语法严格，不同类型的赋值是不被允许的，undifine 和 null 也被视为两种不同类型；
+ 解决一：创建一个空的div
```JavaScript
    view2D.container = document.createElement("div")
    //view3D.container = document.createElement("div")
```
注意不要在body中创建div然后引用id，否则会发生意想不到的结果，例如工具条位置偏移（本例环境下），或许简单的单页面HTML不会，但显然单页面并不实用
+ 解决二：修改**tsconfig.json**，一劳永逸
```JavaScript
{
  "compilerOptions": {
    "strictNullChecks": false
}
```
添加一行，这种错误你就不用在报了哈哈，当然这有缺点，或许应该隔一段时间把它删了然后检查下其他代码~~
+ 失败的尝试
试图修改ArcGIS JS的定义文件，使得**container**属性可以为**null**
    - **container**属性的继承来源
    ```JavaScript
        MapView | SceneView extends View extends DomContainer
    ```
    - 修改，然后失败
    <img src="./Mdpic/Container.png" />
+ 失败原因，未知
```JavaScript
    const view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: null // Div element
    });
```
可能加了**null**之后再构造**view**的时候**container**属性就可以为**null**了
```JavaScript
    view.container = null
```
估计是在使用成员访问符访问**container**属性时，**container**属性已经断言为HTMLDivElement了，所以还是无法解决问题