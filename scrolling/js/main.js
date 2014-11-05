
/**** Plugins *****/

(function($) {
  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  };


  /* @ desc: Dorota's plugin that return the position of scroll. Will return "top" or "not-top"
 * @author: Dorota
*/
  $.fn.scrollPos = function(){
    var top = 0,
    win = $(window),
    currentScroll = win.scrollTop(),
    position = "";
/*console.log("win.width(): " + $('body').width() + ", currentScroll: " + currentScroll);*/
    if (currentScroll > top){
       position = "not-top";
    } else {
      position = "top";
    }
    /*previousScroll = currentScroll;*/
    return position;
  }


})(jQuery);

/**** Main function ****/
/* The slide up effect has been based on the post from 2013 http://css-tricks.com/slide-in-as-you-scroll-down-boxes/ */


(function() {

 var scrollEffects = {

    initialized: false,

    initialize: function() {
      if (this.initialized) return;
      this.initialized = true;
      this.build();

    },

    build: function() {
      /* TODO:
      scrollToTop button
      scroll background images
      */
      this.areVisible();
      this.onScrollEv();

      },

      addVisClass: function(elem, clazz){
        elem.each(function(i, el) {
          var el = $(el);
          if (el.visible(true)) {
            el.addClass(clazz); 
          } 
        });
      },

      addResizeClass: function(elem, clazz){
        if ($(window).scrollPos() == "not-top") {
            elem.addClass(clazz); 
          } else {
            elem.removeClass(clazz);
          }
      },

      areVisible: function(){
        var squares = $('.square');
        this.addVisClass(squares, "are-visible");
      },

      onScrollEv: function(){
        $(window).scroll(function(event) {

          var squares = $('.square');
          scrollEffects.addVisClass(squares, "slideUp");
           
          var banner =  $('#banner');
          scrollEffects.addResizeClass(banner, "smaller");

        });
      }

  };

  scrollEffects.initialize();

})();

