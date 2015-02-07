#基础组件#

## cookie ##

语法：`m.cookie.set(key,value,expires,domain,path);  `
浏览器：所有主流浏览器  
cookie 对象有三个方法：`set,get,delete`

|参数说明| |
|:----------|:-----------|
|key|必选，string 类型，cookie 键名。|
|value  |必选，string 类型，cookie 键值|
|expires|可选，number 类型，cookie 的有效期，单位是分钟|
|domain|可选，string 类型，指定 cookie 存放在哪个域名|下。|
|path|可选，string 类型，指定 cookie 存放的路径。|

```
m.cookie.set('paipai','paipaivalue',30,'mm.wanggou.com','/');
```

`m.cookie.get(key,index);`

|参数说明||
|:--|:--|   
|key|   必选，string 类型，要查找的 cookie 的键名|
|index|可选，number 类型，返回第(index+1)个 cookie 值|

> 通常情况下，这个 index 参数不会被使用。在情况复杂的 cookie 下，index 才有可能被使用。
例如：多域 cookie，会生成多个同名的 cookie 值，此时就需要用 index 值来遍历了

```
var val = m.cookie.get('paipai');
alert(val);
```
`m.cookie.delete(key,domain,path);`

|参数说明||
|:----||:----|  
|key    |必选，string 类型，要删除的 cookie 的键名|
|domain|可选，string 类型，在指定域删除 cookie|
|path|可选，string 类型，在指定路径删除 cookie|

```
m.cookie.delete('paipai');
```

---------------------------------------------------------------------------
##md5##

语法：m.md5(str);  
浏览器：所有主流浏览器

|参数说明   ||
|:----|:----|
|str|必选，string 类型，被加密的字符串。|

`alert(m.md5('md5'));`

--------------------------------------------------------------------------


##remember##

语法：无  
浏览器：所有主流浏览器  
参数：无  

remember 的作用是记住当前页面在跳转到其实页面前的scrollTop位置，并在下次返回是自动定位到该位置。使用是只须use remember即可。

> remember 对 cookie 模块的依赖，所以使用 remember 的时候要保证 cookie 模块被引入。
另外，同域多页面的情况下，为了避免 cookie 的污染。可以 use md5，remember 模块会自动按页面地址存放位置。

```
halo.use('md5','cookie',remember',function(m){
    //TODO
});
```
---------------------------------------------------------------------------
##weixinshare##

语法一：m.weixinshare(url,img,title,desc,width,height,appid);  
语法二：m.weixinshare({url:string,img:string,title:string,desc:string,width:number,height:number,appid:string});  
浏览器：微信内置浏览器

|参数说明   ||
|:----|:----|
|url    |必选,string 类型，微信分享的页面地址，必须是绝对路径|
|img    |必选，string 类型，分享图片，必须是绝对路径|
|title|必选，string 类型，分享方案的标题（分享到朋友圈时没有此信息）|
|desc|必选，string 类型，分享方案的描述（分享到朋友圈的方案）|
|width|可选，number 类型，指定分享图片的宽度|
|height|可选，number 类型，指定分享图片的高度|
|appid|可选，string 类型，指定当前页面的appid，如果没有最好不会乱传,否则在分享链接下会有一个小灰框提示未通过审核的appid|
|cb|可选，function 类型，分享后回调，默认会传一个状态字符串ret，有三个取值：ok,cancel,fail分别表示分享成功；未分享被用户主动取消；分享失败|

```
m.weixinshare(
    'http://mm.wanggou.com/xin/event7/index.shtml',
    'http://mm.wanggou.com/xin/event7/images/share.png',
    '分享的文案标题',
    '分享的文案描述'
);
                
```

m.weixinshare方法将会返回一个配置对象config。config的成员如下：

|参数说明||
|:----|:----|
|link|string 类型，微信分享的页面地址，必须是绝对路径|
|img_url|string 类型，分享图片，必须是绝对路径|
|title|string 类型，分享方案的标题（分享到朋友圈时没有此信息）|
|desc|string 类型，分享方案的描述（分享到朋友圈的方案）|
|img_width|number 类型，指定分享图片的宽度|
|img_height|number 类型，指定分享图片的高度|
|appid|string 类型，指定当前页面的appid，如果没有最好不会乱传,否则在分享链接下会有一个小灰框提示未通过审核的appid|
|useTitle|boolean 类型，表示使用分享到朋友的抬头当分享到朋友圈的标题。默认为false,即默认使用分享到朋友的描述作为分享到朋友圈的标题|
|friendsDesc|string 类型，表示使用分享到到朋友圈的标题。如果不存在就会根据useTitle属性选择title或desc作为标题|
|cb|function，分享后回调，默认会传一个状态字符串ret，有三个取值：ok,cancel,fail分别表示分享成功；未分享被用户主动取消；分享失败|

