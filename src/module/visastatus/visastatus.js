import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import "vue-lazyload-img"



//route page
import Home from '../../views/visastatus/Home'
import Step from '../../views/visastatus/Step'

//import Startcity from '../../views/aywap/startcity'

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

router.map({
    // '/': {
    //     component: function (resolve) {
    //         require(['../../views/message/Home'], resolve)
    //     }
    // },
    '/': {
        component: Home
    },
    '/step': {
        component: Step
    }
})
//
// router.on('/component/center', {
//     component: require('../../views/demos/Center')
// })

// save position for demo page
let demoScrollTop = 0
function saveDemoScrollTop () {
    demoScrollTop = window.scrollY
}

router.start(App, '#app')