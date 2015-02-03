/*
	@author:leeenx
	@3d翻页效果
*/
halo.use(function(m){
	halo.add('tripage',function(){
		//添加样式
		var webkit=m.webkit,ch=document.documentElement.clientHeight;
		m.stylesheet('.TRI_PAGE_PERSPECTIVE{'+webkit+'+perspective:200px}');
		m.stylesheet('.TRI_PAGE_WRAP{position:absolute; width:100%; height: 100%; left: 0; top: 0; '+webkit+'transform-style:preserve-3d; '+webkit+'transform-origin:50% 50% -'+(ch*.5)+'px;}');
		m.stylesheet('.TRI_PAGE_KEEP{'+webkit+'transition:'+webkit+'transform .3s linear;}');
		m.stylesheet('.TRI_PAGE_RESTORE{'+webkit+'transition:'+webkit+'transform .1s linear;}');
		m.stylesheet('.TRI_PAGE{position:absolute; top:0; left: 0; width:100%; height: 100%; '+webkit+'backface-visibility:hidden;}');
		m.stylesheet('.TRI_PAGE:nth-child(1){'+webkit+'transform:translate3d(0,0,0) rotate3d(0,0,0,0deg);}');
		m.stylesheet('.TRI_PAGE:nth-child(4){'+webkit+'transform:translate3d(0,-50%,-'+(ch*.5)+'px) rotate3d(1,0,0,90deg);}');
		m.stylesheet('.TRI_PAGE:nth-child(3){'+webkit+'transform:translate3d(0,0,-'+ch+'px) rotate3d(1,0,0,180deg);}');
		m.stylesheet('.TRI_PAGE:nth-child(2){'+webkit+'transform:translate3d(0,50%,-'+(ch*.5)+'px) rotate3d(1,0,0,270deg);}');
		var bind=function(elem){
			m.addClass(elem,'TRI_PAGE_WRAP');
			var pages=elem.getElementsByClassName('page');
			if(pages.length!=4){
				throw('the count of sub pages must be 4!');
				return ;
			}
			for(var i=0;i<4;++i){
				m.addClass(pages[i],'TRI_PAGE');
			}
			m.on(elem,'touchstart',_touchstart,false),m.on(elem,'touchmove',_touchmove,false),m.on(elem,'release',_release,false);
			o.move=function(index){
				m.addClass(elem,'TRI_PAGE_KEEP');
				move.call(elem,index);
				setTimeout(function(){m.removeClass(elem,'TRI_PAGE_KEEP');},300)
			},o.unbind=function(){unbind(elem);}
			return o;
		},unbind=function(elem){
			m.off(elem,'touchstart',_touchstart,false),m.off(elem,'touchmove',_touchmove,false),m.off(elem,'release',_release,false);
		},_touchstart=function(e){
			//if(lock)return ;
			var transform=this.style[webkit+'transform']||'',_rotateX=m.get_transform_value(transform,'rotate3d',3)||0,touches=e.targetTouches||e.changedTouches;
			rotateX=parseFloat(_rotateX),Y=touches[0].pageY;
			infinite=typeof(o.infinite)!='undefined'?o.infinite:true;
		},_touchmove=function(e){
			if(lock)return ;
			var touches=e.targetTouches||e.changedTouches,_offsetY=touches[0].pageY-Y,_offsetRotateX=90*_offsetY/ch;
			offsetY=_offsetY;
			if(infinite||(!infinite&&cur>0&&offsetY>0)||(!infinite&&cur<3&&offsetY<0)){
				offsetRotateX=_offsetRotateX;
			}else{
				offsetRotateX=0;
			}
			this.style[webkit+'transform']='rotate3d(1,0,0,'+(rotateX-offsetRotateX)+'deg)';
		},_release=function(e){
			if(lock||0==offsetRotateX)return ;
			var keep=Math.abs(offsetY)>=min_offset?'TRI_PAGE_KEEP':'TRI_PAGE_RESTORE',timeout=Math.abs(offsetY)>=min_offset?300:100;
			m.addClass(this,keep);
			lock=true;//上锁
			if(offsetY>=min_offset){
				//向下
				move.call(this,cur-1);
			}else if(offsetY<=-1*min_offset){
				//向上
				move.call(this,cur+1);
			}else{
				//恢复
				this.style[webkit+'transform']='rotate3d(1,0,0,'+rotateX+'deg)';
			}
			var _this=this;
			setTimeout(function(){
				m.removeClass(_this,keep);lock=false;offsetRotateX=0,offsetY=0;
			},timeout)
		},move=function(index){
			infinite||(index=fix_page(index));
			if(index==cur)return ;
			if(offsetY>0){
				//向下
				this.style[webkit+'transform']='rotate3d(1,0,0,'+(rotateX+(index-cur)*90)+'deg)';
			}else{
				//向上
				this.style[webkit+'transform']='rotate3d(1,0,0,'+(rotateX+(index-cur)*90)+'deg)';
			}
			if(typeof(o.page_change)=='function')o.page_change(cur,index);
			cur=index;
		},fix_page=function(num){
			var ret=num%4;
			ret=ret<0?4+ret:ret;
			return ret;
		},min_offset=50,Y=0,offsetY=0,rotateX=0,cur=0,infinite=true,o={},lock=false,offsetRotateX=0;
		window.onresize=function(){
			ch=document.documentElement.clientHeight;
			pages[1].style[webkit+'transform']='translate3d(0,-50%,-'+(ch*.5)+'px) rotate3d(0,0,0,90deg)';
			pages[2].style[webkit+'transform']='translate3d(0,-50%,-'+ch+'px) rotate3d(0,0,0,90deg)';
			pages[3].style[webkit+'transform']='translate3d(0,-50%,-'+(ch*.5)+'px) rotate3d(0,0,0,90deg)';
		}
		return {bind:bind,unbind:unbind};
	}());
});