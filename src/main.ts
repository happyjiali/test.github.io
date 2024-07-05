import { createApp } from 'vue'
import { Button, message, Tabs } from 'ant-design-vue';
import './common/reset.css'
import './style.css'
import App from './App.vue'
import router from './router/index'

const app = createApp(App);
app.use(Button)
app.use(Tabs)
app.use(router)
app.mount('#app')
app.config.globalProperties.$message = message;