/*
	@author
	@锁屏加载图片
*/
halo.use(function(m){
	halo.add('loadimg',function(images,parent,bg,cb){//加载图片
		var error=function(){throw('parameter\'s error,please check!');},webkit=m.webkit;
		if(images.constructor!=Array){
			error();
			return ;
		}
		if(arguments.length==2){
			if(typeof(parent)!='function'){error();return ;}
			else{cb=parent;}
			parent=null;
		}else if(arguments.length==3){
			if(typeof(bg)!='function'){error();return ;}
			cb=bg;
			typeof(parent)=='string'&&(bg=parent,parent=null);
		}else if(arguments.length==4){
			if(typeof(parent)!='object'||typeof(bg)!='string'||typeof(cb)!='function'){
				error();
				return ;
			}
		}else{
			throw('please pass 2~4 parameter!');
			return ;
		}
		parent=parent||document.body,bg=bg||'transparent';
		//生成loading对象
		var _wrp=document.createElement("div"),box=document.createElement("div"),circle=document.createElement("div"),loading_bar=document.createElement("div"),p=document.createElement("p");
		_wrp.style.cssText='position:'+(document.body==parent?'fixed':'absolute')+'; left:0; top:0; width:100%; height:100%; background-color:'+bg+'; z-index:9;',box.style.cssText='position:absolute; width:150px; height:150px; border-radius:2px; background-color:rgba(0,0,0,0); color:rgba(255,255,255,.8); margin:-75px 0 0 -75px; left:50%; top:50%;',circle.style.cssText='position:absolute; width:60px; height:60px; left:50%; top:50%; margin:-30px 0 0 -30px; '+webkit+'animation:loading 1.2s linear infinite;',loading_bar.style.cssText='width:54px; height:54px; border:3px solid rgba(255,255,255,.8); border-radius:30px; clip:rect(0px,30px,60px,0); position:absolute; left:0; top:0; '+webkit+'transform-origin:center; -webkit-background-origin:border-box; -webkit-background-clip:border-box; -webkit-mask:-webkit-gradient(linear,0 0,0 100%,from(rgba(255,255,255,1)),to(rgba(255,255,255,0))); opacity:.99;',p.style.cssText='margin:0; padding:0; text-align:center; width:100%; position:absolute; bottom:10px; left:0; font-size:20px; font-weight:bold; line-height:18px; white-space:nowrap';
		box.appendChild(circle),box.appendChild(p),_wrp.appendChild(box),parent.appendChild(_wrp);
		setTimeout(function(){circle.appendChild(loading_bar)},17);
		var img_total=images.length,loaded_count=0;
		var do_load=function(url){
			var img=new Image();
			img.onload=function(){
				++loaded_count;
				p.innerHTML=parseInt((loaded_count/img_total)*100)+"%";
			};
			img.onerror=function(){//出错算加载成功
				++loaded_count;
			}
			img.onabort=function(){//出错算加载成功
				++loaded_count;
			}
			img.src=url;
		};
		for(var i=0;i<img_total;++i){
			do_load(images[i]);
		}
		var check_time=60/*总检查时长为1分钟，超时就直接显示*/,check=function(){
			//定时检查加载
			if(0>=check_time){//检查超时
				if(loaded_count/img_total>.5){
					//加载超过50%直接输出
					if(o.auto)_wrp.parentNode.removeChild(_wrp);
					plush_page(_wrp);
				}else{
					alert(decodeURIComponent("%E5%8A%A0%E8%BD%BD%E5%9B%BE%E7%89%87%E5%A4%B1%E8%B4%A5%EF%BC%8C%E8%AF%B7%E8%BF%94%E5%9B%9E%E5%88%B7%E6%96%B0%E5%B0%9D%E8%AF%95%EF%BC%81"));
				}
			}else{
				check_time-=.5;
				if(loaded_count==img_total){
					if(o.auto)_wrp.parentNode.removeChild(_wrp);
					plush_page(_wrp);
				}else{
					setTimeout(check,500);
				}
			}
		}
		var plush_page=typeof(cb)=='function'?cb:function(){};
		check();
		var o={auto:true};
		return o;
	});
});