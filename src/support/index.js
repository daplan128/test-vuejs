//  Set your APP_ID
window.APP_ID = process.env.INTERCOM.APP_ID
var intercomSettings = { app_id: window.APP_ID };

(function () {
    var w = window
    var ic = w.Intercom
    if (typeof ic === 'function') {
        ic('reattach_activator')
        ic('update', intercomSettings)
    } else {
        var d = document
        var i = function() {
            i.c(arguments)
        }
        i.q = []
        i.c = function(args) {
            i.q.push(args)
        }
        w.Intercom = i
        var l = function () {
            var s = d.createElement('script')
            s.type = 'text/javascript'
            s.async = true
            s.src = 'https://widget.intercom.io/widget/' + window.APP_ID
            var x = d.getElementsByTagName('script')[0]
            x.parentNode.insertBefore(s, x)

            window.Intercom('boot', {
                app_id: window.APP_ID
                //   Logged out user so may not have any user related info
            })
        }
        if (w.attachEvent) {
            w.attachEvent('onload', l)
        } else {
            w.addEventListener('load', l, false)
        }
    }
})()

export default function (params) {
    window.Intercom('boot', {
        app_id: window.APP_ID,
        ...params
    })
}
