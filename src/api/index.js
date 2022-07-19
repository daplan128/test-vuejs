import Vue from 'vue'
// import store from '../store'

export const Checkdocument = function (document, documentType) {
    return Vue.http.get('document/check?document=' + encodeURIComponent(document) + '&type=' + encodeURIComponent(documentType))
        .then((response) => {
            if (response.body.errors) {
                return false
            }

            return response.body.code === 1
        })
}

export const nickNameCheck = function (document) {
    return Vue.http.get('nickname/check?nickname=' + encodeURIComponent(document))
        .then((response) => {
            if (response.body.errors) {
                return false
            }

            return response.body.code === 1
        })
}

export const phoneCheck = function (document) {
    return Vue.http.get('phone/check?phone=' + encodeURIComponent(document))
        .then((response) => {
            if (response.body.errors) {
                return false
            }

            return response.body.code === 1
        })
}

export const emailCheck = function (document) {
    return Vue.http.get('email/check?email=' + encodeURIComponent(document))
        .then((response) => {
            if (response.body.errors) {
                return false
            }

            return response.body.code === 1
        })
}

export const register = function(info) {
    return Vue.http.post('register', info)
        .then((response) => {
            return response.body
        })
}

export const saveInfo = function (info, token) {
    return Vue.http.post('info_assoc', info, {
        headers: {
            'Authorization': token
        }})
        .then((response) => {
            return response.body
        })
}

export const saveEmail = function (info, token) {
    return Vue.http.post('email_assoc', info, {
        headers: {
            'Authorization': token
        }})
        .then((response) => {
            return response.body
        })
}

export const saveAdditionalData = function (info, token) {
    alert(token)
    return Vue.http.post('save/personal/info', info, {
        headers: {
            'Authorization': token
        }})
        .then((response) => {
            return response.body
        })
}

export default {
    Checkdocument,
    nickNameCheck,
    phoneCheck,
    emailCheck,
    saveInfo,
    saveEmail,
    register,
    saveAdditionalData
}
