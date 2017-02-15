import {
    effects
} from 'redux-saga'
import {
    GAPI_ONLOADED,
    UPDATE_SIGNIN_STATUS,
    updateSignInStatus
} from '../actions'
const CLIENT_ID = '307000142363-e42nhiqersfrg8c28gjifson6vglo1as.apps.googleusercontent.com';
const CALENDAR_ID = 'primary';
const API_KEY = 'AIzaSyArAcDWq6wYaLtd7_-reEf0CbC0vLLPIgM';
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const {
    fork,
    put,
    call,
    take
} = effects;

const loadGapi = () => (new Promise(function(resolve, reject) {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            'scope': SCOPES.join(' '),
        }).then(
            () => {
                // Listen for sign-in state changes.
                // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
                // Handle the initial sign-in state.
                // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                resolve(gapi.auth2.getAuthInstance().isSignedIn.get());
            },
            () => {
                reject()
            });
    })
}))

export function* clientInit() {
    while (true) {
        const action = yield take(GAPI_ONLOADED)
        const isSignedIn = yield call(loadGapi);
        // yield call(console.log, loaded);
        yield put(updateSignInStatus(isSignedIn));
        // yield put()
    }
}

export function* getSignInStatus() {
    while (true) {
        const action = yield take(UPDATE_SIGNIN_STATUS)
        if (action.isSignedIn) {
            yield call(makeApiCall);
        }
    }
}

function makeApiCall() {
    gapi.client.calendar.events.list({
        'calendarId': CALENDAR_ID,
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function(resp) {
        console.log(resp);
        var events = resp.result.items,
            len = events.length;
        console.log('Upcoming events:');

        if (events.length > 0) {
            for (var i = 0; i < len; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                console.log(event.summary + ' (' + when + ')')
            }
        }
        // return gapi.client.calendar.events.insert({
        //     'calendarId': CALENDAR_ID,
        //     'summary': 'hogehoge',
        //     'location': 'somewhere',
        //     'id': 'hogehoge11',
        //     'start': {
        //         'dateTime': '2017-02-06T09:00:00-07:00'
        //     },
        //     'end': {
        //         'dateTime': '2017-02-06T17:00:00-07:00'
        //     }
        // })
    }, (reason) => {
        console.log('Error: ' + reason.result.error.message)
    })
}