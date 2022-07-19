'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_BASE: '"http://localhost:3000/api/v1/"',
    HOST: '"http://localhost:8080"',
    GA_CODE: '"UA-Code-1"',
    INTERCOM: {
        APP_ID: '""'
    },
    INTERSEGUROS_IMAGEN: '""'
})
