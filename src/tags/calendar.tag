<calendar>
    <!--<Header curtag="calendar"></Header>-->
    <div class="ui container app segment">
        <h1>Upcoming events:</h1>
        <ul>
            <li each={event in calendarEvents}>
                {event.summary} {'('+parent.dispWhen(event.start)+')'}
            </li>
        </ul>
    </div>
    <button onclick={insertEvent}>insert</button>
    <script>
        import {googleSignedInSelector, googleCalendarSelector} from '../select'
        import {reqestCalendarEvent, reqestInsertCalendarEvent} from '../actions'
        this.subscribe(googleSignedInSelector, (isSignedIn) => {
            if (isSignedIn) {
                this.dispatch(reqestCalendarEvent())
            }
            // console.log(`sign in status: ${isSignedIn}`);
            this.update({isSignedIn})
        })
        this.subscribe(googleCalendarSelector, (calendarEvents) => {
            // console.log(calendarEvents);
            this.update({calendarEvents})
        })
        this.dispWhen = (when) => {
            return (when.dateTime)
                ? when.dateTime
                : when.date
        }
        this.schedule = [];
        this.insertEvent = () => {
            var d = new Date();
            this.dispatch(reqestInsertCalendarEvent({
                'summary': 'honyarara',
                'start': {
                    'dateTime': d.toISOString()
                },
                'end': {
                    'dateTime': (new Date(d.setHours(d.getHours() + 2))).toISOString()
                }
            }))
        }
    </script>
</calendar>