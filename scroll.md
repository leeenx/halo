#滚动组件#

##yscroll##

可实现多种形式的区域滚动。  
浏览器：android 2.3.x~4.x/ios6~7/pc chrome


|member|detail|
|:----|:----|
|Scontainer|参数，滚动区域的class。{String} className ".className"|
|hScroll|参数，是否开启横向滚屏。{Boolean}|
|vScroll|参数，是否开启纵向滚屏。{Boolean}|
|momentum|参数，是否开启缓冲。{Boolean}|
|bounce|参数，是否可超出边界。{Boolean}|
|snap|参数，是否充满容器。{Boolean}|
|scrollBefore|参数，滚动开始的回调方法。<br />@param {Object} this|
|scrollEnd|参数，滚动完成的回调方法。<br />@param {Object} this|
|onScroll|参数，滚动时的回调方法。<br />@param {Object} this|

```
halo.use('lazyloader',function(m){
    new m.yscroll({
        Scontainer : '.container',//区域滚动class
        hScroll : false, // 是否开启横向滚动
        vScroll : false, // 是否开启纵向滚动
        momentum : false, //是否开启缓冲效果
        bounce : false, //是否可超出边界
        snap : true //是否充满容器
        scrollBefore : function(){
            //TODO 滚动开始的回调
        },
        scrollEnd : function(){
            //TODO 滚动结束的回调
        },
        onScroll : function(){
            //TODO 滚动中的回调
        }
    });
}
```

DEMO1：[点击查看](http://jdc.jd.com/halo/demo/yscroll.html)  
DEMO2：[点击查看](http://jdc.jd.com/halo/demo/yscroll2.html)  
DEMO3：[点击查看](http://jdc.jd.com/halo/demo/yscroll3.html)

--------------------------------------------------------------------------


##ezscroll##


android 2.3.x 以下的非 body 元素滚动解决模块，同时也可以做通用滚动模块使用，以提升 ios 和 android 4.x 下的非 body 滚动效果。

语法：`m.ezscroll.bind(DOM,showScroll)`;

|参数说明||
|:----|:----|
|DOM|必选，指定带滚动的节点。|
|showScroll|可选，boolean 类型。是否显示滚动条，默认为false|

```
halo.use('ezscroll',function(m){
    m.ezscroll.bind(document.getElementById('container'),true);
});
```

> ezscroll 不用要求绑定容器定宽高。
>android 4.0x 系列机型下，ezscroll 自动降级成原生滚动，因为 android 4.0x 不支持 js 直接操作 scrollTop 属性

DEMO: [点击查看 ezscroll](http://jdc.jd.com/halo/demo/ezscroll.html)

------------------------------------------------------------------------

##lazyshow##

分页加载插件：当加载的json dom 数据比较多，希望做到分页加载。 如: cpc mcoss json 数据。 支持 多数据源(如有个tab，每个tab都希望分页加载)  

var P = m.lazyshow();

|参数说明||
|:----|:----|
|holder|必选，指定外容器 可以 传入dom 节点，或者用 string 选择器(推荐)|
|data|必选，希望被分页的list数组array|
|trigger|可选，滚动触发的dom名(一搬是load节点) -- 默认是: .loading|
|body|可选，新数据html append 的 list dom : 默认是: .list|
|cb|可选，每次滚动到底部的时候触发一次 回调，function 用于插入下一页的dom|

cb回调时会回传一个对象d，具体如下：
```
 var d = {
        loader      :  s.loader || null,    // loading dom 用语判断的位置
        body        :  s.body || null,      // 内容 节点
        callback    :  s.callback || null,  // 回调
        flag        :  true,                // 开关
        page        :  0,                   // 默认是 0 当前加载了几页
        num         :  s.num || 10,          //每页显示的个数 (默认:10)
        is_end      :  false                // 是否最后
    };
```
以下是调用示例：

```
halo.use( 'lazyshow' , function(m){  
    //滚动回调 单数据源调用的时候 会自动调用一次 for 第一页显示
    var call_data = function(d){
        //d 的详细见上面参数说明
        //可以在这里处理数据

    };


    //单数据的使用

    var P = m.lazyshow({
        holder  : '#J_holder',  // 外容器 Dom 可用 string or dom
        data    : data,         //设置 数据。
        num     : 10,           //每页显示的个数 (默认:10)。
        trigger : '.loading',   // load 的 class
        body    : '.pro_list',  // list 的 class
        cb      : call_data     // 回调 func
    });


    //多数据的使用   如：多Tab 需要分页加载

    var PM = m.lazyshow();          //新的一个实例

    PM.push_data({
        index   : 0,                // 数据id 默认是 0
        holder  : '#J_holder',      // 外容器 Dom
        data    : data[1],          //设置 数据。
        num     : 5,                //每页显示的个数 (默认:10)。
        trigger : '.loading',       // load 的 class
        body    : '.pro_list',      // list 的 class
        cb      : call_data         // 回调
    });


    PM.push_data({
        index   : 1,                // 数据id 默认是 0
        holder  : '#J_holder_2',    // 外容器 Dom 
        data    : data[2],          // 设置 数据。
        num     : 3,                // 每页显示的个数 (默认:10)。
        trigger : '.loading',       // load 的 class
        body    : '.pro_list',      // list 的 class
        cb      : call_data         // 回调
    });

    PM.switch_data(0);           //切换数据 切换到自己想要的数据

});
```

DEMO: [点击查看 lazyshow](http://jdc.jd.com/halo/demo/tabdata.html)

-----------------------------------------------------------------------