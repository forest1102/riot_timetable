<Header>
    <div class="ui secondary inverted teal menu">
        <a class={item: true, active: menu.url.substring(1) === riot.router.current.uri} 
            href="{menu.url}" 
            each={menu in this.leftMenus}>
            <i class="{menu.icon} icon" if={menu.icon}></i>{menu.text}</a>
        <div class="right menu" if={this.rightMenus.length}>
          <a class={item: true, active: menu.url.substring(1) === riot.router.current.uri} 
            href="{menu.url}" 
            each={menu in this.rightMenus}>
              <i class="{menu.icon} icon" if={menu.icon}></i>{menu.text}</a>
        </div>
    </div>
    createLeftMenus() {
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
      }
    createRightMenus() {
        return [
          {url: '#/setting', icon: 'setting'},
        ];
      }
    createMenus() {
        this.leftMenus  = this.createLeftMenus();
        this.rightMenus = this.createRightMenus();
    }
    // On route update, update this fragment.
    riot.router.on('route:updated', ()=>{
        this.createMenus();
        this.update();
    });
</Header>