/*
	@author:leeenx
	@活动竖滚与横滚插件
	@原生代码，与框架无关。
	@使用浏览器，ie9以上及ios/android(2.3以上)浏览器
	@使用TOUCH_DRAG.bind(element);可为元素绑定滚屏方法，并且会返回一个对象
	@使用TOUCH_DRAG.unbind解绑
	@var pager=TOUCH_DRAG.bind(element);pager.page_change=function(page,direction){}
	@通过上述方法监听滚屏翻页，page翻页之后的页码，direction表示方向,两个值X Y
	@在page_change函数中通过this指针可以指向绑定元素
	@另外解绑可以用pager.unbind
	@pager.move(target_page,without_keep,isHor); 定位到指定页面 target_page目标页码，without_keep - 不需要滚动效果 isHor 横向（false表示竖向）
*/
var TOUCH_DRAG=function(){
	if(typeof(TOUCH)=='undefined'){//考虑到这个方法的使用可能不依赖于halo.js所以将做成可以独立运行
		//事件统一
		var TOUCH='stop',TOUCH_X=0,TOUCH_Y=0,OFFSET_X=0,OFFSET_Y=0;
		console=console||{log:function(){}};
		if('ontouchstart' in document){
			var touchstart='touchstart',touchend='touchend',touchmove='touchmove';
		}else{
			var touchstart='mousedown',touchend='mouseup',touchmove='mousemove';
		}
		document.body.addEventListener(touchstart,
			function(e){
				TOUCH='start',OFFSET_X=0,OFFSET_Y=0;
				if('touchstart'==touchstart){
					var touchers=e.changedTouches||e.targetTouches,toucher=touchers[0];
					TOUCH_X=toucher.pageX,TOUCH_Y=toucher.pageY;
				}else{
					TOUCH_X=e.clientX,TOUCH_Y=e.clientY;
				}
			},false);
		document.body.addEventListener(touchmove,
			function(e){
				if('start'!=TOUCH&&'move'!=TOUCH)return ;
				var offset_x=0,offset_y=0;
				if('touchstart'==touchstart){
					var touchers=e.changedTouches||e.targetTouches,toucher=touchers[0];
					offset_x=Math.abs(toucher.pageX-TOUCH_X),offset_y=Math.abs(toucher.pageY-TOUCH_Y);
				}else{
					offset_x=Math.abs(e.clientX-TOUCH_X),offset_y=Math.abs(e.clientY-TOUCH_Y);
				}
				if(offset_x>5||offset_y>5)TOUCH='move';//手指移动5px内都不算move
				OFFSET_X=offset_x,OFFSET_Y=offset_y
			},false);
		document.body.addEventListener(touchend,function(e){TOUCH='stop';},false);
		document.body.addEventListener('touchcancel',function(e){TOUCH='stop';},false);
	}
	var get_transform_value=function(transform,key){
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
		return ret;
	}
	var webkit=function(){
		//浏览器特有css样式的
		var css3_div=document.createElement("div");
		css3_div.style.cssText='-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
		if(css3_div.style.webkitTransition){
			return '-webkit-';
		}else if(css3_div.style.mozTransition){
			return '-moz-';
		}else if(css3_div.style.oTransition){
			return '-o-';
		}else if(css3_div.style.msTransition){
			return '-ms-';
		}else{
			return '';
		}
	}();
	var transform_css=function(){//-webkit-、-moz-、-o-、-ms-
		if('-webkit-'==webkit){
			return function (value){
				return {'-webkit-transform':value};
			}
		}else if('-moz-'==webkit){
			return function(value){
				return {'-moz-transform':value};
			}
		}else if('-o-'==webkit){
			return function(value){
				return {'-o-transform':value};
			}
		}else if('-ms-'==webkit){
			return function(value){
				return {'-ms-transform':value};
			}
		}else{
			return function(value){
				return {'transform':value};
			}
		}
	}();
	function css(elem,name,value)
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
	};
	function css3(elem,name,value){//支持css3的简化
		var needWebkit=false,css3Name="|transform|transition|animation|"/*需要加-webkit-的css样式，目前支持这三个*/;
		if(css3Name.indexOf('|'+name+'|')!=-1){
			name=webkit+name;
		}
		return css(elem,name,value);
	}
	var STYLESHEET=function(){
		var styleSheet=function(){
			//创建一个styleSheet,避免跨域问题
			var head = document.getElementsByTagName("head")[0]; 
			var style = document.createElement("style"); 
			style.type="text/css"; 
			head.appendChild(style);
			return document.styleSheets[document.styleSheets.length-1];
		}();
		function addStyleSheet(cssText){/*动态添加css样式*/
			var oCss = styleSheet,cssRules=cssText.split('\r\n');
			var len=!!oCss.cssRules?oCss.cssRules.length:0;//不直接使用oCss.cssRules.length是因为跨域时返回null，所以用len避免错误
			for(var i=0;i<cssRules.length;++i){
				oCss.insertRule(cssRules[i],len++);
			};
			return len;
		}
		return {add:addStyleSheet};
	}();
	var addClass=function(elem,_class){
		var className=elem.className,classReg=new RegExp('(^'+_class+'\\s+)|(\\s+'+_class+'\\s+)|(\\s+'+_class+'$)|(^'+_class+'$)','g');
		if(!className)elem.className=_class;
		else if(classReg.test(className))return;
		else elem.className=className+' '+_class;
	}
	var removeClass=function(elem,_class){
		var className=elem.className,classReg=new RegExp('(^'+_class+'\\s+)|(\\s+'+_class+'\\s+)|(\\s+'+_class+'$)|(^'+_class+'$)','g');
		className=className.replace(classReg,function(k,$1,$2,$3,$4){if($2)return ' ';else return '';});
		elem.className=className;
	}
	//定义html,body的样式，保证100%以及overflow:hidden
	document.body.style.cssText='width:100%; height:100%; overflow:hidden; margin:0; padding:0;';
	document.documentElement.style.cssText='width:100%; height:100%; overflow:hidden; margin:0; padding:0;';
	//横屏警告
	var warn=function(){
		var _warn=document.createElement("div"),_warn_icon=document.createElement('i'),_warn_wrp=document.createElement('div');
		_warn_wrp.style.cssText='position:absolute; width:100%; height:100%; overflow:hidden; left:0; top:0; z-index:9999; background-color:#18103A; display:none;',_warn.style.cssText='position:absolute; left:50%; top:50%; width:250px; height:150px; margin:-75px 0 0 -125px; text-align:center; color:#ffffff;',_warn_icon.style.cssText='position:relative; display:block; width:74px; height:110px; background:url(iphone.png) 0 0 no-repeat; background-size:100%; margin:0 auto; '+webkit+'transform:rotate(-90deg); '+webkit+'animation:TOUCH_DRAG_IPHONE 1.6s ease-in infinite;';
		STYLESHEET.add('@'+webkit+'keyframes TOUCH_DRAG_IPHONE{0%{'+webkit+'transform:rotate(-90deg);}25%{'+webkit+'transform:rotate(0deg);}50%{'+webkit+'transform:rotate(0deg);}75%{'+webkit+'transform:rotate(-90deg);}100%{'+webkit+'transform:rotate(-90deg);}}');//为图片添加一个动画
		//添加滚动效果
		STYLESHEET.add('.TOUCH_DRAG_KEEP{'+webkit+'transition:'+webkit+'transform .3s linear;}');//竖屏
		STYLESHEET.add('.TOUCH_DRAG_H_KEEP{'+webkit+'transition:'+webkit+'transform .2s linear;}');//横屏
		STYLESHEET.add('.TOUCH_DRAG_RESTORE{'+webkit+'transition:'+webkit+'transform .1s linear;}');//弹性
		
		document.body.appendChild(_warn_wrp),_warn_wrp.appendChild(_warn),_warn.appendChild(_warn_icon);
		var _warn_text=document.createTextNode('为了更好的体验，请使用竖屏浏览');
		_warn.appendChild(document.createElement('br')),_warn.appendChild(_warn_text);
		var setCssText=function(wrp,icon,text){
			//设置warn的样式
			if(typeof(wrp)=='string')_warn.style.cssText=wrp;
			if(typeof(icon)=='string')_warn_icon.style.cssText=icon;
			if(typeof(text)=='string')_warn_text.nodeValue=text;
		}
		var show=function(){
			_warn_wrp.style.display='block';
		}
		var hide=function(){
			_warn_wrp.style.display='none';
		}
		return {show:show,hide:hide,setCssText:setCssText};
	}();
	var need_watch='onorientationchange' in window;
	var clientHeight=document.documentElement.clientHeight,clientWidth=document.documentElement.clientWidth;
	if(need_watch){
		if(window.orientation!='0')warn.show();
		window.addEventListener('orientationchange',function(){
			if(window.orientation!='0'){
				warn.show();
			}else{
				warn.hide();
			}
		},false);
	}else{
		if(clientHeight<clientWidth)warn.show();
	}
	//监听窗口变化
	window.addEventListener('resize',function(){
		clientHeight=document.documentElement.clientHeight,clientWidth=document.documentElement.clientWidth;
		if(!need_watch){//没办监听orientationchange，用resize代替
			if(clientHeight<clientWidth){
				warn.show();
			}else{
				warn.hide();
			}
		}
		//窗口变化的影响
		if(wrps.length>0){
			for(var i=0;i<wrps.length;++i){
				var sHeight=wrps[i].elem.scrollHeight,sWidth=wrps[i].elem.scrollWidth;
				if(sHeight!=wrps[i].height){//窗口影响的元素
					wrps[i].height=sHeight,wrps[i].width=sWidth;
				}
				wrps[i].x_page_count=sWidth/clientWidth,wrps[i].y_page_count=sHeight/clientHeight;
				//重新定位x_cur_page,y_cur_page
				if(wrps[i].elem.style){
					var transform=wrps[i].elem.style[webkit+'transform'],_X=parseInt(get_transform_value(transform,'translate3d',0))||0,_Y=parseInt(get_transform_value(transform,'translate3d',1))||0;
					wrps[i].elem.style[webkit+'transform']='translate3d(-'+wrps[i].x_cur_page*clientWidth+'px,-'+wrps[i].y_cur_page*clientHeight+'px,0)';
				}
			}
		}
	},false);
	var wrps=[]/*被绑定事件的元素数组*/;
	var startY=0,offsetY=0,Y,startX=0,offsetX=0,X,motion=-1/*手势方向，-1未知道，0水平，1垂直*/,cur_wrp/*当前手指操作对象，do_move中的cur_wrp与这个不同，do_move的cur_wrp有可能不是当前手指操作对象*/;
	var bind=function(wrapper,_direction){//初始化目标DOM元素
		if(!wrapper)return ;//dom不存在
		if('YX'==_direction)_direction="XY";//支持xy轴顺序乱写
		_direction="XY".indexOf(_direction)!=-1?_direction:"Y";/*默认是Y*/
		if(!!wrapper.getAttribute("TOUCH_DRAG_BIND")){//有绑定信息
			var index=parseInt(wrapper.getAttribute('TOUCH_DRAG_BIND_INDEX'))||0;
			if(wrapper.getAttribute("TOUCH_DRAG_BIND").indexOf(_direction)!=-1){//绑定过了中断
				return wrps[index];
			}else if(wrapper.getAttribute("TOUCH_DRAG_BIND")!=_direction){//绑定过其它轴了
				wrps[index].direction="XY";
				return wrps[index];
			}
		}
		if(wrps[index]){
			wrps[index].direction=_direction;
		}
		(function(){
			//检查绑定元素是不是display:none如果是需要特殊处理
			var display=css(wrapper,'display'),left=css(wrapper,'left'),position=css(wrapper,'position')||'relative';
			if('none'==display){
				wrapper.style.position='absolute',wrapper.style.left='-99999px',wrapper.style.display='block';
				setTimeout(function(){//还原
					wrapper.style.display='none',wrapper.style.position=position,wrapper.style.left=left;
				},100);
			}
		}());
		var wrp_height=wrapper.scrollHeight,wrp_width=wrapper.scrollWidth,x_page_count=Math.ceil(wrp_width/clientWidth),y_page_count=Math.ceil(wrp_height/clientHeight),x_cur_page=0,y_cur_page=0;
		wrapper.addEventListener(touchstart,wrp_touchstart,false);
		wrapper.addEventListener(touchmove,wrp_touchmove,false);
		wrapper.addEventListener(touchend,wrp_touchend,false);
		if(this.style){
			var transform=this.style[webkit+'transform'],_Y=parseInt(get_transform_value(transform,'translate3d',1))||0,_X=parseInt(get_transform_value(transform,'translate3d',0))||0;
			_X=Math.abs(_X),_Y=Math.abs(_Y);
			if(_direction.indexOf("X")){//计算x坐定位
				x_cur_page=Math.round(_X/clientWidth)||0;//四舍五入
			}
			if(_direction.indexOf("Y")){//计算x坐定位
				y_cur_page=Math.round(_Y/clientHeight)||0;//四舍五入
			}
		}
		wrps.push({
			elem:wrapper,
			height:wrp_height,
			width:wrp_width,
			x_page_count:x_page_count,
			x_cur_page:x_cur_page,
			y_page_count:y_page_count,
			y_cur_page:y_cur_page,
			page_change:function(){},
			direction:_direction,//支持方向
			unbind:function(_direction){unbind(wrapper,_direction);},
			move:function(next,without_keep,_direction){
				var index=parseInt(wrapper.getAttribute('TOUCH_DRAG_BIND_INDEX'));
				if(isNaN(index))return ;
				var _this=wrps[index];
				_direction=typeof(_direction)=='undefined'?_this.direction:_direction.toUpperCase();
				if('X'!=_direction||"Y"!=_direction) _direction='XY'==_this.direction?"Y":_this.direction;
				if(_this.direction.indexOf(_direction)!=-1){//匹配上了
					var cur_page=_this[_direction.toLowerCase()+"_cur_page"];
					do_move(_this,cur_page,next,without_keep,_direction);
				}
			},
			lock:false//手指锁定-针对手指操作的重要属性。
		});
		wrapper.setAttribute('TOUCH_DRAG_BIND',_direction),wrapper.setAttribute('TOUCH_DRAG_BIND_INDEX',wrps.length-1);
		checkParentNodeBind();
		return wrps[wrps.length-1];
	}
	var unbind=function(wrapper,_direction){
		var index=parseInt(wrapper.getAttribute('TOUCH_DRAG_BIND_INDEX'));
		if(!isNaN(index)){
			if("XY"==direction&&!!_direction&&"XY"!=_direction){
				if("X"==_direction){
					wrps[index].direction="Y";//对x轴进行解绑
				}else if("Y"==_direction){
					wrps[index].direction="X";//对y轴进行解绑
				}
				return ;
			}
		}
		if(!!wrapper){
			wrapper.removeEventListener(touchstart,wrp_touchstart,false);
			wrapper.removeEventListener(touchmove,wrp_touchmove,false);
			wrapper.removeEventListener(touchend,wrp_touchend,false);
			wrapper.removeAttribute('TOUCH_DRAG_BIND'),wrapper.removeAttribute('TOUCH_DRAG_BIND_INDEX');
		}
		delete wrps[index];//删除对应成员-当索引仍然保留
	}
	function checkParentNodeBind(elem){
		//检查父级元素有没有被绑定 - 因为新加入的元素可能会破坏原来整个体系，所以每次都需要重新检查
		for(var i=0,len=wrps.length;i<len;++i){
			var direction=wrps[i].elem.getAttribute('TOUCH_DRAG_BIND'),node=wrps[i].elem.parentNode;
			if('XY'==direction)continue;//四向不需要考虑父级
			while(node.tagName!='BODY'&&node.tagName!='HTML'){
				var _direction=node.getAttribute("TOUCH_DRAG_BIND");
				if(!!_direction&&_direction!=direction){//父级元素绑定了，并且方向与当前元素不一致
					wrps[i].parentIndex=parseInt(node.getAttribute("TOUCH_DRAG_BIND_INDEX"));
					break;
				}
			}
			if(node.tagName=='BODY'||node.tagName=='HTML'){
				//表示没有parentIndex，清空这个属性
				wrps[i].parentIndex=undefined;
			}
		}
	}
	function wrp_touchstart(e){
		if('start'==TOUCH)return ;//保证操作元素的单一性
		var index=parseInt(this.getAttribute('TOUCH_DRAG_BIND_INDEX'));
		// Y=parseInt(get_transform_value(transform,'translate3d',1))||0,X=parseInt(get_transform_value(transform,'translate3d',0))||0;
		var pos=get_pos(this);
		X=pos.X,Y=pos.Y;
		offsetX=0,offsetY=0,motion=-1;
		cur_wrp=wrps[index];//定位当前被操作wrapper
		if('touchstart'==touchstart){
			var touchers=e.targetTouches||e.changedTouches;
			if(!!touchers){
				var toucher=touchers[0];
				if(!!toucher)
				startX=toucher.pageX,startY=toucher.pageY;
			}
		}else{
			startX=e.clientX,startY=e.clientY;
		}
		e.stopPropagation();
		e.preventDefault();
		TOUCH="start";//在事件传递到下一个元素前把状态设置ok
	}
	function wrp_touchmove(e){
		if(cur_wrp.lock)return ;
		if('start'!=TOUCH&&'move'!=TOUCH)return ;
		e.preventDefault();e.stopPropagation();//防止两个叠加的元素干涉，保证操作的唯一性
		TOUCH='move';//保证TOUCH状态同步
		if('touchstart'==touchstart){
			var touchers=e.targetTouches||e.changedTouches;
			if(!!touchers){
				var toucher=touchers[0];
				offsetX=toucher.pageX-startX,offsetY=toucher.pageY-startY;
			}
		}else{
			offsetX=e.clientX-startX,offsetY=e.clientY-startY;
		}
		if(-1==motion){//判断方法
			//当前的手指趋势
			if(Math.abs(offsetX)>Math.abs(offsetY)){
				motion=0;
			}else{
				motion=1;
			}
			if(typeof(cur_wrp.parentIndex)!='undefined'){//需要考虑父级元素
				if((0==motion&&"Y"==cur_wrp.direction)||(1==motion&&"X"==cur_wrp.direction)){
					//手指趋势与绑定方向不同，手指动交由父级处理。当前事件解绑
					this.removeEventListener(touchmove,wrp_touchmove,false);
					this.removeEventListener(touchend,wrp_touchmove,false);
					//当手指离开后，重新绑定原来的事件
					this.addEventListener(touchend,rebind,false);
					cur_wrp=wrps[cur_wrp.parentIndex];//手指操作对象转到父级
					//X,Y坐标需要重新取
					var pos=get_pos(cur_wrp.elem);
					X=pos.X,Y=pos.Y;
					return ;//不执行下面的阻止冒泡，让事件冒泡到父级元素
				}
			}else{//在不需要考虑父级元素的情况下强制单一方向
				if("Y"==cur_wrp.direction){
					motion=1;
				}else if("X"==cur_wrp.direction){
					motion=0;
				}
			}
			
		}else if(1==motion){
			this.style[webkit+'transform']='translate3d('+X+'px,'+(Y+offsetY)+'px,0)';
		}else if(0==motion){
			this.style[webkit+'transform']='translate3d('+(X+offsetX)+'px,'+Y+'px,0)';
		}else{
			TOUCH='end';//提前结束move
		}
	}
	function wrp_touchend(e){
		if(cur_wrp.lock)return ;
		var transform=this.style[webkit+'transform'];
		if(0==motion){//水平运动
			var _X=parseInt(get_transform_value(transform,'translate3d',0))||X,offset=_X-X,page_count=cur_wrp.x_page_count,next=cur_wrp.x_cur_page,cur_page=cur_wrp.x_cur_page;
		}else if(1==motion){//垂直运动
			var _Y=parseInt(get_transform_value(transform,'translate3d',1))||Y,offset=_Y-Y,page_count=cur_wrp.y_page_count,next=cur_wrp.y_cur_page,cur_page=cur_wrp.y_cur_page;
		}else{//没有方向
			return ;
		}
		if('start'==TOUCH&&offset==0)return ;//加个offset!=0精确判断
		if(Math.abs(offset)>80){//移动50个像素,继续移动
			if(offset>0&&cur_page>0){//往下
				next=cur_page-1;
			}else if(offset<0&&cur_page<page_count-1){//往上
				next=cur_page+1;
			}
			if(next!=cur_page){//需要翻屏
				cur_wrp.lock=true;//锁定
				do_move(cur_wrp,cur_page,next,false,0==motion?'X':'Y');
				if(1==motion){
					cur_wrp.y_cur_page=next;
				}else if(0==motion){//更新数据
					cur_wrp.x_cur_page=next;
				}
				return ;
			}
		}else if(0==offset){
			return ;
		}
		cur_wrp.lock=true;//锁定
		//回退到原来位置
		if(1==motion){
			addClass(this,'TOUCH_DRAG_RESTORE'),this.style[webkit+'transform']='translate3d('+X+'px,-'+(cur_page*clientHeight)+'px,0)';
		}else if(0==motion){
			addClass(this,'TOUCH_DRAG_RESTORE'),this.style[webkit+'transform']='translate3d(-'+(cur_page*clientWidth)+'px,'+Y+'px,0)';
		}
		var _this=this;
		(function(cur_wrp){//cur_wrp对象有可能处于变化状态，所以这里要把cur_wrp固定下来
			setTimeout(function(){
				removeClass(_this,'TOUCH_DRAG_RESTORE');
				cur_wrp.lock=false;//解锁
			},200);	
		}(cur_wrp));
	}
	function rebind(){
		this.removeEventListener(touchend,rebind,false);
		this.addEventListener(touchmove,wrp_touchmove,false);
		this.addEventListener(touchend,wrp_touchend,false);
	}
	function get_pos(_this){//X,Y坐标重置
		var transform=_this.style[webkit+'transform'];
		Y=parseInt(get_transform_value(transform,'translate3d',1))||0,X=parseInt(get_transform_value(transform,'translate3d',0))||0;
		return {X:X,Y:Y};
	}
	var do_move=function(cur_wrp,cur_index,next,without_keep,_direction){
		var wrapper=cur_wrp.elem;
		var keep=without_keep?'TOUCH_DRAG_WITHOUT_KEEP':(1==motion?'TOUCH_DRAG_KEEP':'TOUCH_DRAG_H_KEEP'),delay=without_keep?0:600;
		//X=X||0,Y=Y||0;//如果不是手指操作，需要初始化X,Y
		//由于move可以不由手指发起，所以do_move可能会出现叠加情况。X,Y如果全局变量的话，会有干扰问题。所以这里的X，Y改成局部变量
		var pos=get_pos(wrapper),X=pos.X,Y=pos.Y;
		addClass(wrapper,keep);
		if('Y'==_direction){
			wrapper.style[webkit+'transform']='translate3d('+X+'px,-'+(next*clientHeight)+'px,0)';
		}else if('X'==_direction){
			wrapper.style[webkit+'transform']='translate3d(-'+(next*clientWidth)+'px,'+Y+'px,0)';
		}
		(function(cur_wrp,wrapper,cur_index,next,keep,direction){//因为cur_wrp可能会受干扰，所以用即时调用来使其不受干扰
			setTimeout(function(){//动作结束
				if(cur_index!=next){//有切换屏幕操作
					//需要有一个page_change的函数对外，好调用
					cur_wrp.page_change.call(this,cur_index,next,direction);
				}
				removeClass(wrapper,keep);
				cur_wrp.lock=false;//解锁
			},delay);
		}(cur_wrp,wrapper,cur_index,next,keep,_direction));
		//索引校正
		if('Y'==_direction){
			cur_wrp.y_cur_page=next;
		}else if('X'==_direction){
			cur_wrp.x_cur_page=next;
		}
	}
	return {bind:bind,unbind:unbind}
}();
if(typeof(halo)!='undefined'&&halo.add)halo.add('touchdrag',TOUCH_DRAG);