<day>
    <style scoped>
        .column {
            color: #000000;
        }
    </style>
    
    <div class="ui top attached tabular menu">
        <a class={item:true, active: this.date==menu} data-tab="{menu}" href="{'#/day/'+menu}" each={menu,i in this.weeks}>
            {menu}
        </a>
    </div>
    <route class="ui container app segment"/>
    <script>
        var sub = riot.route.create();
        this.weeks = WEEK;
        this.on('mount',()=>{
            this.date=riot.router.current.uri.split('/')[2];
            this.update();
            // console.log('day mounted!');
        })
        obs.on('dataChanged', function (data) {
            var text = '';
        })
        sub('day/*', (date) => {
            this.date = date;
            this.update();
        })
    </script>
</day>
