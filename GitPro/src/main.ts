import { createApp } from 'vue'
import  router  from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/css/headStyle.css'
import App from './App.vue'
import esriConfig from '@arcgis/core/config'
esriConfig.assetsPath = './assets'
import '@arcgis/core/assets/esri/themes/light/main.css'

const app = createApp(App);
//Elenent-Plus 的icon图标全局声明
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router).use(store).use(ElementPlus).mount('#app')
