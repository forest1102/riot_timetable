<setting>
    <Header curtag="setting"></Header>
    <div class="ui container app segment">
        <button class="ui button" onclick={clear}>
        reset
        </button>
    </div>
    <script>
        clear(e) {
            localStorage.removeItem('data');
            location.reload(true);
        }
    </script>
</setting>
