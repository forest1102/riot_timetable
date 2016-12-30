<panel>
    <div class="ui celled equal width padded grid button white" onclick={click}>
        <div class="row">
            <div class="column">{opts.subject}</div>
        </div>
        <div class="row">
            <div class="column">{opts.teacher}</div>
            <div class="column">{opts.place}</div>
            <!--<div class="column">{opts.day}</div>-->
        </div>
    </div>
    <style scoped>
        .column{
            height:3em;
            /*opacity:0.1;*/
        }
    </style>
    <script>
        click(e) {
            obs.trigger('modal-on', opts.i,opts.day);
        }
    </script>
</panel>
