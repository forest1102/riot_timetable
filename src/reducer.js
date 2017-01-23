import {
    combineReducers
} from 'redux'

import {
    DATA_SAVE,
    INIT
} from './actions.js'
var defaultState = {
    timetable: []
}
for (var i = 0; i < 5; i++) {
    var obArr = [];
    for (var j = 0; j < 6; j++) {
        obArr.push({
            'teacher': ' ',
            'place': ' ',
            'subject': ' ',
            'day': WEEK[i],
            'index': j
        })
    }
    defaultState.timetable.push(obArr)
}

function timeTableReducer(state = defaultState, action) {
    switch (action.type) {
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