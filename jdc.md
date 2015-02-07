#JDC业务相关组件#
> 此模块主要是与JDC业务相关的模块组件。外部人员无法调用。所以非JDC同学可以直接无视


##paipailogin##

拍拍域名下的 QQ 和微信登录  
浏览器：所有浏览器  
语法：`m.paipailogin(cb);`

>登录接口暂时只对 paipai.com,wanggou.com 以部分白名单域名可以调用。第三域名没办法使用。

|参数说明||
|:----|:----|   
|cb|function 类型，可选，登录成功后回调(非微信登录下有用)。|
>cb 被回调时，会带两个整数 skey,uin，表示登录的 skey 的帐号；如果是跨域登录的话，这两个参数就是登录信息。

```
halo.use('paipailogin',function(m){
    m.paipailogin(function(skey,uin){
        //如果是QQ登录，能看到下面的alert
        alert(skey+';'+uin);
    });
});
```

>可以通过 m.paipailogin.type='paipai'; 或 m.paipailogin.type='wx'; 强制指定登录的方式。默认情况是根据环境自动选择登录方式。
通过 paipailogin 的 isLogin 方法可以知道当前的登录状态。

跨域使用说明：

*如果是 paipai 域名下的页面，只需要使用 halo.js 提示的方法即可完成登录。但是如果是跨域了的页面，那么需要在调用登录的页面的目录下手工创建一个通信页面。*

*点击下载这个*[通信页面](http://jdc.jd.com/halo/demo/afterLogin.txt)

*下载成功后，请把名字命名为 afterLogin.html （注意大小写）*
DEMO：点击查看 [paipailogin](http://jdc.jd.com/halo/demo/paipailogin.html)

--------------------------------------------------------------------------

##wglogin##

拍拍域名下的QQ和微信登录。  
浏览器：所有浏览器  
语法：m.wglogin(useJd); 必须依赖request组件  
*mm.wanggo.com 目前调用的是QQ第三方登录，所以，QQ登录无法实现无刷新登录。体验上说，比paipailogin要差很多。

>登录接口暂时只对 paipai.com,wanggou.com 以部分白名单域名可以调用。第三方域名请联系 halo.js 的管理员添加白名单。

|参数说明   ||
|:----|:----|
|useJd|boolean 类型，可选，表示使用jd登录，默认为true，如果需要使用旧接口可以使用m.wglogin(false)。|

```
halo.use('wglogin',function(m){
    m.wglogin.isLogin()||m.wglogin();
});
```
>可以通过 m.wglogin.type='qq'; 或 m.wglogin.type='wx'; 强制指定登录的方式。默认情况是根据环境自动选择登录方式。

**跨域使用说明：**

*如果是 wanggou.com 域名下的页面，只需要使用 halo.js 提示的方法即可完成登录。但是如果是跨域了的页面，那么需要在调用登录的页面的目录下手工创建一个通信页面。*

*点击下载这个*[通信页面](http://jdc.jd.com/halo/demo/wglogin/afterLogin.txt)。

下载成功后，请把名字命名为afterLogin.html（注意大小写）

DEMO：点击查看 [wglogin](http://qian-duan-she-ji.us/wx/html/act/201410/mm/index.html)

------------------------------------------------------------------------

##bookalert##

微信/手Q预约提醒  
浏览器：手Q/微信内置浏览器  
语法：m.bookalert(activeid,cb);

|参数说明||
|:----|:----|
|activeid|number/string 类型，必选，表示要预约的活动标识。|
|cb|function 类型，必选，预约结果回调。|

```
halo.use('servertime',function(m){
    m.bookalert('xx',function(json){
        var ret=json.ret;
        if(0==ret){
            alert('预约成功');
        }else if(2==ret){
            alert('未登录');
        }else{
            alert('预约失败');
        }
    });
});
```
--------------------------------------------------------------------------

##qqgoodsbook##

手Q下的商品预约方法，可以简单逻辑。微信下暂时没有，因为微信需要通过微信端的中转，跳转预约没办法阻止。  
语法：`m.qqgoodsbook([[skuid,cosspresaleid,globalpresaleid,salestarttime],[skuid,cosspresaleid,globalpresaleid,salestarttime],[skuid,cosspresaleid,globalpresaleid,salestarttime]...], function(json){ //-1==ret 表示没缺少关键参数:subscriberesult //0==ret 表示单个商品预约成功 //1==ret 表示单个商品预约失败 //2==ret 表示商品列表预约返回一个list数组，代表各个商品的预约结果。list=[[skuid,result],[skuid,result],[skuid,result]...]；result与ret相同，0成功,1失败 } )`

```
halo.use('qqgoodsbook',function(m){
    m.qqgoodsbook([[skuid,cosspresaleid,globalpresaleid,salestarttime]],function(json){
        alert(json.ret);
    });
});
```
>skuid,cosspresaleid,globalpresaleid,salestarttime这四个是预约的必选参数。不过，往往我们只能拿到 skuid。其它三个值拿不到。其实，其它三个值可以用以下接口取到： bases.wanggou.com/presalesku/querypresalesku?callback=yushouWGCB&skuid=1324046 把1324046改成实际的skuid就可以了
返回的结果中：start_time就是salestarttime,global_presale_id就是globalpresaleid，presale_id就是cosspresaleid
接口可见：http://legos.cm.com/ci.php/api/#id=20273

--------------------------------------------------------------------------

##checkstock##

查询商品的库存情况。  
语法：m.checkstock(skuid,cb);

|参数说明|| 
|:----|:----|
|skuid|number/string 类型，必选，商品的skuid。|
|cb|function 类型，必选，预约结果回调。|

```
halo.use('checkstock',function(m){
    m.checkstock('123456',function(stock){
        //通过stock.StockState可以知道库存情况，具体如下：
        //33        有货  现货-下单立即发货
        //39        有货  在途-正在内部配货，预计2~6天到达本仓库
        //40        有货  可配货-下单后从有货仓库配货
        //36        预订
        //34        无货
    });
});
```

--------------------------------------------------------------------------

##querybooknum##

查询商品的预约数。  
语法：`m.querybooknum(skuid,cb);`

|参数说明   ||
|:----|:----|
|skuid|number/string 类型，必选，商品的skuid。|
|cb|function 类型，必选，预约结果回调。|

```
halo.use('checkstock',function(m){
    m.checkstock('123456',function(num,json){
        //num即当前的预约数，json为接口返回对象
    });
});
```

------------------------------------------------------------------------

##mcoss##
获取卖快商品列表  
浏览器：android 2.3.x~4.x/ios6~7/pc chrome  
使用方法：依赖 halo.util, halo.jsonp

```
halo.use('util' ,'jsonp', 'mcoss', function(m){
    m.mcoss({
        actid: '34789',
        areaid:'2858[,2859]'
    }).done(function(data){
        //TODO
    });
});
```
api: [点击查看接口api](http://legos.cm.com/ci.php/api/#id=20330)

---------------------------------------------------------------------

##cpc##

获取JD相关后台数据接口  
浏览器：android 2.3.x~4.x/ios6~7/pc chrome  
使用方法：依赖 halo.util, halo.jsonp

```
halo.use('util' ,'jsonp', 'cpc', function(m){
    m.cpc({
        gids: '2163',
        pc:'2'
    }).done(function(data){
        //TODO
    });
});
```

api: [点击查看接口api](http://legos.cm.com/ci.php/api/#id=20333)


-----------------------------------------------------------------------




