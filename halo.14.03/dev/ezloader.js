/*
	@author:leeenx
	@滚动加载功能
*/
halo.use(function(m){
	halo.add('ezloader',function(fadein,preload_distance){
		var o={zoom:1};
		fadein=typeof(fadein)=='undefined'?1:fadein;
		var getTop = function(e) {
			var parent=e.offsetParent;
			if(parent==null)return -1;//祖先被display:none了
			var offset = e.offsetTop;
			while(parent.tagName!='BODY'&&parent.tagName!='HTML'){
				offset+=parent.offsetTop;
				parent=parent.offsetParent;
			}        
	       return offset*o.zoom;
	    },wh=window.screen.height,listenscroll=function(){
	    	window.addEventListener('scroll',load)
	    },unlistenscroll=function(){
	    	window.removeEventListener('scroll',load)
	    },load=function(){
	    	var st=document.body.scrollTop||document.documentElement.scrollTop||window.HALO_ST||0;
	    	for(var i=0,len=shake.length;i<len;++i){
	    		if(st+preload_distance>=shake[i][0]){
	    			shake[i][2]||(function(i){
	    				var _i=shake[i][3];
	    				_shake[_i].onload=_shake[_i].onerror=function(){
	    					if(typeof(o.load_change)=='function'){
	    						o.load_change(_shake[_i]);
	    					}
	    					if(++has_loaded==len){
	    						unlistenscroll();//取消监听
	    					};
	    					fadein&&(this.style.opacity='1');
	    				};
	    				shake[i][2]=1;//表示不用再加载了
	    				_shake[_i].src=shake[i][1];
	    			}(i));
	    		}
	    	}
	    },has_loaded=0,_shake=document.querySelectorAll('[data-ez]'),shake=[];
		for(var i=0,len=_shake.length;i<len;++i){
			var _top=getTop(_shake[i]);
			if(_top<0)continue;//如果节点所在的祖先节点中有display:none;的话，不回收data-ez
			shake.push([_top,_shake[i].getAttribute('data-ez'),0,i]);
			_shake[i].removeAttribute('data-ez');
			fadein&&(_shake[i].style.opacity=0,_shake[i].style[m.webkit+'transition']='opacity .6s linear');
		};
		preload_distance=preload_distance||0;
		preload_distance+=wh;
		load();//载入第一屏
		listenscroll();//开始监听
		return o;
	});
});