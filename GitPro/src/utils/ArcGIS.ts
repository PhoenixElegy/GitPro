import { loadScript, loadModules } from 'esri-loader'

export class MapApp {

    mapView: any

    async loadScript() {
        const AGS_SDK = "http://localhost:8080/4.14"
        await loadScript({
            url: `${AGS_SDK}/init.js`,
            css: `${AGS_SDK}/esri/themes/light/main.css`
        });
    }

    async initMap(container: string) {
        const [Map, MapView, config , BasemapToggle,BasemapGallery] = await loadModules(
            ['esri/Map', 'esri/views/MapView', 'esri/config', "esri/widgets/BasemapToggle",
                "esri/widgets/BasemapGallery"]);

        
        //satellite  卫星影像
        const map = new Map({ basemap: 'oceans' });

        const view = new MapView({
            map, container,
            extent: {
                // autocasts as new Extent()
                xmin: -9177811,
                ymin: 4247000,
                xmax: -9176791,
                ymax: 4247784,
                spatialReference: 102100
            }
        });

        

        const basemapToggle = new BasemapToggle({
            view: view,
            nextBasemap: "oceans"
        });

        view.ui.add(basemapToggle,'bottom-right')

        const basemapGallery = new BasemapGallery({
            view: view,
            source: {
              query: {
                title: '"World Basemaps for Developers" AND owner:esri'
              }
            }
          });

          view.ui.add(basemapGallery, "top-right");

        this.mapView = view
    }
    // add a feature layer to map
    // async addFeatureLayer() {
    //     const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);
    //     const layer = new FeatureLayer({
    //         url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0'
    //     });
    //     this.mapView.map.layers.add(layer);
    // }

}

export class Map3DApp {

    mapView: any

    async loadScript() {
        const AGS_SDK = "http://localhost:8080/4.14"
        await loadScript({
            url: `${AGS_SDK}/init.js`,
            css: `${AGS_SDK}/esri/themes/light/main.css`
        });
    }

    async initMap(container: string) {
        const [Map, SceneView, config] = await loadModules(['esri/Map', 'esri/views/SceneView', 'esri/config']);

        //satellite  卫星影像
        const map = new Map({ basemap: 'oceans', ground: "world-elevation" });
        this.mapView = new SceneView({
            map, container,
            camera: {
                position: {
                    x: -118.808, //Longitude
                    y: 33.961, //Latitude
                    z: 2000 //Meters
                },
                tilt: 75
            }
        });
    }
    // add a feature layer to map
    // async addFeatureLayer() {
    //     const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);
    //     const layer = new FeatureLayer({
    //         url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0'
    //     });
    //     this.mapView.map.layers.add(layer);
    // }

}