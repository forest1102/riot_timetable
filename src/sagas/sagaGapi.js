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
        const action = yield take(requestSignIn)
        const result = yield call(googleAuthSignIn);
        // yield call(console.log, result);
        yield put(toggleSignInStatus(true))
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
        try {
            const resp = yield call(promiseInsertEvent, payload)
            yield call(console.log, resp);
            yield put(addCalendarEvent(resp.result))
        } catch (e) {
            console.error('error:', e.result.error);
        }
    }
}