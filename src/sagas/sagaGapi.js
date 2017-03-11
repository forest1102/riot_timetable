import {
    effects
} from 'redux-saga'
import {
    googleAPILoaded,
    requestSignIn,
    requestSignOut,
    requestCalendarEvent,
    requestInsertCalendarEvent,
    toggleSignInStatus,
    saveCalendarEvent,
    addCalendarEvent,
    prepareGoogle
} from '../actions'
import {
    loadGapi,
    googleAuthSignIn,
    googleAuthSignOut,
    promiseCalendarEventsList,
    promiseInsertEvent
} from './handleGapi'
import {
    googleSignedInSelector
} from '../select'
const {
    fork,
    put,
    call,
    take,
    select
} = effects;
const CLIENT_ID = '307000142363-e42nhiqersfrg8c28gjifson6vglo1as.apps.googleusercontent.com';
const CALENDAR_ID = 'primary';
const API_KEY = 'AIzaSyArAcDWq6wYaLtd7_-reEf0CbC0vLLPIgM';
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const fields = [
    'start', 'end', 'id', 'summary', 'description',
    'location', 'extendedProperties', 'recurrence',
    'recurringEventId', 'sequence'
].join(',')
export const promises = {
    loadGoogleAuth2: () => new Promise(function(resolve, reject) {
        window.gapi.load('auth2', resolve)
    }),
    loadScript: () => new Promise(function(resolve, reject) {
        const js = document.createElement('script')
        js.src = src
        js.onload = resolve
        js.onerror = reject
        document.body.appendChild(js)
    })
}
export function* clientInit() {
    while (true) {
        const action = yield take(googleAPILoaded)
        try {
            const isSignedIn = yield call(loadGapi);
            // yield call(console.log, loaded);
            yield put(toggleSignInStatus(isSignedIn));
        } catch (err) {
            yield call(console.error, err)
        }
    }
}

export function* signIn() {
    while (true) {
        try {
            const action = yield take(requestSignIn)
            yield call(googleAuthSignIn)
            yield put(toggleSignInStatus(true))
        } catch (e) {

        } finally {

        }
    }
}

export function* signOut() {
    while (true) {
        const action = yield take(requestSignOut)
        const result = yield call(googleAuthSignOut);
        // yield call(console.log, result);
        yield put(toggleSignInStatus(false))
    }
}

export function* getCalendarEvents() {
    while (true) {
        const action = yield take(requestCalendarEvent)
        const resp = yield call(promiseCalendarEventsList)
        yield call(console.log, resp)
        yield put(saveCalendarEvent(resp.result.items))
    }
}

export function* insertCalendarEvents() {
    while (true) {
        const {
            payload
        } = yield take(requestInsertCalendarEvent)
        const isSignedIn = yield select(googleSignedInSelector);
        if (isSignedIn) {
            try {
                const resp = yield call(promiseInsertEvent, payload)
                yield call(console.log, resp);
                yield put(addCalendarEvent(resp.result))
            } catch (e) {
                console.error('error:', e.result.error);
            }
        }
    }
}

export function* pGoogle() {
    yield call(promises.loadScript, 'https://apis.google.com/js/api.js')
    yield call(promises.loadGoogleAuth2)
    yield call(window.gapi.auth2.init, {
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        'scope': SCOPES.join(' ')
    })
}

export function* watchLoginGoogle() {
    try {
        yield take(prepareGoogle);
        yield call(pGoogle);
        yield fork(signIn)
    } catch (e) {

    }
}

export default function*() {
    yield fork(clientInit);
    yield fork(signIn);
    yield fork(signOut)
    yield fork(getCalendarEvents)
    yield fork(insertCalendarEvents)
}
