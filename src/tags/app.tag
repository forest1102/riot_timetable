<app>
    <modal></modal>

    <Header activetag={this.curTag}></Header>

    <div id="view"></div>

    <script>
        import route from 'riot-route';
        import {TAG} from '../constants'
        import {timetableSelector} from '../select';
        import {requestTimetableLoad} from '../actions'
        this.curTag = '';
        this.param = [];
        this.on('before-mount', () => {
            this.dispatch(requestTimetableLoad())
        })
        this.on('update', () => {
            riot.mount('#view', this.curTag, {
                timetable: this.timetable,
                param: this.param
            })
            // riot.update();
        })
        var r = route.create();
        r('', () => {
            r('day/Mon')
        })
        r('/day', () => {
            r('day/Mon')
            // riot.update();
        })
        r((cur, ...param) => {
            this.curTag = ($.inArray(cur, TAG) >= 0)
                ? cur
                : 'not-found';
            // console.log('url changed!')
            this.param = param;
            riot.mount('#view', this.curTag, {
                timetable: this.timetable,
                param: this.param
            })
            this.update();
        })
        this.subscribe(timetableSelector)
    </script>

</app>