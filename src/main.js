import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-tel-input/dist/vue-tel-input.css'
import 'vue-slider-component/theme/default.css'
import 'viewerjs/dist/viewer.css'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueClipboard from 'vue-clipboard2'
import Notifications from 'vue-notification'
import Vuelidate from 'vuelidate'
import VueTelInput from 'vue-tel-input'
import VueAnalytics from 'vue-analytics'
import Meta from 'vue-meta'
// import VueAnalytics from 'vue-analytics'
import App from './App'
import store from './store'
import router from './router'
import i18n from '@/lang'
import VueSlider from 'vue-slider-component'
import PersistentStore from './utils/PersistentStore'
import GetIpInfo from './utils/GetLocation'

import './support'

// import API from '@/api'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueClipboard)
Vue.component('vue-tel-input', VueTelInput)
Vue.use(Notifications)
Vue.use(Vuelidate)
Vue.use(router)
Vue.use(Meta, {
    keyName: 'metaInfo',
    attribute: 'data-vue-meta',
    ssrAttribute: 'data-vue-meta-server-rendered',
    tagIDKeyName: 'vmid'
})
Vue.use(VueAnalytics, {
    id: process.env.GA_CODE,
    router
})
var infiniteScroll = require('vue-infinite-scroll')
Vue.use(infiniteScroll)
Vue.component('VueSlider', VueSlider)

Vue.http.options.root = process.env.API_BASE
// API.lang2(navigator.language.split('-')[0])
// API.metadata()
console.log('Current site version is ' + store.state.constants.BUILD_NUMBER)

/*
 Redirect all
*/

var maintance = false
if (maintance === true) {
    router.beforeEach((to, from, next) => {
        if (to.path !== '/maintenance') {
            next({path: '/maintenance'})
        } else {
            next()
        }
    })
}

// let token = localStorage.getItem('token')

PersistentStore(store)
GetIpInfo(store)

InitApp()

function InitApp () {
    /* eslint-disable no-new */
    new Vue({
        el: '#app',
        router,
        store,
        i18n,
        components: { App },
        template: '<App/>'
    })
}
