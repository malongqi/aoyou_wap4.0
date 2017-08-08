import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import "vue-lazyload-img"




import Index from '../../views/find/index'
import Detail from '../../views/find/detail'
import Result from '../../views/find/result'
import Travaler from '../../views/find/travaler'
import Active from '../../views/find/active'
import Search from '../../views/find/search'

// plugins
import Device from '../../plugins/device'
import ToastPlugin from '../../plugins/toast'
import AlertPlugin from '../../plugins/alert'



const FastClick = require('fastclick')
FastClick.attach(document.body)

// Router
Vue.use(Router)
Vue.use(VueResource)
Vue.config.devtools = true

// $device
Vue.use(Device)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(Vue.lazyimg)

const router = new Router({
    transitionOnLoad: false,
    suppressTransitionError: true
})


import { sync } from 'vuex-router-sync'
import store from '../../vuex/store'


router.map({
    '/': {
        component: Index
    },
    '/result': {
        component: Result
    },
    '/travaler': {
        component: Travaler
    },
    '/detail': {
        component: Detail
    },
    '/active': {
        component: Active
    },
    '/search': {
        component: Search
    }

})

router.start(App, '#app')