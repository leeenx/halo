var halo=function(){var version="20140624";var modules={length:0};var needWait=true,path="/wx/js/halo.14.03/",host="http://static.paipaiimg.com",comboPath="/c/",combo=true;var _fun=function(){},_fun_=function(){};_fun.prototype=modules,_fun_.prototype=new _fun();var _modules=new _fun_();var load_module=function(filename,cb){var script=document.createElement("script");script.onload=function(){if(typeof(cb)=="function"){cb("success")}};script.onerror=function(){if(typeof(cb)=="function"){cb("error")}};script.onabort=function(){if(typeof(cb)=="function"){cb("abort")}};script.type="text/javascript";combo?script.src=host+comboPath+"="+filename+"?v="+version:script.src=host+path+filename+".js?v="+version;document.head.appendChild(script)};var on=function(elem,event,cb,type){var pm_cb=evcb.set(elem,event,cb);event=_event(event);elem.addEventListener(event,pm_cb,type)},off=function(elem,event,cb,type){if(typeof(cb)=="undefined"){evcb.del(elem,event)}else{var pm_cb=evcb.get(elem,event,cb,"remove_cb");event=_event(event);elem.removeEventListener(event,pm_cb,type)}},evcb=function(){var ev={},set=function(elem,event,cb){var tag=elem.getAttribute("haloEV");if(!tag){tag="pm_"+new Date().getTime(),elem.setAttribute("haloEV",tag)}ev[tag]=ev[tag]||{},ev[tag][event]=ev[tag][event]||{pm_cb:[],cb:[]},ev[tag][event].cb.push(cb);if(modules.uievent&&modules.uievent[event]){var pm_cb=function(e){modules.uievent[event][0].call(this,make_touch_event(e),cb)}}else{var pm_cb=function(e){cb.call(this,make_touch_event(e))}}ev[tag][event].pm_cb.push(pm_cb);return pm_cb},get=function(elem,event,cb,remove){var tag=elem.getAttribute("haloEV");if(!tag){return}if(ev[tag]&&ev[tag][event]){for(var i=0,evs=ev[tag][event],len=evs.cb.length;i<len;++i){if(evs.cb[i]==cb){var ret=evs.pm_cb[i];if(remove){delete evs.cb[i],delete evs.pm_cb[i]}return ret}}return cb}},del=function(elem,event){var tag=elem.getAttribute("haloEV"),_event_=_event(event);if(!tag){return}if(ev[tag]&&ev[tag][event]){for(var i=0,evs=ev[tag][event],len=evs.cb.length;i<len;++i){elem.removeEventListener(_event_,evs.pm_cb[i],false);elem.removeEventListener(_event_,evs.pm_cb[i],true)}}},_o={set:set,get:get,del:del};return _o}(),_event=function(event){if(modules.uievent&&modules.uievent[event]){return modules.uievent[event][1]}return event},make_touch_event=function(e){if("ontouchstart" in window){e.touches=e.targetTouches=[{pageX:e.clientX,pageY:e.clientY,target:e.target}]}return e};var webkit=function(){var css3_div=document.createElement("div");css3_div.style.cssText="-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;";if(css3_div.style.webkitTransition){return"-webkit-"}else{if(css3_div.style.MozTransition){return"-moz-"}else{if(css3_div.style.oTransition){return"-o-"}else{if(css3_div.style.msTransition){return"-ms-"}else{return""}}}}}();var STYLESHEET=function(){var styleSheet=function(){var head=document.getElementsByTagName("head")[0];var style=document.createElement("style");style.type="text/css";head.appendChild(style);return document.styleSheets[document.styleSheets.length-1]}();function addStyleSheet(cssText){var oCss=styleSheet,cssRules=cssText.split("\r\n");var len=!!oCss.cssRules?oCss.cssRules.length:0;for(var i=0;i<cssRules.length;++i){oCss.insertRule(cssRules[i],len++)}return len}return{add:addStyleSheet}}();var addClass=function(elem,_class){var className=elem.className,classReg=new RegExp("(^"+_class+"\\s+)|(\\s+"+_class+"\\s+)|(\\s+"+_class+"$)|(^"+_class+"$)","g");if(!className){elem.className=_class}else{if(classReg.test(className)){return}else{elem.className=className+" "+_class}}};var removeClass=function(elem,_class){var className=elem.className,classReg=new RegExp("(^"+_class+"\\s+)|(\\s+"+_class+"\\s+)|(\\s+"+_class+"$)|(^"+_class+"$)","g");className=className.replace(classReg,function(k,$1,$2,$3,$4){if($2){return" "}else{return""}});elem.className=className};var hasClass=function(elem,_class){var className=elem.className,classReg=new RegExp("(^"+_class+"\\s+)|(\\s+"+_class+"\\s+)|(\\s+"+_class+"$)|(^"+_class+"$)","g");if(classReg.test(className)){return true}else{return false}};modules.on=on,modules.off=off,modules.removeClass=removeClass,modules.addClass=addClass,modules.hasClass=hasClass,modules.stylesheet=STYLESHEET.add,modules.webkit=webkit;var config=function(o){if(typeof(o.wait)!="undefined"){needWait=!!o.wait}path=o.path||path;o.hasOwnProperty("combo")&&(combo=o.combo);o.hasOwnProperty("host")&&(host=o.host);o.hasOwnProperty("version")&&(version=o.version);return halo};var add=function(name,fun){if(modules[name]){throw ("this has existed!")}else{modules[name]=fun;++modules.length}};var use=function(){var arg=arguments,need_load_count=0,loaded_count=0,cb=function(){},wait=needWait,names="";for(var i=0,len=arg.length;i<len;++i){var name=arg[i];if(typeof(name)=="string"){++need_load_count;if(!!modules[name]){++loaded_count}else{combo?(names+=(0!=i?",":"")+path+name+".js"):(function(name){load_module(name,function(ret){if("success"){++loaded_count
}else{throw ("public file load fail!")}})}(name))}}else{break}}!!combo&&!!names&&load_module(names,function(){loaded_count=need_load_count});if(typeof(arg[i])=="function"){cb=arg[i];if(typeof(arg[i+1])!="undefined"){wait=!!arg[i+1]}}if(!wait){_modules.onready=function(cb){_modules.ready=typeof(cb)=="function"?cb:function(){}};cb(_modules)}chkLoad();function chkLoad(){if(loaded_count==need_load_count){if(wait){cb(modules)}else{_modules.ready(modules)}}else{setTimeout(chkLoad,500)}}function chkReg(name,cb){if(modules[name]){if(typeof(cb)=="function"){cb()}}else{setTimeout(function(){chkReg(name,cb)},500)}}return halo};return{add:add,use:use,config:config,on:on,off:off,stylesheet:STYLESHEET.add}}();