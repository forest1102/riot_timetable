<day>
    <Header curtag="day"></Header>
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
        <time-table class="ui container app segment" date={this.date}/>
    </div>
    <script>
        var sub = riot.route.create();
        this.weeks = WEEK;
        this.on('update', () => {
            // console.log(opts.param[0])
            this.date = opts.param[0];
            this.update()
        })
        obs.on('dataChanged', function(data) {
            var text = '';
        })
    </script>
</day>
