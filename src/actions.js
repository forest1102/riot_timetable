export const SAVE_TIMETABLE = 'SAVE_TIMETABLE'
export const INIT = 'INIT'
export const SEND_LOCALSTORAGE = 'SEND_LOCALSTORAGE'
export const TIMETABLE_LOAD = 'TIMETABLE_LOAD'
export const TIMETABLE_LOADED = 'TIMETABLE_LOADED'
export const GAPI_ONLOADED = 'GAPI_ONLOADED'
export const REQUEST_SIGNIN = 'REQUEST_SIGNIN'
export const REQUEST_SIGNOUT = 'REQUEST_SIGNOUT'
export const TOGGLE_SIGNIN_STATUS = 'TOGGLE_SIGNIN_STATUS'
export const REQUEST_CALENDAR_EVENT = 'REQUEST_CALENDAR_EVENT'
export const SAVE_CALENDAR_EVENT = 'SAVE_CALENDAR_EVENT'
export const REQUEST_INSERT_CALENDAR_EVENT = 'REQUEST_INSERT_CALENDAR_EVENT'
export const ADD_CALENDAR_EVENT = 'ADD_CALENDAR_EVENT'
global.TAG = ['day', 'week', 'calendar', 'setting'];
global.WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
global.WEEKtoINT = {
    'Mon': 0,
    'Tue': 1,
    'Wed': 2,
    'Thu': 3,
    'Fri': 4
};
export function saveTimetable(data) {
    return {
        type: SAVE_TIMETABLE,
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

export function sendLocalStorage(data) {
    return {
        type: SEND_LOCALSTORAGE,
        data: data
    }
}
export function googleAPILoaded() {
    return {
        type: GAPI_ONLOADED
    }
}
export function toggleSignInStatus(isSignedIn) {
    return {
        type: TOGGLE_SIGNIN_STATUS,
        isSignedIn: isSignedIn
    }
}

export function reqestSignIn() {
    return {
        type: REQUEST_SIGNIN
    }
}

export function reqestSignOut() {
    return {
        type: REQUEST_SIGNOUT
    }
}

export function reqestCalendarEvent() {
    return {
        type: REQUEST_CALENDAR_EVENT
    }
}

export function saveCalendarEvent(items) {
    return {
        type: SAVE_CALENDAR_EVENT,
        items: items
    }
}

export function reqestInsertCalendarEvent(options) {
    return {
        type: REQUEST_INSERT_CALENDAR_EVENT,
        options
    }
}

export function addCalendarEvent(event) {
    return {
        type: ADD_CALENDAR_EVENT,
        event
    }
}