import {
    combineReducers
} from 'redux'
import googleCalendarReducer from './googleCalendarReducer.js'
import timeTableReducer from './timetableReducer.js';

const reducer = combineReducers({
    timetable: timeTableReducer,
    googleCalendar: googleCalendarReducer
})
export default reducer;