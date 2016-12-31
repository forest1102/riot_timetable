<setting>
    <!--<Header curtag="setting"></Header>-->
    <div class="ui container app segment">
        <button class="ui button" onclick={clear}>
        reset
        </button>
    </div>
    <div id="authorize-div" style="display: inline">
        <span>Authorize access to Google Calendar API</span>
        <!--Button for the user to click to initiate auth sequence -->
        <button class="ui button" id="authorize-button" onclick="handleAuthClick(event)">
        Authorize
      </button>
    </div>
    <script>
        clear(e) {
            localStorage.removeItem('data');
            location.reload(true);
        }
    </script>
</setting>
