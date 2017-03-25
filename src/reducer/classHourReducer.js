import {
    handleActions
} from 'redux-actions'
import {
    saveClassHour
} from '../actions'
const reducer = handleActions({
    [saveClassHour]: (state, action) => state
}, [{
        'start': [8, 50],
        'end': [9, 35]
    },
    {
        'start': [9, 45],
        'end': [10, 30]
    },
    {
        'start': [10, 40],
        'end': [11, 25]
    },
    {
        'start': [11, 35],
        'end': [12, 20]
    },
    {
        'start': [13, 10],
        'end': [13, 55]
    },
    {
        'start': [14, 5],
        'end': [14, 50]
    },
    {
        'start': [14, 50],
        'end': [15, 10]
    },
])
export default reducer
