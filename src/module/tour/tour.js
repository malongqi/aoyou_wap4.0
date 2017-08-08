import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import "vue-lazyload-img"




import Index from '../../views/tour/index'

// plugins
import Device from '../../plugins/device'
import ToastPlugin from '../../plugins/toast'
import AlertPlugin from '../../plugins/alert'


import Choose from '../../views/tour/choose'
import Flight from '../../views/tour/flight'
import Room from '../../views/tour/room'
import Room2 from '../../views/tour/room2'
import HotelImg from '../../views/tour/hotelimg'
import HotelList from '../../views/tour/hotellist'
import HotelPlan from '../../views/tour/hotelplan'
import Date from '../../views/tour/date'
import Preferential from '../../views/tour/preferential'
import Comment from '../../views/tour/comment'
import Detail from '../../views/tour/detail'
import Service from '../../views/tour/service'
import Calendar from '../../views/tour/calendar'

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


/*0228 F START*/

let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)


/**
 * sync router loading status
 */
const commit = store.commit || store.dispatch
router.beforeEach(({ to, from, next }) => {
    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)
    if (toIndex) {
        if (toIndex > fromIndex) {
            commit('UPDATE_DIRECTION', 'forward')
        } else {
            commit('UPDATE_DIRECTION', 'reverse')
        }
    } else {
        ++historyCount
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount)
        commit('UPDATE_DIRECTION', 'forward')
    }
    commit('UPDATE_LOADING', true)
    setTimeout(next, 50)
})
router.afterEach(() => {
    commit('UPDATE_LOADING', false)
})

sync(store, router)

/*0228 F END*/



var loadState = false
router.map({
    '/': {
        component: Index
    },
    '/choose': {
        component: Choose
    },
    '/flight': {
        component: Flight
    },
    '/room': {
        component: Room
    },
    '/room2': {
        component: Room2
    },
    '/hotelimg': {
        component: HotelImg
    },
    '/hotellist': {
        component: HotelList
    },
    '/hotelplan': {
        component: HotelPlan
    },
    '/date': {
        component: Date
    },
    '/preferential': {
        component: Preferential
    },
    '/comment': {
        component: Comment
    },
    '/detail': {
        component: Detail
    },
    '/service': {
        component: Service
    },
    '/calendar': {
        component: Calendar
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