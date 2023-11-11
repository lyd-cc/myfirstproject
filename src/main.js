import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import { setupStore } from "@/store/index.js"
import "bootstrap3/dist/css/bootstrap.css";
import VueLazyload from 'vue-lazyload'

const app = createApp(App)
setupStore(app)
app.use(VueLazyload, {
  preLoad: 1.3,
  // error: '加载失败！',
  // loading: '加载中...',
  attempt: 1
})
app.use(router).mount('#app')
