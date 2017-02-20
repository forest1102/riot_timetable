import {
    effects
} from 'redux-saga'
import {
    clientInit,
    signIn,
    signOut,
    getCalendarEvents,
    insertCalendarEvents
} from './sagaGapi.js'
import {
    saveAsync,
    loadTimetable
} from './sagaTimetable.js'
const {
    fork
} = effects;


export default function* rootSaga() {
    yield fork(loadTimetable)
    yield fork(saveAsync);
    yield fork(clientInit);
    yield fork(signIn);
    yield fork(signOut)
    yield fork(getCalendarEvents)
    yield fork(insertCalendarEvents)
    // yield fork(getSignInStatus)
}