import {dataSave} from '../actions'
<modal>
    <div class="ui modal">
        <div class="actions">
            <div class="ui deny icon button" onclick={cancel}>
                <i class="remove icon"></i>
            </div>
        </div>
        <form action="" class="ui form" ref="myform" onsubmit={submit}>
            <div class="field">
                <label>教科名</label>
                <input type="text" placeholder="subject" ref="subject">
            </div>
            <div class="field">
                <label>教師名</label>
                <input type="text" placeholder="Teacher's name" ref="teacher">
            </div>
            <div class="field">
                <label>場所</label>
                <input type="text" placeholder="place" ref="place">
            </div>
            <div class="field">
                <button class="ui positive button" type="submit" href="">
                    SAVE
                </button>
            </div>
        </form>
    </div>
    <script>
        var sub = route.create();
        this.day = '';
        obs.on('modal-on', (i, day) => {
            this.day = day;
            this.index = i;
            $('.ui.modal').modal('show');
        })
        this.cancel = (e) => {
            // this.refs.myform.reset();
        }
        this.submit = (e) => {
            console.log(this.day);
            let data = {
                index: this.index,
                day: this.day,
                subject: this.refs.subject.value,
                teacher: this.refs.teacher.value,
                place: this.refs.place.value
            }
            RiotControl.trigger('data_save', data)
            data.day = WEEKtoINT[this.day];
            this.dispatch(dataSave(data))
            this.refs.myform.reset();
            riot.update();
            $('.ui.modal').modal('hide');
            return true;
        }
        this.dispatchify({dataSave})
    </script>
</modal>