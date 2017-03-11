import {
    effects
} from 'redux-saga'
import gapiSaga from './sagaGapi.js'
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
    yield fork(gapiSaga);
    // yield fork(getSignInStatus)
}