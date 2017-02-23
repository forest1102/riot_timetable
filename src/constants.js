import observable from 'riot-observable'

export const obs = observable()
export const TAG = ['day', 'week', 'calendar', 'setting'];
export const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const WEEKtoINT = {
    'Mon': 0,
    'Tue': 1,
    'Wed': 2,
    'Thu': 3,
    'Fri': 4
};