<setting>
    <!--<Header curtag="setting"></Header>-->
    <div class="ui container app segments">
        <div class="ui segment">
            <a onclick={clear}>reset</a>
        </div>
        <div class="ui segment">
            <button id="authorize-button" onclick={reqestSignIn}>Authorize</button>
        </div>
        <div class="ui segment">
            <button id="signout-button" onclick={reqestSignOut}>Sign Out</button>
        </div>
    </div>
    <script>
        import {reqestSignIn, reqestSignOut} from '../actions'
        this.authClick = (ev) => {
            // obs.trigger('handleAuth');
        }
        this.clear = (e) => {
            localStorage.removeItem('timetable');
            location.reload(true);
        }
        this.dispatchify({reqestSignOut, reqestSignIn})
    </script>
</setting>