> 通过config对象可以随时的更改分享的内容，适用于会游戏按等级分享不同的内容。

```
var config=m.weixinshare(
    'http://mm.wanggou.com/xin/event7/index.shtml',
    'http://mm.wanggou.com/xin/event7/images/share.png',
    '分享的文案标题',
    '分享的文案描述'
);
config.cb=function(ret){
    alert(ret);
};
config.desc='描述变了哦';
config.useTitle=true;
```

DEMO：[点击查看 weixinshare](http://jdc.jd.com/halo/demo/weixinshare.html)


--------------------------------------------------------------------------

##qqshare##

语法一：`m.qqshare(url,img,title,desc,width,height,appid);`  

二：`m.qqshare({url:string,img:string,title:string,desc:string,width:number,height:number,appid:string});`
浏览器：手Q内置浏览器

>m.qqshare 方法仅适用于以下域名：*.qq.com, *.tencent.com, *.soso.com, *.paipai.com, *.tenpay.com, *.yixun.com, *.myapp.com, *.wanggou.com, *.qzone.com, *.weishi.com, *.weiyun.com。如果是第三域名，默认是不支持了。另外需要特别注意的时，分享链接的域名必要与当前域名保持一致！！

>若非这白名单内的域名，请直接忽略些方法。

|参数说明   ||
|:----|:----|
|url|必选，string 类型，分享的页面地址，必须是绝对路径|
|img|必选，string 类型，分享图片，必须是绝对路径|
|title|必选，string 类型，分享方案的标题|
|desc|必选，string 类型，分享方案的描述|
|width|可选，number 类型，指定分享图片的宽度|
|height|可选，number 类型，指定分享图片的高度|
|appid|可选，string 类型，指定当前页面的appid|

```
m.qqshare(
    'http://mm.wanggou.com/xin/event7/index.shtml',
    'http://mm.wanggou.com/xin/event7/images/share.png',
    '分享的文案标题',
    '分享的文案描述'
);
```

m.qqshare 方法将会返回一个配置对象config。config的成员如下：

|参数说明   ||
|:----|:----|
|link|string 类型，微信分享的页面地址，必须是绝对路径|
|img_url|string 类型，分享图片，必须是绝对路径|
|title|string 类型，分享方案的标题（分享到朋友圈时没有此信息）|
|desc|string 类型，分享方案的描述（分享到朋友圈的方案）|
|cb|function，分享后回调，默认会传一个状态字符串ret，有三个取值：ok,cancel,fail分别表示分享成功；未分享被用户主动取消；分享失败|

通过config对象可以随时的更改分享的内容，适用于会游戏按等级分享不同的内容。

```
var config=m.qqshare(
    window.location.href,
    'http://mm.wanggou.com/xin/event7/images/share.png',
    '分享的文案标题',
    '分享的文案描述'
);
config.cb=function(ret){
    alert(ret);
};
                
```

--------------------------------------------------------------------------

##util##

浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie10  
util是一个对象集合：{getEnv,extend,proxy,addClass,removeClass,RAF,cRAF}  

|参数说明||
|:----|:----|
|getEnv|方法，获取运行环境，返回比较结果（'weixin'，'qq'，'web'）。<br />weixin：微信； qq ：手Q； web ：非微信和手Q。<br /><br />`halo.util.getEnv(); //返回运行环境`
                        |
|extend|方法，合并对象到第一个对象中，最后一个参数控制是否深拷贝（默认为false），将后面的对象合并到第一个并返回。<br />@param {Object[,Object][,Object][,Boolean]<br />@return {Object}<br /> ` halo.util.extend({},obj1,obj2,true);// 返回新的对象`
|
|proxy|方法，更改函数运行时的this对象<br />@param {Object,Function}<br />@return {Function}<br />halo.util.proxy(this, function(){<br />//TODO<br />}); |
|addClass|方法，添加样式<br />@param {DOM,Function}<br />`halo.util.addClass(DOM,'className');`|
|removeClass|方法，删除样式<br />@param {DOM,Function}<br />`halo.util.removeClass(DOM,'className')`;|
|RAF|方法，requestAnimationFrame|
|cRAF|方法，cancelAnimationFrame|

&nbsp;

--------------------------------------------------------------------------

##timer##

语法：halo.timer.remainTime(year,month,date,hour,minute,second);  
浏览器：android 2.3.x~4.x/ios6~7


|参数说明   ||
|:----|:----|
|year|必选，number 类型，年份|
|month|必选，number 类型，月份|
|date|必选，number 类型，日份|
|hour|必选，number 类型，小时|
|minute|必选，number 类型，分钟|
|second|必选，number 类型，秒钟|

>halo.timer.remainTime 会返回一个对象{hour,minute,second}，即计算现在到截止时间还有hour时minute分second秒

```
halo.timer.remainTime(2020,12,31,00,00,00); //{hour: 57129, min: 12, sec: 38}
```

--------------------------------------------------------------------------

##randomsort##

将数组随机排序  
浏览器：所有浏览器  
语法：`m.randomsort(array,count);`


|参数说明   ||
|:----|:----|
|array|必选，Array 类型。|
|count|可选，number 类型。按指定长度返回数组，默认是array的长度。|

```
halo.use('randomsort',function(m){
    var arr=['A','1','2','3','4','5','6','7','8','9','10','J','Q','K'];
    alert(m.randomsort(arr));
}
```

DEMO：[点击查看randomsort](http://jdc.jd.com/halo/demo/randomsort.html)

--------------------------------------------------------------------------

##togray##

将目标图片转化成灰度图片

浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie9+  
*注意：android 2.3 环境下，需要use('todataurl')组件。android3 不支持canvas.toDataURL();需要说明的是这个组件实现的canvas.toDataU效率很低，小图片可以用，大图片建议不使用。  
语法：`m.togray(src,callback);`

|参数说明   ||
|:----|:----|
|src|必选，string，目标图片路径。|
|callback|必选，function，灰度转换成功后的回调函数。<br />callback 被回调时，会传一个参数src，即转化后的灰度图片的dataurl。|

```
halo.use('togray',function(m){
    m.togray(source_src,function(src){
        //TODO
    });
}
```

>togray 方法只能将同域名路径的图片转化面灰度图片，如果跨域图片就没有办法转换了。

DEMO：[点击查看 togray](http://jdc.jd.com/halo/demo/togray.html)

---------------------------------------------------------------------

##browser##

检测当前 web 环境  
浏览器：所有浏览器  
语法: m.browser(text);

|参数说明   ||
|:----|:----|
|text|必选，string 类型，当前环境的可能值。|

text的可能取值如下：

|参数说明   ||
|:----|:----|
|trident/ie|ie 内核|
|presto/opera|opera 内核|
|webkit|苹果、谷歌内核|
|gecko/firefox|火狐内核|
|mobile|是否为移动端|
|ios|ios 终端|
|android|android 终端|
|iphone|是否为 iPhone 或者 QQHD 浏览器|
|ipad|是否为 ipad|
|webapp|是否 web 应该程序，没有头部与底部|
|weixin|是否微信环境|
|qq|是否手Q环境|

>当 text 为 android 时，并且结果为 true 时，m.browser 返回的结果将会是 android 的版本号。

```
<b>example:</b>
halo.use('browser',function(m){
var ret=m.browser('android');
alert(ret);
});
```
DEMO：[点击查看 browser](http://jdc.jd.com/halo/demo/browser.html)

--------------------------------------------------------------------------

##request##

取得 url 上的参数的值。  
浏览器：所有浏览器  
语法:`m.request(key);`
```
halo.use('request',function(m){
    var ret=m.request('key');
    alert(ret);
});
```
DEMO：[点击查看 request](http://jdc.jd.com/halo/demo/request.html?key=value)

--------------------------------------------------------------------------

##servertime##

获取服务器时间  
浏览器：所有浏览器  
语法：`m.servertime`;

```
halo.use('servertime',function(m){
    alert(m.servettime);
});
```
--------------------------------------------------------------------------

##enablea##

激活a标签（适用于click事件被阻止后的轻app页面）  
浏览器：`webkit内核触屏页面`  
在halo中use中引用即可生效  

m.enablea有一个属性capture。即事件的传递方法，如果有e.stopPropagation();来阻止父节点A被点击的交互，可以m.enablea.capture=false；默认是m.enablea.capture=true;

```
halo.use('uievent','enablea',function(m){
    m.enablea.capture=false;//使用事件冒泡
});
```

>必须依赖: uievent
enablea只有在页面的click事件被阻止后才会生效。

--------------------------------------------------------------------------

[点击查看说明目录](https://github.com/leeenx/halo/blob/master/manual.md)