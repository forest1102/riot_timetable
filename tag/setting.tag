<setting>
    <!--<Header></Header>-->
    <button class="ui button" onclick={clear}>
        reset
    </button>
    <script>
        clear(e) {
            localStorage.removeItem('data');
            location.reload(true);
        }
    </script>
</setting>
