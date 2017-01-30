const CLIENT_ID = '307000142363-e42nhiqersfrg8c28gjifson6vglo1as.apps.googleusercontent.com';
const CALENDAR_ID = 'primary';
const API_KEY = 'AIzaSyArAcDWq6wYaLtd7_-reEf0CbC0vLLPIgM';
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

export function handleClientLoad() {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            'scope': SCOPES.join(' '),
        }).then(function() {
            console.log('gapi was initialized');
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    })
}

function updateSigninStatus(isSignedIn) {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    if (isSignedIn) {
        makeApiCall();
    }
}

function makeApiCall() {
    gapi.client.calendar.events.list({
        'calendarId': CALENDAR_ID,
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function(resp) {
        console.log(resp);
        var events = resp.result.items,
            len = events.length;
        console.log('Upcoming events:');

        if (events.length > 0) {
            for (var i = 0; i < len; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                console.log(event.summary + ' (' + when + ')')
            }
        }

    }, (reason) => {
        console.log('Error: ' + reason.result.error.message);
    })
}