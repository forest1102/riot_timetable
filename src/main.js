if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}
import riot from 'riot'
import route from 'riot-route'
import RiotControl from 'riotcontrol'
import {
    createStore
} from 'redux'
import rrm from 'riot-redux-mixin'
import reducer from './reducer.js'
import {
    Store
} from './store.js'
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
window.a = 10;
window.TAG = ['day', 'week', 'calendar', 'setting'];
window.WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
window.CLIENT_ID = '455128849558-p20c7pm33dkc4oneirb7cbja8pltp6di.apps.googleusercontent.com';
window.CALENDAR_ID = 's1510285@ysh.ed.jp';
window.SCOPES = ["https://www.googleapis.com/auth/calendar"];
window.obs = riot.observable()
window.range = 6;
window.route = route;
window.WEEKtoINT = {
    'Mon': 0,
    'Tue': 1,
    'Wed': 2,
    'Thu': 3,
    'Fri': 4
};
window.RiotControl = RiotControl;

var store = new Store();
// var gGCalendar = new GCALENDAR(CALENDAR_ID);
RiotControl.addStore(store);
// /**
//  * Check if current user has authorized this application.
//  */
function checkAuth() {
    $(() => {
        riot.mount('*');
        RiotControl.trigger('init');
        gapi.auth.authorize({
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, handleAuthResult);
        // My app routes
        route.start(true);
    })
}

obs.on('handleAuth', function() {
    gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: false
        },
        handleAuthResult);
    return false;
})

function handleAuthResult(authResult) {
    obs.trigger('auth-check', authResult && !authResult.error);
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        // RiotControl.trigger('api-ready');
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const store = createStore(reducer)
    riot.mixin(rrm(store))
    route.start(true)
    riot.mount('*')
})