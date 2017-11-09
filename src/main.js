import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './utils/http'
import './utils/rem'
import * as filters from './filters/index' //过滤器
import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
//批量注册过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})