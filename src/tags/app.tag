import {timetableSelector} from '../select'
<app>
    <modal></modal>
    <Header></Header>
    <route1 class="not-opacity" id="view"/>
    <div id="animation"></div>
    <!--<navigation class="ui container app segment" />-->
    <route id="route"></route>
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
        // this.curTag = ''; this.param = [];
        var r = route.create();
        r('', () => {
            r('day/Mon')
        })
        r('/day', () => {
            r('day/Mon')
            // riot.update();
        })
        r((cur, ...param) => {
            var curTag = ($.inArray(cur, TAG) >= 0)
                ? cur
                : 'not-found';
            // console.log('url changed!')
            riot.mount('#view', curTag, {param: param})
            this.update();
        })
        this.on('updated', function (e) {});
        this.subscribe(() => {
            console.log('timetable updated!');
        })
        // obs.on('navigate-animation', () => {     // riot.route.stop();     console.log('animation!!')     this.animation = true; }); riot.route.start(true); riot.router.use((request, response, next) => { })
    </script>

</app>