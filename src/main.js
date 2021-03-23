import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import uView from "@/common/uview-ui";
import api from "@/api/index.js"
import '@/filters/index.js'
Vue.use(uView);
Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
