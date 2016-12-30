<app class="app">
    <modal></modal>
    <Header curtag={this.cur}></Header>
    <route class="ui container app segment not-opacity" id="view" />
    <!--<navigation class="ui container app segment" />-->
    <div class="modal-mount"></div>
    <style scoped>
        /*#view {*/
        /*    opacity: 0;*/
        /*    transition: 0.5s;*/
        /*}*/
        
        /*.not-opacity {*/
        /*    opacity: 1!important;*/
        /*    transition: 0.5s;*/
        /*}*/
    </style>

    <script>
        riot.router.on('route:updated', (data) => {
            this.cur = data.matches[1].tag;
            riot.update();
        })
        this.on('updated', function(e) {
            // var target = document.getElementById('view');
            // if (target != null) {
            //     setTimeout(function() {
            //         target.classList.add('not-opacity');
            //     }, 500);
            // }
        });
        // console.log(riot.router.use)
        obs.on('animation-start', () => {
            // riot.route.stop();

        })

        

        riot.router.use((request, response, next) => {
            
        })
    </script>

</app>
