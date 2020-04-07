(function(){
  window.dlgFont  = dlgFont ;
  function dlgFont (np){
  this.$dlg = $('<div class="notepad-dlg-mask notepad-dlg-font"><div class="dialogbox notepad-dlgbox"><div class="notepad-dlg-titlebar"><p class="title">字体</p><span class="close-btn" title="关闭">✖</span></div><div class="main notepad-dlg-main"><div class="font-family"><p>字体(F):</p></div><div class="font-style"><p>字形(Y):</p></div><div class="font-size"><p>大小(S):</p></div><fieldset class="sample"><legend>示例</legend><p class="sample-txt">AaBbYyZz</p></fieldset><div class="script"><label>脚本(R):<br><select><option value="西欧语言">西欧语言</option><option value="中文 GB2312">中文 GB2312</option></select></label></div><input class="btn-ok btn" type="button" value="确定"><input class="btn-cancel btn" type="button" value="取消"></div></div></div>');
  this.$btnOk = this.$dlg.find('.btn-ok');
  this.$btnClose = this.$dlg.find('.close-btn');
  this.$btnCancel = this.$dlg.find('.btn-cancel');
  this.$sample = this.$dlg.find('.sample-txt');
  this.$titleBar = this.$dlg.find('.notepad-dlg-titlebar');
  this.fonts = ['Agency FB', 'Algerian', 'Arial', 'Arial Rounded MT', 'Axure Handwriting', 'Bahnschrift', 'Baskerville Old Face', 'Bauhaus 93', 'Bell MT', 'Berlin Sans FB', 'Bernard MT', 'BlackAdder ITC'];
  this.styles = ['常规', '斜体', '粗体', '粗偏斜体'];
  this.sizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];
  this.contain=['.notepad-dlg-font .font-family','.notepad-dlg-font .font-style','.notepad-dlg-font .font-size'];
  this.family=np.fontFamily;
  this.style= np.fontStyle ;
  this.size= np.fontSize ;
  }
  dlgFont.prototype.sample = function(){
    this.$sample.css({ 'font-family': this.family, 'font-size': this.size + 'pt' });
    if(this.style === '斜体') {
      this.$sample.css({'font-style': 'italic'});
      return;
    }
    else if(this.style === '粗体') {
      this.$sample.css({'font-weight': 'bold'});
      return;
    }
    else if(this.style === '粗偏斜体') {
      this.$sample.css({'font-weight': 'bold', 'font-style': 'italic'});
      return;
    }
    else{
      this.$sample.css({});
    }
  }
  dlgFont.prototype.show = function(){
    $('body').append(this.$dlg);
    var that=this
    var list1 = new comList();
    list1.show({container: this.contain[0],
      width: '176px',
      list: this.fonts,
      select: this.fonts.indexOf(this.family),
      isFont: true,
      isFontStyle: false,
      selectHandler: function(e) {
        that.family = that.fonts[e];
        that.sample();}
    });
    var list2 = new comList();
    list2.show({
      container: this.contain[1],
      width: '132px',
      list: this.styles,
      select: this.styles.indexOf(this.style),
      isFont: false,
      isFontStyle: true,
      selectHandler: function(e) {
        that.style = that.styles[e];
        that.sample();
      }
    });
    var list3 = new comList();
    list3.show({
      container: this.contain[2],
      width: '64px',
      list: this.sizes,
      select: this.sizes.indexOf(this.size),
      isFont: false,
      isFontStyle: false,
      selectHandler: function(e) {
        that.size = that.sizes[e];
        that.sample();
      }
    });
    this.sample();
    this.$dlg.find('.dialogbox').draggable({handle: this.$titleBar});

    this.$btnClose.click(function(){
      that.$dlg.remove();
    });
    this.$btnCancel.click(function(){
      that.$dlg.remove();
    });
    this.$btnOk.click(function() {
      np.fontHandler({
        family: that.family,
        style: that.style,
        size: that.size
      });
      that.$dlg.remove();
    });
    this.$dlg.click(function(e) {
      e.stopPropagation();
    });
  }
  
})();
