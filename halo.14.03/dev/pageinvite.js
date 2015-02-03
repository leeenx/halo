/*
	@author:leeenx
	@功能：邀请函式翻页
*/
halo.use(function(m){
	var addClass=m.addClass,removeClass=m.removeClass,webkit=m.webkit;
	halo.add('pageinvite',function(){
		//邀请函只需要考虑y轴位置
		var ch=document.documentElement.clientHeight,min_offset_y=50,
		bind=function(elem,need_scale){
			var o={};
			o.need_scale=typeof(need_scale)=='undefined'?true:need_scale;//兼容上个版本
			var sections=elem.getElementsByClassName('page'),cur_page=0,previous=-1,next=1,pre=1,lock=false,motion='none',_motion='none',p_sec=null,n_sec=sections[1],cur_sec=sections[0],sec,y=0,start_y=-1;
			//motion手势方向，_motion上一次手势方向
			for(var i=0,len=sections.length;i<len;++i){
				sections[i].style.cssText='position:absolute; z-index:0; left:0; top:'+(0==i?'0':'100%')+';';
			}
			var _touchstart=function(e){
				e.preventDefault();
				if(lock)return ;
				var touchers=e.changedTouches||e.targetTouches;
				start_y=touchers[0].pageY;//手指初始位置
			}
			m.on(elem,'touchstart',_touchstart,false);
			var _touchmove=function(e){
				if(lock||start_y<0)return ;//被锁定，或没有touchstart时中断
				var touchers=e.targetTouches||e.changedTouches,cur_y=touchers[0].pageY,offset_y=cur_y-start_y;
				if(offset_y<0){
					//向上
					motion='up';
				}else if(offset_y>0){
					//向下
					motion='down';
				}else{
					//无方向
					motion='none';
				}
				drag(offset_y);
			};
			m.on(elem,'touchmove',_touchmove,false);
			var release=function(e){
				if(!sec){
					//到底或顶弹性效果
					cur_sec.style[webkit+'transition']=webkit+'transform .2s linear';
					cur_sec.style[webkit+'transform']='translate3d(0,0,0)';
					setTimeout(function(){
						cur_sec.style[webkit+'transition']='';
						lock=false;
					},200);
				};
				//console.log('release:'+lock+',start_y:'+start_y+';motion:'+motion);
				if(!sec||lock||start_y<0)return ;
				lock=true;//锁住
				var touchers=e.changedTouches||e.targetTouches,cur_y=touchers[0].pageY,offset_y=cur_y-start_y;
				if(Math.abs(offset_y)>=min_offset_y){
					move();
				}else if(offset_y!=0){
					sec.style[webkit+'transition']=webkit+'transform .2s linear';
					sec.style[webkit+'transform']='translate3d(0,'+(motion=='up'?ch:-1*ch)+'px,0)';
					cur_sec.style[webkit+'transform']='scale(1,1)';
					setTimeout(function(){
						motion='none',_motion='none';//使两次手势一致
						lock=false;//解锁
					},200);
				}else{//无方向
					lock=false;
				}
				start_y=-1;//起始位置不在可视区，即没有touchstart的release
			};
			m.on(elem,'release',release,false),m.on(elem,'forcerelease',release,false),m.on(elem,'flick',function(){lock=false;/*解锁*/},false);
			var fix_page=function(num){
				//使页码正确
				if(num>=0){
					return num%len;
				}else{
					return (len+num%len);
				}
			}
			var drag=function(){
				return function(offset_y){
					if(_motion!=motion){
						//变向
						if('up'==motion){
							!p_sec||(p_sec.style.top='-100%');
							!n_sec||(n_sec.style.cssText=webkit+'transform:translate3d(0,'+ch+'px,0);z-index:1;display:block; position:absolute;')
							sec=n_sec;
							pre=cur_page;
						}else if('down'==motion){
							!n_sec||(n_sec.style.top='100%');
							!p_sec||(p_sec.style.cssText=webkit+'transform:translate3d(0,-'+ch+'px,0); z-index:1; display:block; position:absolute;')
							sec=p_sec;
							pre=previous;
						}else{
							if('up'==_motion){
								!n_sec||(n_sec.style.top='100%');
							}else if('down'==motion){
								!p_sec||(p_sec.style.top='-100%');
							}
						}
						_motion=motion;
					}
					var _ch='up'==motion?ch:-ch;
					sec?(sec.style[webkit+'transform']='translate3d(0,'+(_ch+offset_y)+'px,0)'):(cur_sec.style[webkit+'transform']='translate3d(0,'+offset_y/3+'px,0)');
					if(o.need_scale&&sec){
						'up'==motion?(cur_sec.style[webkit+'transform-origin']='top'):(cur_sec.style[webkit+'transform-origin']='bottom');
						var _scale=1-.2*Math.abs(offset_y)/ch;
						cur_sec.style[webkit+'transform']='scale('+_scale+','+_scale+')';
					}
				}
			}();
			var move=function(cur){
				sec.style[webkit+'transition']=webkit+'transform .3s linear';
				sec.style[webkit+'transform']='translate3d(0,0,0)';
				if(o.need_scale){
					cur_sec.style[webkit+'transition']=webkit+'transform .3s linear';
					cur_sec.style[webkit+'transform']='scale(.8,.8)';
				}
				setTimeout(function(){
					cur_sec.style.top=('up'==motion?'100%':'-100%');
					//p_sec,n_sec,sec三者指向改变
					if(typeof(o.page_change)=='function'){
						if(typeof(cur)=='undefined')
						o.page_change(cur_page,('up'==motion?next:previous));
						else
						o.page_change(cur_page,cur);
					}
					if('up'==motion){
						typeof(cur)=='undefined'?++cur_page:cur_page=cur;
					}else{
						typeof(cur)=='undefined'?--cur_page:cur_page=cur;
					}
					next=cur_page+1,previous=cur_page-1;
					if(typeof(o.infinite)=='undefined'||(typeof(o.infinite)!='undefined'&&o.infinite)){
						//默认是无限循环模式
						cur_page=fix_page(cur_page),next=fix_page(next),previous=fix_page(previous);
					}
					cur_sec=sections[cur_page],n_sec=sections[next],p_sec=sections[previous];
					cur_sec.style.cssText='z-index:0;position:absolute; left:0; top:0;';
					sec='up'==motion?n_sec:p_sec;
					motion='none',_motion='none';//使两次手势一致
					lock=false;//解锁
				},300);
			}
			var moveto=function(index){//页面滑动至指定页面
				if(lock)return ;
				if(index>=0&&index<len&&index!=cur_page){
					lock=true;
					sec=sections[index];
					if(cur_page>index){
						motion='down';
						sec.style.cssText=webkit+'transform:translate3d(0,-'+ch+'px,0);z-index:1;display:block; position:absolute;'
					}else{
						motion='up';
						sec.style.cssText=webkit+'transform:translate3d(0,'+ch+'px,0);z-index:1;display:block; position:absolute;'
					}
					'up'==motion?(cur_sec.style[webkit+'transform-origin']='top'):(cur_sec.style[webkit+'transform-origin']='bottom');
					setTimeout(function(){move(index)},0);//chrome 滑动hack
				}
			}
			var unbind=function(){
				m.off(elem,'touchstart',_touchstart),m.off(elem,'touchmove',_touchmove),m.off(elem,'release',release,false),m.off(elem,'forcerelease',release,false);
			}
			o.move=moveto,o.unbind=unbind;
			o.setAuthor=function(){
				var _author=document.createElement('div'),_author2=document.createElement('div');
				_author.style.cssText='position: absolute; width: 100%; height: 22px; line-height: 22px; color: rgba(255,255,255,.5); font-size: 12px; font-weight: normal; top:45px; left: 0; text-align: center;',
				_author2.style.cssText='position: absolute; width: 100%; height: 22px; line-height: 22px; color: rgba(255,255,255,.5); font-size: 12px; font-weight: normal; bottom:45px; left: 0; text-align: center;';
				elem.parentNode.insertBefore(_author,elem),elem.parentNode.insertBefore(_author2,elem);
				return function(author){
					_author.innerHTML=_author2.innerHTML=author||'';
				}
			}();
			return o;
		}
		window.addEventListener('resize',function(){
			ch=document.documentElement.clientHeight;
		})
		return {bind:bind}
	}());
});