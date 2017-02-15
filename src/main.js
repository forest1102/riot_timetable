'use strict';
import 'babel-polyfill'
import 'es6-promise'
import 'fetch-polyfill'
import riot from 'riot'
import route from 'riot-route'
import rrm from 'riot-redux-mixin'
import reducer from './reducer.js'
import configureStore from './configureStore.js'
import './tags/app.tag'
import './tags/calendar.tag'
import './tags/day.tag'
import './tags/modal.tag'
import './tags/navigation.tag'
import './tags/Header.tag'
import './tags/not-found.tag'
import './tags/panel.tag'
import './tags/setting.tag'
import './tags/time-table.tag'
import './tags/week.tag'
const store = configureStore()
global.riot = riot;
global.obs = riot.observable()
global.range = 6;
global.route = route

window.triggerGoogleLoaded = () => {
    // window.dispatchEvent(new Event('google-loaded'));
    store.trigger('google-loaded')
}

window.addEventListener('DOMContentLoaded', () => {
    riot.mixin(rrm(store))
    riot.mount('*')
    route.start(true)
});