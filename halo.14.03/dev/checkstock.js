/*
	@author:leeenx
	@查询商品库存情况
	@以下是stock.StockState对应的状态
	//33		有货	现货-下单立即发货
	//39		有货	在途-正在内部配货，预计2~6天到达本仓库
	//40		有货	可配货-下单后从有货仓库配货
	//36		预订
	//34		无货
*/
halo.use('jsonp',function(m){
    halo.add('checkstock',function(skuid,cb){
        m.jsonp(
            {
                url:'http://st.3.cn/gds.html',
                data:{
                    originid:'3',
                    id:skuid,
                    skuid:skuid,
                    provinceid:1,
                    cityid:72,
                    areaid:4139,
                    townid:0,
                    sortid1:0,
                    sortid2:0,
                    sortid3:0,
                    ch:navigator.userAgent.toLowerCase().indexOf('micromessenger')?5:4,
                    t:Math.random()
                },
                callback:function(json){
                    typeof(cb)=='function'&&json.stock&&cb(json.stock);
                }
            }
        );
    });
});