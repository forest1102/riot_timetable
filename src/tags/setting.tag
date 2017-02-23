<setting>
    <!--<Header curtag="setting"></Header>-->
    <div class="ui container app segments">
        <div class="ui segment">
            <a onclick={clear}>reset</a>
        </div>
        <div class="ui segment">
            <button id="authorize-button" onclick={requestSignIn}>Authorize</button>
        </div>
        <div class="ui segment">
            <button id="signout-button" onclick={requestSignOut}>Sign Out</button>
        </div>
    </div>
    <script>
        import {requestSignIn, requestSignOut} from '../actions'
        this.clear = (e) => {
            localStorage.removeItem('timetable');
            location.reload(true);
        }
        this.dispatchify({requestSignOut, requestSignIn})
    </script>
</setting>