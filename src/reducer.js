import {
    combineReducers
} from 'redux'

import {
    DATA_SAVE,
    INIT,
    ASYNC_SAVE,
    TIMETABLE_LOADED
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
        case DATA_SAVE:
            var dayIndex = WEEKtoINT[action.day]
            var newState = [
                ...state.timetable.slice(0, dayIndex), [...state.timetable[dayIndex].slice(0, action.index), {
                        ...state.timetable[dayIndex][action.index],
                        'subject': action.subject,
                        'teacher': action.teacher,
                        'place': action.place,
                        'day': action.day,
                        'index': action.index
                    },
                    ...state.timetable[dayIndex].slice(action.index + 1)
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

const reducer = combineReducers({
    timetable: timeTableReducer
})
export default reducer;