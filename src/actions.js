export const DATA_SAVE = 'DATA_SAVE'
export const INIT = 'INIT'

export function dataSave(data) {
    return {
        type: DATA_SAVE,
        ...data
    }
}