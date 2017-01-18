import {
    combineReducers
} from 'redux'

import {
    DATA_SAVE,
    INIT
} from './actions.js'
var setDefaultState = () => {
    if (localStorage.timeTable == null) {
        var defaultState = []
        for (var i = 0; i < 5; i++) {
            var obArr = [];
            for (var j = 0; j < 6; j++) {
                obArr.push({
                    'teacher': '',
                    'place': '',
                    'subject': ''
                })
            }
            defaultState.push(obArr)
        }
        localStorage.setItem("timeTable", JSON.stringify(defaultState));
        return defaultState;
    } else {
        return JSON.parse(localStorage.getItem("timeTable"));
    }
}

function reducer(state = setDefaultState(), action) {
    switch (action.type) {
        case DATA_SAVE:
            var newState = [
                ...state.slice(0, action.day),
                ...state[action.day].slice(0, action.index),
                Object.assign({}, state[action.day][action.index], {
                    'subject': action.subject,
                    'teacher': action.teacher,
                    'place': action.place
                }),
                ...state[action.day].slice(action.index + 1),
                ...state.slice(action.day + 1)
            ]
            console.log(newState);
            localStorage.setItem("timeTable", JSON.stringify(newState));
            return newState;
        default:
            return state

    }
}

export default combineReducers({
    reducer: reducer
})