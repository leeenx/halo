# 加载组件 #

## loader ##

语法：`m.loader(array)`  
浏览器：android 2.3.x~4.x/ios6~7

array，必选参数，string Array类型，被加载资源的数组，目前支持 png,jpg,gif,css,js。

m.loader 将返回一组方法和属性，并且方法是支持链接语法，具体用法如下:

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <td>fails</td>
        <td>属性，加载资源数组。 {Array}</td>
    </tr>
    <tr>
        <td>failed</td>
        <td>属性，加载失败数。 {Number}</td>
    </tr>
    <tr>
        <td>loaded</td>
        <td>属性，加载完成数。 {Number}</td>
    </tr>
    <tr>
        <td>percent</td>
        <td>属性，加载完成站总需要加载资源的百分比。 {String}</td>
    </tr>
    <tr>
        <td>total</td>
        <td>属性，需要加载资源的总数。 {Number}</td>
    </tr>
    <tr>
        <td>loadstart</td>
        <td>
            方法，添加单个资源加载时的回调方法。<br />
            @param {Function}<br />
            @return this加载资源每一个资源加载开始调用的方法
        </td>
    </tr>
    <tr>
        <td>loadend</td>
        <td>
            方法，添加单个资源加载时的回调方法。<br />
            @param {Function}<br />
            @return this加载资源每一个资源加载完成调用的方法
        </td>
    </tr>
    <tr>
        <td>complete</td>
        <td>
            方法，添加资源加载完成后的回调方法。<br />
            @param {Function}<br />
            @return this所有资源加载完成回调方法
        </td>
    </tr>
    <tr>
        <td>image</td>
        <td>
            方法，获得图片资源，如果有加载则直接调用，如果没有则开始加载。<br />
            @param {String}路径 <br />
            @param {Object：Image} image对象
        </td>
    </tr>
</table> 

<pre>
halo.use('loader',function(m){
m.loader(['images/loader_1.jpg','images/loader_2.jpg','images/loader_3.jpg',
        'images/loader_4.jpg','images/loader_5.jpg'])
.loadend(function(percent){
    //加载完每一个资源都会调用一次
})
.complete(function(){
    //完成加载调用        
});
});
</pre>

*由于上方法是没有 loading 的 ui，所以 loader 模块提供一个 loadmsk 的模块提供一个带 ui 界面的模块。*

loadmsk 的语法：`loadmsk([array],bgcolor,callback)`

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>[array]</td>
        <td>必选，string array，被加载资源的数组，目前支持`png,jpg,gif,css,js`。</td>
    </tr>
    <tr>
        <td>bgcolor</td>
        <td>必选，string，背景着色</td>
    </tr>
    <tr>
        <td>callback</td>
        <td>可选，function，资源加载成功的回调</td>
    </tr>
</table> 

<pre>
halo.use('loader', function(m){
    var loader = m.loaderMsk(
        ['images/loader_1.jpg','images/loader_2.jpg','images/loader_3.jpg'],
        function(){
            //TODO
        });
});
</pre>

DEMO：[点击查看 loader](http://jdc.jd.com/halo/demo/loader.html)

---------------------------------------------------

## lazyloader ##

语法：new m.lazyloader();  
浏览器：android 2.3.x~4.x/ios6~7  
不需要参数  
new m.lazyloader(); 会返回一个complete方法，如下：  

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <td width="100">complete</td>
        <td>
            方法，所有资源加载完成后调用。<br />
            @param {Function}<br />
            @return this所有资源加载完成回调方法
        </td>
    </tr>
</table>

*使用 lazyloader 作滚动加载要注意的是 <img> 标签要加一个 data-lazy 的属性，这个属性存放的是最终要显示的图片地址，而原来的 src 则指向一张空白的图片即可*

```
//dom
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAC0lEQVQIW2NkgAIAABIAApIj7FMAAAAASUVORK5CYII=" width="100%" data-lazy="img/xxx.jpg" alt="">
//js
halo.use('lazyloader',function(m){
new m.lazyloader().complete(function(){
    //TODO 加载完成的时候调用
});
}
```                


DEMO： [点击查看lazy](http://jdc.jd.com/halo/demo/lazy.html)


----------------------------------------------------

## loadimg ##

语法：`m.loadimg([array],parent,bgcolor,callback);`  
浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie10

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>[array]</td>
        <td>必选，string array，被加载图片路径的数组。</td>
    </tr>
    <tr>
        <td>parent</td>
        <td>可选，DOM，存放 loading 界面的父节点，默认是document.body。</td>
    </tr>
    <tr>
        <td>bgcolor</td>
        <td>可选，string，背景颜色，默认透明</td>
    </tr>
    <tr>
        <td>callback</td>
        <td>可选，function，资源加载成功的回调，回调时会带一个参数 DOM，是 loading 界面的容器。在auto为false，需要手动移除 loading 界面</td>
    </tr>
</table> 

loadimg 会返回一个auto的属性，可以用来设置， loading 是否自动关闭，默认是自动关闭

<pre>
m.loadimg(['images/bg.jpg','images/icons.png'],'#179E79',function(loading){
//TODO
}).auto=false;
</pre>
*loadimg 兼容以下写法：  
1) m.loadimg([array],bgcolor);  
2) m.loadimg([array],bgcolor,function);  
3) m.loadimg([array],parent);  
4) m.loadimg([array],parent,function);  
5) m.loadimg([array],function);  
6) m.loadimg([array]);*

DEMO:[点击查看 loadimg](http://jdc.jd.com/halo/demo/loadimg.html)

----------------------------------------------------

## ezloader ##

语法：m.ezloader(fadein,num);  
浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie10

|参数说明| |
|:--|:--|
|fadein|可选，boolean 类型，表示图片完成后以淡入效果显示，默认为true。|
|num|可选，number 类型，表示图片在距离可视范围num像素以内就可以开始载入图片。|

ezloader 会返回一个对象`{load_change,zoom}`，具体用法如下：
|参数说明：||
|:--|:--|
|load_change|方法，页面的图片加载发生变化时触发回调（即加载完一个资源触发一次回调），回调时会传入一个参数img，即一个data-ez节点。|
|zoom|属性，即当前页面的zoom值，用于有使用zoom适应的页面|


*ezloader 与 lazyloader 的功能相似，但是，lazyloader 在页面只能使用一次，这不适用于复杂情况。ezloader 在页面内可多次使用，且使用 load_change 方法还可以让开发者为滚动加载后的图片添加加载效果。*

```javascript
halo.use('ezloader',function(m){
    m.ezloader().load_change=function(img){
        img.className="fadein";//给加载成功的图片加个淡入动画
    };
});
```

DEMO：[点击查看 ezloader](http://jdc.jd.com/halo/demo/ezloader.html)

---------------------------------------------------------------------------


[点击查看说明目录](https://github.com/leeenx/halo/blob/master/manual.md)