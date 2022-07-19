import Vue from 'vue'
import VueI18n from 'vue-i18n'

import es from './es'
import en from './en'

Vue.use(VueI18n)
export default new VueI18n({
    locale: navigator.language.split('-')[0] || 'en' || localStorage.getItem('locale'),
    fallbackLocale: 'en',
    messages: {
        en,
        es
    }
})
