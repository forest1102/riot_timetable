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
    <!-- <button onclick={insertEvent}>insert</button> -->
    <script>
        import {googleSignedInSelector, googleCalendarSelector, classHourSelector} from '../select'
        import {requestCalendarEvent, requestInsertCalendarEvent} from '../actions'
        this.schedules = [];
        this.num = 0;
        this.classHour = [{}]
        this.subscribe(googleCalendarSelector, (calendarEvents) => {
            console.log(calendarEvents);
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
        this.subscribe(classHourSelector, (classHour) => this.update({classHour}))
    </script>
</calendar>
