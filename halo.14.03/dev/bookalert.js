/*
	@author:leeenx
	@功能：预约提醒
*/
halo.add('bookalert',function(activeid,cb){
	if(!activeid)return ;
	var ifr=document.createElement('iframe');
	ifr.style.display='none';
	document.body.appendChild(ifr);
	ifr.src="http://bases.wanggou.com/presale/subscribeactive?activeid="+activeid+"&returl="+encodeURIComponent('http://mm.wanggou.com/halo/bookalert.html');
	window.addEventListener('message',function(json){
		if('bookAlert'==json.data.type){
			//来自book
			typeof(cb)=='function'&&(cb(json.data),cb=null);//回调成功后，删除回调
		}
	});
	setTimeout(function(){
		//6s没有回调，就认定是未登录状态
		typeof(cb)=='function'&&(cb({ret:2,msg:'logout'}),cb=null);//回调成功后，删除回调
	},6000);
});