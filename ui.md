#UI 组件#

##uievent##

浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie10  
*目前封装了14个定制事件，供on,off方法调用。提供了一个新方法m.trigger，用于触发原生事件和定制事件  
trigger语法：m.trigger(DOM,eventName);

|参数说明||
|:----|:----|
|DOM|DOM节点，必选，触发事件的接收对象|
|eventName|string，必选，事件名字，如touchstart,touchend|

|自定义事件如下：||
|:----|:----|
|flick|相当于 click 事件，却比 click 事件更高效。|
|fingermove|超过指定偏量的touchmove（与touchmove几乎一样）。可以通过uievent.setFingerMove(x,y);来设置最小偏移量。PS:使用fingermove默认会执行e.preventDefault();|
|release|touchmove 后的 touchend。|
|forcerelease|touchmove 后的 touchcancel。|
|hold|手指长按事件|
|dblclick|双击事件|
|gesture_left|手势向左滑|
|gesture_right|手势向右滑|
|gesture_up|手势向上滑|
|gesture_down|手势向下滑|
|transitionend|transition动画补间执行结束|
|animationend|animation播放结束|
|animationstart|animation开始播放|
|animationiteration|animation完成一次播放（就用于动画播放多次的场景）|

```
halo.use('uievent',function(m){
    m.on(document.body,'hold',function(e){
        //TODO
    })
});
```
DEMO: [点击查看 uievent](http://jdc.jd.com/halo/demo/uievent.html)

--------------------------------------------------------------------

##warn##

竖屏浏览引导屏

浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie10  
use warn 后，warn 模块就可以直接工作，考虑到不同页面背景的不一致，所以 warn 模块提供了set方法来改变页面，如下：  
`m.warn.set(background,icon,text);`

|参数说明||
|:----|:----|
|background|可选，string 类型，背景颜色/背景。|
|icon|可选，string 类型，icon 图片地址|
|text|可选，string 类型，警告文字。|

```
m.warn.set('#300');//背景为砖红色
//如果是背景图片就应该是
//m.warn.set('url(../images/xx.jpg)');
```

-----------------------------------------------------------------

##msgbox##

通用消息窗口。  
浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie10

|member|detail|
|:----|:----|
|show|方法，弹出消息框，并返回弹出窗口的 DOM 对象，以借hide方法使用。|
|hide|方法，移除指定的消息框。|
|loading|属性，加载过度对象。|

msgbox.show 语法:`m.msgbox.show(text,btn1,btn2,close)`

|参数说明	||
|:----|:----|
|text|必选，string 类型，显示的文本信息。|
|btn1,btn2|可选，object 类型，按钮对象{text,callback,close}|
|close|可选，boolean 类型，是否显示右上角的“关闭X按钮” ，默认为false|

|按钮对象||
|:----|:----|
|text|必选，string，按钮的显示文本|
|callback|可选，function，点击按钮的回调函数|
|color|可选，string，按钮文本颜色|
|close|可选，boolean，点击按钮后是否自动关闭消息框，默认true|

m.msgbox.show 会返回一个 DOM 对象，可供hide方法调用。  
msgbox.hide 语法：m.msgbox.hide(dom);


|参数说明	||
|dom	|必选，object 类型(DOM节点)，指定被移动的DOM。|

>因为 msgbox.show 支持多框并存，所以 msgbox.hide 需要指定是哪个窗口才可以正常关闭弹窗。不过，正常情况下，msgbox.hide 被调用的机会很少。因为 msgbox.show 的按钮自带有关闭功能。

```
halo.use('msgbox',function(m){
m.msgbox.show('测试弹窗',{text:'确定',cb:function(){},color:'#C72A26'});//一个按钮
m.msgbox..show(
            '两个按钮弹窗确定按钮不可关闭',
            {text:'确定',cb:function(){alert('点取消试试')},color:'#C72A26',close:false},
            {text:'取消'}
);
m.msgbox.show('这是没有关闭按钮的弹层');
m.msgbox.show(
    '测试弹窗，没有关闭按钮',
    {text:'确定',cb:function(){alert('close表示按钮要不要关闭');},color:'#C72A26',close:false},
    false
);//带按钮，不带关闭的弹出窗
}
```
|m.msgbox.loading 对象||
|:----|:----|
|show|方法，显示 loading 过渡框，语法：`m.msgbox.loading(text,bgcolor)`<br />text 可选，string，过渡框显示文字（5个字以内）<br /> alpha 可选，boolean，显示背景颜色，默认为true|
|hide|方法，移动loading过渡框。|

```
halo.use('msgbox',function(m){
m.msgbox.loading.show('努力加载中');
setTimeout(function(){m.msgbox.loading.hide();},2000);
}
```
DEMO：点击查看 [msgbox](http://jdc.jd.com/halo/demo/msgbox.html)

------------------------------------------------------------------------

##sharetips##

分享引导层

浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie9+  
语法：`m.sharetips(text)`;

|参数说明||
|:----|:----|
|text|可选，string 类型，默认值'请点击右上角&lt; br&gt; 通过 【发送给朋友】功能&lt; br&gt;把好消息告诉小伙伴哟~'|

```
halo.use('sharetips',function(m){
    //m.msgbox.loading.show('测试的文字');
    m.sharetips();
});
```
DEMO：点击查看 [sharetips](http://jdc.jd.com/halo/demo/sharetips.html)

-----------------------------------------------------------------------

##imgplayer##

浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie10  
语法：`m.imgplayer(DOM,motion,showNumlist)`

|参数说明||
|:----|:----|
|DOM|DOM 对象，必选，img图片的窗口节点。|
|motion|string，可选，图片轮播时的方向，只能传两个值X/Y代表轮播方向,默认为X。|
|showNumlist|boolean，可选，是否显示图片位置列表，默认显示|

imgplayer绑定容器后，有返回对象。返回对象的成员具体如下：
|imgplayer返回对象||
|:----|:----|
|move|方法，将轮播定位到指定索引的位置。<br />move(number);|
|auto|属性，是否自动轮播。boolean，默认为true;|
|duration|属性，number 类型，表示图片停止不动的等待时长（毫秒值)。|
|ondrag|虚拟事件方法，function，表示 imgplayer 正在被手指拖曳时的动作。<br />语法：`player.ondrag=function(offset,cur,pre){...};`<br />`offset`	float类型，手指位移距离<br />`cur`	number，当前图片的索引<br />`pre`	number，将要滑进的图片的索引|
|onchange|虚拟事件方法，function，implayer 完成一次图片切换时触发。<br />语法：`player.onchange=function(c,n){...};`<br />`c`	int 类型，滑出页面索引<br />`n`	int 类型，滑进页面索引|
|onrelease|虚拟事件方法，function，手指滑动后松开的动作。<br />语法：`player.onrelease=function(restore,cur,pre){...}`<br />`restore`boolean，图片是否恢复原来位置（即手指移动距离过短，图片被回弹）<br />`cur`int，滑出页面索引<br />`pre`int，滑入页面索引|

```
halo.use('uievent','imgplayer','css',function(m){
    var player=m.imgplayer(banner,'X');
});
```

>虽然叫 imgplayer，但是实际用途不止于图片播放，也可以用作区域的 tab 切换。

DEMO: [点击查看 imgplayer](http://jdc.jd.com/halo/demo/imgplayer.html)

-----------------------------------------------------------------------

##mtab##

tab组件，支持fix 事件绑定  
语法：m.mtab({ //config });

|参数说明||
|:----|:----|
|holder|必选，string选择器|
|tab|必选，tab item选择器:在 holder dom 下查找|
|body|可选，tab body 选择器 需要切换的内容dom list|
|fixed|可选，true则激活 fixed 效果 (默认:false) ------ 如果参数类型是 string 则 修改fixed 的class 名 (默认:fixed)|
|cur|可选，选中态 class 名 (默认:cur)|

```
halo.use('uievent','mtab',function(m){

        var Tab = m.mtab({
            holder : '#J_page_tab',      //tab   容器 必须
            tab    : '.tab_item',        //tab item class
            body   : '#J_holder .tab_con'     //内容 dom
            fixed  : true ,              //是否吸顶
        });


        // 设置 tab 回调 点击后触发
        Tab.set_action({
            //切换前触发
            cb  : function(e){
                console.log('data', e);
            }

            //切换后触发
            cba  : function(e){
                console.log('data', e);
            }
        });

});
```

DEMO: [点击查看 mtab](http://jdc.jd.com/halo/demo/mtab.html)

-------------------------------------------------------------------------

##actbox##

通用活动弹出窗

浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie9+  
actbox内置三个成员，详情如下：
|内置成员||
|:----|:----|
|config|object 类型，用于配置弹出窗的各种ui属性，对于弹窗来说config是一个全局的配置。|
|show|function 类型，显示弹窗|
|hide|function 类型，隐藏弹窗|

|config 成员列表||
|:----|:----|
|maskBackgroundColor|锁屏颜色|
|backgroundColor|弹出提示窗口的背景颜色|
|color|字体颜色|
|borderRadius|弹出提示窗口的圆角值|
|inputColor|输入框字体颜色|
|inputBackgroundColor|输入框背景颜色|
|inputBorderWidth|输入框的边框宽度|
|inputBorderRadius|输入框的边框圆角|
|inputTextAlign|输入框的对齐颜色|
|inputBorderColor|输入框背景颜色|
|inputBorderStyle|输入框边框样式|
|buttonColor|按钮字体颜色|
|buttonBackgroundColor|按钮背景颜色|
|buttonBorderRadius|按钮圆角值|
|checkBorderRadius|复选框圆角值|
|checkBorderWidth|复选框边框宽度|
|checkBorderStyle|复选框边框样式|
|checkedColor|复选框选中颜色|
|checkBorderColor|复选框边框颜色|
|checkBackgroundColor|复选框背景颜色|
|radioBorderRadius|单选框圆角值|
|radioBorderWidth|单选框边框宽度|
|radioBorderStyle|单选框边框样式|
|radioColor|单选框选中颜色|
|radioBorderColor|单选框边框颜色|
|radioBackgroundColor|单选框背景颜色|
|closerColor|关闭按钮的颜色|

```
m.actbox.config.closerColor='#f00';
m.actbox.config.checkedColor='#000';
m.actbox.show({
//title:'iPhone 6首发订阅提醒',
label:'手机号码：',
input:[{text:'',placeHolder:'手机号码(移动/联通/电信)'}],
checkbox:[
    {before:'提醒活动：',after:'全选',type:'checkAll'},
    //{before:'提醒活动：',type:'none'},
    {after:'三星NOTE 4 9.0首发<br><span style="color:rgba(255,255,255,.5); font-size:12px;">活动时间:8.03 - 8.10</span>',checked:true},
    {after:'三星NOTE 4 9.0首发<br><span style="color:rgba(255,255,255,.5); font-size:12px;">活动时间:8.03 - 8.10</span>'},
    {after:'三星NOTE 4 9.0首发<br><span style="color:rgba(255,255,255,.5); font-size:12px;">活动时间:8.03 - 8.10</span>'}
],
text:'<span style="color:rgba(255,255,255,.5); font-size:12px;">我们将在活动前一天提醒您！</span>',
button:[{text:'提交信息抽取免单',cb:function(form){
    if(form[0]==''){
        alert('手机号码不能为空！');
        return ;
    }else if(!/^1[0-9]{10}$/.test(form[0])){
        alert('手机格式不正确');
        return ;
    }
    var nocheck=true;
    for(var i=1;i<form.length;++i){
        if(form[i]){nocheck=false;break;}
    }
    if(nocheck){
        alert('请选择一个项');
        return ;
    }
    this.hide();
},close:false,color:'',bgcolor:''}]
});
```
**show 语法如下：**
`m.actbox.show(arg);`  
arg，object 类型，表示弹窗要需要显示的 ui 控件,具体如下：

|arg对象||
|:----|:----|
|title|string 类型，可选，窗体的顶部抬头|
|label|string 类型，可选，说明内容。一般与 input 同时出现|
|input|Array 类型，可选，输入框列表，是一个 object 数组：<br />`[{text:string,placeHolder:string},{text:string,placeHolder:string},...]`。<br />`text`	string 类型，必选，输入框的value<br />`placeHolder`	string 类型，必选，输入框的placehoder内容|
|checkbox|Array 类型，可选，多选框列表，是一个 object 数组：<br />`[{before:'string',after:'string',checked:boolean,type:'string'}`,`{before:'string',after:'string',checked:boolean,type:'string'},...]`。<br /><br />`before`	string 类型，可选，复选框前面的文字<br />`after`	string 类型，可选，复选框后面的文字<br />`checked`	boolean 类型，可选，默认是false，复选框是否选中<br />`type`	string 类型，可选，表示复选框的类型；有三个类型：normal, none, checkAll。<br />默认值是normal，即表示普通的复选框；<br />`none`，表示不显示复选框；<br />`checkAll`，所有的复选框与这个checkAll类型的复选框的checked状态一致。<br /><br />before 与 after 的关系可以看下图：<br />![](http://jdc.jd.com/halo/img/actbox.png)|
|radio|Array 类型，可选，单选框列表，是一个 object 数组：<br />`[{before:'string',after:'string',checked:boolean,type:'string'}`,`{before:'string',after:'string',checked:boolean,type:'string'},...]`<br /><br />`before`	string类型，可选，复选框前面的文字<br />`after`	string类型，可选，复选框后面的文字<br />`checked`	boolean类型，可选，默认是false，复选框是否选中<br />`type`	string 类型，可选，表示复选框的类型；有两个类型：`normal`, `none`<br />默认值是`normal`，即表示普通的复选框；<br />`none`表示不显示复选框|
|text|string 类型，可选，文本消息内容|
|button|Array 类型，可选，是一个 object 数组：<br />`[{text:'strinig',cb:function,close:boolean,color:'string',bgcolor:'string'},{text:'strinig',cb:function,close:boolean,color:'string',bgcolor:'string'},{text:'strinig',cb:function,close:boolean,color:'string',bgcolor:'string'}...]`<br /><br />`text`	string 类型，必选，按钮显示的文本<br />`cb`	function 类型，可选，按钮点击后回调；<br />如果是带输入框或radio/checkbox框的弹窗，cb会收到一个form数组，会将弹窗的所有输入框的value和选项框的checked返回，如下图：<br /><br />![](http://jdc.jd.com/halo/img/actbox_3.png)<br /><br />此时，点按钮，cb接收到的form将会是：`['188888888888',false,true,false,false]`;|

>弹出窗体的ui组件，会按上面列表的顺序从上到下显示。
如果 use cookie 的话，actbox 的输入框会自动调用历史窗口。如下图<br />![](http://jdc.jd.com/halo/img/actbox_2.png)

DEMO：[点击查看 actbox](http://jdc.jd.com/halo/demo/actbox.html)

[开发者可以直接进入定制窗口页：DO IT YOURSELF !](http://jdc.jd.com/halo/demo/diyactbox.html)

-----------------------------------------------------------------------


