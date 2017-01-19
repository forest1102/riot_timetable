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
            'teacher': '',
            'place': '',
            'subject': ''
        })
    }
    defaultState.timetable.push(obArr)
}

function timeTables(state = defaultState, action) {
    switch (action.type) {
        case DATA_SAVE:
            var newState = [
                ...state.timetable.slice(0, action.day), [...state.timetable[action.day].slice(0, action.index), {
                        ...state.timetable[action.day][action.index],
                        'subject': action.subject,
                        'teacher': action.teacher,
                        'place': action.place
                    },
                    ...state.timetable[action.day].slice(action.index + 1)
                ],

                ...state.timetable.slice(action.day + 1)
            ]
            console.log(state);
            // localStorage.setItem("timeTable", JSON.stringify(newState));
            return newState;
        default:
            return state

    }
}

const reducer = combineReducers({
    timeTables
})
export default reducer;