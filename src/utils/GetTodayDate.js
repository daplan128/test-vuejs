'use strict'

const GetTodayDate = (europeanFormat, usFormat) => {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()
    let currentDate = ''
    let nextMonthDate = ''

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    if (europeanFormat) {
        currentDate = dd + '/' + mm + '/' + yyyy

        if (Number(mm) === 2) {
            // TO DO edge case for 28/29 february
            if (Number(dd) > 28) {
                dd = '28'
            }
            nextMonthDate = dd + '/' + mm + '/' + yyyy
        } else if (Number(mm) === 12) {
            mm = '01'
            dd = '31'
            yyyy = yyyy + 1
            nextMonthDate = dd + '/' + mm + '/' + yyyy
        } else {
            mm = Number(mm) + 1
            nextMonthDate = dd + '/' + mm + '/' + yyyy
        }
    }

    if (usFormat) {
    // TODO if we will ever use US Calendar Format
        today = mm + '/' + dd + '/' + yyyy
    }

    let infoDate = {
        currentDate,
        nextMonthDate
    }

    return infoDate
}

module.exports = GetTodayDate
