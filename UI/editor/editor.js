(function(){
  window.Editor = Editor;
  function Editor(np){
    this.$editordom = $('<div class="notepad-editor"><textarea spellcheck="false" auto-size="none"></textarea></div>');
    this.$textArea = this.$editordom.find('textarea');
    this.wrap=np.wrap
    this.fontFamily =np.fontFamily 
    this.fontStyle =np.fontStyle  
    this.fontSize =np.fontSize 
    this.show();
    this.setFont(np);
    
  }
  Editor.prototype.focus = function(){
    this.$textArea.focus();
  }
  Editor.prototype.setWrap = function(){
    if(this.wrap) {
      this.$textArea.attr('wrap', 'soft');
      this.$textArea.css({'overflow-x': 'hidden'});
    } else {
      this.$textArea.attr('wrap', 'off');
      this.$textArea.css({'overflow-x': 'scroll'});
    }
  }
  Editor.prototype.setFont = function(e){
    this.$textArea.css({'font-family': e.fontFamily, 'font-size': e.fontSize + 'pt'});
    if(e.fontStyle === '斜体') {
      this.$textArea.css({'font-style': 'italic'});
      return;
    }
    if(e.fontStyle === '粗体') {
      this.$textArea.css({'font-weight': 'bold'});
      return;
    }
    if(e.fontStyle === '粗偏斜体') {
      this.$textArea.css({'font-weight': 'bold', 'font-style': 'italic'});
      return;
    }
  }
  Editor.prototype.show = function(){
    $('body').append(this.$editordom);
    this.$textArea.trigger('focus');
    this.setWrap();
  }
  
})();
