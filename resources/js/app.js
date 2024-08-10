// import './bootstrap';
import routes from './router/routes';
import { createApp } from "vue";
import { createPinia } from 'pinia'
import 'flowbite';
import 'animate.css';
import { useHttpStore } from './Store/HttpStore';
import App from "./App.vue";


const pinia = createPinia()


const app = createApp(App);
app.use(pinia)

app.config.globalProperties.$http = useHttpStore();

app.use(routes).mount("#app");
