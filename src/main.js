import { createApp } from 'vue'
import globalStore, { GlobalStoreKey } from './stores/global';
import App from './App.vue'
import './main.css'


const app = createApp(App)
app.provide(GlobalStoreKey, globalStore());
app.mount('#app')

//createApp(App).mount('#app')
