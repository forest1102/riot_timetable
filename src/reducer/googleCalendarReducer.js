import {
    toggleSignInStatus,
    saveCalendarEvent,
    addCalendarEvent
} from '../actions'
import {
    handleActions
} from 'redux-actions'

const defaultGoogleCalendarReducer = {
    isSignedIn: false,
    calendarEvents: []
}

const googleCalendarReducer = handleActions({
    [toggleSignInStatus]: (state, action) => ({
        ...state,
        isSignedIn: action.payload
    }),
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
    })
}, defaultGoogleCalendarReducer)

export default googleCalendarReducer;