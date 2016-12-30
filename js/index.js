riot.tag2('app', '<modal></modal> <header curtag="{this.cur}"></Header> <route class="ui container app segment not-opacity" id="view"></route> <div class="modal-mount"></div>', '', 'class="app"', function(opts) {
        riot.router.on('route:updated', (data) => {
            this.cur = data.matches[1].tag;
            riot.update();
        })
        this.on('updated', function(e) {

        });

        obs.on('animation-start', () => {

        })

        riot.router.use((request, response, next) => {

        })
});

riot.tag2('calendar', '', '', '', function(opts) {
        this.submit = function(e){

        }.bind(this)
});
riot.tag2('day', '<div class="ui top attached tabular menu"> <a class="{item:true, active: this.date==menu}" data-tab="{menu}" href="{\'#/day/\'+menu}" each="{menu,i in this.weeks}"> {menu} </a> </div> <route class="ui container app segment"></route>', 'day .column,[riot-tag="day"] .column,[data-is="day"] .column{ color: #000000; }', '', function(opts) {
        var sub = riot.route.create();
        this.weeks = WEEK;
        this.on('mount',()=>{
            this.date=riot.router.current.uri.split('/')[2];
            this.update();

        })
        obs.on('dataChanged', function (data) {
            var text = '';
        })
        sub('day/*', (date) => {
            this.date = date;
            this.update();
        })
});

riot.tag2('header', '<div class="ui container"> <a class="{item: true, active: this.tagName==menu.tag}" href="{menu.href}" each="{menu in this.leftMenus}" onclick="{parent.clicked}"> <i class="{menu.icon} icon" if="{menu.icon}"></i> </a> <div class="right menu" if="{this.rightMenus.length}"> <a class="{item: true, active: this.tagName==menu.tag}" href="{menu.href}" onclick="{menu.clicked}" each="{menu in this.rightMenus}"> <i class="{menu.icon} icon" if="{menu.icon}"></i> </a> </div> </div>', '', 'class="ui teal inverted top app secondary menu"', function(opts) {


    this.on('update', () => {
      this.createMenus();

      this.tagName = opts.curtag;

    });
    this.clicked = function(e){

      return true;
    }.bind(this);
    this.createLeftMenus = function() {
      return [{
        tag: 'day',
        href: '#/day',
        icon: 'block layout'
      }, {
        tag: 'week',
        href: '#/week',
        icon: 'grid layout'
      }, {
        tag: 'calendar',
        href: '#/calendar',
        icon: 'calendar',
        clicked:(e)=>{
          return true;
        }
      }];
    }.bind(this)
    this.createRightMenus = function() {
      return [{
        tag: 'setting',
        href: '#/setting',
        icon: 'settings',
        clicked:(e)=>{
          console.log(('setting selected!'))
          return true;
        }
      }]
    }.bind(this)
    this.createMenus = function() {

        this.leftMenus = this.createLeftMenus();
        this.rightMenus = this.createRightMenus();
      }.bind(this)

});

riot.tag2('modal', '<div class="ui modal"> <div class="actions"> <div class="ui deny icon button" onclick="{cancel}"> <i class="remove icon"></i> </div> </div> <form action="" class="ui form" name="myform"> <div class="field"> <label>教科名</label> <input type="text" placeholder="subject" name="subject"> </div> <div class="field"> <label>教師名</label> <input type="text" placeholder="Teacher\'s name" name="teacher"> </div> <div class="field"> <label>場所</label> <input type="text" placeholder="place" name="place"> </div> <div class="field"> <button class="ui positive button" type="submit"> SAVE </button> </div> </form> </div>', '', '', function(opts) {
        var sub = riot.route.create();
        obs.on('modal-on', (i, day) => {
            this.day = day;
            this.index = i;
            $('.ui.modal').modal('show');
        })
        this.cancel = function(e){
            this.myform.reset();
        }.bind(this)
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
});

riot.tag2('navigation', '<form action="" class="ui form" name="myform"> <div class="field"> <label>教科名</label> <input type="text" placeholder="subject" name="subject"> </div> <div class="field"> <label>教師名</label> <input type="text" placeholder="Teacher\'s name" name="teacher"> </div> <div class="field"> <label>場所</label> <input type="text" placeholder="place" name="place"> </div> <div class="field"> <button class="ui positive button" type="submit"> SAVE </button> </div> </form>', '', '', function(opts) {
        this.on('mount', () => {
            $('.ui.form').submit(() => {
                $('.ui.modal').modal('hide');
                if (this.subject.value.length ||
                    this.teacher.value.length ||
                    this.place.value.length) {
                    RiotControl.trigger('data_save', {
                        index: this.index,
                        day: this.day,
                        subject: this.subject.value,
                        teacher: this.teacher.value,
                        place: this.place.value,
                    })
                    return true;
                }
                else {
                    return false;
                }
            })
        })
});

riot.tag2('not-found', '<h1>Not Found</h1> <div id="error">error</div>', '', '', function(opts) {
});
riot.tag2('panel', '<div class="ui celled equal width padded grid button white" onclick="{click}"> <div class="row"> <div class="column">{opts.subject}</div> </div> <div class="row"> <div class="column">{opts.teacher}</div> <div class="column">{opts.place}</div> </div> </div>', 'panel .column,[riot-tag="panel"] .column,[data-is="panel"] .column{ height:3em; }', '', function(opts) {
        this.click = function(e) {
            obs.trigger('modal-on', opts.i,opts.day);
        }.bind(this)
});

riot.tag2('setting', '<button class="ui button" onclick="{clear}"> reset </button>', '', '', function(opts) {
        this.clear = function(e) {
            localStorage.removeItem('data');
            location.reload(true);
        }.bind(this)
});

riot.tag2('time-table', '<panes class="ui one column stackable grid"> <panel each="{d,i in this.data}" subject="{d.subject}" teacher="{d.teacher}" place="{d.place}" day="{this.date}" i="{i}" class="column"></panel> </panes>', '', '', function(opts) {
        this.date = opts.date;
        this.on('mount', () => {
            RiotControl.trigger('init');
            this.update();
        })
        this.on('update',()=>{

        })
        RiotControl.on('data_changed',(newdata)=>{

            this.data=newdata[WEEKtoINT[opts.date]];

            this.update();
        })
});

riot.tag2('week', '<table class="ui unstackable celled definition table"> <thead> <tr> <th></th> <th>Mon.</th> <th>Tue.</th> <th>Wed.</th> <th>Thur.</th> <th>Fri.</th> </tr> </thead> <tbody> </tbody> </table>', '', '', function(opts) {
    this.on('mount', () => {
      RiotControl.trigger('init');
    });
    this.on('unmount',()=>{

    })
    RiotControl.on('data_changed',(newdata)=>{

      this.data=newdata;
      var datalen=this.data.length,
      arylen=this.data[0].length;
      var $tbody=$('tbody',this.root),
          text='';
      for (var i = 0; i < arylen; i++) {
        text+=`<tr><td>${i+1}</td>`;
        for (var j = 0; j < datalen; j++) {
          text+=`<td>${this.data[j][i].subject}</br>
                    ${this.data[j][i].place}</br></td>`;
        }
        text+='</tr>';
      }
      $tbody.append(text);
      this.update();
    })
});