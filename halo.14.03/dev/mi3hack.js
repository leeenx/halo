/*
	@author:leeenx
	@解决mi 3长动画bug
*/
halo.use(function(m){
	halo.add('mi3hack',function(){
		if(navigator.userAgent.indexOf('MI 3')>=0){
			var webkit=m.webkit,mi3hack=document.createElement('div');
			m.stylesheet('@'+webkit+'keyframes mi3hack{0%{'+webkit+'transform:translate3d(0,0,0);}100%{'+webkit+'transform:translate3d(0,1px,0);}}');
			m.stylesheet('.mi3hack{'+webkit+'animation:mi3hack 1s linear infinite; width:1px; height:1px; left:-100%; top:-100%;}');
			mi3hack.className='mi3hack';
			document.body.appendChild(mi3hack);
		}
	}());
});