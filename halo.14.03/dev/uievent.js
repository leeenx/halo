/*
    @author:leeenx
    @自定义事件
*/
halo.use(function(m){
    //事件统一
    var TOUCH='stop',BEFORE_TOUCH='',TOUCH_X=0,TOUCH_Y=0,OFFSET_X=0,OFFSET_Y=0,vector_x=0,vector_y=0,sense_x=10,sense_y=10/*手指灵敏度*/,min_vector=50/*手势成立最小位移*/,gesture_time=500/*200毫秒内手指完成手势*/,start_time=0,end_time=0,longpress_time=500;
    if('ontouchstart' in document){
        var touchstart='touchstart',touchend='touchend',touchmove='touchmove';
    }else{
        var touchstart='mousedown',touchend='mouseup',touchmove='mousemove';
    }
    document.body.addEventListener(touchstart,
        function(e){
            TOUCH='start',BEFORE_TOUCH='',OFFSET_X=0,OFFSET_Y=0,vector_x=0,vector_y=0,start_time=new Date().getTime();
            if('touchstart'==touchstart){
                var touchers=e.changedTouches||e.targetTouches,toucher=touchers[0];
                TOUCH_X=toucher.pageX,TOUCH_Y=toucher.pageY;
            }else{
                TOUCH_X=e.clientX,TOUCH_Y=e.clientY;
            }
        },true);
    document.body.addEventListener(touchmove,
        function(e){
            if('start'!=TOUCH&&'move'!=TOUCH)return ;
            var offset_x=0,offset_y=0;
            if('touchstart'==touchstart){
                var touchers=e.changedTouches||e.targetTouches,toucher=touchers[0];
                vector_x=toucher.pageX-TOUCH_X,vector_y=toucher.pageY-TOUCH_Y;
                offset_x=Math.abs(vector_x),offset_y=Math.abs(vector_y);
            }else{
                offset_x=Math.abs(e.clientX-TOUCH_X),offset_y=Math.abs(e.clientY-TOUCH_Y);
            }
            if(offset_x>sense_x||offset_y>sense_y){
                BEFORE_TOUCH=TOUCH,
                TOUCH='move';//手指移动在sense_x,sense_y内都不算move
            }
            OFFSET_X=offset_x,OFFSET_Y=offset_y;
            end_time=new Date().getTime();
        },true);
    document.body.addEventListener(touchend,function(e){
        BEFORE_TOUCH=TOUCH,TOUCH='stop';
    },true);
    document.body.addEventListener('touchcancel',function(e){BEFORE_TOUCH=TOUCH,TOUCH='stop';},true);
    //transitionend和animationend事件
    var transitionend=function(){
        switch(m.webkit){
            case '-webkit-':return 'webkitTransitionEnd';
            case '-ms-':return 'MSTransitionEnd';
            case '-o-':return 'oTransitionEnd';
            default:return 'transitionend';
        }
    }(),
    animationend=function(){
        switch(m.webkit){
            case '-webkit-':return 'webkitAnimationEnd';
            case '-ms-':return 'MSAnimationEnd';
            case '-o-':return 'oAnimationEnd';
            default:return 'animationend';
        }
    }(),
    animationstart=function(){
        switch(m.webkit){
            case '-webkit-':return 'webkitAnimationStart';
            case '-ms-':return 'MSAnimationStart';
            case '-o-':return 'oAnimationStart';
            default:return 'animationstart';
        }
    }(),
    animationiteration=function(){
        switch(m.webkit){
            case '-webkit-':return 'webkitAnimationIteration';
            case '-ms-':return 'MSAnimationIteration';
            case '-o-':return 'oAnimationIteration';
            default:return 'animationiteration';
        }
    }();
    var triggerEvent='';
    var uievent={
        //新事件的名字 - 如果与原生事件重名，原生事件将会被覆盖
        'fingermove':[
            //用fingermove取代原来的touchmove
            function(e,cb){
                e.preventDefault();
                if('move'==TOUCH||'fingermove'==triggerEvent){//符合事件，触发事件回调
                    cb.call(this,e);
                }
            },
            touchmove//对应的原生事件（如果是组合事件，就是最后一个被触发的组合事件）
        ],
        'flick':[
            function(e,cb){
                if('start'==BEFORE_TOUCH||'flick'==triggerEvent){
                    cb.call(this,e);
                }
            },
            touchend
        ],
        'gesture_left':[
            function(e,cb){
                //手势向左
                if(OFFSET_X>=OFFSET_Y&&vector_x<=-1*min_vector&&(end_time-start_time<=gesture_time)||'gesture_left'==triggerEvent){
                    cb.call(this,e);
                }
            },
            touchend
        ],
        'gesture_right':[
            function(e,cb){
                if(OFFSET_X>=OFFSET_Y&&vector_x>=min_vector&&(end_time-start_time<=gesture_time)||'gesture_right'==triggerEvent){
                    cb.call(this,e);
                }
            },
            touchend
        ],
        'gesture_up':[
            function(e,cb){
                //手势向上
                if(OFFSET_Y>=OFFSET_X&&vector_y<=-1*min_vector&&(end_time-start_time<=gesture_time)||'gesture_up'==triggerEvent){
                    cb.call(this,e);
                }
            },
            touchend
        ],
        'gesture_down':[function(e,cb){
                //手势向下
                if(OFFSET_Y>=OFFSET_X&&vector_y>=min_vector&&(end_time-start_time<=gesture_time)||'gesture_down'==triggerEvent){
                    cb.call(this,e);
                }
            },
            touchend
        ],
        'release':[function(e,cb){
                if('move'==BEFORE_TOUCH||'start'==BEFORE_TOUCH||'release'==triggerEvent){
                    cb.call(this,e);
                }
            },
            touchend
        ],
        'forcerelease':[function(e,cb){
                //touchmove后touchend/touchcancel
                if('move'==BEFORE_TOUCH||'start'==BEFORE_TOUCH||'forcerelease'==triggerEvent){
                    cb.call(this,e);
                }
            },
            'touchcancel'
        ],
        'hold':[function(e,cb){
                if('hold'==triggerEvent)cb.call(_this,e);
                var _this=this,_start_time=start_time;
                setTimeout(function(){
                    if(_start_time==start_time&&'stop'!=TOUCH){
                        cb.call(_this,e);
                    }
                },longpress_time);
            },
            touchstart
        ],
        'dblclick':[function(e,cb){
            if(isDblClk()||'dblclick'==triggerEvent){
                cb.call(this,e);
            }
        },
            touchend
        ],
        'transitionend':[function(e,cb){
                cb.call(this,e);
            },
            transitionend
        ],
        'animationend':[function(e,cb){
                cb.call(this,e);
            },
            animationend
        ],
        'animationstart':[function(e,cb){
                cb.call(this,e);
            },
            animationstart
        ],
        'animationiteration':[function(e,cb){
                cb.call(this,e);
            },
            animationiteration
        ],


        //设置sense_y和sense_x
        setFingerMove:function(x,y){//设置fingermove的最小偏移量
            x=x||sense_x,y=y||sense_y;
            sense_x=x,sense_y=y;
        }
    };
    var isDblClk=function(){
        var timestamp=0;
        return function(){
            if('start'!=BEFORE_TOUCH)return ;//需要是两次flick才算是dblclk
            var _timestamp=new Date().getTime();
            if(_timestamp-timestamp<=500){
                //.5s内的连点为double click事件
                timestamp=0;//置0为下次一次double click做准备
                return true;
            }else{
                timestamp=_timestamp;
                return false;
            }
        }
    }();
    halo.add('uievent',uievent);
    /*
        @添加触发事件方法，因为有定制事件的存在，所以需要在这里添加这个方法
    */
    var trigger=function(dom,en){
        if(!dom||!en)return ;//没有dom直接中断
        triggerEvent=en;
        if(en!='setFingerMove'&&uievent[en]){
            //定制事件里有eventname，需要触发定制事件
            en=uievent[en][1];//真实的event名
        }
        //统一触发事件
        var ev=document.createEvent('HTMLEvents');
        ev.initEvent(en,true,true);
        dom.dispatchEvent(ev);
        triggerEvent='';//把triggerEvent名字重置
    };
    halo.add('trigger',trigger);
});