import {
    timetableSave,
    successTimetableLoaded
} from '../actions'

import {
    handleActions
} from 'redux-actions'

import {
    WEEKtoINT
} from '../constants'

const defaultTimetableState = {
    timetable: []
}

const timeTableReducer = handleActions({
    [successTimetableLoaded]: (state, {
        payload
    }) => ({
        ...state,
        timetable: payload
    }),
    [timetableSave]: (state, action) => {
        var {
            day,
            index,
            subject,
            teacher,
            place,
        } = action.payload;
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
        // console.log(newState, 'by reducer');
        // localStorage.setItem("timeTable", JSON.stringify(newState));
        return { ...state,
            timetable: newState
        }
    }
}, defaultTimetableState)

export default timeTableReducer