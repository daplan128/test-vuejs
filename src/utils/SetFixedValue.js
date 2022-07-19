'use strict'

const SetFixedValue = (value) => {
    if (!isNaN(Number(value)) && typeof value !== 'boolean') {
        return (Math.round(value * 1000) / 1000).toFixed(3)
    } else {
        return null
    }
}

module.exports = SetFixedValue
