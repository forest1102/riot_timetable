import {
    combineReducers
} from 'redux'

import {
    DATA_SAVE,
    INIT,
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

const reducer = combineReducers({
    timetable: timeTableReducer
})
export default reducer;