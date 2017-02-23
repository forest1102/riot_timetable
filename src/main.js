'use strict';
import 'babel-polyfill'
import 'es6-promise'
import 'fetch-polyfill'
import {
    observable,
    mixin,
    mount
} from 'riot'
import route from 'riot-route'
// import Route from 'riot-router';
import rrm from 'riot-redux-mixin'
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
import './tags/week.tag'
const store = configureStore()

window.triggerGoogleLoaded = () => {
    // window.dispatchEvent(new Event('google-loaded'));
    store.trigger('google-loaded')
}

window.addEventListener('DOMContentLoaded', () => {
    mixin(rrm(store))
    mount('*')
    route.start(true)
});