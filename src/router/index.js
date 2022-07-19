import Vue from 'vue'
// import store from '@/store'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
// import API from '@/api'
// import MaintenanceRoutes from './maintenance'
import Meta from 'vue-meta'
import Login from '@/components/Login'
import Register from '@/components/Register/Register-box'

Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(Meta)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
