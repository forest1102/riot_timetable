<setting>
    <!--<Header curtag="setting"></Header>-->
    <div class="ui container app segments">
        <div class="ui segment">
            <a onclick={clear}>reset</a>
        </div>
        <div class="ui segment">
            <a id="authorize-button" onclick="handleAuthClick(event)">
                Authorize access to Google Calendar API
            </a>
        </div>
    </div>
    <script>
        clear(e) {
            localStorage.removeItem('data');
            location.reload(true);
        }
    </script>
</setting>