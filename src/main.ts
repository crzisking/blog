import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
// main.js
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// 引入你所使用的主题 此处以 github 主题为例
import githubTheme from '@kangc/v-md-editor/lib/theme/github';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

import App from './App.vue'
import router from './router'

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(VMdPreview);

app.mount('#app')
