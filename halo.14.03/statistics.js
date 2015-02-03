(function(exprots){
	var Statistics = {};
	Statistics.share = function(){
		if(!util) return;
		var img = new Image();
		var url = 'http://www.l-zhi.com/proxy/tj.php';
		var domain = window.location;
		if('' === domain.host){
			return;
		}
		img.src= url + '?url=' + domain.host + domain.pathname;
	}
	
	if(typeof PM == 'undefined'){
        throw('缺少依赖库 PM.js');
        exprots.Statistics = Statistics;
        return;
    }
        
    PM.Statistics = Statistics;
})(window);