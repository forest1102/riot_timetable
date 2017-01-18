<calendar>
    <!--<Header curtag="calendar"></Header>-->
    <div class="ui container app segment">
        <ul>
            <li each={s in this.schedule}>{s.summary}</li>
        </ul>
    </div>

    <script>
        this.schedule = [];
        this.on('mount', () => {
            // RiotControl.trigger('api-ready');
        })
        // RiotControl.on('schedule-changed', (resp) => {     this.schedule = resp.items;     this.update(); })
    </script>
</calendar>