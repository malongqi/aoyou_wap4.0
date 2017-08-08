/**
 * Created by malongqi on 16/12/14.
 */
import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import "vue-lazyload-img"

import Mdd from '../../views/mdd/index'
import Play from'../../views/mdd/play'
import Detail from'../../views/mdd/detail'
import Playdetail from '../../views/mdd/playdetail'
import Book from '../../views/mdd/book'
import Travelnotes from '../../views/mdd/travelnotes'



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
    history: true,
    saveScrollPosition: true
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


router.map({
    '/mdd.html/': {
        component:Mdd
    },
    '/mdd.html/play': {
        component: Play
    },
    '/mdd.html/detail': {
        component: Detail
    },
    '/mdd.html/playdetail': {
        component: Playdetail
    },
    '/mdd.html/book': {
        component: Book
    },
    '/mdd.html/travelnotes': {
        component: Travelnotes
    }

})

router.start(App, '#app')
