import 'babel-polyfill'
import 'es6-promise'
import 'fetch-polyfill'
import riot from 'riot'
import route from 'riot-route'
// import RiotControl from 'riotcontrol'
// import createSagaMiddleware from 'redux-saga'
import rrm from 'riot-redux-mixin'
import reducer from './reducer.js'
// import mySaga from './sagas.js'
import configureStore from './configureStore.js'
import {
    handleClientLoad
} from './handleGapi.js'
import './tags/app.tag'
import './tags/md.tag'
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

// console.log('aaa');
window.riot = riot;
// window.a = 10;
window.obs = riot.observable()
window.range = 6;
window.route = route;
window.handleClientLoad = () => {
    handleClientLoad();
    const store = configureStore()
    riot.mixin(rrm(store))
    route.start(true)
    riot.mount('*')
}
// window.RiotControl = RiotControl;

// var store = new Store();
// var gGCalendar = new GCALENDAR(CALENDAR_ID);
// RiotControl.addStore(store);
// /**
//  * Check if current user has authorized this application.
//  */