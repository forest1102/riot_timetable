const CLIENT_ID = '307000142363-e42nhiqersfrg8c28gjifson6vglo1as.apps.googleusercontent.com';
const CALENDAR_ID = 'primary';
const API_KEY = 'AIzaSyArAcDWq6wYaLtd7_-reEf0CbC0vLLPIgM';
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const fields = [
    'start', 'end', 'id', 'summary', 'description',
    'location', 'extendedProperties', 'recurrence',
    'recurringEventId', 'sequence'
].join(',')

export const promiseClientInit = () => (window.gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    'scope': SCOPES.join(' ')
}))

export const googleAuthSignIn = () => (gapi.auth2.getAuthInstance().signIn())
export const googleAuthSignOut = () => (gapi.auth2.getAuthInstance().signOut())
export const promiseCalendarEventsList = (options = {}) => (gapi.client.calendar.events.list({
    'calendarId': CALENDAR_ID,
    'fields': `items(${fields})`,
    ...options
}))

export const promiseInsertEvent = (options) => (
    gapi.client.calendar.events.insert({
        'calendarId': CALENDAR_ID,
        'fields': fields,
        ...options
    })
)

export const promisePatchEvent = (options) => (
    gapi.client.calendar.events.patch({
        'calendarId': CALENDAR_ID,
        'fields': fields,
        ...options
    })
)
