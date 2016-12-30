function Store() {
    riot.observable(this) // Riot provides our event emitter.

    this.data = [
        [{
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }],
        [{
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }],
        [{
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }],
        [{
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }],
        [{
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }, {
            subject: "",
            teacher: "",
            place: ""
        }]
    ];
    
    if(localStorage.data==null){
        localStorage.setItem("data", JSON.stringify(this.data));
    }
    else{
        this.data=JSON.parse(localStorage.getItem("data"))
    }
    this.on('data_save', (newdata) => {
        this.data[WEEKtoINT[newdata.day]][newdata.index].subject = newdata.subject;
        this.data[WEEKtoINT[newdata.day]][newdata.index].teacher = newdata.teacher;
        this.data[WEEKtoINT[newdata.day]][newdata.index].place = newdata.place;
        // console.log(this.data);
        localStorage.setItem("data", JSON.stringify(this.data));
        this.trigger('data_changed', this.data)
    })
    this.on('init', () => {
        // console.log('hogehoge')
        this.trigger('data_changed', this.data);
    })

    // The store emits change events to any listening views, so that they may react and redraw themselves.

}
