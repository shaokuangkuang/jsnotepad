var np = {};
np.wrap          = true;   
np.fontFamily     = 'Arial'; 
np.fontStyle      = '常规';  
np.fontSize       = '16'; 
np.fontHandler = function(a) {
  np.fontFamily = a.family;
  np.fontStype = a.style;
  np.fontSize = a.size;
};
$(function() {
  console.log(np)
  var $body = $('body');
  // var $ok=$('#btn-ok');
  var $ok=$('.notepad-menubar');
  var menubar =new Menubar(np.menuData);
  var editor=new Editor(np);
  $ok.click(function() {
    console.log(2222222222222)
    // editor.setFont(np)
  })
  $body.click(function() {
    editor.setFont(np)
    menubar.hideMenu();
    editor.focus();
  });

});
