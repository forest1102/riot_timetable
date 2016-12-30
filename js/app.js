/*global riot $*/
// Compile all tags
// Mount all Riot tags.
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

const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

var store = new Store();
RiotControl.addStore(store);
riot.mount('*');
RiotControl.trigger('init');
// My app routes
var
    Route = riot.router.Route,
    DefaultRoute = riot.router.DefaultRoute,
    NotFoundRoute = riot.router.NotFoundRoute,
    RedirectRoute = riot.router.RedirectRoute;
riot.router.routes([
    new Route({
        tag: 'day',
        updatable: true,
    }).routes([
        new RedirectRoute({
            from: '',
            to: '/Mon'
        }),
        new Route({
            path: '/:date',
            tag: 'time-table',
            updatable: true
        })
    ]),
    new Route({
        tag: 'week'
    }),
    new Route({
        tag: 'calendar'
    }),
    new Route({
        tag: 'setting'
    }),
    new RedirectRoute({
        from: '',
        to: 'day'
    }),
    new NotFoundRoute({
        tag: 'not-found'
    }),
]);

riot.router.start();
// console.log(WEEK);
