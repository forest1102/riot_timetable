export const DATA_SAVE = 'DATA_SAVE'
export const INIT = 'INIT'

export function dataSave(index, day, subject, teacher, place) {
    return {
        type: DATA_SAVE,
        index: index,
        day: WEEKtoINT[day],
        subject: subject,
        teacher: teacher,
        place: place
    }
}