<time-table>
    <panes class="ui one column stackable grid">
        <panel each={d,i in this.data} subject={d.subject} teacher={d.teacher} place={d.place} day={this.date} i={i} class="column"></panel>
    </panes>
    <script>
        this.date = opts.date;
        this.on('mount', () => {
            RiotControl.trigger('init');
            this.date=opts.date;
            // console.log(this.date+'by time-table')
            this.update();
        })
        this.on('update',()=>{
            // console.log('update');
        })
        RiotControl.on('data_changed',(newdata)=>{
            // console.log(this.date);
            this.data=newdata[WEEKtoINT[opts.date]];
            // console.log(this.data);
            this.update();
        })
    </script>
</time-table>
