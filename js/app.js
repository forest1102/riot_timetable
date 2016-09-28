/*global riot $ localStorage*/
// Compile all tags
// Mount all Riot tags.
window.state=0;
window.STATES={
    MAIN:0,
    SETTING:1
};
riot.mount('*');
// $('.ui .item').on('click', function() {
//       $('.ui .item').removeClass('active');
//       $(this).addClass('active');
//   }); 
// My app routes
var
    Route = riot.router.Route,
    DefaultRoute = riot.router.DefaultRoute,
    NotFoundRoute = riot.router.NotFoundRoute,
    RedirectRoute = riot.router.RedirectRoute;

riot.router.routes([
    new DefaultRoute({
       tag:'home' 
    }),
    new Route({
        tag: 'hello'
    }),
    new Route({
        tag:'home'
    }),
    new RedirectRoute({
        from: '',
        to: 'home'
    }),
    new NotFoundRoute({
        tag: 'not-found'
    }),
]);

// Start routing
riot.router.start();