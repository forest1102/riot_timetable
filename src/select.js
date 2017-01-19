import {
    createSelector
} from 'reselect'

export const timetableSelector = createSelector(
    (state) => state.timetable,
    (timetable) => {
        console.log('timetable updated!');
        return timetable
    }
)