import {
    combineReducers
} from 'redux'

import {
    SAVE_TIMETABLE,
    TIMETABLE_LOADED,
    TOGGLE_SIGNIN_STATUS,
    SAVE_CALENDAR_EVENT,
    ADD_CALENDAR_EVENT
} from './actions.js'


function timeTableReducer(state = {
    timetable: []
}, action) {
    switch (action.type) {
        case TIMETABLE_LOADED:
            // console.log(action.timetable);
            return {
                ...state,
                timetable: action.timetable
            }
        case SAVE_TIMETABLE:
            var {
                day,
                index,
                subject,
                teacher,
                place,
            } = action.data;
            var dayIndex = WEEKtoINT[day]
            var newState = [
                ...state.timetable.slice(0, dayIndex), [...state.timetable[dayIndex].slice(0, index), {
                        ...state.timetable[dayIndex][index],
                        'subject': subject,
                        'teacher': teacher,
                        'place': place
                    },
                    ...state.timetable[dayIndex].slice(index + 1)
                ],

                ...state.timetable.slice(dayIndex + 1)
            ]
            console.log(newState, 'by reducer');
            // localStorage.setItem("timeTable", JSON.stringify(newState));
            return { ...state,
                timetable: newState
            }

        default:
            return state

    }
}

function googleCalendarReducer(state = {
    isSignedIn: false,
    calendarEvents: []
}, action) {
    switch (action.type) {
        case TOGGLE_SIGNIN_STATUS:
            return {
                ...state,
                isSignedIn: action.isSignedIn
            }
        case SAVE_CALENDAR_EVENT:
            // console.log(action.items);
            return {
                ...state,
                calendarEvents: action.items
            }
        case ADD_CALENDAR_EVENT:
            return {
                ...state,
                calendarEvents: [
                    ...state.calendarEvents,
                    action.event
                ]
            }
        default:
            return state;
    }
}

const reducer = combineReducers({
    timetable: timeTableReducer,
    googleCalendar: googleCalendarReducer
})
export default reducer;