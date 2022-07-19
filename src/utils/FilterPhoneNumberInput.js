'use strict'
const FilterPhoneNumberInput = (evt) => {
    evt = (evt) || window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if ((charCode < 43 || charCode > 57) && ![ 32, 40, 41 ].includes(charCode)) {
        evt.preventDefault()
        return false
    } else {
        return true
    }
}

module.exports = FilterPhoneNumberInput
