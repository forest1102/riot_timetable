<time-table>
    <div class="ui one column stackable grid">
        <panel each={d,i in this.data} subject={d.subject} teacher={d.teacher} place={d.place} date={parent.date} i={i} class="column"></panel>
    </div>
    <script>
        this.date = opts.date;
        this.data = [{}];
        this.on('mount', () => {
            // RiotControl.trigger('init'); console.log(opts);
            this.date = opts.date;
            this.data = opts.timetable[WEEKtoINT[this.date]]
            console.log(this.data, 'by time-table.tag on mount');
            this.update();
            // this.update()  console.log(this.date+'by time-table') this.update();
        })
        this.on('update', () => {
            // RiotControl.trigger('init'); console.log(opts.timetable);
            this.date = opts.date;
            this.data = [...opts.timetable[WEEKtoINT[this.date]]]
            console.log(this.data, 'by time-table.tag on update');
            // this.data = opts.timetable[WEEKtoINT[this.date]] console.log(opts);
        })
        // RiotControl.on('data_changed', (newdata) => {     // console.log(this.date);     this.data = newdata[WEEKtoINT[this.date]];     // console.log(this.data); this.update(); })
    </script>
</time-table>