<app>
    <modal></modal>
    <Header></Header>
    <!-- <div data-is={curTag} timetable={timetable} param={param}/> -->
    <div id="view"></div>
    <div id="animation"></div>
    <!--<navigation class="ui container app segment" />-->
    <!-- <route id="route"></route> -->
    <style scoped>
        /*#view {
            opacity: 0;
            transition: 0.5s;
        }
        
        .not-opacity {
            opacity: 1!important;
            transition: 0.5s;
        }*/
    </style>

    <script>
        import {timetableSelector} from '../select';
        import {taskLoad} from '../actions'
        this.curTag = '';
        this.param = [];
        this.on('before-mount', () => {
            this.dispatch(taskLoad())
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
            riot.update();
        })
        this.subscribe(timetableSelector)

        // obs.on('navigate-animation', () => {     // riot.route.stop();     console.log('animation!!')     this.animation = true; }); riot.route.start(true); riot.router.use((request, response, next) => { })
    </script>

</app>