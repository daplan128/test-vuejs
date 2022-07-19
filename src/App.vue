<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import API from '@/api'

export default {
    name: 'App',
    data() {
        return {

        }
    },
    metaInfo () {
        return {
            title: '',
            titleTemplate: '',
            meta: [
                {'property': 'og:title', 'content': this.$t('apptitle')},
                {'property': 'og:image', 'content': process.env.INTERSEGUROS_IMAGEN},
                {'property': 'og:description', 'content': this.$t('appdescription')}
            ]
        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<style>
body {
    width: 100%;
    height: 100%;
    overflow-y:auto ;
    background: #000;
}
</style>
