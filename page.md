# 翻页组件 #
**pageinvite**
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

|----|----|

|写字|
