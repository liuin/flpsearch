/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== 
 $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
removeElement()
 
 */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);




/*-- 
  anchor:cuki13
  use:
 --*/

+(function($) {
  'use strict';
  var selectString = '[showStep]';

  function showStep(obj,dir,sweept) {
    this.obj = obj;
    this.sweept = sweept;
    if (dir == 'left') { 
      this.showIn();
    }
    if (dir == 'right') {
      this.showOut();
    }
  }

  showStep.prototype.showIn = function  () {
    var $this = this;
    if ($.support.transition) {
      $this.obj.addClass('in');
      $this.obj.show();
      $this.obj[0].offsetWidth;

      $this.obj.one('bsTransitionEnd',function  () {
        $this.obj.trigger('showIn');

      }).emulateTransitionEnd(300);

    }else {
      $this.obj.css('left','0');
      $this.obj.show();      
      $this.obj.trigger('showIn');
    }

    
  }

  showStep.prototype.showOut = function  () {
    var $this = this;

    if ($.support.transition) {
      $this.obj.removeClass('in');
      $this.obj.one('bsTransitionEnd',function  () {
        $this.obj.hide();
        $this.obj.trigger('showOut');
        $this.obj.trigger('showIn');
      }).emulateTransitionEnd(300);
    }else {
      $this.obj.css('left','0');
      $this.obj.hide();      
    }
  }

  var showStep1 =  new showStep(getObj,'left');

  $(selectString).each(function () {
    var getObj = $('.'+$(this).attr('showstep'));
    
    $(this).on('click',function  () {
      
    })
  })


})(jQuery);



$(document).ready(function() {
  
})