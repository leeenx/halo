/*
    @author:leeenx
    @简单的页面滑动
    @原来四向页面的精简版本 - 只能绑定x轴或y轴中的一个
*/
halo.use(function(m){
    var webkit=m.webkit,addClass=m.addClass,removeClass=m.removeClass;
    //添加滚动效果
    m.stylesheet('.PAGE_DRAG_KEEP{'+webkit+'transition:'+webkit+'transform .3s linear;}');//竖屏
    m.stylesheet('.PAGE_DRAG_H_KEEP{'+webkit+'transition:'+webkit+'transform .2s linear;}');//横屏
    m.stylesheet('.PAGE_DRAG_RESTORE{'+webkit+'transition:'+webkit+'transform .2s linear;}');//弹性
    var get_transform_value=function(transform,key,index){
        //transform即transform的所有属性,key键名，index_arr按数组索引取value
        key=key.replace(/\-/g,'\\-');
        var index_list=[0];
        if(arguments.length>2){
            for(var i=2;i<arguments.length;++i){
                index_list[i-2]=arguments[i];
            }
        }
        if('none'==transform||''==transform)return null;//没有值，直接中断
        var reg=new RegExp(key+'\\(([^\\)]+)\\)','ig'),key_value=transform.match(reg),value_list=[],ret=[];
        if(key_value&&key_value.length>0){
            key_value=key_value[0];
            value_list=key_value.replace(reg,'$1').split(',');
            for(var i=0;i<index_list.length;++i){
                ret.push(value_list[index_list[i]]);
            }
        }
        if(ret.length==1)ret=ret[0];
        else if(index)ret=ret[index];
        return ret;
    }
    halo.add('pagedrag',function(){
        var ch=document.documentElement.clientHeight,cw=document.documentElement.clientWidth;
        window.addEventListener('resize',function(){
            ch=document.documentElement.clientHeight,cw=document.documentElement.clientWidth;
        },false);
        var bind=function(elem,direction,just_motion){
            //direction - 表示坐标轴， just_motion - 表示当手势与direction相匹配时页面才会滚动 默认为false
            //启用just_motion可以与父元素复合完成四向滑动
            !just_motion||(just_motion='Y');
            direction='X'==direction.toUpperCase()?"X":"Y";//默认绑定Y轴
            var keep='X'==direction?'PAGE_DRAG_H_KEEP':'PAGE_DRAG_KEEP',restore='PAGE_DRAG_RESTORE',sh=elem.scrollHeight,sw=elem.scrollWidth,total='X'==direction?(Math.ceil(sw/cw)):(Math.ceil(sh/ch)),cur=0,previous=-1,next=1,start_x=0,start_y=0,x=0,y=0,offset=0,motion='none',lock=false,ondrag=false;
            var drag_start=function(e){
                if(lock)return ;
                ondrag=false;
                var toucher=e.targetTouches||e.changedTouches,transform=elem.style[webkit+'transform']||'';
                start_x=toucher[0].pageX,x=parseInt(get_transform_value(transform,'translate3d',0))||0,start_y=toucher[0].pageY,y=parseInt(get_transform_value(transform,'translate3d',1))||0,offset=0;
                if(!sw&&!sh){
                    //需要重新取值
                    sh=elem.scrollHeight,sw=elem.scrollWidth,total='X'==direction?(Math.ceil(sw/cw)):(Math.ceil(sh/ch)),next=fix_page(cur+1),previous=fix_page(cur-1);
                }
                motion='none';//手势为none
                //e.stopPropagation();
                //e.preventDefault();
            },drag=function(e){
                e.preventDefault(),e.stopPropagation();//禁止冒泡，与滚动禁止
                if(lock)return ;
                ondrag=true;
                var toucher=e.targetTouches||e.changedTouches,_x=toucher[0].pageX,_y=toucher[0].pageY;
                if(just_motion&&'none'==motion){
                    //需要与手势方向一致的判断
                    var offset_x=_x-start_x,offset_y=_y-start_y;
                    if(Math.abs(offset_x)==Math.abs(offset_y)){
                        e.preventDefault(),e.stopPropagation();
                        return ;//分不出方向，等待分清方向
                    }else if(Math.abs(offset_x)>Math.abs(offset_y)){
                        motion='X';
                    }else{
                        motion="Y";
                    }
                    if(motion!=direction){
                        //方向不一致，解绑事件
                        m.off(elem,'touchmove',drag,false);
                        m.off(elem,'release',release,false);
                        //手指离开后，重新绑定原来的事件
                        m.on(elem,'release',rebind,false);
                        return ;
                    }
                }
                var _s=1;//如果是触底，则页面移动速度是手指的1/3;
                if('X'==direction){
                    offset=_x-start_x;
                    _s=((cur==0&&offset>0)||(cur==total-1&&offset<0))?1/3:1;
                    this.style[webkit+'transform']='translate3d('+(x+offset*_s)+'px,0,0)';
                }else{
                    offset=_y-start_y;
                    _s=((cur==0&&offset>0)||(cur==total-1&&offset<0))?1/3:1;
                    this.style[webkit+'transform']='translate3d(0,'+(y+offset*_s)+'px,0)'
                }
            },release=function(e){
                lock=true;//上锁
                if(just_motion){
                    e.stopPropagation();//阻止冒泡
                }
                var toucher=e.targetTouches||e.changedTouches,min_offset=o.offset||50;/*默认位移超50px即可翻页*/
                if(Math.abs(offset)<min_offset||(offset<0&&cur==total-1)||(offset>0&&cur==0)){
                    turnback();
                }else{
                    if(offset<0){
                        move(next);
                    }else{
                        move(previous);
                    }
                }
            },rebind=function(){
                m.off(this,'release',rebind,false),m.on(elem,'touchmove',drag,false),m.on(elem,'release',release,false);
            },unbind=function(e){
                m.off(e,'touchstart',drag_start,false);
                m.off(e,'touchmove',drag,false);
                m.off(e,'touchend',release,false);
            },moveto=function(index,no_keep){
                //对外暴露的接口
                if(ondrag)return;//手指在拖曳过程，不执行
                move(index,no_keep);
            },move=function(index,no_keep){
                no_keep=typeof(no_keep)=='undefined'?false:no_keep;
                no_keep||addClass(elem,keep);
                if("X"==direction){
                    elem.style[webkit+'transform']='translate3d(-'+(index*cw)+'px,0,0)';
                }else{
                    elem.style[webkit+'transform']='translate3d(0,-'+(index*ch)+'px,0)';
                }
                setTimeout(function(){
                    removeClass(elem,keep);
                    if(typeof(o.page_change)=="function")o.page_change(cur,index);
                    cur=index,next=cur+1,previous=cur-1;
                    cur=fix_page(cur),next=fix_page(next),previous=fix_page(previous);
                    lock=false;//解锁
                    ondrag=false;
                },300)
            },turnback=function(){
                //回退到原来位置
                addClass(elem,restore);
                if('X'==direction){
                    elem.style[webkit+'transform']='translate3d(-'+cur*cw+'px,0,0)';
                }else{
                    elem.style[webkit+'transform']='translate3d(0,-'+cur*ch+'px,0)';
                }
                setTimeout(function(){
                    removeClass(elem,restore);
                    lock=false;//解锁
                    ondrag=false;
                },200);
            },fix_page=function(num){
                if(!total)return num;
                //使页码正确
                if(num>=0){
                    return num%total;
                }else{
                    return (total+num%total);
                }
            }
            //elem.addEventListener(touchstart,drag_start,false),elem.addEventListener(touchmove,drag,false),elem.addEventListener(touchend,release,false);
            m.on(elem,'touchstart',drag_start,false),m.on(elem,'touchmove',drag,false),m.on(elem,'release',release,false),m.on(elem,'forcerelease',release,false);
            var o={unbind:unbind,move:moveto};
            o.setAuthor=function(){
                var _author=document.createElement('div'),_author2=document.createElement('div');
                _author.style.cssText='position: absolute; width: 100%; height: 22px; line-height: 22px; color: rgba(255,255,255,.5); font-size: 12px; font-weight: normal; top:45px; left: 0; text-align: center;',
                _author2.style.cssText='position: absolute; width: 100%; height: 22px; line-height: 22px; color: rgba(255,255,255,.5); font-size: 12px; font-weight: normal; bottom:45px; left: 0; text-align: center;';
                elem.parentNode.insertBefore(_author,elem),elem.parentNode.insertBefore(_author2,elem);
                return function(author){
                    _author.innerHTML=_author2.innerHTML=author||'';
                }
            }();
            return o;
        }
        return {bind:bind}
    }())
});