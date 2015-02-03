/*
  @author:leeenx
  @滚动效果增强模块/android 2.3.x以下浏览器非body元素scroll解决方案
*/
halo.use(function(m){
  halo.add('ezscroll',function(){
    /*给元素添加scroll功能*/
    var scrollCss='.show_scroll{overflow:auto!important;}\r\n\
            .scroll::-webkit-scrollbar{width:5px; height:5px;}\r\n\
            .scroll::-webkit-scrollbar-button{width:0;height:0;}\r\n\
            .scroll::-webkit-scrollbar-corner{display:block; }\r\n\
            .scroll::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:rgba(0,0,0,.2);border-radius:8px;}\r\n\
            .scroll::-webkit-scrollbar-thumb:hover{background-clip:padding-box;background-color:rgba(0,0,0,.5);border-radius:8px;}';
    m.stylesheet(scrollCss);
    var browser={
      versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
          iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
          weixin:u.indexOf('MicroMessenger')>-1
        };
           }(),
           language:(navigator.browserLanguage || navigator.language).toLowerCase(),
       versionNum:function(){
        /*版本号,只针对android*/
        var u = navigator.userAgent,matchIndex=u.indexOf('Android');
        if(matchIndex>-1){
          var num=u.substring(matchIndex+7,matchIndex+11).replace(/[^0-9\.]/g,'');
          return parseFloat(num);
        }
        return '';
       }(),
       avail:function(){
        return {width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}; 
       }();
    };
    function autoscroll(dom,show_scroll){/*根据浏览判断dom元素需不需要bindscroll*/
      var pause=false,bindscroll=function(dom,show_scroll){
        var finger_x=0,finger_y=0,timestamp=0,interval=0,x_speed=0,y_speed=0,x_direct=0,y_direct=0,touching=true,moderate_timer/*手坐标*/;
        dom.addEventListener('touchstart',function(e){
          pause=false;
          scrollWidth=dom.scrollWidth,scrollHeight=dom.scrollHeight,max_scrollLeft=scrollWidth-width,max_scrollTop=scrollHeight-height;
          finger_x=e.targetTouches[0].pageX,finger_y=e.targetTouches[0].pageY,timestamp=e.timeStamp/*parseFloat(new Date().getTime())*/,touching=true;
          if(typeof(moderate_timer)!='undefined'){clearTimeout(moderate_timer)};
          e.preventDefault();
          /*停止运动*/
        },false);
        dom.addEventListener('touchmove',function(e){
          e.preventDefault();
          if(pause)return ;
          var _finger_x=e.targetTouches[0].pageX,_finger_y=e.targetTouches[0].pageY,_timestamp=e.timeStamp/*parseFloat(new Date().getTime())*/;/*当前手指坐标*/
          this.scrollLeft+=(finger_x-_finger_x),this.scrollTop+=(finger_y-_finger_y);
          x_speed=finger_x-_finger_x,y_speed=finger_y-_finger_y;/*滚动速度*/
          interval=_timestamp-timestamp;
          timestamp=_timestamp;
          finger_x=_finger_x,finger_y=_finger_y;
        },false);/*随手指滚动*/
        dom.addEventListener('touchend',function(e){
          touching=false;
          e.preventDefault();
          if(pause)return ;
          var _finger_x=e.changedTouches[0].pageX,_finger_y=e.changedTouches[0].pageY,_timestamp=e.timeStamp/*new Date().getTime()*/;/*当前手指坐标*/
          /*速度*/
          if(_timestamp-timestamp>150){/*如果大于0.15秒，速度停止*/
            x_speed=0,y_speed=0;return ;
          }else{
            x_speed=x_speed*perTime/interval,y_speed=y_speed*perTime/interval;
          }
          var width=this.offsetWidth,height=this.offsetHeight,scrollWidth=this.scrollWidth,scrollHeight=this.scrollHeight,direct={};
          if(x_speed>0){x_direct=1;}else if(x_speed<0){x_direct=-1;}else{x_direct=0;};
          if(y_speed>0){y_direct=1;}else if(y_speed<0){y_direct=-1;}else{y_direct=0;};
          var x_duration=Math.abs(x_speed/x_a),y_duration=Math.abs(y_speed/y_a);
          duration=x_duration>y_duration?x_duration:y_duration;/*计算需要时长*/
          duration=Math.ceil(duration);
          y_scroll=dom.scrollTop,x_scroll=dom.scrollLeft;
          moderate();
        },false);/*手指离开后，做减速运动*/
        /*减速运动变量*/
        var width=dom.offsetWidth,height=dom.offsetHeight,scrollWidth=dom.scrollWidth,scrollHeight=dom.scrollHeight,max_scrollLeft=scrollWidth-width,max_scrollTop=scrollHeight-height,x_scroll=0,y_scroll=0,perTime=10/*手指离开后减速运动的时间间隔*/,x_a=0.2,y_a=0.2/*减速度*/,duration=0/*运动持续时长*/;
        function moderate(spending){
          if(touching){
            return ;
          }
          if(typeof(spending)=='undefined'){spending=0;/*已经耗时*/};
          if(++spending<=duration){/*指定时间内的运动*/
            if(0!=x_direct){/*x轴方向存在运动*/
              dom.scrollLeft=x_scroll+x_speed*spending-x_direct*x_a*spending*spending*0.5;
              if((0==dom.scrollLeft&&-1==x_direct)||(max_scrollLeft<=dom.scrollLeft&&1==x_direct)){
                x_direct=0;
              }
            }
            if(0!=y_direct){/*y轴方向存在运动*/
              var distance=y_scroll+y_speed*spending-y_direct*y_a*spending*spending*0.5;
              dom.scrollTop=distance;
              if((0==dom.scrollTop && -1==y_direct)||(max_scrollTop<=dom.scrollTop && 1==y_direct)){
                y_direct=0;
              }
            };
            if(0!=x_direct || 0!=y_direct){/*纵向或横向没有运动方向时停止*/
              moderate_timer=setTimeout(function(){moderate(spending);},perTime);
            }
          }
        }
      },prevent=function(e){e.preventDefault();};
      if(show_scroll){//显示滚动条
        dom.style.overflow='hidden';
        setTimeout(function(){
          m.addClass(dom,'scroll'),m.addClass(dom,'show_scroll');
        },100);
      }
      if(browser.versions.android&&browser.versionNum==4.0){
        //android 4.0x系列自动降级到原生滚动
      }else{
        bindscroll(dom,show_scroll);
      }
    };
    return {bindscroll:autoscroll,bind:autoscroll};
    //bindscroll是为了兼容早期版本
  }());
});