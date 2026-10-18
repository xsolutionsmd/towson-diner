import { resolve } from 'node:path';
export default {build:{rollupOptions:{input:{home:resolve('index.html'),menu:resolve('menu/index.html'),about:resolve('about/index.html'),visit:resolve('visit/index.html')}}}};
