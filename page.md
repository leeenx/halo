# 翻页组件 #
## pageinvite ##
分页模式：快捷翻页/片状翻页  

语法：m.pageinvite.bind(DOM);  
浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie10

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>DOM</td>
        <td>必选，分页的容器节点（父节点或祖先节点）</td>
    </tr>
</table>

*需要注意的是，使用这个方法的第一个分页都应该独立在一个节点内，并且这个节点需要添加一个叫 page 的样式。因为 pageinvite 内部方法是通过 class="page" 来识别分页的。需要引入 uievent 作为事件依赖*

pageinvite.bind 方法会返回一个对象{page_change,infinite,need_scale,unbind,move}，具体用法如下：

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <td>page_change</td>
        <td>方法，翻页事件监听，在翻页事件触发后回调此方法，并且返回两个参数c,n。c表示翻出页，n表示翻入页</td>
    </tr>
    <tr>
        <td>infinite</td>
        <td>属性，boolean 类型，是否循环翻页，默认为true</td>
    </tr>
    <tr>
        <td>need_scale</td>
        <td>属性，boolean 类型，翻页过程有缩放效果，默认为false</td>
    </tr>
    <tr>
        <td>unbind</td>
        <td>方法，解绑 pageinvite 方式翻页</td>
    </tr>
    <tr>
        <td>move</td>
        <td>
            方法，翻入第几页<br />
            语法：pager.move(n);<br />
            n,必选参数，表示翻入页码索引<br />
            <pre>
var pager=m.pageinvite.bind(document.getElementById('wrap'));
pager.move(3);//翻到第4页           
            </pre>
        </td>
    </tr>
    <tr>
        <td>setAuthor</td>
        <td>
            方法，设置作者信息<br />
            语法：pager.setAuthor(string)<br />
            用于模拟 iOS 下拉到顶或到底时，黑色底部下的“由xxx.com提供”。如下图：<br />
            <img src="http://jdc.jd.com/halo/img/20141103.png" />
        </td>
    </tr>
</table>
<pre>
/*example*/
halo.use('uievent','pageinvite',function(m){
  var wrap=document.getElementById("wrap");
  var pager=m.pageinvite.bind(wrap);
    pager.page_change=function(cur,next){
        
    }
    pager.infinite=false;
    var jump=document.getElementById("jump");
    m.on(jump,'flick',function(){
       pager.move(1);
        //pager.unbind();
    });
})
</pre>


