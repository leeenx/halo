/*
	@author:leeenx
	@自动判断a元素，使其它在无click事件下也可以正常工作。
	@如果有click事件，则本方法会不会执行任何操作。如果click事件被阻止，则会判断被点点击元素是否为a元素，是否需要跳转
*/
halo.use(function(m){
	halo.add('enablea',function(){
		var o={capture:true};//默认使用捕获事件，而不是冒泡事件
		var hasClk=true;//默认认为是有click事件
	m.on(document.body,'touchstart',function(){hasClk=false;/*假设click被阻止了*/},true);
		m.on(document.body,'flick',chkEl,true);//捕获
		m.on(document.body,'flick',chkEl2,false);//冒泡
		m.on(document.body,'click',function(){
			hasClk=true;//对touchstart假定的否定
		},true);//检查click事件
		function chkEl(e){//capture方式
			setTimeout(function(){
				if(!hasClk&&o.capture)_chkEl(e);//click事件被阻止了，需要代码来判断
			},600);
		}
		function chkEl2(e){//冒泡方式
			setTimeout(function(){
				if(!hasClk&&!o.capture)_chkEl(e);//click事件被阻止了，需要代码来判断
			},600);
		}
		function _chkEl(e){
			var target=e.target;
			if(target&&target.tagName=='A'){
				//是A元素
				chkA(target.href);
			}else{
				chkParent(target);
			}
		}
		function chkA(href){
			if(!!href&&href.indexOf('javascript:')!=0){
				//是href链接
				location.href=href;
			}else if(href.indexOf('javascript:')==0){//表示执行一段js代码
				var evalString=href.replace('javascript:','');
				eval(evalString);
			}
		};
		function chkParent(el){
			var parent=el.parentNode;
			while('BODY'!=parent.tagName&&'HTML'!=parent.tagName){
				if('A'==parent.tagName){
					//是A元素，不止
					chkA(parent.href);
					break;
				}
				parent=parent.parentNode;
			}
		};
		return o;
	}());
});