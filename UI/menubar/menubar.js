/* exported $menubar*/
(function(){
  window.Menubar = Menubar;
  function Menubar(menuData){
    this.$menudom = $('<div class="notepad-menubar"></div>');
    this.menus = [];
    this.pull = -1;
    this.menuData=menuData;
    this.$titlesList=null;
    this.show();
  }
  Menubar.prototype.createMenuTitle = function(){
    var that=this;
    var $titles = $('<ul class="menu-title"></ul>');
    for(var i=0; i<this.menuData.length; i++) {
      var $title = $('<li class="title"></li>');
      $title.html(this.menuData[i].title);
      $titles.append($title);
    }
    this.createMenus();
    this.$titlesList = $titles.find("li");
    this.$titlesList.click(function(e){
      that.clickevent(e,$(this).index());
    })
    this.$titlesList.hover(function(e){
      that.hoverevent($(this).index());
    })
    this.$menudom.append($titles);
  }
  Menubar.prototype.clickevent= function(e,index){
    var i = index;
    var that=this
    if(this.pull === -1) {
      this.menus[i].css({ display: 'inline-block' });
      this.pull = i;
    } else if(this.pull !== i) {
      this.menus[this.pull].css({ display: 'none' });
      this.menus[i].css({ display: 'inline-block' });
      this.pull = i;
    }
    else {
      this.menus[this.pull].css({ display: 'none' });
      this.pull = -1;
    }
    e.stopPropagation();
  }
  Menubar.prototype.hoverevent= function(index){
    if(this.pull !== -1) {
      var i = index;
      this.menus[this.pull].css({ display: 'none' });
      this.menus[i].css({ display: 'inline-block' });
      this.pull = i;
    }
    
  }
  Menubar.prototype.createMenus = function(){
    for(var i=0; i<this.menuData.length; i++) {
      var $menus = $('<ul class="menus"></ul>');
      var items = this.menuData[i].menuItems;

      for(var j=0; j<items.length; j++) {
        if(items[j].title === 'hr') {
          var $hr = $('<li class="menu-hr"></li>');
          $menus.append($hr);
        }
        else{
          var $menu = $('<li class="menu-item"></li>');
          $menu.html(items[j].title);
          $menu.attr('data-x', i);
          $menu.attr('data-y', j);
          if(items[j].shortcut !== '') {
            var $shorcut = $('<span class="shortcut"></span>');
            $shorcut.html(items[j].shortcut);
            $menu.append($shorcut);
          }
          if(!items[j].enabled) {
            $menu.addClass('disabled');
          }
          $menus.append($menu);
          var that=this;
          $menu.click(function(e) {
            e.stopPropagation();
            if($(this).hasClass('disabled')) {
              return;
            }
            console.log(this.dataset.x)
            console.log(this.dataset.y)
            var x = this.dataset.x;
            var y = this.dataset.y;
            that.menus[x].css({display: 'none'});
            that.pull = -1;
            that.menuData[x].menuItems[y].handler();
          });
        }
      }
      $menus.css({
        width: this.menuData[i].width,
        left: this.menuData[i].left,
        display: 'none'
      });
      this.$menudom.append($menus);
      this.menus.push($menus);
    }
  }
  Menubar.prototype.hideMenu = function(){
    if(this.pull === -1) return;
    this.menus[this.pull].css({display: 'none'});
    this.pull = -1;
  }
  Menubar.prototype.enabled=function(row, col, isEnabled) {
    var menuItem = this.menus[row].find('.menu-item')[col];
    if(isEnabled) {
      $(menuItem).removeClass('disabled');
    } else {
      $(menuItem).addClass('disabled');
    }
  }
  Menubar.prototype.show = function(){
    this.createMenuTitle();
    $('body').append(this.$menudom);
  }
})();