DEMO：[点击查看pageinvite翻页](http://jdc.jd.com/halo/demo/pageinvite.html)

------------------------------------------------------

## pagedrag ##

分页方式：整页滑动  
语法：`m.pagedrag.bind(DOM,motion,delegate)`;  
浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie10  

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>DOM</td>
        <td>必选，分页的容器节点（父节点或祖先节点）</td>
    </tr>
    <tr>
        <td>motion</td>
        <td>可选，string 类型，有三个值X,Y,XY,表示页面是横屏滑动还是竖屏滑动，或者是横竖屏滑动</td>
    </tr>
    <tr>
        <td>delegate</td>
        <td>可选，boolean 类型，默认false; 表示被托管，当 motion 为XY时此属性将无效。 motion 为X或Y， delegate 为true时， pagedrag 可与其它翻页组合做复杂翻页功能</td>
    </tr>
</table> 

pagedrag.bind 将返回一个对象`{unbind,move,page_change}`，具体用法如下：

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <td>page_change</td>
        <td>方法，翻页事件监听，在翻页事件触发后回调此方法，并且返回两个参数 c,n。c表示翻出页，n表示翻入页</td>
    </tr>
    <tr>
        <td>unbind</td>
        <td>方法，解绑 pageinvite 方式翻页</td>
    </tr>
    <tr>
        <td>setAuthor</td>
        <td>方法，与pageinvite的setAuthor相同</td>
    </tr>
    <tr>
        <td>move</td>
        <td>
            方法，翻入第几页。<br />
            语法：pager.move(n); <br />
            n,必选参数，翻入页码索引
            <pre>
var pager=m.pagedrag.bind(document.getElementById('wrap'),'Y',true);
pager.move(3);//翻到第4页
            </pre>
        </td>
    </tr>
</table> 
*必须依赖模块：uievent*

DEMO:[点击查看pagedrag翻页](http://jdc.jd.com/halo/demo/pagedrag.html)

-----------------------------------------------------

## tripage ##

分页方式：3D效果翻页  
语法：`m.tripage.bind(DOM)`  
浏览器：android 4.x/ios6~7/pc chrome/pc firefox/pc ie10

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>DOM</td>
        <td>必选，分页的容器节点（父节点或祖先节点）</td>
    </tr>
</table>

tripage.bind 将返回一个对象`{unbind,move,page_change}`，具体用法如下：

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <td>page_change</td>
        <td>方法，翻页事件监听，在翻页事件触发后回调此方法，并且返回两个参数 c,n。c表示翻出页，n表示翻入页</td>
    </tr>
    <tr>
        <td>unbind</td>
        <td>方法，解绑 tripage 方式翻页</td>
    </tr>
    <tr>
        <td>move</td>
        <td>
            方法，翻入第几页<br />
            语法：pager.move(n);<br />
            n,必选参数，翻入页码索引
            <pre>
var pager=m.tripage.bind(document.getElementById('wrap'));
pager.move(3);//翻到第4页            
            </pre>
        </td>
    </tr>
</table>

*仅适用于四个分页的页面。并且，android 2.3 以下不支持 3d 效果，所以使用时要做判断。如果是 android 2.3.x 可以降级使用 pageinvite，毕竟两个分页方法的调用是一样的。*

*依赖组件: uievent*

DEMO:[点击查看tripage翻页](http://jdc.jd.com/halo/demo/tripage.html)

------------------------------------------------------------------------------------------------------------------

## touchdrag ##

分页方式：整页滑动  
语法：`m.touchdrag.bind(DOM,motion)`   
浏览器：android 2.3.x~4.x/ios6~7/pc chrome/pc firefox/pc ie10

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>DOM</td>
        <td>必选，分页的容器节点（父节点或祖先节点）</td>
    </tr>
    <tr>
        <td>motion</td>
        <td>可选，string 类型，有三个值X,Y,XY,表示页面是横屏滑动还是竖屏滑动，或者是横竖屏滑动</td>
    </tr>
</table> 

touchdrag.bind 将返回一个对象`{dom,height,width,x_page_count,y_page_count,x_cur_page,y_cur_page,page_change,unbind,move,lock}`，具体用法如下：

<table style="border-collapse:collapse;" width="100%">
    <tr>
        <th width="100">参数说明：</th>
        <th></th>
    </tr>
    <tr>
        <td>DOM</td>
        <td>属性，当前被绑定的 DOM 节点</td>
    </tr>
    <tr>
        <td>height</td>
        <td>属性，当前绑定 DOM 节点的高度</td>
    </tr>
    <tr>
        <td>width</td>
        <td>属性，当前绑定 DOM 节点的宽度</td>
    </tr>
    <tr>
        <td>x_page_count</td>
        <td>属性，X 轴方向上有几个分页</td>
    </tr>
    <tr>
        <td>y_page_count</td>
        <td>属性，Y 轴方向上有几个分页</td>
    </tr>
    <tr>
        <td>x_cur_page</td>
        <td>属性，当前处于 X 轴的子页索引</td>
    </tr>
    <tr>
        <td>y_cur_page</td>
        <td>属性，当前处于 Y 轴的子页索引</td>
    </tr>
    <tr>
        <td>page_change</td>
        <td>方法，翻页事件监听，在翻页事件触发后回调此方法，并且返回两个参数c,n。c表示翻出页，n表示翻入页</td>
    </tr>
    <tr>
        <td>unbind</td>
        <td>方法，解绑 tripage 方式翻页</td>
    </tr>
    <tr>
        <td>move</td>
        <td>
            方法，翻入第几页<br />
            语法：pager.move(n);<br />
            n 必选参数，翻入页码索引<br />
            <pre>
var pager=m.tripage.bind(document.getElementById('wrap'));
pager.move(3);//翻到第4页
            </pre>
        </td>
    </tr>
    <tr>
        <td>lock</td>
        <td>属性，手指的锁定状态</td>
    </tr>
</table> 

>touchdrag 是 pagedrag 的完全版本，能完全实现4向滚动。但是，现实意义不大，而且代码长度是 pagedrag 的3倍。
不过 touchdrag 可以不依赖 halo.js 而独立被引用。
视具体情况来使用 touchdrag，如果是双向滚动建议直接用 pagedrag，四向滚动可以考虑用 pagedrag 的嵌套形式实现四向滚动。

DEMO：[点击查看touchdrag翻页](http://jdc.jd.com/halo/demo/touchpage.html)


----------------------------------------------------------------------------------

[点击查看说明目录](https://github.com/leeenx/halo/blob/master/manual.md)