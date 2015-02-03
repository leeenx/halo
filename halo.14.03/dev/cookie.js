halo.add('cookie',function(){
    /*cookie方法*/
    var setCookie=function(name,value,expires,domain,path){
        if(!name||!value){
            return ;//空值或空方法
        }
        var cookie_expires='',cookie_path=';path=/',cookie_domain='';
        if(typeof(expires)=='number')cookie_expires=';expires='+new Date(parseInt(expires)*60*1000+new Date().getTime()).toGMTString();//以分钟计算
        if(typeof(path)=="string")cookie_path=';path='+path;
        if(typeof(domain)=='string')cookie_domain=';domain='+domain;
        document.cookie=name+'='+escape(value)+cookie_expires+cookie_path+cookie_domain;
    }
    var deleteCookie=function(name,domain,path){
        if(!name)return ;//空方法
        var cookie_path=';path=/',cookie_domain='';
        if(typeof(path)=="string")cookie_path=';path='+path;
        if(typeof(domain)=='string')cookie_domain=';domain='+domain;
        else cookie_domain='';
        document.cookie=name+'=;expires='+new Date().toGMTString()+cookie_domain+cookie_path;
    }
    var getCookie=function(name,index)
    {
        if(!name||!document.cookie){//没有cookie时或空方法
            return null;
        };
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)","g"));
        if(typeof(index)=='undefined'&&!!arr){
            //默认取第一个有实的cookie
            var value;
            for(var i=0;i<arr.length;++i){
                var key_value=unescape(arr[i]);
                value=key_value.substring(key_value.indexOf('=')+1,key_value.length);
                value=value.replace(/\;$/,'');
                if(!!value){
                    return value;break;
                }
            }
            return value;
        }else{
            if(arr != null&&!!arr[index])
            {
                var key_value=unescape(arr[index]),value=key_value.substring(key_value.indexOf('=')+1,key_value.length-1);
                return value;
            }
        }
        return null;
    };
    return {get:getCookie,set:setCookie,del:deleteCookie};
}());