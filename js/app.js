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
const TAG=['day','week','calendar','setting'];
const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

var store = new Store();
RiotControl.addStore(store);
riot.mount('*');
RiotControl.trigger('init');
// My app routes
route.start(true);
// console.log(WEEK);
