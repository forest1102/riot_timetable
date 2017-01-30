<setting>
    <!--<Header curtag="setting"></Header>-->
    <div class="ui container app segments">
        <div class="ui segment">
            <a onclick={clear}>reset</a>
        </div>
        <div class="ui segment">
            <button id="authorize-button" onclick={SignIn}>Authorize</button>
        </div>
        <div class="ui segment">
            <button id="signout-button" onclick={SignOut}>Sign Out</button>
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
        this.SignIn = (ev) => {
            gapi.auth2.getAuthInstance().signIn();
        }
        this.SignOut = (ev) => {
            gapi.auth2.getAuthInstance().signIn();
        }
    </script>
</setting>