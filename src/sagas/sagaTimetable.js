import {
    effects,
    delay
} from 'redux-saga'
import {
    SEND_LOCALSTORAGE,
    TIMETABLE_LOAD,
    saveTimetable,
    timetableLoaded
} from '../actions'

const {
    fork,
    put,
    call,
    take
} = effects;

export function* saveAsync() {
    while (true) {
        const action = yield take(SEND_LOCALSTORAGE);
        const {
            index,
            day,
            subject,
            teacher,
            place
        } = action.data;
        // yield call(delay, 1000);
        var timetable = JSON.parse(localStorage.getItem("timetable"));
        timetable[WEEKtoINT[day]][index] = {
            subject,
            teacher,
            place
        };
        localStorage.setItem("timetable", JSON.stringify(timetable));
        yield put(saveTimetable(action.data))
    }
}

export function* loadTimetable() {
    while (true) {
        const action = yield take(TIMETABLE_LOAD)
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