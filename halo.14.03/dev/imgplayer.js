/*
    @author:leeenx
    @图片轮播器
*/
halo.use(function(m){
     var webkit=m.webkit,addClass=m.addClass,removeClass=m.removeClass,get_transfrom_value=m.get_transfrom_value;
    //添加滚动效果
    m.stylesheet('.PAGE_DRAG_KEEP{'+webkit+'transition:'+webkit+'transform .2s linear;}');//竖屏
    m.stylesheet('.PAGE_DRAG_H_KEEP{'+webkit+'transition:'+webkit+'transform .2s linear;}');//横屏
    m.stylesheet('.PAGE_DRAG_RESTORE{'+webkit+'transition:'+webkit+'transform .1s linear;}');//弹性
    halo.add('imgplayer',function(dom,motion,showNumList){
        if(!dom){
            throw('parameter is not a DOM object!');
            return ;
        }
        if(typeof(motio)=='boolean')showNumList=motion,motion='X';
        if(typeof(showNumList)=='undefined')showNumList=true;
        motion=motion||'X',motion=motion.toUpperCase();//默认的绑定方向是X轴
        var positon=m.css(dom,'positon');
        if('static'==positon||!positon)dom.style.position='relative';//默认要是relative
        var container=document.createElement("div");
        container.style.cssText='position:absolute; width:100%; height:100%; left:0; top:0;';
        var childNodes=dom.childNodes,len=0,images=[];
        while(childNodes.length){
            if(childNodes[0].nodeType==1)childNodes[0].style.cssText='position:absolute; width:100%; height:100%; overflow:hidden; left:0; top:0; '+(0==len?'display:block;':' display:none;'),++len,images.push(childNodes[0]);
             container.appendChild(childNodes[0]);
        }
        dom.appendChild(container);
        if(len<=1)return ;//1个图片以下不作处理
        //展示小icon
        var numListController={move:function(){}};
        if(showNumList){
            var numList=document.createElement('div'),out='border:1px solid rgba(0,0,0,.3); background-color:rgba(255,255,255,.3);',iconCss='position:relative; display:inline-block; width:8px; height:8px; overflow:hidden; border-radius:5px;',on='border:1px solid rgba(0,0,0,0); background-color:#e62548;',str='';
            numList.style.cssText='position:absolute; width:auto; height:10px; text-align:center; left:0; bottom:10px; left:50%; '+webkit+'transform:translate(-50%,0);',icons=[];
            for(var i=0;i<len;++i){
                var icon=document.createElement('i');
                icon.style.cssText=iconCss+(0==i?on:(out+' margin-left:8px;'));
                numList.appendChild(icon);
                icons.push(icon);
            }
            dom.appendChild(numList);
            numListController.move=function(c,n){
                icons[c].style.cssText+=out,icons[n].style.cssText+=on;
            };
        }
        //滚动时的样式选择
        var keep='X'==motion?'PAGE_DRAG_H_KEEP':'PAGE_DRAG_KEEP',restore='PAGE_DRAG_RESTORE';
        var fix_page=function(num){
            //使页码正确
            //if(num==len)return num;//临界值
            if(num>=0){
                return num%len;
            }else{
                return (len+num%len);
            }
        };
        //处理事件
        var lock=false,start_x=0,start_y=0,cur=0,previous=fix_page(-1),next=fix_page(1),offset=0,cur_motion='none',orientation='none',_orientation='none',pre,hasFinger=false;
        var _touchstart=function(e){
            if(o.stop)return;
            e.stopPropagation(),e.preventDefault();//阻止冒泡
            hasFinger=true;
            autoTimer&&clearTimeout(autoTimer);//阻止自动播放
            if(lock)return ;
            var touchers=e.changedTouches||e.targetTouches;
            start_x=touchers[0].pageX,start_y=touchers[0].pageY;
        },
        _touchmove=function(e){
            if(o.stop)return;
            hasFinger=true;
            e.stopPropagation(),e.preventDefault();//阻止冒泡
            if(lock)return ;
            var touchers=e.changedTouches||e.targetTouches,_x=touchers[0].pageX,_y=touchers[0].pageY;
            if('none'==cur_motion){
                //手势同步判断
                var offset_x=_x-start_x,offset_y=_y-start_y;
                if(Math.abs(offset_x)==Math.abs(offset_y)){
                    e.preventDefault(),e.stopPropagation();
                    return ;//分不出方向，等待分清方向
                }else if(Math.abs(offset_x)>Math.abs(offset_y)){
                    cur_motion='X';
                }else{
                    cur_motion="Y";
                }
                if(motion!=cur_motion){
                    //方向不一致，解绑事件
                    m.off(container,'touchmove',_touchmove,false);
                    m.off(container,'release',_release,false);
                    //手指离开后，重新绑定原来的事件
                    m.on(container,'release',rebind,false);
                    return ;
                }
            }
            if('X'==motion){
                offset=_x-start_x;
                images[cur].style[webkit+'transform']='translate3d('+offset+'px,0,0)';
            }else{
                offset=_y-start_y;
                images[cur].style[webkit+'transform']='translate3d(0,'+offset+'px,0)';
            }
            if(offset>0){
                //向下或向右
                orientation='X'==cur_motion?'right':'up';
            }else if(offset<0){
                //向上或向左
                orientation='X'==cur_motion?'left':'down';
            }else{
                //没有方向
                orientation='none';
            }
            if(orientation!=_orientation){
                //变向
                if(offset>0){
                    'X'==cur_motion?(images[previous].style.left='-100%'):(images[previous].style.top='-100%');
                    images[previous].style.display='block',images[next].style.display='none';
                    pre=previous;
                }else if(offset<0){
                    'X'==cur_motion?(images[next].style.left='100%'):(images[next].style.top='100%');
                    images[next].style.display='block',images[previous].style.display='none';
                    pre=next;
                }
                _orientation=orientation;
            };
            if('X'==motion){
                images[pre].style[webkit+'transform']='translate3d('+offset+'px,0,0)';
            }else{
                images[pre].style[webkit+'transform']='translate3d(0,'+offset+'px,0)';
            }
            o.ondrag&&o.ondrag(offset,cur,pre);//正在拖曳
        },
        _release=function(e){
            o.auto&&autoplay();//恢复自动播放
            if(lock)return ;
            lock=true;//锁定手指
            var absoffset=Math.abs(offset),_restore=absoffset<30;
            o.release&&o.release(_restore,cur,pre);//拖曳后手指松开
            if(_restore&&absoffset!=0){
                //小于自动移动的最小偏移量
                addClass(images[cur],restore),addClass(images[pre],restore);
                images[pre].style[webkit+'transform']=images[cur].style[webkit+'transform']='translate3d(0,0,0)';
                setTimeout(function(){
                    removeClass(images[cur],restore),removeClass(images[pre],restore);
                    images[pre].style.display='none';
                    offset=0,cur_motion='none',orientation='none',_orientation='none',lock=false,hasFinger=false;//重置参数
                },200);
            }else if(absoffset!=0){
                move();
            }else{
                lock=false;
                hasFinger=false;
            }
        },
        move=function(){
            //松手后的位移
            addClass(images[cur],keep),addClass(images[pre],keep),p=offset>0?'':'-';
             if('X'==motion){
                //images[pre].style[webkit+'transform']=images[cur].style[webkit+'transform']='translate3d('+p+'100%,0,0)';
                images[pre].style[webkit+'transform']=images[cur].style[webkit+'transform']='translate3d('+p+images[cur].offsetWidth+'px,0,0)';
            }else{
                //images[pre].style[webkit+'transform']=images[cur].style[webkit+'transform']='translate3d(0,'+p+'100%,0)';
                images[pre].style[webkit+'transform']=images[cur].style[webkit+'transform']='translate3d(0,'+p+images[cur].offsetHeight+'px,0)';
            }
            setTimeout(function(){
                removeClass(images[cur],keep),removeClass(images[pre],keep);
                offset=0,cur_motion='none',orientation='none',_orientation='none',lock=false,hasFinger=false;//重置参数
                //隐藏滑过的页面
                images[cur].style.display='none';
                if(typeof(o.onchange)=='function')o.onchange(cur,pre);//回调通知
                numListController.move(cur,pre);//小icon切换
                //页码更改
                cur=pre,previous=fix_page(cur-1),next=fix_page(cur+1);
                //保持当前页面永远为left/top 0 translate3d(0,0,0)
                images[cur].style.cssText='position:absolute; width:100%; height:100%; overflow:hidden; left:0; top:0;';
            },300);
        },
        moveto=function(n){
            //js移动时，需要锁定
            if(lock||hasFinger)return ;
            if(n==cur){
                if(typeof(o.onchange)=='function')o.onchange(cur,n);//回调通知
                return ;
            }
            lock=true;//把touchstart,touchmove,touchend锁定住
            pre=n;
            move();//开始移动
        },
        rebind=function(e){
            //重绑事件
            offset=0,cur_motion='none',orientation='none',_orientation='none',lock=false,hasFinger=false;//重置参数
            m.off(this,'release',rebind,false),m.on(this,'touchmove',_touchmove,false),m.on(this,'release',_release,false);
        },autoplay=function(){
            autoTimer=setTimeout(function(){
                var n=fix_page(cur+1);
                images[n].style.cssText='position:absolute; width:100%; height:100%; overflow:hidden; left:100%; top:0;';//预定位
                //alert(n);
                setTimeout(function(){
                   o.auto&&moveto(n); 
                },60);
                autoplay();
            },o.duration);
        },autoTimer;
        m.on(container,'touchstart',_touchstart,false);
        m.on(container,'touchmove',_touchmove,false);
        m.on(container,'release',_release,false);
        m.on(container,'forcerelease',_release,false);
        var o={move:moveto,auto:true,duration:4000};//最终要返回的对象
        autoplay();//自动轮播
        return o;
    });
});