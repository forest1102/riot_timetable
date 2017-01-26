<setting>
    <!--<Header curtag="setting"></Header>-->
    <div class="ui container app segments">
        <div class="ui segment">
            <a onclick={clear}>reset</a>
        </div>
        <div class="ui segment">
            <a id="authorize-button" onclick={authClick}>
                Authorize access to Google Calendar API
            </a>
        </div>
    </div>
    <script>
        this.authClick = (ev) => {
            // obs.trigger('handleAuth');
        }
        this.clear = (e) => {
            localStorage.removeItem('timetable');
            location.reload(true);
        }
    </script>
</setting>