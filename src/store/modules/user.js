const state = {
    managerCrtl: 'true',
    id: null,
    stagename: null,
    access_token: null,
    avatar: null,
    phone: null,
    phone_status: null,
    stagenameSaved: null,
    profilePictureSaved: null,
    ipInfo: null,
    isIpInfoFetched: false,
    isAdmin: false
}

const getters = {
    isLoggedIn: state => state.access_token
}

const mutations = {
    accessToken: function (state, token) {
        state.access_token = token

        //  save it in local storage also
        localStorage.setItem('token', token)
    },

    updateUser: function (state, payload) {
        state.stagename = payload.stagename
        state.avatar = payload.profile_picture
        state.id = payload.id
        state.phone = payload.phone
    },

    updateAvatar: function(state, avatar) {
        state.avatar = avatar
    },

    updatePhone: function(state, phone) {
        state.phone = phone
        state.isPhoneValidated = false
    },

    setIpInfo: function(state, info) {
        state.ipInfo = info
        state.isIpInfoFetched = true
        localStorage.setItem('ipInfo', JSON.stringify(info))
    }
}

export default {
    state,
    getters,
    mutations
}
