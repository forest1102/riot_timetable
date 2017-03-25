import {
    effects,
    delay
} from 'redux-saga'
import {
    sendLocalStorage,
    requestTimetableLoad,
    timetableSave,
    successTimetableLoaded,
    timetableSendToGoogleCalendar,
    requestInsertCalendarEvent,
    requestPatchCalendarEvent
} from '../actions'

import {
    googleCalendarSelector,
    classHourSelector
} from '../select'

import base32Hex from './base32EncodeHex'

import {
    WEEK,
    WEEKtoINT
} from '../constants';

const {
    fork,
    put,
    call,
    take,
    select
} = effects;

// function setToLocalStorage(timetable) {
//     localStorage.setItem("timetable", JSON.stringify(timetable));
// }
// export function* saveAsync() {
//     while (true) {
//         try {
//             const {
//                 payload
//             } = yield take(sendLocalStorage);
//             yield call(setToLocalStorage, payload)
//         } catch (e) {
//             yield call(console.log, e)
//         } finally {
//
//         }
//     }
// }
//
// export function* loadTimetable() {
//     while (true) {
//         yield take(requestTimetableLoad)
//         // console.log('aaaa');
//         if (localStorage.timetable == null) {
//             var timetable = getDefaultTimetable();
//             console.log(timetable);
//             localStorage.setItem("timetable", JSON.stringify(timetable));
//             yield put(successTimetableLoaded(timetable))
//         } else {
//             var timetable = JSON.parse(localStorage.getItem("timetable"));
//             yield put(successTimetableLoaded(timetable));
//         }
//     }
// }

function classHourDate(hour) {
    let d = new Date(),
        start = new Date(d.getTime()),
        end = new Date(d.getTime());
    start.setHours(hour.start[0]);
    start.setMinutes(hour.start[1])
    end.setHours(hour.end[0]);
    end.setMinutes(hour.end[1]);
    return {
        start,
        end
    }
}

const makeIndentifierId =
    (day, index) =>
    base32Hex.encode(`event${day}${index}timetable`).trim()

const shorten = {
    'Sun': 'SUN',
    'Mon': 'MO',
    'Tue': 'TU',
    'Wed': 'WE',
    'Thu': 'TH',
    'Fri': 'FR',
    'Sat': 'SA'
}

export function* sendToGoogleCalendar() {
    while (true) {
        const {
            payload: {
                day,
                index,
                subject,
                teacher,
                place,
            }
        } = yield take(timetableSave)
        let id = makeIndentifierId(day, index)
        console.log(id);
        const events = yield select(googleCalendarSelector)
        const classHour = yield select(classHourSelector)
        const eventIndex = events.find((e) => (e.id === id))
        // console.log((!eventIndex) ? 'not found' : eventIndex);
        // console.log(start.toISOString(), end.toISOString());
        if (!eventIndex) {
            const {
                start,
                end
            } = classHourDate(classHour[index])
            yield put(requestInsertCalendarEvent({
                summary: `${index+1}時間目 ${subject}`,
                id: id,
                description: `教師: ${teacher}`,
                start: {
                    dateTime: start.toISOString(),
                    timeZone: 'Asia/Tokyo'
                },
                end: {
                    dateTime: end.toISOString(),
                    timeZone: 'Asia/Tokyo'
                },
                location: place,
                extendedProperties: {
                    shared: {
                        subject,
                        teacher,
                        place
                    },
                    private: {
                        day,
                        index,
                        'timetableEvent': "true",
                        'recurringEvent': 'true'
                    }
                },
                recurrence: [
                    `RRULE:FREQ=WEEKLY;BYDAY=${shorten[day]}`
                ]
            }))
        } else {
            yield put(requestPatchCalendarEvent({
                eventId: id,
                summary: `${index+1}時間目 ${subject}`,
                description: `教師: ${teacher}`,
                location: place,
                extendedProperties: {
                    shared: {
                        subject,
                        teacher,
                        place
                    },
                    private: {
                        day,
                        index
                    }
                }
            }))
        }
    }
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
    return [...timetable]
}

export default function*() {
    // yield fork(loadTimetable)
    yield fork(sendToGoogleCalendar)
    // yield fork(saveAsync);
}
