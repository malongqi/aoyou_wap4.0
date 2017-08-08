import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import "vue-lazyload-img"




import Index from '../../views/tourstatic/index'

// plugins
import Device from '../../plugins/device'
import ToastPlugin from '../../plugins/toast'
import AlertPlugin from '../../plugins/alert'


import Date from '../../views/tourstatic/date'
import Preferential from '../../views/tourstatic/preferential'
import Departure from '../../views/tourstatic/departure'
import Detail from '../../views/tourstatic/detail'
import Materials from '../../views/tourstatic/materials'
import Visa from '../../views/tourstatic/visa'
import Comment from '../../views/tourstatic/comment'
import Room from '../../views/tourstatic/room'
import HotelImg from '../../views/tourstatic/hotelimg'




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

var loadState = false
router.map({
    '/': {
        component: Index
    },
    '/date': {
        component: Date
    },
    '/preferential': {
        component: Preferential
    },
    '/departure': {
        component: Departure
    },
    '/detail': {
        component: Detail
    },
    '/materials': {
        component: Materials
    },
    '/visa': {
        component: Visa
    },
    '/comment': {
        component: Comment
    },    
    '/room': {
        component: Room
    },
    '/hotelimg': {
        component: HotelImg
    }


})

router.afterEach(function(transition) {
    if (transition.to.path.indexOf("/?") === -1) {
        loadState = true
    } else {
        if (loadState) {
            loadState = false
            window.location.reload()
        }
    }
})

router.start(App, '#app')