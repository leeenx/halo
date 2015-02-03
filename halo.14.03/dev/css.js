/*
	@author:leeenx
	@css方法，用于对dom的样式读取
*/
halo.add('css',function (elem,name,value)
{
    if(!!elem)
    {
        if(name.constructor!=String){return ;}
        var prop=name.replace(/\-([a-z]{1})/g,function(matchStr,$1){return $1.toUpperCase();});
        if(typeof(value)!="undefined")
        {/*赋值操作*/
            if(prop=='scrollLeft'||prop=='scrollTop'){/*将scrollLeft和scrollTop做特殊处理*/
                elem[prop]=value;
                return ;
            }
            elem.style[prop]=value;
            if(prop=='opacity' && document.all){
                elem.style.filter='alpha(opacity:'+(value*100)+')';
            }
        }else{/*取值操作*/
            if(prop=='scrollLeft'||prop=='scrollTop'){/*将scrollLeft和scrollTop做特殊处理*/
                return elem[prop];
            }
            if(document.all)
            {
                if('opacity'==prop){
                    var opacity= elem.currentStyle['filter'].replace(/[a-zA-Z\s\(\)\:]/g,'');
                    opacity=parseFloat(opacity),opacity=isNaN(opacity)?1:opacity*0.01;
                    return opacity;
                }
                return elem.currentStyle[prop];
            }else{
                return document.defaultView.getComputedStyle(elem,null)[name];
            }
        }
    }
});
halo.add('get_transfrom_value',function(transform,key,index){
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
});