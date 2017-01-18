<time-table>
    <div class="ui one column stackable grid">
        <panel each={d,i in this.data} subject={d.subject} teacher={d.teacher} place={d.place} date={parent.date} i={i} class="column"></panel>
    </div>
    <script>
        this.date = opts.date;
        this.on('mount', () => {
            RiotControl.trigger('init');
            // console.log(opts.date);
            this.date = opts.date;
            //  console.log(this.date+'by time-table') this.update();
        })
        this.on('update', () => {
            this.date = opts.date;
            // console.log(opts.date);
        })
        RiotControl.on('data_changed', (newdata) => {
            // console.log(this.date);
            this.data = newdata[WEEKtoINT[opts.date]];
            // console.log(this.data);
            this.update();
        })
    </script>
</time-table>