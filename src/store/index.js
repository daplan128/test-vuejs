import Vue from 'vue'
import Vuex from 'vuex'
import constants from './modules/constants'
import user from './modules/user'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        constants,
        user
    },
    getters: {

    },
    mutations: {
        resetOwner(state) {
            state.user.access_token = null
            state.user.id = null
            state.user.stagename = null
            state.user.phone = null
            state.user.avatar = null
        },
        logOut(state) {
            //  remove the token from storage
            localStorage.removeItem('token')
            localStorage.removeItem('profilePictureSaved')
            localStorage.removeItem('stagenameSaved')
            state.user.access_token = null
            state.user.id = null
            state.user.stagename = null
            state.user.phone = null
            state.user.avatar = null
            state.user.profilePictureSaved = null
            state.user.stagenameSaved = null
        }
    },
    strict: debug
})
