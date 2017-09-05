(function(h,b){b.SliderPro={modules:[],addModule:function(a,c){this.modules.push(a);b.extend(e.prototype,c)}};var d=b.SliderPro.namespace="SliderPro",e=function(a,c){this.instance=a;this.$slider=b(this.instance);this.$slidesContainer=this.$slidesMask=this.$slides=null;this.slides=[];this.slidesOrder=[];this.options=c;this.settings={};this.originalSettings={};this.originalGotoSlide=null;this.middleSlidePosition=this.previousSlideIndex=this.selectedSlideIndex=0;this.isIE=this.positionProperty=this.transitionEvent=
this.vendorPrefix=this.supportedAnimation=null;this.visibleOffset=this.previousWindowHeight=this.previousWindowWidth=this.previousSlideHeight=this.previousSlideWidth=this.slideSize=this.slideHeight=this.slideWidth=this.slidesPosition=0;this.allowResize=!0;this.uniqueId=(new Date).valueOf();this.breakpoints=[];this.currentBreakpoint=-1;this.shuffledIndexes=[];this._init()};e.prototype={_init:function(){var a=this;this.supportedAnimation=f.getSupportedAnimation();this.vendorPrefix=f.getVendorPrefix();
this.transitionEvent=f.getTransitionEvent();this.isIE=f.checkIE();this.$slider.removeClass("sp-no-js");h.navigator.userAgent.match(/(iPad|iPhone|iPod)/g)&&this.$slider.addClass("ios");var c=/(msie) ([\w.]+)/.exec(h.navigator.userAgent.toLowerCase());this.isIE&&this.$slider.addClass("ie");null!==c&&this.$slider.addClass("ie"+parseInt(c[2],10));this.$slidesContainer=b('<div class="sp-slides-container"></div>').appendTo(this.$slider);this.$slidesMask=b('<div class="sp-mask"></div>').appendTo(this.$slidesContainer);
this.$slides=this.$slider.find(".sp-slides").appendTo(this.$slidesMask);this.$slider.find(".sp-slide").appendTo(this.$slides);c=b.SliderPro.modules;if("undefined"!==typeof c)for(var k=0;k<c.length;k++){var e=c[k].substring(0,1).toLowerCase()+c[k].substring(1)+"Defaults";"undefined"!==typeof this[e]&&b.extend(this.defaults,this[e])}this.settings=b.extend({},this.defaults,this.options);if("undefined"!==typeof c)for(k=0;k<c.length;k++)if("undefined"!==typeof this["init"+c[k]])this["init"+c[k]]();this.originalSettings=
b.extend({},this.settings);this.originalGotoSlide=this.gotoSlide;if(null!==this.settings.breakpoints){for(var g in this.settings.breakpoints)this.breakpoints.push({size:parseInt(g,10),properties:this.settings.breakpoints[g]});this.breakpoints=this.breakpoints.sort(function(a,c){return a.size>=c.size?1:-1})}this.selectedSlideIndex=this.settings.startSlide;if(!0===this.settings.shuffle){var l=this.$slides.find(".sp-slide"),m=[];l.each(function(c){a.shuffledIndexes.push(c)});for(g=this.shuffledIndexes.length-
1;0<g;g--)c=Math.floor(Math.random()*(g+1)),k=this.shuffledIndexes[g],this.shuffledIndexes[g]=this.shuffledIndexes[c],this.shuffledIndexes[c]=k;b.each(this.shuffledIndexes,function(a,c){m.push(l[c])});this.$slides.empty().append(m)}b(h).on("resize."+this.uniqueId+"."+d,function(){var c=b(h).width(),k=b(h).height();!1===a.allowResize||a.previousWindowWidth===c&&a.previousWindowHeight===k||(a.previousWindowWidth=c,a.previousWindowHeight=k,a.allowResize=!1,setTimeout(function(){a.resize();a.allowResize=
!0},200))});this.on("update."+d,function(){a.previousSlideWidth=0;a.resize()});this.update();this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).addClass("sp-selected");this.trigger({type:"init"});b.isFunction(this.settings.init)&&this.settings.init.call(this,{type:"init"})},update:function(){var a=this;"horizontal"===this.settings.orientation?(this.$slider.removeClass("sp-vertical").addClass("sp-horizontal"),this.$slider.css({height:"","max-height":""}),this.$slides.find(".sp-slide").css("top",
"")):"vertical"===this.settings.orientation&&(this.$slider.removeClass("sp-horizontal").addClass("sp-vertical"),this.$slides.find(".sp-slide").css("left",""));this.positionProperty="horizontal"===this.settings.orientation?"left":"top";this.gotoSlide=this.originalGotoSlide;for(var c=this.slides.length-1;0<=c;c--)0===this.$slider.find('.sp-slide[data-index="'+c+'"]').length&&(this.slides[c].destroy(),this.slides.splice(c,1));this.slidesOrder.length=0;this.$slider.find(".sp-slide").each(function(c){var e=
b(this);"undefined"===typeof e.attr("data-init")?a._createSlide(c,e):a.slides[c].setIndex(c);a.slidesOrder.push(c)});this.middleSlidePosition=parseInt((a.slidesOrder.length-1)/2,10);!0===this.settings.loop&&this._updateSlidesOrder();this.trigger({type:"update"});b.isFunction(this.settings.update)&&this.settings.update.call(this,{type:"update"})},_createSlide:function(a,c){var k=new g(b(c),a,this.settings);this.slides.splice(a,0,k)},_updateSlidesOrder:function(){var a,c;a=b.inArray(this.selectedSlideIndex,
this.slidesOrder)-this.middleSlidePosition;if(0>a)for(a=this.slidesOrder.splice(a,Math.abs(a)),c=a.length-1;0<=c;c--)this.slidesOrder.unshift(a[c]);else if(0<a)for(a=this.slidesOrder.splice(0,a),c=0;c<=a.length-1;c++)this.slidesOrder.push(a[c])},_updateSlidesPosition:function(){for(var a=parseInt(this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).css(this.positionProperty),10),c=0;c<this.slidesOrder.length;c++)this.$slides.find(".sp-slide").eq(this.slidesOrder[c]).css(this.positionProperty,
a+(c-this.middleSlidePosition)*(this.slideSize+this.settings.slideDistance))},_resetSlidesPosition:function(){for(var a=0;a<this.slidesOrder.length;a++)this.$slides.find(".sp-slide").eq(this.slidesOrder[a]).css(this.positionProperty,a*(this.slideSize+this.settings.slideDistance));a=-parseInt(this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).css(this.positionProperty),10)+this.visibleOffset;this._moveTo(a,!0)},resize:function(){var a=this;if(null!==this.settings.breakpoints&&0<this.breakpoints.length)if(b(h).width()>
this.breakpoints[this.breakpoints.length-1].size&&-1!==this.currentBreakpoint)this.currentBreakpoint=-1,this._setProperties(this.originalSettings,!1);else for(var c=0,k=this.breakpoints.length;c<k;c++)if(b(h).width()<=this.breakpoints[c].size){if(this.currentBreakpoint!==this.breakpoints[c].size){k={type:"breakpointReach",size:this.breakpoints[c].size,settings:this.breakpoints[c].properties};this.trigger(k);b.isFunction(this.settings.breakpointReach)&&this.settings.breakpointReach.call(this,k);this.currentBreakpoint=
this.breakpoints[c].size;c=b.extend({},this.originalSettings,this.breakpoints[c].properties);this._setProperties(c,!1);return}break}!0===this.settings.responsive?"fullWidth"!==this.settings.forceSize&&"fullWindow"!==this.settings.forceSize||"auto"!==this.settings.visibleSize&&("auto"===this.settings.visibleSize||"vertical"!==this.settings.orientation)?this.$slider.css({width:"100%","max-width":this.settings.width,marginLeft:""}):(this.$slider.css("margin",0),this.$slider.css({width:b(h).width(),"max-width":"",
marginLeft:-this.$slider.offset().left})):this.$slider.css({width:this.settings.width});-1===this.settings.aspectRatio&&(this.settings.aspectRatio=this.settings.width/this.settings.height);this.slideWidth=this.$slider.width();this.slideHeight="fullWindow"===this.settings.forceSize?b(h).height():isNaN(this.settings.aspectRatio)?this.settings.height:this.slideWidth/this.settings.aspectRatio;if(this.previousSlideWidth!==this.slideWidth||this.previousSlideHeight!==this.slideHeight||"auto"!==this.settings.visibleSize||
this.$slider.outerWidth()>this.$slider.parent().width()||this.$slider.width()!==this.$slidesMask.width())this.previousSlideWidth=this.slideWidth,this.previousSlideHeight=this.slideHeight,this.visibleSlidesSize=this.slideSize="horizontal"===this.settings.orientation?this.slideWidth:this.slideHeight,this.visibleOffset=0,b.each(this.slides,function(c,b){b.setSize(a.slideWidth,a.slideHeight)}),this.$slidesMask.css({width:this.slideWidth,height:this.slideHeight}),!0===this.settings.autoHeight?setTimeout(function(){a._resizeHeight()},
1):this.$slidesMask.css(this.vendorPrefix+"transition",""),"auto"!==this.settings.visibleSize&&("horizontal"===this.settings.orientation?("fullWidth"===this.settings.forceSize||"fullWindow"===this.settings.forceSize?(this.$slider.css("margin",0),this.$slider.css({width:b(h).width(),"max-width":"",marginLeft:-this.$slider.offset().left})):this.$slider.css({width:this.settings.visibleSize,"max-width":"100%",marginLeft:0}),this.$slidesMask.css("width",this.$slider.width()),this.visibleSlidesSize=this.$slidesMask.width(),
this.visibleOffset=Math.round((this.$slider.width()-this.slideWidth)/2)):("fullWindow"===this.settings.forceSize?this.$slider.css({height:b(h).height(),"max-height":""}):this.$slider.css({height:this.settings.visibleSize,"max-height":"100%"}),this.$slidesMask.css("height",this.$slider.height()),this.visibleSlidesSize=this.$slidesMask.height(),this.visibleOffset=Math.round((this.$slider.height()-this.slideHeight)/2))),this._resetSlidesPosition(),this.trigger({type:"sliderResize"}),b.isFunction(this.settings.sliderResize)&&
this.settings.sliderResize.call(this,{type:"sliderResize"})},_resizeHeight:function(){var a=this,c=this.getSlideAt(this.selectedSlideIndex),b=c.getSize();c.off("imagesLoaded."+d);c.on("imagesLoaded."+d,function(b){b.index===a.selectedSlideIndex&&(b=c.getSize(),a._resizeHeightTo(b.height))});"loading"!==b&&this._resizeHeightTo(b.height)},gotoSlide:function(a){if(a!==this.selectedSlideIndex&&"undefined"!==typeof this.slides[a]){var c=this;this.previousSlideIndex=this.selectedSlideIndex;this.selectedSlideIndex=
a;this.$slides.find(".sp-selected").removeClass("sp-selected");this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).addClass("sp-selected");!0===this.settings.loop&&(this._updateSlidesOrder(),this._updateSlidesPosition());!0===this.settings.autoHeight&&this._resizeHeight();var k=-parseInt(this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).css(this.positionProperty),10)+this.visibleOffset;this._moveTo(k,!1,function(){!0===c.settings.loop&&c._resetSlidesPosition();c.trigger({type:"gotoSlideComplete",
index:a,previousIndex:c.previousSlideIndex});b.isFunction(c.settings.gotoSlideComplete)&&c.settings.gotoSlideComplete.call(c,{type:"gotoSlideComplete",index:a,previousIndex:c.previousSlideIndex})});this.trigger({type:"gotoSlide",index:a,previousIndex:this.previousSlideIndex});b.isFunction(this.settings.gotoSlide)&&this.settings.gotoSlide.call(this,{type:"gotoSlide",index:a,previousIndex:this.previousSlideIndex})}},nextSlide:function(){var a=this.selectedSlideIndex>=this.getTotalSlides()-1?0:this.selectedSlideIndex+
1;this.gotoSlide(a)},previousSlide:function(){var a=0>=this.selectedSlideIndex?this.getTotalSlides()-1:this.selectedSlideIndex-1;this.gotoSlide(a)},_moveTo:function(a,c,b){var e=this,d={};if(a!==this.slidesPosition)if(this.slidesPosition=a,"css-3d"!==this.supportedAnimation&&"css-2d"!==this.supportedAnimation||!1!==this.isIE)d["margin-"+this.positionProperty]=a,"undefined"!==typeof c&&!0===c?this.$slides.css(d):(this.$slides.addClass("sp-animated"),this.$slides.animate(d,this.settings.slideAnimationDuration,
function(){e.$slides.removeClass("sp-animated");"function"===typeof b&&b()}));else{var g="horizontal"===this.settings.orientation?a:0;a="horizontal"===this.settings.orientation?0:a;d[this.vendorPrefix+"transform"]="css-3d"===this.supportedAnimation?"translate3d("+g+"px, "+a+"px, 0)":"translate("+g+"px, "+a+"px)";"undefined"!==typeof c&&!0===c?c="":(this.$slides.addClass("sp-animated"),c=this.vendorPrefix+"transform "+this.settings.slideAnimationDuration/1E3+"s",this.$slides.on(this.transitionEvent,
function(a){a.target===a.currentTarget&&(e.$slides.off(e.transitionEvent),e.$slides.removeClass("sp-animated"),"function"===typeof b&&b())}));d[this.vendorPrefix+"transition"]=c;this.$slides.css(d)}},_stopMovement:function(){var a={};if("css-3d"!==this.supportedAnimation&&"css-2d"!==this.supportedAnimation||!1!==this.isIE)this.$slides.stop(),this.slidesPosition=parseInt(this.$slides.css("margin-"+this.positionProperty),10);else{var c=this.$slides.css(this.vendorPrefix+"transform"),b=-1!==c.indexOf("matrix3d")?
"matrix3d":"matrix",e=c.replace(b,"").match(/-?[0-9\.]+/g),c="matrix3d"===b?parseInt(e[12],10):parseInt(e[4],10),b="matrix3d"===b?parseInt(e[13],10):parseInt(e[5],10);a[this.vendorPrefix+"transform"]="css-3d"===this.supportedAnimation?"translate3d("+c+"px, "+b+"px, 0)":"translate("+c+"px, "+b+"px)";a[this.vendorPrefix+"transition"]="";this.$slides.css(a);this.$slides.off(this.transitionEvent);this.slidesPosition="horizontal"===this.settings.orientation?c:b}this.$slides.removeClass("sp-animated")},
_resizeHeightTo:function(a){var c=this;a={height:a};"css-3d"===this.supportedAnimation||"css-2d"===this.supportedAnimation?(a[this.vendorPrefix+"transition"]="height "+this.settings.heightAnimationDuration/1E3+"s",this.$slidesMask.off(this.transitionEvent),this.$slidesMask.on(this.transitionEvent,function(a){a.target===a.currentTarget&&(c.$slidesMask.off(c.transitionEvent),c.trigger({type:"resizeHeightComplete"}),b.isFunction(c.settings.resizeHeightComplete)&&c.settings.resizeHeightComplete.call(c,
{type:"resizeHeightComplete"}))}),this.$slidesMask.css(a)):this.$slidesMask.stop().animate(a,this.settings.heightAnimationDuration,function(a){c.trigger({type:"resizeHeightComplete"});b.isFunction(c.settings.resizeHeightComplete)&&c.settings.resizeHeightComplete.call(c,{type:"resizeHeightComplete"})})},destroy:function(){this.$slider.removeData("sliderPro");this.$slider.removeAttr("style");this.$slides.removeAttr("style");this.off("update."+d);b(h).off("resize."+this.uniqueId+"."+d);var a=b.SliderPro.modules;
if("undefined"!==typeof a)for(var c=0;c<a.length;c++)if("undefined"!==typeof this["destroy"+a[c]])this["destroy"+a[c]]();b.each(this.slides,function(a,c){c.destroy()});this.slides.length=0;this.$slides.prependTo(this.$slider);this.$slidesContainer.remove()},_setProperties:function(a,c){for(var b in a)this.settings[b]=a[b],!1!==c&&(this.originalSettings[b]=a[b]);this.update()},on:function(a,c){return this.$slider.on(a,c)},off:function(a){return this.$slider.off(a)},trigger:function(a){return this.$slider.triggerHandler(a)},
getSlideAt:function(a){return this.slides[a]},getSelectedSlide:function(){return this.selectedSlideIndex},getTotalSlides:function(){return this.slides.length},defaults:{width:500,height:300,responsive:!0,aspectRatio:-1,imageScaleMode:"cover",centerImage:!0,autoHeight:!1,startSlide:0,shuffle:!1,orientation:"horizontal",forceSize:"none",loop:!0,slideDistance:10,slideAnimationDuration:700,heightAnimationDuration:700,visibleSize:"auto",breakpoints:null,init:function(){},update:function(){},sliderResize:function(){},
gotoSlide:function(){},gotoSlideComplete:function(){},resizeHeightComplete:function(){},breakpointReach:function(){}}};var g=function(a,c,b){this.$slide=a;this.$imageContainer=this.$mainImage=null;this.areImagesLoaded=this.hasImages=this.isMainImageLoading=this.isMainImageLoaded=this.hasMainImage=!1;this.height=this.width=0;this.settings=b;this.setIndex(c);this._init()};g.prototype={_init:function(){this.$slide.attr("data-init",!0);this.$mainImage=0!==this.$slide.find(".sp-image").length?this.$slide.find(".sp-image"):
null;null!==this.$mainImage&&(this.hasMainImage=!0,this.$imageContainer=b('<div class="sp-image-container"></div>').prependTo(this.$slide),0!==this.$mainImage.parent("a").length?this.$mainImage.parent("a").appendTo(this.$imageContainer):this.$mainImage.appendTo(this.$imageContainer));this.hasImages=0!==this.$slide.find("img").length?!0:!1},setSize:function(a,c){this.width=a;this.height=!0===this.settings.autoHeight?"auto":c;this.$slide.css({width:this.width,height:this.height});!0===this.hasMainImage&&
(this.$imageContainer.css({width:this.width,height:this.height}),"undefined"===typeof this.$mainImage.attr("data-src")&&this.resizeMainImage())},getSize:function(){var a=this,c;if(!0===this.hasImages&&!1===this.areImagesLoaded&&"undefined"===typeof this.$slide.attr("data-loading"))return this.$slide.attr("data-loading",!0),"complete"===f.checkImagesComplete(this.$slide,function(){a.areImagesLoaded=!0;a.$slide.removeAttr("data-loading");a.trigger({type:"imagesLoaded."+d,index:a.index})})?(c=this.calculateSize(),
{width:c.width,height:c.height}):"loading";c=this.calculateSize();return{width:c.width,height:c.height}},calculateSize:function(){var a=this.$slide.width(),c=this.$slide.height();this.$slide.children().each(function(e,d){var g=b(d);if(!0!==g.is(":hidden")){var f=d.getBoundingClientRect(),h=g.position().top+(f.bottom-f.top),g=g.position().left+(f.right-f.left);h>c&&(c=h);g>a&&(a=g)}});return{width:a,height:c}},resizeMainImage:function(a){var c=this;!0===a&&(this.isMainImageLoading=this.isMainImageLoaded=
!1);!1===this.isMainImageLoaded&&!1===this.isMainImageLoading?(this.isMainImageLoading=!0,f.checkImagesComplete(this.$mainImage,function(){c.isMainImageLoaded=!0;c.isMainImageLoading=!1;c.resizeMainImage();c.trigger({type:"imagesLoaded."+d,index:c.index})})):!0===this.settings.autoHeight?this.$mainImage.css({width:"100%",height:"auto",marginLeft:"",marginTop:""}):("cover"===this.settings.imageScaleMode?this.$mainImage.width()/this.$mainImage.height()<=this.width/this.height?this.$mainImage.css({width:"100%",
height:"auto"}):this.$mainImage.css({width:"auto",height:"100%"}):"contain"===this.settings.imageScaleMode?this.$mainImage.width()/this.$mainImage.height()>=this.width/this.height?this.$mainImage.css({width:"100%",height:"auto"}):this.$mainImage.css({width:"auto",height:"100%"}):"exact"===this.settings.imageScaleMode&&this.$mainImage.css({width:"100%",height:"100%"}),!0===this.settings.centerImage&&this.$mainImage.css({marginLeft:.5*(this.$imageContainer.width()-this.$mainImage.width()),marginTop:.5*
(this.$imageContainer.height()-this.$mainImage.height())}))},destroy:function(){this.$slide.removeAttr("style");this.$slide.removeAttr("data-init");this.$slide.removeAttr("data-index");this.$slide.removeAttr("data-loaded");!0===this.hasMainImage&&(this.$slide.find(".sp-image").removeAttr("style").appendTo(this.$slide),this.$slide.find(".sp-image-container").remove())},getIndex:function(){return this.index},setIndex:function(a){this.index=a;this.$slide.attr("data-index",this.index)},on:function(a,
c){return this.$slide.on(a,c)},off:function(a){return this.$slide.off(a)},trigger:function(a){return this.$slide.triggerHandler(a)}};h.SliderPro=e;h.SliderProSlide=g;b.fn.sliderPro=function(a){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){if("undefined"===typeof b(this).data("sliderPro")){var d=new e(this,a);b(this).data("sliderPro",d)}else if("undefined"!==typeof a)if(d=b(this).data("sliderPro"),"function"===typeof d[a])d[a].apply(d,c);else if("undefined"!==typeof d.settings[a]){var g=
{};g[a]=c[0];d._setProperties(g)}else"object"===typeof a?d._setProperties(a):b.error(a+" does not exist in sliderPro.")})};var f={supportedAnimation:null,vendorPrefix:null,transitionEvent:null,isIE:null,getSupportedAnimation:function(){if(null!==this.supportedAnimation)return this.supportedAnimation;var a=(document.body||document.documentElement).style;if(!0===("undefined"!==typeof a.transition||"undefined"!==typeof a.WebkitTransition||"undefined"!==typeof a.MozTransition||"undefined"!==typeof a.OTransition)){a=
document.createElement("div");if("undefined"!==typeof a.style.WebkitPerspective||"undefined"!==typeof a.style.perspective)this.supportedAnimation="css-3d";if("css-3d"===this.supportedAnimation&&"undefined"!==typeof a.styleWebkitPerspective){var c=document.createElement("style");c.textContent="@media (transform-3d),(-webkit-transform-3d){#test-3d{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0;}}";document.getElementsByTagName("head")[0].appendChild(c);a.id="test-3d";document.body.appendChild(a);
if(9!==a.offsetLeft||5!==a.offsetHeight)this.supportedAnimation=null;c.parentNode.removeChild(c);a.parentNode.removeChild(a)}null!==this.supportedAnimation||"undefined"===typeof a.style["-webkit-transform"]&&"undefined"===typeof a.style.transform||(this.supportedAnimation="css-2d")}else this.supportedAnimation="javascript";return this.supportedAnimation},getVendorPrefix:function(){if(null!==this.vendorPrefix)return this.vendorPrefix;var a=document.createElement("div"),c=["Webkit","Moz","ms","O"];
if("transform"in a.style)return this.vendorPrefix="";for(var b=0;b<c.length;b++)if(c[b]+"Transform"in a.style){this.vendorPrefix="-"+c[b].toLowerCase()+"-";break}return this.vendorPrefix},getTransitionEvent:function(){if(null!==this.transitionEvent)return this.transitionEvent;var a=document.createElement("div"),c={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd"},b;for(b in c)if(b in a.style){this.transitionEvent=c[b];break}return this.transitionEvent},
checkImagesComplete:function(a,c){var b=this,d=this.checkImagesStatus(a);if("loading"===d)var e=setInterval(function(){d=b.checkImagesStatus(a);"complete"===d&&(clearInterval(e),"function"===typeof c&&c())},100);else"function"===typeof c&&c();return d},checkImagesStatus:function(a){var c="complete";a.is("img")&&!1===a[0].complete?c="loading":a.find("img").each(function(a){!1===b(this)[0].complete&&(c="loading")});return c},checkIE:function(){if(null!==this.isIE)return this.isIE;var a=h.navigator.userAgent;
a.indexOf("MSIE");-1!==a.indexOf("MSIE")||a.match(/Trident.*rv\:11\./)?this.isIE=!0:this.isIE=!1;return this.isIE}};h.SliderProUtils=f})(window,jQuery);
(function(h,b){var d="TouchSwipe."+b.SliderPro.namespace;b.SliderPro.addModule("TouchSwipe",{touchStartPoint:{x:0,y:0},touchEndPoint:{x:0,y:0},touchDistance:{x:0,y:0},touchStartPosition:0,isTouchMoving:!1,touchSwipeEvents:{startEvent:"",moveEvent:"",endEvent:""},initTouchSwipe:function(){!1!==this.settings.touchSwipe&&(this.touchSwipeEvents.startEvent="touchstart."+d+" mousedown."+d,this.touchSwipeEvents.moveEvent="touchmove."+d+" mousemove."+d,this.touchSwipeEvents.endEvent="touchend."+this.uniqueId+
"."+d+" mouseup."+this.uniqueId+"."+d,this.$slidesMask.on(this.touchSwipeEvents.startEvent,b.proxy(this._onTouchStart,this)),this.$slidesMask.on("dragstart."+d,function(b){b.preventDefault()}),this.$slidesMask.addClass("sp-grab"))},_onTouchStart:function(e){if(!(1<=b(e.target).closest(".sp-selectable").length)){var g="undefined"!==typeof e.originalEvent.touches?e.originalEvent.touches[0]:e.originalEvent;"undefined"===typeof e.originalEvent.touches&&e.preventDefault();b(e.target).parents(".sp-slide").find("a").one("click."+
d,function(b){b.preventDefault()});this.touchStartPoint.x=g.pageX||g.clientX;this.touchStartPoint.y=g.pageY||g.clientY;this.touchStartPosition=this.slidesPosition;this.touchDistance.x=this.touchDistance.y=0;this.$slides.hasClass("sp-animated")&&(this.isTouchMoving=!0,this._stopMovement(),this.touchStartPosition=this.slidesPosition);this.$slidesMask.on(this.touchSwipeEvents.moveEvent,b.proxy(this._onTouchMove,this));b(document).on(this.touchSwipeEvents.endEvent,b.proxy(this._onTouchEnd,this));this.$slidesMask.removeClass("sp-grab").addClass("sp-grabbing");
this.$slider.addClass("sp-swiping")}},_onTouchMove:function(b){var d="undefined"!==typeof b.originalEvent.touches?b.originalEvent.touches[0]:b.originalEvent;this.isTouchMoving=!0;this.touchEndPoint.x=d.pageX||d.clientX;this.touchEndPoint.y=d.pageY||d.clientY;this.touchDistance.x=this.touchEndPoint.x-this.touchStartPoint.x;this.touchDistance.y=this.touchEndPoint.y-this.touchStartPoint.y;var d="horizontal"===this.settings.orientation?this.touchDistance.x:this.touchDistance.y,f="horizontal"===this.settings.orientation?
this.touchDistance.y:this.touchDistance.x;Math.abs(d)>Math.abs(f)&&(b.preventDefault(),!1===this.settings.loop&&(this.slidesPosition>this.touchStartPosition&&0===this.selectedSlideIndex||this.slidesPosition<this.touchStartPosition&&this.selectedSlideIndex===this.getTotalSlides()-1)&&(d*=.2),this._moveTo(this.touchStartPosition+d,!0))},_onTouchEnd:function(e){var g=this,f="horizontal"===this.settings.orientation?this.touchDistance.x:this.touchDistance.y;this.$slidesMask.off(this.touchSwipeEvents.moveEvent);
b(document).off(this.touchSwipeEvents.endEvent);this.$slidesMask.removeClass("sp-grabbing").addClass("sp-grab");if(!1===this.isTouchMoving||!0===this.isTouchMoving&&10>Math.abs(this.touchDistance.x)&&10>Math.abs(this.touchDistance.y))b(e.target).parents(".sp-slide").find("a").off("click."+d),this.$slider.removeClass("sp-swiping");setTimeout(function(){g.$slider.removeClass("sp-swiping")},1);!1!==this.isTouchMoving&&(this.isTouchMoving=!1,b(e.target).parents(".sp-slide").one("click",function(a){a.preventDefault()}),
e=-parseInt(this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).css(this.positionProperty),10)+this.visibleOffset,Math.abs(f)<this.settings.touchSwipeThreshold?this._moveTo(e):(f/=this.slideSize+this.settings.slideDistance,f=parseInt(f,10)+(0<f?1:-1),f=this.slidesOrder[b.inArray(this.selectedSlideIndex,this.slidesOrder)-f],!0===this.settings.loop?this.gotoSlide(f):"undefined"!==typeof f?this.gotoSlide(f):this._moveTo(e)))},destroyTouchSwipe:function(){this.$slidesMask.off(this.touchSwipeEvents.startEvent);
this.$slidesMask.off(this.touchSwipeEvents.moveEvent);this.$slidesMask.off("dragstart."+d);b(document).off(this.touchSwipeEvents.endEvent);this.$slidesMask.removeClass("sp-grab")},touchSwipeDefaults:{touchSwipe:!0,touchSwipeThreshold:50}})})(window,jQuery);
(function(h,b){var d="Caption."+b.SliderPro.namespace;b.SliderPro.addModule("Caption",{$captionContainer:null,captionContent:"",initCaption:function(){this.on("update."+d,b.proxy(this._captionOnUpdate,this));this.on("gotoSlide."+d,b.proxy(this._updateCaptionContent,this))},_captionOnUpdate:function(){this.$captionContainer=this.$slider.find(".sp-caption-container");this.$slider.find(".sp-caption").length&&0===this.$captionContainer.length&&(this.$captionContainer=b('<div class="sp-caption-container"></div>').appendTo(this.$slider),
this._updateCaptionContent());this.$slides.find(".sp-caption").each(function(){b(this).css("display","none")})},_updateCaptionContent:function(){var b=this,d=this.$slider.find(".sp-slide").eq(this.selectedSlideIndex).find(".sp-caption"),f=0!==d.length?d.html():"";!0===this.settings.fadeCaption?""!==this.captionContent?(0===parseFloat(this.$captionContainer.css("opacity"),10)&&(this.$captionContainer.css(this.vendorPrefix+"transition",""),this.$captionContainer.css("opacity",1)),this._fadeCaptionTo(0,
function(){b.captionContent=f;""!==f?(b.$captionContainer.html(b.captionContent),b._fadeCaptionTo(1)):b.$captionContainer.empty()})):(this.captionContent=f,this.$captionContainer.html(this.captionContent),this.$captionContainer.css("opacity",0),this._fadeCaptionTo(1)):(this.captionContent=f,this.$captionContainer.html(this.captionContent))},_fadeCaptionTo:function(b,d){var f=this;"css-3d"===this.supportedAnimation||"css-2d"===this.supportedAnimation?(setTimeout(function(){var a={opacity:b};a[f.vendorPrefix+
"transition"]="opacity "+f.settings.captionFadeDuration/1E3+"s";f.$captionContainer.css(a)},1),this.$captionContainer.on(this.transitionEvent,function(a){a.target===a.currentTarget&&(f.$captionContainer.off(f.transitionEvent),f.$captionContainer.css(f.vendorPrefix+"transition",""),"function"===typeof d&&d())})):this.$captionContainer.stop().animate({opacity:b},this.settings.captionFadeDuration,function(){"function"===typeof d&&d()})},destroyCaption:function(){this.off("update."+d);this.off("gotoSlide."+
d);this.$captionContainer.remove();this.$slider.find(".sp-caption").each(function(){b(this).css("display","")})},captionDefaults:{fadeCaption:!0,captionFadeDuration:500}})})(window,jQuery);
(function(h,b){var d="Autoplay."+b.SliderPro.namespace;b.SliderPro.addModule("Autoplay",{autoplayTimer:null,isTimerRunning:!1,isTimerPaused:!1,initAutoplay:function(){this.on("update."+d,b.proxy(this._autoplayOnUpdate,this))},_autoplayOnUpdate:function(e){!0===this.settings.autoplay?(this.on("gotoSlide."+d,b.proxy(this._autoplayOnGotoSlide,this)),this.on("mouseenter."+d,b.proxy(this._autoplayOnMouseEnter,this)),this.on("mouseleave."+d,b.proxy(this._autoplayOnMouseLeave,this)),this.startAutoplay()):
(this.off("gotoSlide."+d),this.off("mouseenter."+d),this.off("mouseleave."+d),this.stopAutoplay())},_autoplayOnGotoSlide:function(b){!0===this.isTimerRunning&&this.stopAutoplay();!1===this.isTimerPaused&&this.startAutoplay()},_autoplayOnMouseEnter:function(b){!this.isTimerRunning||"pause"!==this.settings.autoplayOnHover&&"stop"!==this.settings.autoplayOnHover||(this.stopAutoplay(),this.isTimerPaused=!0)},_autoplayOnMouseLeave:function(b){!0===this.settings.autoplay&&!1===this.isTimerRunning&&"stop"!==
this.settings.autoplayOnHover&&(this.startAutoplay(),this.isTimerPaused=!1)},startAutoplay:function(){var b=this;this.isTimerRunning=!0;this.autoplayTimer=setTimeout(function(){"normal"===b.settings.autoplayDirection?b.nextSlide():"backwards"===b.settings.autoplayDirection&&b.previousSlide()},this.settings.autoplayDelay)},stopAutoplay:function(){this.isTimerPaused=this.isTimerRunning=!1;clearTimeout(this.autoplayTimer)},destroyAutoplay:function(){clearTimeout(this.autoplayTimer);this.off("update."+
d);this.off("gotoSlide."+d);this.off("mouseenter."+d);this.off("mouseleave."+d)},autoplayDefaults:{autoplay:!0,autoplayDelay:5E3,autoplayDirection:"normal",autoplayOnHover:"pause"}})})(window,jQuery);
(function(h,b){var d="Keyboard."+b.SliderPro.namespace;b.SliderPro.addModule("Keyboard",{initKeyboard:function(){var e=this,g=!1;!1!==this.settings.keyboard&&(this.$slider.on("focus."+d,function(){g=!0}),this.$slider.on("blur."+d,function(){g=!1}),b(document).on("keydown."+this.uniqueId+"."+d,function(b){if(!0!==e.settings.keyboardOnlyOnFocus||!1!==g)37===b.which?e.previousSlide():39===b.which?e.nextSlide():13===b.which&&e.$slider.find(".sp-slide").eq(e.selectedSlideIndex).find(".sp-image-container a")[0].click()}))},
destroyKeyboard:function(){this.$slider.off("focus."+d);this.$slider.off("blur."+d);b(document).off("keydown."+this.uniqueId+"."+d)},keyboardDefaults:{keyboard:!0,keyboardOnlyOnFocus:!1}})})(window,jQuery);
(function(h,b){var d="Buttons."+b.SliderPro.namespace;b.SliderPro.addModule("Buttons",{$buttons:null,initButtons:function(){this.on("update."+d,b.proxy(this._buttonsOnUpdate,this))},_buttonsOnUpdate:function(){this.$buttons=this.$slider.find(".sp-buttons");!0===this.settings.buttons&&1<this.getTotalSlides()&&0===this.$buttons.length?this._createButtons():!0===this.settings.buttons&&this.getTotalSlides()!==this.$buttons.find(".sp-button").length&&0!==this.$buttons.length?this._adjustButtons():(!1===
this.settings.buttons||1>=this.getTotalSlides()&&0!==this.$buttons.length)&&this._removeButtons()},_createButtons:function(){var e=this;this.$buttons=b('<div class="sp-buttons"></div>').appendTo(this.$slider);for(var g=0;g<this.getTotalSlides();g++)b('<div class="sp-button"></div>').appendTo(this.$buttons);this.$buttons.on("click."+d,".sp-button",function(){e.gotoSlide(b(this).index())});this.$buttons.find(".sp-button").eq(this.selectedSlideIndex).addClass("sp-selected-button");this.on("gotoSlide."+
d,function(b){e.$buttons.find(".sp-selected-button").removeClass("sp-selected-button");e.$buttons.find(".sp-button").eq(b.index).addClass("sp-selected-button")});this.$slider.addClass("sp-has-buttons")},_adjustButtons:function(){this.$buttons.empty();for(var d=0;d<this.getTotalSlides();d++)b('<div class="sp-button"></div>').appendTo(this.$buttons);this.$buttons.find(".sp-selected-button").removeClass("sp-selected-button");this.$buttons.find(".sp-button").eq(this.selectedSlideIndex).addClass("sp-selected-button")},
_removeButtons:function(){this.$buttons.off("click."+d,".sp-button");this.off("gotoSlide."+d);this.$buttons.remove();this.$slider.removeClass("sp-has-buttons")},destroyButtons:function(){this._removeButtons();this.off("update."+d)},buttonsDefaults:{buttons:!0}})})(window,jQuery);
(function(h,b){var d="Arrows."+b.SliderPro.namespace;b.SliderPro.addModule("Arrows",{$arrows:null,$previousArrow:null,$nextArrow:null,initArrows:function(){this.on("update."+d,b.proxy(this._arrowsOnUpdate,this));this.on("gotoSlide."+d,b.proxy(this._checkArrowsVisibility,this))},_arrowsOnUpdate:function(){var e=this;!0===this.settings.arrows&&null===this.$arrows?(this.$arrows=b('<div class="sp-arrows"></div>').appendTo(this.$slidesContainer),this.$previousArrow=b('<div class="sp-arrow sp-previous-arrow"></div>').appendTo(this.$arrows),
this.$nextArrow=b('<div class="sp-arrow sp-next-arrow"></div>').appendTo(this.$arrows),this.$previousArrow.on("click."+d,function(){e.previousSlide()}),this.$nextArrow.on("click."+d,function(){e.nextSlide()}),this._checkArrowsVisibility()):!1===this.settings.arrows&&null!==this.$arrows&&this._removeArrows();!0===this.settings.arrows&&(!0===this.settings.fadeArrows?this.$arrows.addClass("sp-fade-arrows"):!1===this.settings.fadeArrows&&this.$arrows.removeClass("sp-fade-arrows"))},_checkArrowsVisibility:function(){!1!==
this.settings.arrows&&!0!==this.settings.loop&&(0===this.selectedSlideIndex?this.$previousArrow.css("display","none"):this.$previousArrow.css("display","block"),this.selectedSlideIndex===this.getTotalSlides()-1?this.$nextArrow.css("display","none"):this.$nextArrow.css("display","block"))},_removeArrows:function(){null!==this.$arrows&&(this.$previousArrow.off("click."+d),this.$nextArrow.off("click."+d),this.$arrows.remove(),this.$arrows=null)},destroyArrows:function(){this._removeArrows();this.off("update."+
d);this.off("gotoSlide."+d)},arrowsDefaults:{arrows:!1,fadeArrows:!0}})})(window,jQuery);