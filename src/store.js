// import GCALENDAR from './xugcal.js'
import riot from 'riot'
export function Store() {
    riot.observable(this); // Riot provides our event emitter.

    this.data = [];
    // this.gGCalendar;
    this.schedule = [];
    for (var i = 0; i < 5; i++) {
        var obArr = [];
        for (var j = 0; j < 6; j++) {
            obArr.push({
                'teacher': '',
                'place': '',
                'subject': ''
            })
        }
        this.data.push(obArr)
    }

    if (localStorage.data == null) {
        localStorage.setItem("data", JSON.stringify(this.data));
    } else {
        this.data = JSON.parse(localStorage.getItem("data"));
    }
    this.on('data_save', (newdata) => {
        this.data[WEEKtoINT[newdata.day]][newdata.index].subject = newdata.subject;
        this.data[WEEKtoINT[newdata.day]][newdata.index].teacher = newdata.teacher;
        this.data[WEEKtoINT[newdata.day]][newdata.index].place = newdata.place;
        // console.log(this.data);
        localStorage.setItem("data", JSON.stringify(this.data));
        this.trigger('data_changed', this.data)
    });
    this.on('init', () => {
        // console.log('hogehoge')
        this.trigger('data_changed', this.data);
    });
    // this.on('api-insert', (newData) => {
    // 
    // })
    // this.on('api-ready', () => {
    //         this.gGCalendar = new GCALENDAR(CALENDAR_ID);
    //         this.gGCalendar.show(new Date(), (resp) => {
    //             console.log(resp);
    //             this.trigger('schedule-changed', resp)
    //         })
    //     })
    // The store emits change events to any listening views, so that they may react and redraw themselves.

}