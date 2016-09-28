riot.tag2('app', '<header></Header> <route class="ui container app content"></route>', '', 'class="app"', function(opts) {
});
riot.tag2('header', '<div class="ui secondary inverted teal menu"> <a class="{item: true, active: menu.url.substring(1) === riot.router.current.uri}" href="{menu.url}" each="{menu in this.leftMenus}"> <i class="{menu.icon} icon" if="{menu.icon}"></i>{menu.text}</a> <div class="right menu" if="{this.rightMenus.length}"> <a class="{item: true, active: menu.url.substring(1) === riot.router.current.uri}" href="{menu.url}" each="{menu in this.rightMenus}"> <i class="{menu.icon} icon" if="{menu.icon}"></i>{menu.text}</a> </div> </div>', '', '', function(opts) {
    this.createLeftMenus = function() {
        switch(window.state){
            case window.STATES.MAIN:
                return [
                  {url: '#/home',  icon: 'block layout'},
                  {url: '#/hello', icon:'grid layout'},
                  {url: '#/404' ,  icon:'calendar'},

                ];
            break;
            case window.STATES.SETTING:
                return [

                ]
            break;
        }
      }.bind(this)
    this.createRightMenus = function() {
        return [
          {url: '#/setting', icon: 'setting'},
        ];
      }.bind(this)
    this.createMenus = function() {
        this.leftMenus  = this.createLeftMenus();
        this.rightMenus = this.createRightMenus();
    }.bind(this)

    riot.router.on('route:updated', ()=>{
        this.createMenus();
        this.update();
    });
});
riot.tag2('hello', '<h1>hello</h1> <div>hello world</div>', '', '', function(opts) {
});
riot.tag2('home', '<h1>Home Now</h1> <div>This is home.</div>', '', '', function(opts) {
});
riot.tag2('not-found', '<h1>Not Found</h1> <div id="error">error</div>', '', '', function(opts) {
});