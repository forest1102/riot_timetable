export const DATA_SAVE = 'DATA_SAVE'
export const INIT = 'INIT'
window.TAG = ['day', 'week', 'calendar', 'setting'];
window.WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
window.WEEKtoINT = {
    'Mon': 0,
    'Tue': 1,
    'Wed': 2,
    'Thu': 3,
    'Fri': 4
};
export function dataSave(data) {
    return {
        type: DATA_SAVE,
        ...data
    }
}