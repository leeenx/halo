# HALO.JS 概述 #

**HALO.JS的产生背景**

最近随着 JDC 轻APP 页面的火爆，大量的 H5 活动页面使用轻应用模式展示，产生了大量新的交互方式及功能，并且这些交互方式和功能是可以独立于页面被模块化出来的。

**HALO.JS的功能**

一个交互效果的诞生可能需要耗费我等码农数小时甚至数天的时间完成，为了提高开发的效率和方便模块的引入，halo.js 应运而生。
halo.js 的作用是将分散的多个模块打包成一个文件加载到页面上去，省去了农们复制粘贴的工作，所以 halo.js 不是模块的生产者，它只是模块的搬运工，开发者可以根据自身的需求引入不同的模块。

**HALO.JS核心文件**

halo.js的核心文件是参考yui的模块加载的方式编写的。因为没研究过yui的加载方式，所以只是从观察者的角度去创建了halo.js的核心。后来发现写出来的核心采用了amd模式，即模块依懒前置。考虑到combo服务，使用AMD模块会更简单，所以就不转用cmd模式了。

**版本注意**

目前有两个版本halo.14.03.js与halo.14.05.js两个版本，最新的是halo.14.05.js

**combo服务**

目前使用static.paipaiimg.com域名下的combo服务，因为业务迁移原因，combo服务可能在2015年被停用。

------------------------------------------------------------------------------------------------------------
#使用说明#

使用时，请先下载`halo.js`的文件包，并布置在项目的`/js`目录下。然后在页面添加以下代码  
`<script src="/js/halo.14.05.js"></script>`

### HALO.JS API ###

**use**

按名字载入模块

语法：`halo.use(string1,string2,...,stringX,function);`

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="250">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>string1,string2,...,string3</td>
        <td>可选，要引入的模块名</td>
    </tr>
    <tr>
        <td>function</td>
        <td>必选，模块加载成功后的回调函数。回调时返回一个参数`m`，表示载入的模块集合</td>
    </tr>
</table>

<pre>
/*example*/

halo.use('msgbox',function(m){  
	m.msgbox.show('使用了msgbox模块');  
});
</pre>

**off**

方法，为指定 DOM 解绑事件

语法：`m.off(DOM,event,callback,capture);`

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>DOM</td>
        <td>必选，要解绑事件的 DOM 节点</td>
    </tr>
    <tr>
        <td>event</td>
        <td>必选，要解绑的事件名。可以是原生事件，也可以是封装的定制事件</td>
    </tr>
	<tr>
		<td>callback</td>
		<td>必选，事件函数</td>
	</tr>
	<tr>
		<td>capture</td>
		<td>可选，boolean 类型，表示事件的传递方法是捕获还是冒泡方法</td>
	</tr>
</table>          
<pre>
/*example*/
halo.use(function(m){
    m.on(button,'click',function(e){
        //TODO
    });
    m.off(button,'click');//完成解绑
});
</pre>

**config**

方法，配置 halo.js 的参数  
语法：`halo.config(settings);`  
settings object类型，halo.js的配置对象，具体成员如下：

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">成员介绍</th>
        <th></th>
    </tr>
    <tr>
        <td>DOM</td>
        <td>必选，要解绑事件的 DOM 节点</td>
    </tr>
    <tr>
        <td>event</td>
        <td>必选，要解绑的事件名。可以是原生事件，也可以是封装的定制事件</td>
    </tr>
	<tr>
		<td>callback</td>
		<td>必选，事件函数</td>
	</tr>
	<tr>
		<td>capture</td>
		<td>可选，boolean 类型，表示事件的传递方法是捕获还是冒泡方法</td>
	</tr>
</table>  
<pre>
/*example*/
halo.config({combo:true,wait:true,version:'20141111'}).use(function(m){
    m.off(DOM,'flick',function(){alert('flick');},false);
    //todo
});
</pre>

**addClass**

方法，为指定的 DOM 添加样式  
语法：`m.addClass(DOM,string)`

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>DOM</td>
        <td>必选，目标 DOM 节点</td>
    </tr>
    <tr>
        <td>string</td>
        <td>必选，样式名</td>
    </tr>
</table>  

<pre>
/*example*/
halo.use(function(m){
    m.addClass(button,'red');
    //todo
});
</pre>

**removeClass**

方法，为指定的 DOM 移动样式  
语法：`m.removeClass(DOM,string)`

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>DOM</td>
        <td>必选，目标 DOM 节点</td>
    </tr>
    <tr>
        <td>string</td>
        <td>必选，样式名</td>
    </tr>
</table> 

<pre>
/*example*/
halo.use(function(m){
    m.removeClass(button,'red');
    //todo
});
</pre>

**hasClass**

方法，判断指定的 DOM 有无此样式  
语法：m.hasClass(DOM,string);

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>DOM</td>
        <td>必选，目标 DOM 节点</td>
    </tr>
    <tr>
        <td>string</td>
        <td>必选，样式名</td>
    </tr>
</table> 

<pre>
/*example*/
halo.use(function(m){
    if(m.hasClass('red')){
        //todo
    }
});
</pre>

**stylesheet**

方法，动态添加样式片  
语法：`m.stylesheet(string)`

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>string</td>
        <td>必选，样式片段</td>
    </tr>
</table> 

<pre>
/*example*/
halo.use(function(m){
    m.stylesheet('.red{color:#ff0000;}');
});
//有时js动态生成css3动画，可以借用这个方法把样式加入页面
</pre>

**webkit**

属性，返回当浏览器的特征css 前缀

<pre>
/*example*/
halo.use(function(m){
    alert('你当前的浏览器的css3前缀是：'+m.webkit);
});
//有时js动态生成css3动画，可以借用这个方法把样式加入页面
</pre>

[点击查看说明目录](https://github.com/leeenx/halo/blob/master/manual.md)