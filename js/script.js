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
    this.obj = obj || null;
    this.sweept = sweept || null;
    this.dir = dir || null;
    this.prov = null;
    this.city = null;
    this.cate = null;
    this.cateitem = null;
    this.map = new BMap.Map("map"); 
    this.mymarkers = null;
    this.mapPiont = null;

    var $this = this;

    //地图默认展示
    //$this.map.centerAndZoom('中国',5);
    
    $this.map.centerAndZoom(new BMap.Point(116.319852,40.057031),16);
    $this.map.addControl(new BMap.MapTypeControl());

  
    var searchInfoWindow1 = new BMapLib.SearchInfoWindow($this.map, "信息框1内容", {
      title: "信息框1", //标题
      panel : "panel", //检索结果面板
      enableAutoPan : true, //自动平移
      searchTypes :[
        BMAPLIB_TAB_FROM_HERE, //从这里出发
        BMAPLIB_TAB_SEARCH   //周边检索
      ]
    });
    function openInfoWindow1() {     
      searchInfoWindow1.open(new BMap.Point(116.319852,40.057031));
    }

    openInfoWindow1();


  }

  //加载
  showStep.prototype.goto = function  (obj,dir) {
    var $this = this;
    $this.obj = obj || $this.obj;
    $this.dir = dir || $this.dir;
    if ($this.dir == 'left' ) {
      $this.showIn();
    }

    if ($this.dir == 'right') {
      $this.showOut();
    }
  }

  //移进
  showStep.prototype.showIn = function  () {
    var $this = this;
    if ($.support.transition) {
      $this.obj.show();
      $this.obj[0].offsetWidth;

      $this.obj.addClass('in');

      $this.obj.one('bsTransitionEnd',function  () {
        $this.obj.trigger('showIn');

      }).emulateTransitionEnd(300);

    }else {
      $this.obj.css('left','0');
      $this.obj.show();      
      $this.obj.trigger('showIn');
    }  
  }

  //移出
  showStep.prototype.showOut = function  () {
    var $this = this;
    if ($.support.transition) {
      $this.obj.removeClass('in');
      $this.obj.one('bsTransitionEnd',function  () {
        $this.obj.hide();
        $this.obj.trigger('showOut');
      }).emulateTransitionEnd(300);
    }else {
      $this.obj.css('left','0');
      $this.obj.hide();      
    }
  }

  showStep.prototype.resetmsg = function  () {
    var $this = this;
    
    //定义省份城市
    if ($this.prov != null) {
      var provhtml = $('<a class="item-prov item-lbox arrow" data-prov="' + $this.prov + '" href="#">' + $this.prov + '</a>');
      $('#address').empty().append(provhtml);
      if ($this.city != null) {
        var cityhtml = $('<span class="sp1">></span><a data-city="' + $this.city + '" class="item-city item-lbox arrow" href="#">' + $this.city + '</a>');
        $('#address').append(cityhtml);
      }else {
        $('#address').find('.item-city').remove();
      }
    }else {
      var defhtml = $('<a class="item-chooseadress item arrow-right" data-ajaxurl="ajax/prov.html" href="#">请选择您的所在地</a>');
      $('#address').empty().append(defhtml);
    }

    //定义类别产品
    if ($this.cate != null) {
      var catehtml = $('<a class="item-cate item-lbox arrow" data-cate="' + $this.cate + '" href="#">' + $this.cate + '</a>');
      $('#product').empty().append(catehtml);
      if ($this.cateitem != null) {
        var cateitemhtml = $('<span class="sp1">></span><a data-cateitem="' + $this.cateitem + '" class="item-cateitem item-lbox arrow" href="#">' + $this.cateitem + '</a>');
        $('#product').append(cateitemhtml);
      }else {
        $('#product').find('.item-cateitem').remove();
      }
    }else {
      var defhtml = $('<a class="item-choosepro item arrow-right" data-ajaxurl="ajax/cate.html" href="#">请选择产品</a>');
      $('#product').empty().append(defhtml);
    }
    
    $('.step-city .prov-name').html('(' + $this.prov + ')');
    $('.step-cateitem .item-cate').html('(' + $this.cate + ')');

    //搜索列表
    if ($this.cate != null && $this.cateitem != null && $this.prov != null && $this.city != null) {
      var getUrl = 'ajax/adress.html?a='+ $this.prov +'&b='+  $this.city + '&c=' + $this.cate + '&d=' + $this.cateitem;

      ajaxLoad(getUrl,function  (data) {
        $('.adress-list').empty().append(data);
        
        var getObj = $(data).find('a');
        var getMk = [];

        getObj.each(function  (n) {
          var adressobj = $(this);
          var adress = $(this).data('adress');

          var myGeo = new BMap.Geocoder();
          myGeo.getPoint(adress, function(googlePoi){
            if (googlePoi) {
              var googleMkr = new BMap.Marker(googlePoi);
              googleMkr.msg =
              {
                adress:adress,
                tel:adressobj.find('.tel')
              }

              getMk[n] = googleMkr;

              //$this.mymarkers.push(googleMkr);
              /*
              (function(i){
                googleMkr.addEventListener('mouseover', function(){
                var info = infomsg(item);
                var infoWin = new BMap.InfoWindow(info, {title:item.fwdname});
                this.openInfoWindow(infoWin);
              });
              })(i);
              */
              $this.map.addOverlay(googleMkr);
              
              if ($this.mapPiont != null) {
                $this.map.centerAndZoom($this.mapPiont, 11);
              }else {
                $this.map.centerAndZoom($this.prov, 11);
              }

              if (n == (getObj.length-1)) {
                $this.mapPiont = getMk;
                console.log(getMk);
              }              
            }
          }, $this.city);
          
          

        })


        


      });

      return
    }


    if ($this.prov != null && $this.city == null) {
      $this.map.centerAndZoom($this.prov,9);
      return
    }
    if ($this.prov != null && $this.city != null) {
      // 创建地址解析器实例
      var myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint($this.prov + $this.city, function(point){
        if (point) {
          $this.mapPiont = point;
          $this.map.centerAndZoom(point, 13);
        }else{
          alert("您选择地址没有解析到结果!");
        }
      });
      return
    }


  }




  function ajaxLoad(url,callback) {
    $.ajax({
        type: "post",
        url: url,
        success: function(data){
          $('#loading').hide();
          if (callback) {
            callback(data);
          }
        },
        error:function  () {
          
        },
        beforeSend:function  () {
          $('#loading').show();
        }
    });
  }



  $(document).ready(function() {
    var showStep1 =  new showStep();


    $('.map-nav').on('click',selectString,function  () {
      var obj = $('.' + $(this).attr('showstep'));
      var dir = $(this).attr('showdir');
      showStep1.goto(obj,dir);
    })      

    //step1中心页        
    $('.map-nav').on('click','.step-search .item-chooseadress',function  () {
      var getUrl = $(this).data('ajaxurl');
      ajaxLoad(getUrl,function  (data) {
        $('.step-prov .control-list').empty().append(data);
        showStep1.goto($('.step-prov'),'left');
      });            
    })

    $('.map-nav').on('click','.step-search .item-choosepro',function  () {
      var getUrl = $(this).data('ajaxurl');
      ajaxLoad(getUrl,function  (data) {
        $('.step-cate .control-list').empty().append(data);
        showStep1.goto($('.step-cate'),'left');
      });      
    })

      //省份链
    $('.map-nav').on('click','.step-search .item-prov',function  () {
      var getUrl = 'ajax/prov.html';
      ajaxLoad(getUrl,function  (data) {
        $('.step-prov .control-list').empty().append(data);
        showStep1.goto($('.step-prov'),'left');
      });      
    })

    $('.map-nav').on('click','.step-search .item-city',function  () {
      var getUrl = 'ajax/city.html?q=' + showStep1.city;
      ajaxLoad(getUrl,function  (data) {
        $('.step-city .control-list').empty().append(data);
        showStep1.goto($('.step-city'),'left');
        showStep1.goto($('.step-prov'),'left');
      });      
    })
    
      //产品链
    $('.map-nav').on('click','.step-search .item-cate',function  () {
      var getUrl = 'ajax/cate.html';
      ajaxLoad(getUrl,function  (data) {
        $('.step-cate .control-list').empty().append(data);
        showStep1.goto($('.step-cate'),'left');
      });      
    })

    $('.map-nav').on('click','.step-search .item-cateitem',function  () {
      var getUrl = 'ajax/cateitem.html?q=' + showStep1.cateitem;
      ajaxLoad(getUrl,function  (data) {
        $('.step-cateitem .control-list').empty().append(data);
        showStep1.goto($('.step-cate'),'left');
        showStep1.goto($('.step-cateitem'),'left');
      });      
    })
      

    //省份
    $('.map-nav').on('click','.step-prov .item',function  () {
      var prov = $(this).data('prov');            
      showStep1.prov = prov;
      showStep1.city = null;
      showStep1.resetmsg();

      var ajaxurl = 'ajax/city.html?q=' + $(this).data('prov');

      ajaxLoad(ajaxurl,function  (data) {
        $('.step-city .control-list').empty().append(data);
        showStep1.goto($('.step-city'),'left');              
      });
    })

    //城市
    $('.map-nav').on('click','.step-city .item',function  () {
      var city = $(this).data('city');
      
      showStep1.city = city;
      showStep1.resetmsg();
      //回到最初页
      showStep1.goto($('.step-prov'),'right');      
      showStep1.goto($('.step-city'),'right');      
    })

    //产品类型
    $('.map-nav').on('click','.step-cate .item',function  () {
      var cate = $(this).data('cate');
      showStep1.cate = cate;
      showStep1.resetmsg();
      
      var ajaxurl = 'ajax/cateitem.html?q=' + $(this).data('cate');

      ajaxLoad(ajaxurl,function  (data) {
        $('.step-cateitem .control-list').empty().append(data);        
        showStep1.goto($('.step-cateitem'),'left');        
      })
    })

    //产品名称
    $('.map-nav').on('click','.step-cateitem .item',function  () {
      var cateitem = $(this).data('cateitem');
      showStep1.cateitem = cateitem;
      showStep1.resetmsg();
      showStep1.goto($('.step-cate'),'right');
      showStep1.goto($('.step-cateitem'),'right');
    })



  })


  
  



})(jQuery);



$(document).ready(function() {
  
})