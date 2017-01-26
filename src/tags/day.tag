<day>
    <!--<Header curtag="day"></Header>-->
    <style scoped>
        .column {
            color: #000000;
        }

    </style>
    <div class="ui container app segment">
        <div class="ui top attached tabular menu">
            <a class={item:true, active: this.date==menu} data-tab="{menu}" href="{'#/day/'+menu}" each={menu,i in this.weeks}>
                {menu}
            </a>
        </div>
        <div class="ui container app segment">
            <div class="ui one column stackable grid">
                <panel each={d in this.timetableDay} subject={d.subject} teacher={d.teacher} place={d.place} date={d.day} i={d.index} class="column"></panel>
            </div>
        </div>
    </div>
    <script>
        // var sub = route.create();
        this.date = opts.param[0]
        this.weeks = WEEK;
        this.on('mount', () => {
            // console.log(a)
            this.date = opts.param[0];
            this.timetableDay = opts.timetable[WEEKtoINT[this.date]]
            console.log(this.timetableDay, 'by day.tag on mountEvent');
            this.update()
        })
    </script>
</day>