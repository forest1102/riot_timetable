<modal>
    <div class="ui modal">
        <div class="actions">
            <div class="ui deny icon button" onclick={cancel}>
                <i class="remove icon"></i>
            </div>
        </div>
        <form action="" class="ui form" name="myform">
            <div class="field">
                <label>教科名</label>
                <input type="text" placeholder="subject" name="subject">
            </div>
            <div class="field">
                <label>教師名</label>
                <input type="text" placeholder="Teacher's name" name="teacher">
            </div>
            <div class="field">
                <label>場所</label>
                <input type="text" placeholder="place" name="place">
            </div>
            <div class="field">
                <button class="ui positive button" type="submit">
                    SAVE
                </button>
            </div>
        </form>
    </div>
    <script>
        var sub = riot.route.create();
        obs.on('modal-on', (i, day) => {
            this.day = day;
            this.index = i;
            $('.ui.modal').modal('show');
        })
        cancel(e){
            this.myform.reset();
        }
        this.on('mount', () => {
            $('.ui.form').submit(() => {
                $('.ui.modal').modal('hide');
                if (this.subject.value.length 
                || this.teacher.value.length 
                || this.place.value.length) {
                    RiotControl.trigger('data_save', {
                        index: this.index,
                        day: this.day,
                        subject: this.subject.value,
                        teacher: this.teacher.value,
                        place: this.place.value,
                    })
                    return true;
                }
                else{
                    return false;
                }
            })
        })
    </script>
</modal>
