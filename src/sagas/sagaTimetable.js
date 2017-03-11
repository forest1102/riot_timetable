import {
    effects,
    delay
} from 'redux-saga'
import {
    sendLocalStorage,
    requestTimetableLoad,
    timetableSave,
    successTimetableLoaded
} from '../actions'

import {
    WEEK,
    WEEKtoINT
} from '../constants';

const {
    fork,
    put,
    call,
    take
} = effects;

export function* saveAsync() {
    while (true) {
        try {
            const {
                payload
            } = yield take(sendLocalStorage);
            const {
                index,
                day,
                subject,
                teacher,
                place
            } = payload;
            // yield call(delay, 1000);
            var timetable = JSON.parse(localStorage.getItem("timetable"));
            timetable[WEEKtoINT[day]][index] = {
                subject,
                teacher,
                place
            };
            localStorage.setItem("timetable", JSON.stringify(timetable));
            yield put(timetableSave(payload))
        } catch (e) {
            yield call(console.log, e)
        } finally {

        }
    }
}

export function* loadTimetable() {
    while (true) {
        yield take(requestTimetableLoad)
        // console.log('aaaa');
        if (localStorage.timetable == null) {
            var timetable = getDefaultTimetable();
            console.log(timetable);
            localStorage.setItem("timetable", JSON.stringify(timetable));
            yield put(successTimetableLoaded(timetable))
        } else {
            var timetable = JSON.parse(localStorage.getItem("timetable"));
            yield put(successTimetableLoaded(timetable));
        }
    }
}


function getDefaultTimetable() {
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