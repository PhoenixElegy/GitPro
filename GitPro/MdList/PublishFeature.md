# Arcgis Online发布要素图层
1. 首先登录Online账户，选择Content--New item
<img src="./Mdpic/NewItem.png" />

2. 在弹出的窗口选择Your device
<img src="./Mdpic/YourDevice.png" />

3. 上传本地文件，可以上传的文件格式有JSON，GeoJSON等格式；如果要上传ShapeFile文件，可以将文件打包为(.zip)文件再上传，实测可行；
<img src="./Mdpic/FeatureItem.png" />

4. 数据管理与要素服务托管（Host），发布成功之后可以在Content页面看到自己的图层管理界面。点击相应的图层进入数据管理，可以在其中修改属性表，增删改属性值等。Feature Layer(hosted)表示该图层已经被发布为要素服务，可以访问。
<img src="./Mdpic/LayerLabel.png" />

# ArcGIS Online要素服务的访问
1. 进入带有Feature Layer(hosted) 标签的图层服务，点击图层
<img src="./Mdpic/PointSample.png" />

2. 复制访问路径
<img src="./Mdpic/PointSampleURL.png" />

3. 使用URL访问该要素图层
``` JavaScript
    const trailheadsLayer = new FeatureLayer({
        //apiKey: My_Key,
        url: url
    });
    map.add(trailheadsLayer);
```

4. 要素服务访问失败时请修改服务的访问权限，点击Overview内容下的Share按钮，将访问权限修改为Everyone(public)
<img src="./Mdpic/ErrorShare.png" />

5. 图层加载成功
``` JavaScript
    let opts = {
        duration: 2000  // Duration of animation will be 2 seconds
    }
    const query = new Query();
    query.where = "1=1";

    trailheadsLayer.queryExtent(query).then(function (results) {
        view.goTo(results.extent,opts);  // go to the extent of the results satisfying the query
    });
```
<img src="./Mdpic/AddFeature.png" />