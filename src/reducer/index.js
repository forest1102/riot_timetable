import {
    combineReducers
} from 'redux'
import googleCalendar from './googleCalendarReducer.js'
import timetable from './timetableReducer.js';
import classHour from './classHourReducer.js'

const reducer = combineReducers({
    timetable,
    googleCalendar,
    classHour
})
export default reducer;
