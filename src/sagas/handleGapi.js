const CLIENT_ID = '307000142363-e42nhiqersfrg8c28gjifson6vglo1as.apps.googleusercontent.com';
const CALENDAR_ID = 'primary';
const API_KEY = 'AIzaSyArAcDWq6wYaLtd7_-reEf0CbC0vLLPIgM';
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const fields = [
    'start', 'end', 'id', 'summary', 'description',
    'location', 'extendedProperties', 'recurrence',
    'recurringEventId'
].join(',')
// console.log(localStorage);
export const loadGapi = () => (new Promise(function(resolve, reject) {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            'scope': SCOPES.join(' '),
        }).then(
            () => {
                // Listen for sign-in state changes.
                // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
                // Handle the initial sign-in state.
                // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                resolve(gapi.auth2.getAuthInstance().isSignedIn.get());
            },
            () => {
                reject()
            });
    })
}))

export const googleAuthSignIn = () => (gapi.auth2.getAuthInstance().signIn())
export const googleAuthSignOut = () => (gapi.auth2.getAuthInstance().signOut())
export const promiseCalendarEventsList = (options = {
    'timeMin': (new Date()).toISOString()
}) => (gapi.client.calendar.events.list({
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