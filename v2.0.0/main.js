import Vue from 'vue'
import App from './src/app.vue'

// vue 实例
new Vue({
    el: "#app",
    render: (h)=>{
        return h(App)
    }
})