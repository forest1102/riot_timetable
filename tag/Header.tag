<Header class="ui teal inverted top app secondary menu">
  <div class="ui container">
    <a class={item: true, active: this.tagName==menu.tag} href="{menu.href}" each={menu in this.leftMenus} onclick={parent.clicked}>
      <i class="{menu.icon} icon" if={menu.icon}></i>
    </a>
    <div class="right menu" if={this.rightMenus.length}>
      <a class={item: true, active: this.tagName==menu.tag} href="{menu.href}" onclick={menu.clicked} each={menu in this.rightMenus}>
        <i class="{menu.icon} icon" if={menu.icon}></i>
      </a>
    </div>
    <!--<a class="ui button item" onclick={clear}>-->
    <!--    clear-->
    <!--</a>-->
  </div>
  <script>
    this.on('mount',()=>{
      this.tagName = opts.curtag;
      this.createMenus();
      // console.log(cur)
      this.update()
    })
    clicked(e) {
      // obs.trigger('animation-start');
      return true;
    };
    createLeftMenus() {
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
        clicked: (e) => {
          return true;
        }
      }];
    }
    createRightMenus() {
      return [{
        tag: 'setting',
        href: '#/setting',
        icon: 'settings',
        clicked: (e) => {
          obs.trigger('navigate-animation');
          return true;
        }
      }]
    }
    createMenus() {
        // console.log('aaa');
        this.leftMenus = this.createLeftMenus();
        this.rightMenus = this.createRightMenus();
      }
      // On route update, update this fragment.
  </script>
</Header>
