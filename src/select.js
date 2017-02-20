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

export const googleSignedInSelector = createSelector(
    (state) => state.googleCalendar.isSignedIn,
    (isSignedIn) => (isSignedIn)
)

export const googleCalendarSelector = createSelector(
    (state) => state.googleCalendar.calendarEvents,
    (calendarEvents) => (calendarEvents)
)