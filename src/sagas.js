import {
    effects,
    delay
} from 'redux-saga'
import {
    ASYNC_SAVE,
    TASK_LOAD,
    dataSave,
    timetableLoaded
} from './actions.js'
var {
    fork,
    put,
    call,
    take
} = effects;
export function* saveAsync() {
    while (true) {
        const action = yield take(ASYNC_SAVE);
        // yield call(delay, 1000);
        yield put(dataSave(action.data))
    }
}

export function* loadTimetable() {
    while (true) {
        const action = yield take(TASK_LOAD)
        // console.log('aaaa');
        if (localStorage.timetable == null) {
            var timetable = getDefaultTimetable();
            console.log(timetable);
            localStorage.setItem("timetable", JSON.stringify(timetable));
            yield put(timetableLoaded(timetable))
        } else {
            var timetable = JSON.parse(localStorage.getItem("timetable"));
            yield put(timetableLoaded(timetable));
        }
    }
}

export default function* rootSaga() {
    yield fork(loadTimetable)
    yield fork(saveAsync);

}

export function getDefaultTimetable() {
    var timetable = []
    for (var i = 0; i < 5; i++) {
        var obArr = [];
        for (var j = 0; j < 6; j++) {
            obArr.push({
                'teacher': ' ',
                'place': ' ',
                'subject': ' ',
                'day': WEEK[i],
                'index': j
            })
        }
        timetable.push(obArr)
    }
    return timetable
}