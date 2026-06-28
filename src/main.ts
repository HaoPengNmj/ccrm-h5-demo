import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'amfe-flexible'; //移动端适配
import { addVConsolePlugin } from '@/plugins/vconsole'; //vconsole自定义面板

const app = createApp(App);
app.use(router).mount('#app');

addVConsolePlugin();
