/*
	@author:leeenx
	@修复ios7下weixin6的高度hack
*/
typeof(halo)!='undefined'&&halo.add('ios7weixin6hack',function(){
	//don't need anything,just a name
});
!function(){
	//ios 7下的webChat 6 hack
	var cw=document.documentElement.clientWidth,ch=document.documentElement.clientHeight;
	if(ch>window.screen.availHeight){
		//ios7 webchat 6.0的bug修复
		ch=window.screen.availHeight-44;
		document.documentElement.style.height=document.body.style.height=ch+'px';
	}
	window.addEventListener('resize',function(){
		cw=document.documentElement.clientWidth,ch=document.documentElement.clientHeight;
		if(ch>window.screen.availHeight){
			//ios7 webchat 6.0的bug修复
			ch=window.screen.availHeight-44;
		}
		document.documentElement.style.height=document.body.style.height=ch+'px';
	});
}();