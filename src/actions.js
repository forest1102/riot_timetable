import {
    createAction,
    createActions
} from 'redux-actions'

export const {
    timetableSave,
    requestTimetableLoad,
    successTimetableLoaded,
    sendLocalStorage,
    googleApiLoaded,
    requestSignIn,
    requestSignOut,
    requestCalendarEvent,
    saveCalendarEvent,
    requestInsertCalendarEvent,
    requestPatchCalendarEvent,
    addCalendarEvent,
    prepareGoogle,
    successPrepareGoogle,
    successGoogleSignIn,
    successGoogleSignOut,
    saveClassHour,
    timetableSendToGoogleCalendar
} = createActions(
    'TIMETABLE_SAVE',
    'REQUEST_TIMETABLE_LOAD',
    'SUCCESS_TIMETABLE_LOADED',
    'SEND_LOCAL_STORAGE',
    'GOOGLE_API_LOADED',
    'REQUEST_SIGN_IN',
    'REQUEST_SIGN_OUT',
    'REQUEST_CALENDAR_EVENT',
    'SAVE_CALENDAR_EVENT',
    'REQUEST_INSERT_CALENDAR_EVENT',
    'ADD_CALENDAR_EVENT',
    'PREPARE_GOOGLE',
    'SUCCESS_PREPARE_GOOGLE',
    'SUCCESS_GOOGLE_SIGN_IN',
    'SUCCESS_GOOGLE_SIGN_OUT',
    'SAVE_CLASS_HOUR',
    'TIMETABLE_SEND_TO_GOOGLE_CALENDAR',
    'REQUEST_PATCH_CALENDAR_EVENT')
//
// export const {
//     timetableSave,
//     requestTimetableLoad,
//     successTimetableLoaded,
//     sendLocalStorage
// } = createActions('TIMETABLE_SAVE', 'REQUEST_TIMETABLE_LOAD',
//     'SUCCESS_TIMETABLE_LOADED', 'SEND_LOCAL_STORAGE')
//
// export const googleApiLoaded = createAction('GOOGLE_API_LOADED')
//
// export const requestSignIn = createAction('REQUEST_SIGNIN')
//
// export const requestSignOut = createAction('REQUEST_SIGNOUT')
//
// export const requestCalendarEvent = createAction('REQUEST_CALENDAR_EVENT')
//
// export const saveCalendarEvent = createAction('SAVE_CALENDAR_EVENT')
//
// export const requestInsertCalendarEvent = createAction('REQUEST_INSERT_CALENDAR_EVENT')
//
// export const addCalendarEvent = createAction('ADD_CALENDAR_EVENT')
//
// export const prepareGoogle = createAction('PRERARE_GOOGLE');
//
// export const successPrepareGoogle = createAction('SUCCESS_PREPARE_GOOGLE')
//
// export const successGoogleSignIn = createAction('SUCCESS_GOOGLE_SIGN_IN', () => true)
//
// export const successGoogleSignOut = createAction('SUCCESS_GOOGLE_SIGN_OUT', () => false)
