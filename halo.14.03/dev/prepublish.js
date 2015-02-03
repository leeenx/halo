/*
    @author:leeenx
    @预发布功能
    @主要是针对非正式域名下分享权限受限开发出来的解决方案
    @如果单独使用这个模块，记得调用m.prepublish();在m.weixinshare之后。因为要保证m.weixinshare重写成功
*/
halo.use(function(m){
    halo.add('prepublish',function(){
        var host=location.host,reg=/((.*\.)?paipai.com$)|((.*\.)?wanggou.com$)/;
        if(top==window){
            //处在top
            if(!reg.test(host)){
                //非paipai和网购域名
                location.href='http://mm.wanggou.com/halo/prepublish.html?inc='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.getElementsByTagName('title')[0].innerHTML);//转跳到location
            }
        }else{
            //处在iframe中
            var scrollEv=document.createEvent('HTMLEvents');//定义事件
            window.addEventListener('message',function(json){
                //接收来自parent的信息
                if('wxcb'==json.data.type){//分享成功回调
                    wxarg&&wxarg.cb&&wxarg.cb(json.data.ret);
                }else if('qqcb'==json.data.type){//分享成功回调
                    qqarg&&qqarg.cb&&qqarg.cb(json.data.ret);
                }else if('scroll'==json.data.type){//来自parent的滚动通知
                    var pos=json.data.pos;
                    window.HALO_ST=pos.y,window.HALO_SL=pos.x;
                    //alert(window.HALO_ST);
                    scrollEv.initEvent('scroll',true,true);
                    window.dispatchEvent(scrollEv);
                    window.onscroll&&window.onscroll();
                }
            });
            var _weixinshare=function(){},_qqshare=function(){},wxarg,qqarg;
            if(m.weixinshare){
                //改写weixinshare
                _weixinshare=m.weixinshare;
                m.weixinshare=function(){
                    var arg=_weixinshare.apply(this,arguments);
                    parent.postMessage({type:'weixinshare',arg:arg},'*');
                    wxarg=arg;
                    return arg;
                };
            }
            if(m.qqshare){
                //改写qqshare
                _qqshare=m.qqshare;
                m.qqshare=function(){
                    var arg=_qqshare.apply(this,arguments);
                    parent.postMessage({type:'qqshare',arg:arg},'*');
                    qqarg=arg;
                    return arg;
                }
            }
        }
    });
});