/*global riot $ RiotControl route*/
// Compile all tags
// Mount all Riot tags.
const TAG = ['day', 'week', 'calendar', 'setting'];
const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const CLIENT_ID = '455128849558-p20c7pm33dkc4oneirb7cbja8pltp6di.apps.googleusercontent.com';
const CALENDAR_ID = 's1510285@ysh.ed.jp';
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
var obs = riot.observable(),
    range = 6;
window.state = 0;
window.STATES = {
    MAIN: 0,
    SETTING: 1
};

const WEEKtoINT = {
    'Mon': 0,
    'Tue': 1,
    'Wed': 2,
    'Thu': 3,
    'Fri': 4
};
var store = new Store();
// var gGCalendar = new GCALENDAR(CALENDAR_ID);
RiotControl.addStore(store);
/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
    $(() => {
        riot.mount('*');
        RiotControl.trigger('init');
        gapi.auth.authorize({
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, handleAuthResult);
        // My app routes
        route.start(true);
    })
}

function handleAuthClick(event) {
    gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: false
        },
        handleAuthResult);
    return false;
}

function handleAuthResult(authResult) {
    obs.trigger('auth-check', authResult && !authResult.error);
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        RiotControl.trigger('api-ready');
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
    }
}