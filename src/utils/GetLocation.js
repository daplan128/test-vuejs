'use strict'

import Vue from 'vue'

const GetIpInfo = (store) => {
    return Vue.http.get('https://api.ipify.org?format=json')
        .then(response => {
            if (response && response.body.ip) {
                return Vue.http.get('https://ipinfo.io/' + response.body.ip + '?token=917cd8547bc7af')
            }
        })
        .then(response => {
            if (response && !response.error && !response.errors) {
                store.commit('setIpInfo', response.body)
            }
        })
        .catch(err => {
            err = ''
        })
}
export default GetIpInfo
