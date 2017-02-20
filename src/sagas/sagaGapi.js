import {
    effects
} from 'redux-saga'
import {
    GAPI_ONLOADED,
    TOGGLE_SIGNIN_STATUS,
    REQUEST_SIGNIN,
    REQUEST_SIGNOUT,
    REQUEST_CALENDAR_EVENT,
    REQUEST_INSERT_CALENDAR_EVENT,
    toggleSignInStatus,
    saveCalendarEvent,
    addCalendarEvent
} from '../actions'
import {
    loadGapi,
    googleAuthSignIn,
    googleAuthSignOut,
    promiseCalendarEventsList,
    promiseInsertEvent
} from './handleGapi'
const {
    fork,
    put,
    call,
    take
} = effects;
export function* clientInit() {
    while (true) {
        const action = yield take(GAPI_ONLOADED)
        const isSignedIn = yield call(loadGapi);
        // yield call(console.log, loaded);
        yield put(toggleSignInStatus(isSignedIn));
    }
}

export function* signIn() {
    while (true) {
        const action = yield take(REQUEST_SIGNIN)
        const result = yield call(googleAuthSignIn);
        // yield call(console.log, result);
        yield put(toggleSignInStatus(true))
    }
}

export function* signOut() {
    while (true) {
        const action = yield take(REQUEST_SIGNOUT)
        const result = yield call(googleAuthSignOut);
        // yield call(console.log, result);
        yield put(toggleSignInStatus(false))
    }
}

export function* getCalendarEvents() {
    while (true) {
        const action = yield take(REQUEST_CALENDAR_EVENT)
        const resp = yield call(promiseCalendarEventsList)
        // yield call(console.log, resp)
        yield put(saveCalendarEvent(resp.result.items))
    }
}

export function* insertCalendarEvents() {
    while (true) {
        const action = yield take(REQUEST_INSERT_CALENDAR_EVENT)
        try {
            const resp = yield call(promiseInsertEvent, action.options)
            yield call(console.log, resp);
            yield put(addCalendarEvent(resp.result))
        } catch (e) {
            console.error('error:', e.result.error);
        }
    }
}