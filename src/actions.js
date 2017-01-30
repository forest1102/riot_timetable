export const DATA_SAVE = 'DATA_SAVE'
export const INIT = 'INIT'
export const ASYNC_SAVE = 'ASYNC_SAVE'
export const TIMETABLE_LOAD = 'TIMETABLE_LOAD'
export const TIMETABLE_LOADED = 'TIMETABLE_LOADED'
window.TAG = ['day', 'week', 'calendar', 'setting'];
window.WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
window.WEEKtoINT = {
    'Mon': 0,
    'Tue': 1,
    'Wed': 2,
    'Thu': 3,
    'Fri': 4
};
export function dataSave(data) {
    return {
        type: DATA_SAVE,
        data: data
    }
}
export function taskLoad() {
    return {
        type: TIMETABLE_LOAD
    }
}

export function timetableLoaded(timetable) {
    return {
        type: TIMETABLE_LOADED,
        timetable: timetable
    }
}

export function asyncLoad(data) {
    return {
        type: ASYNC_SAVE,
        data: data
    }
}