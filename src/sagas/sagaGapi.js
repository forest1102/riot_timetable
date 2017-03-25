import {
    effects
} from 'redux-saga'
import {
    googleApiLoaded,
    requestSignIn,
    requestSignOut,
    requestCalendarEvent,
    requestInsertCalendarEvent,
    saveCalendarEvent,
    addCalendarEvent,
    prepareGoogle,
    successPrepareGoogle,
    successGoogleSignIn,
    successGoogleSignOut,
    requestPatchCalendarEvent,
    requestTimetableLoad,
    successTimetableLoaded
} from '../actions'
import {
    promiseCalendarEventsList,
    promiseInsertEvent,
    promiseClientInit,
    promisePatchEvent,
    googleAuthSignIn,
    googleAuthSignOut
} from './handleGapi'

import {
    getDefaultTimetable
} from './sagaTimetable'

import {
    WEEKtoINT
} from '../constants'

import {
    googleSignedInSelector
} from '../select'
const {
    fork,
    put,
    call,
    take,
    select,
    cancel,
    takeLatest
} = effects;

export const promises = {
    loadGoogleAuth2: () => new Promise(function(resolve, reject) {
        window.gapi.load('client:auth2', resolve)
    }),
    loadScript: (src) => new Promise(function(resolve, reject) {
        const js = document.createElement('script')
        js.src = src
        js.onload = resolve
        js.onerror = reject
        document.body.appendChild(js)
    })
}

export function* getCalendarEvents() {
    while (true) {
        // console.log(requestCalendarEvent);
        const {
            payload
        } = yield take(requestCalendarEvent)
        const isSignedIn = yield select(googleSignedInSelector);
        if (!isSignedIn) return
        try {
            const resp = yield call(promiseCalendarEventsList, payload)
            // console.log(resp.result.items);
            yield put(saveCalendarEvent(resp.result.items))
        } catch (e) {
            console.log(e);
        } finally {

        }
    }
}

export function* insertCalendarEvents() {
    while (true) {
        const {
            payload
        } = yield take(requestInsertCalendarEvent)
        const isSignedIn = yield select(googleSignedInSelector);
        if (!isSignedIn) return
        try {
            const resp = yield call(promiseInsertEvent, payload)
            yield call(console.log, resp);
            yield put(addCalendarEvent(resp.result))
        } catch (e) {
            console.error('error:', e.result.error);
        }
    }
}

export function* patchCalendarEvent() {
    while (true) {
        const {
            payload
        } = yield take(requestPatchCalendarEvent)
        const isSignedIn = yield select(googleSignedInSelector);
        if (!isSignedIn) return
        try {
            const resp = yield call(promisePatchEvent, payload)
            yield call(console.log, resp);
            // yield put(addCalendarEvent(resp.result))
        } catch (e) {
            console.error('error:', e);
        }
    }
}

export function* timetableLoadFromCalendar() {
    // yield take(requestTimetableLoad)
    const isSignedIn = yield select(googleSignedInSelector);
    if (!isSignedIn) yield take(successGoogleSignIn)
    try {
        const {
            result: {
                items: events
            }
        } = yield call(promiseCalendarEventsList, {
            showDeleted: true,
            privateExtendedProperty: ['timetableEvent=true']
        })
        console.log(events);
        var timetables = getDefaultTimetable()
        for (const {
                extendedProperties: {
                    private: meta,
                    shared: eData
                }
            } of events) {
            if (meta.recurringEvent === 'true')
                timetables[WEEKtoINT[meta.day]][meta.index] = eData
        }
        console.log(timetables);
        yield put(successTimetableLoaded(timetables));
    } catch (e) {
        console.error(e);
    } finally {

    }
}

function* pGoogle() {
    yield take(prepareGoogle)
    try {
        yield call(promises.loadScript, 'https://apis.google.com/js/api.js')
        yield call(promises.loadGoogleAuth2)
        yield call(promiseClientInit)
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
        // console.log(isSignedIn);
        if (isSignedIn) {
            yield put(successGoogleSignIn())
        }
        // yield put(successPrepareGoogle())
    } catch (e) {
        console.log(e);
    } finally {

    }
}

export function* googleSignIn() {
    try {
        yield call(googleAuthSignIn)
        yield put(successGoogleSignIn())
    } catch (e) {
        console.error(e);
    } finally {

    }
}

export function* googleSignOut() {
    try {
        yield call(googleAuthSignOut)
        yield put(successGoogleSignOut())
    } catch (e) {
        console.error(e);
    } finally {

    }
}


export function* loginFlow() {
    while (true) {
        try {
            yield take(requestSignIn)
            yield call(googleSignIn)
            yield take(requestSignOut)
            yield call(googleSignOut)
        } catch (e) {
            console.log(e);
        } finally {

        }
    }
}

export default function*() {
    // yield call(pGoogle)
    yield fork(pGoogle)
    // yield take(successPrepareGoogle)
    yield [
        fork(loginFlow),
        fork(insertCalendarEvents),
        fork(getCalendarEvents),
        fork(patchCalendarEvent),
        takeLatest(requestTimetableLoad, timetableLoadFromCalendar)
    ]
}
