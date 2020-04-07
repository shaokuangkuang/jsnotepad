/* exported comList */
function comList() {
  var $comList = $('<div class="notepad-com-list"><input class="editor" type="text"><br><ul class="list"></ul></div>');
  var $editor = $comList.find('.editor');
  var $list = $comList.find('.list');
  var $liArr;
  function fill(cfg) {
    var $item;
    var i = 0;
    if(cfg.isFont==true) {
      for(i=0; i<cfg.list.length; i++) {
        $item = $('<li class="item"></li>');
        $item.css({'font-family': cfg.list[i]});
        $item.html(cfg.list[i]);
        $list.append($item);
      }
    } 
    else if(cfg.isFontStyle==true) {
      for(i=0; i<cfg.list.length; i++) {
        $item = $('<li class="item"></li>');
        if(cfg.list[i] === '斜体') {
          $item.css({'font-style': 'italic'});
        }
        else if(cfg.list[i] === '粗体') {
          $item.css({'font-weight': 'bold'});
        }
        else if(cfg.list[i] === '粗偏斜体') {
          $item.css({'font-weight': 'bold', 'font-style': 'italic'});
        }
        $item.html(cfg.list[i]);
        $list.append($item);
      }
    } 
    else {
      for(i=0; i<cfg.list.length; i++) {
        $item = $('<li class="item"></li>');
        $item.html(cfg.list[i]);
        $list.append($item);
      }
    }
    $liArr = $list.find('.item');
  }
  function init(cfg) {
    var $oldList = $(cfg.container).find('.notepad-com-list');
    if($oldList.length !== 0) $oldList.remove();
    $(cfg.container).append($comList);
    $comList.css({ width: cfg.width });
    fill(cfg);
    $($liArr[cfg.select]).addClass('selected');
    var i=cfg.select
    $editor.val(cfg.list[i]);
    $editor.select();
  }
  this.show = function(cfg) {
    init(cfg);
    $list.click(function(e) {
      $($liArr[cfg.select]).removeClass('selected');
      cfg.select = cfg.list.indexOf($(e.target).html());
      $($liArr[cfg.select]).addClass('selected');
      $editor.val(cfg.list[cfg.select]);
      $editor.select();
      cfg.selectHandler(cfg.select);
    });
  };
}
