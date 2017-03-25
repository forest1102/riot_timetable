import {
    effects
} from 'redux-saga'
import gapiSaga from './sagaGapi.js'
import timetableSaga from './sagaTimetable.js'
const {
    fork
} = effects;


export default function* rootSaga() {
    yield fork(timetableSaga)
    yield fork(gapiSaga);
    // yield fork(getSignInStatus)
}
