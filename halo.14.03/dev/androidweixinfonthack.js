/*
    @author:leeenx
    @应对安卓微信，用户主要修改字体大小后造成显示的bug的修改插件
    @使用后，会强制字体使用默认大小
    @不过用时，需要配合页面的样式写法，如果使用rem作为单位的页面，使用些hack插件才会有用
    @如果单纯调用，此组件只能弹出一个引导层，引导用户把字体改回来
*/
halo.add('androidweixinfonthack',function(){
    if(navigator.userAgent.toLowerCase().indexOf('android')<0)return function(){};//非安卓系统不用作处理
    var font_div=document.createElement('div');
    font_div.style.cssText='font-size:20px; line-height:20px; position:absolute; top:-100%; left:-100%;';
    font_div.innerHTML='front-size:20px';
    var style=document.createElement('style');
    style.type='text/css';
    document.body.appendChild(font_div);
    document.body.appendChild(style);//置底，保证样式能正常被执行
    var oh,percent=20,_percent=percent;
    var o=function(base){
        oh=font_div.offsetHeight,percent=base,_percent=percent;
        if(oh!=20){
            //用户更改了字体大小
            if(base){
                _percent=percent=base*20/oh;
                style.innerHTML='html{font-size:'+percent+'px}';
            }else{
                //alert('当前字体大小被更改过，可能会影响到页面的样子。');
                //生成一个蒙层
                var mask=document.createElement('div');
                mask.style.cssText='position:fixed; width:100%; height:100%; left:0; top:0; background-color:rgba(0,0,0,.5); -webkit-transition:opacity .6s linear; transition:opacity .6s linear; color:#fff; line-height:20px; font-size:14px;';
                mask.innerHTML='<div style="position:absolute; width:74px; height:102px; right:10px; top:10px;"><img src="http://static.paipaiimg.com/halo/img/point.png" width="100%" border="0" /></div>\
                    <div style="position:relative; margin:130px auto 0; width:100%; text-align:center;">\
                    选择：<img src="http://static.paipaiimg.com/halo/img/awxhack_1.png" width="136" border="0" align="middle" /><br /><br />\
                    选中第二小的字号：<img src="http://static.paipaiimg.com/halo/img/awxhack_2.png" width="136" border="0" align="middle" /><br />\
                    </div>\
                ';
                document.body.appendChild(mask);
                var ismove=false;
                var removeMask=function(){
                    mask.style.opacity='0';
                    setTimeout(function(){
                        mask.style.display='none';
                    },600);
                }
                mask.addEventListener('touchstart',function(e){e.preventDefault();ismove=false;},false);
                mask.addEventListener('touchmove',function(e){e.preventDefault();ismove=true;},false);
                mask.addEventListener('touchend',function(e){ismove||removeMask();},false);
                mask.addEventListener('mouseup',function(e){removeMask();},false);
            }
        }
    };
    o.always=function(ms){
        ms=ms||2000;//默认两秒检查一次
        setInterval(chk,ms);//每ms检查一次
    };
    var chk=function(){
        var oh=font_div.offsetHeight;
        percent=base*20/oh;
        if(_percent!=percent){//字体改变了
            _percent=percent;
            style.innerHTML='html{font-size:'+percent+'px}';
        }
    };
    return o;
}());