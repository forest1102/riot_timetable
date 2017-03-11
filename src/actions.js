import {
    createAction,
    createActions
} from 'redux-actions'

export const {
    timetableSave,
    requestTimetableLoad,
    successTimetableLoaded,
    sendLocalStorage
} = createActions('TIMETABLE_SAVE', 'REQUEST_TIMETABLE_LOAD',
    'SUCCESS_TIMETABLE_LOADED', 'SEND_LOCAL_STORAGE')

export const googleAPILoaded = createAction('GOOGLE_API_LOADED')

export const toggleSignInStatus = createAction('TOGGLE_SIGNIN_STATUS', isSignedIn => isSignedIn)

export const requestSignIn = createAction('REQUEST_SIGNIN')

export const requestSignOut = createAction('REQUEST_SIGNOUT')

export const requestCalendarEvent = createAction('REQUEST_CALENDAR_EVENT')

export const saveCalendarEvent = createAction('SAVE_CALENDAR_EVENT', items => items)

export const requestInsertCalendarEvent = createAction('REQUEST_INSERT_CALENDAR_EVENT', options => options)

export const addCalendarEvent = createAction('ADD_CALENDAR_EVENT', event => event)

export const prepareGoogle = createAction('PRERARE_GOOGLE');