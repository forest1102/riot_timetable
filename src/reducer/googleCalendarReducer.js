import {
    saveCalendarEvent,
    addCalendarEvent,
    successGoogleSignIn,
    successGoogleSignOut
} from '../actions'
import {
    handleActions
} from 'redux-actions'

const defaultGoogleCalendarReducer = {
    isSignedIn: false,
    calendarEvents: []
}

const googleCalendarReducer = handleActions({
    [saveCalendarEvent]: (state, action) => ({
        ...state,
        calendarEvents: action.payload
    }),
    [addCalendarEvent]: (state, action) => ({
        ...state,
        calendarEvents: [
            ...state.calendarEvents,
            action.payload
        ]
    }),
    [successGoogleSignIn]: (state, action) => ({
        ...state,
        isSignedIn: true
    }),
    [successGoogleSignOut]: (state, action) => ({
        ...state,
        isSignedIn: false
    })
}, defaultGoogleCalendarReducer)

export default googleCalendarReducer;
