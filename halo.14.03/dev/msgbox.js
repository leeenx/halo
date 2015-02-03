/*
	@author:leeenx
	@常用弹出提示框
*/
halo.use(function(m){
	var webkit=m.webkit;
	//动态loading层
	var LOADING=function(){
		m.stylesheet('@'+webkit+'keyframes loading{0%{'+webkit+'transform:rotate(0deg);}100%{'+webkit+'transform:rotate(360deg);}}');
		var _wrp=document.createElement("div"),box=document.createElement("div"),circle=document.createElement("div"),p=document.createElement("p");
		_wrp.style.cssText='position:fixed; left:0; top:0; right:0; bottom:0; background-color:transparent; z-index:9;',box.style.cssText='position:fixed; width:100px; height:100px; border-radius:2px; background-color:rgba(0,0,0,0.5); color:rgba(255,255,255,.8); margin:-50px 0 0 -50px; left:50%; top:50%; -webkit-backface-visibility:hidden;',circle.style.cssText='position:absolute; background:url(data:image/png;base64,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) 0 0 no-repeat; background-size:100%; width:50px; height:50px; left:50%; top:50%; margin:-25px 0 0 -25px; '+webkit+'animation:loading 1.2s linear infinite;',p.style.cssText='margin:0; padding:0; text-align:center; width:80px; position:absolute; bottom:10px; left:50%; margin:0 0 0 -40px; line-height:18px; white-space:nowrap';
		_wrp.addEventListener('touchstart',function(e){
			e.preventDefault();//防止滚动
		},false);
		var show=function(){
			var opacity=.5;
			if(typeof(arguments[0])=='string'){
				var text=arguments[0];
				opacity=(typeof(arguments[1])!='undefined'&&!arguments[1])?0:opacity;
			}else{
				opacity=(typeof(arguments[0])!='undefined'&&!arguments[0])?0:opacity;
			}
			var text=typeof(arguments[0])=='string'?arguments[0]:'';
			if(text){
				circle.style.marginTop='-35px',p.innerHTML=text;
			}
			box.style.backgroundColor='rgba(0,0,0,'+opacity+')';
			//box.style.top='';
			box.appendChild(circle),box.appendChild(p),_wrp.appendChild(box),document.body.appendChild(_wrp);
		},hide=function(){
			if(_wrp.parentNode)
			_wrp.parentNode.removeChild(_wrp);
		}
		_o={show:show,hide:hide};
		return _o;
	}();
	//弹出层
	var msgBox=function(){
		var show=function(){
			var text=arguments[0],btn_1=arguments[1],btn_2=arguments[2],needClose=true;
			if(typeof(text)!='string'){
				return ;
			}
			if(arguments.length==1){
				needClose=false;//没有按钮
			}else if(arguments.length==2||arguments.length==3){
				var i=arguments.length-1;
				if(typeof(arguments[i])!='undefined'&&typeof(arguments[i])!='object')needClose=!!arguments[i];
			}else if(arguments.length>3){
				needClose=!!arguments[4];
			}
			var _wrp=document.createElement("div"),box=document.createElement("div"),bd=document.createElement("div"),ft=document.createElement("div"),p=document.createElement('p'),closer=document.createElement("div"),i='display:block; position:absolute; width:0; height:0; overflow:hidden; border:5px solid transparent;',left_btn=document.createElement("div"),right_btn=document.createElement("div"),center_btn=document.createElement("div");
			_wrp.style.cssText='position:fixed; left:0; top:0; right:0; bottom:0; background-color:rgba(0,0,0,.8); z-index:9; '+m.webkit+'transition:opacity linear .6s;',box.style.cssText='position:absolute; left:30px; right:30px; top:50%; height:auto; '+webkit+'transform:translate3d(0,-50%,0); background-color:#fff; color:rgba(0,0,0,.8); font-size:14px;',bd.style.cssText='position:relative; padding:8px; line-height:18px; text-align:center; font-size:12px; border-bottom:1px solid rgba(0,0,0,.2); height:80px;',p.style.cssText='padding:8px; margin:0; position:relative; top:50%; '+webkit+'transform:translate3d(0,-50%,0);',ft.style.cssText='position:relative; height:48px;',closer.style.cssText='position:absolute; width:10px;height:10px; overflow:hidden; background-color:#A19A9A; top:8px; right:8px; overflow:hidden',left_btn.style.cssText='position:absolute; height:48px; left:0; right:50%; top:0; bottom:0; text-align:center; line-height:48px;',right_btn.style.cssText='position:absolute; height:48px; top:0; bottom:0; left:50%; right:0; border-left:1px solid rgba(0,0,0,.2); text-align:center; line-height:48px;',center_btn.style.cssText='position:absolute; height:48px; top:0; bottom:0; left:0; right:0; text-align:center; line-height:48px;';
			_wrp.appendChild(box),box.appendChild(bd),box.appendChild(ft),bd.appendChild(p);
			if(needClose){
				box.appendChild(closer)
				closer.innerHTML='<i style="'+i+' border-top-color:#fff; left:0; top:-1px;"></i>'+'<i style="'+i+' border-right-color:#fff; right:-1px; top:0;"></i>'+'<i style="'+i+' border-bottom-color:#fff; left:0; bottom:-1px;"></i>'+'<i style="'+i+' border-left-color:#fff; left:-1px; top:0;"></i>';
				m.on(closer,'touchend',function(){
					hide(_wrp);
				})
			}
			// p.innerHTML='暂时无法登录，请稍候再试',left_btn.innerHTML='取消',right_btn.innerHTML='确认';
			// ft.appendChild(right_btn),ft.appendChild(left_btn);
			// document.body.appendChild(_wrp);
			p.innerHTML=text;
			if(typeof(btn_1)!='object'){
				// center_btn.innerHTML='确定',center_btn.addEventListener(touchend,function(){hide(_wrp);},false);
				//ft.appendChild(center_btn);
				box.removeChild(ft);//没有按钮
			}else if(typeof(btn_2)!='object'){
				center_btn.innerHTML=btn_1.text||decodeURIComponent('%E7%A1%AE%E5%AE%9A'),
				m.on(center_btn,'touchend',function(e){
					e.preventDefault();e.stopPropagation();//防止点穿
					if(typeof(btn_1.cb)=='function')btn_1.cb();
					if(typeof(btn_1.close)=='undefined'||btn_1.close)hide(_wrp);
				}),!btn_1.color||(center_btn.style.color=btn_1.color);
				ft.appendChild(center_btn);
			}else{
				left_btn.innerHTML=btn_1.text||decodeURIComponent('%E5%8F%96%E6%B6%88'),
				m.on(left_btn,'touchend',function(e){
					e.preventDefault();e.stopPropagation();//防止点穿
					if(typeof(btn_1.cb)=='function')btn_1.cb();
					if(typeof(btn_1.close)=='undefined'||btn_1.close)hide(_wrp);
				}),!btn_1.color||(left_btn.style.color=btn_1.color);;
				right_btn.innerHTML=btn_2.text||decodeURIComponent('%E7%A1%AE%E5%AE%9A'),
				m.on(right_btn,'touchend',function(e){
					e.preventDefault();e.stopPropagation();//防止点穿
					if(typeof(btn_2.cb)=='function')btn_2.cb();
					if(typeof(btn_2.close)=='undefined'||btn_2.close)hide(_wrp);
				}),!btn_2.color||(right_btn.style.color=btn_2.color);;
				ft.appendChild(right_btn),ft.appendChild(left_btn);
			}
			document.body.appendChild(_wrp);
			return _wrp;
		},hide=function(_wrp){
			_wrp.style.opacity=0;
			setTimeout(function(){
				_wrp.parentNode.removeChild(_wrp);
			},600);
		},_o={show:show,hide:hide,loading:LOADING};
		return _o;
	}();
	halo.add('msgbox',msgBox);
});