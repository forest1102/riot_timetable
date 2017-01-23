function checkAuth() {
    $(() => {
        riot.mount('*');
        // RiotControl.trigger('init');
        gapi.auth.authorize({
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, handleAuthResult);
        // My app routes
        route.start(true);
    })
}

obs.on('handleAuth', function() {
    gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: false
        },
        handleAuthResult);
    return false;
})

function handleAuthResult(authResult) {
    obs.trigger('auth-check', authResult && !authResult.error);
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        // RiotControl.trigger('api-ready');
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
    }
}