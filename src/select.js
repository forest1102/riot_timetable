import {
    createSelector
} from 'reselect'

export const timetableSelector = createSelector(
    (state) => state.timetable.timetable,
    (timetable) => {
        // console.log(timetable)
        return {
            timetable: timetable
        }
    }
)