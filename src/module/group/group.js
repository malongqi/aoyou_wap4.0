import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import "vue-lazyload-img"

import Index from '../../views/group/index'

// plugins
import Device from '../../plugins/device'
import ToastPlugin from '../../plugins/toast'
import AlertPlugin from '../../plugins/alert'


import Date from '../../views/group/date'
import Preferential from '../../views/group/preferential'
import Departure from '../../views/group/departure'
import Detail from '../../views/group/detail'
import Comment from '../../views/group/comment'



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
    '/date': {
        component: Date
    },
    '/preferential': {
        component: Preferential
    },
    '/index': {
        component: Index
    },
    '/departure': {
        component: Departure
    },
    '/detail': {
        component: Detail
    },
    '/comment': {
        component: Comment
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