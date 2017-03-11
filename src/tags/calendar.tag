<calendar>
    <!--<Header curtag="calendar"></Header>-->
    <div class="ui container app segment">
        <h1>Upcoming events:</h1>
        <ul>
            <li each={schedule in schedules}>
                {schedule.summary} {'('+schedule.when+')'}
            </li>
        </ul>
    </div>
    <button onclick={insertEvent}>insert</button>
    <script>
        import {googleSignedInSelector, googleCalendarSelector} from '../select'
        import {requestCalendarEvent, requestInsertCalendarEvent} from '../actions'
        this.schedules = [];
        this.num = 0;
        this.subscribe(googleSignedInSelector, (isSignedIn) => {
            if (isSignedIn) {
                this.dispatch(requestCalendarEvent())
            }
            // console.log(`sign in status: ${isSignedIn}`);
            this.update({isSignedIn})
        })
        this.subscribe(googleCalendarSelector, (calendarEvents) => {
            // console.log(calendarEvents);
            var schedules = [];
            for (const event of calendarEvents) {
                schedules.push({
                    summary: event.summary,
                    when: (event.start.dateTime)
                        ? event.start.dateTime
                        : event.start.date
                })
            }
            this.update({schedules})
        })
        this.insertEvent = () => {
            var d = new Date();
            this.dispatch(requestInsertCalendarEvent({
                'summary': 'honyarara',
                'start': {
                    'dateTime': d.toISOString()
                },
                'end': {
                    'dateTime': (new Date(d.setHours(d.getHours() + 2))).toISOString()
                },
                'extendedProperties': {
                    'shared': {
                        'hogehoge': this.num++
                    }
                }
            }))
        }
    </script>
</calendar>
