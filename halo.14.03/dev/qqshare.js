halo.use(function(m){
    var config;//分享参数对象
    halo.add('qqshare',function(url,img,title,desc,width,height,appid){
        if(typeof(mqq)=='undefined')return ;//非手Q或缺少关键文件
        if(typeof(url)!='undefined'){
            if(typeof(url)=='object'){
                config=url;
            }else{//url 不是 obj
                config={};
                config.link=url;
                if(typeof(img)=='string'){
                    config.img_url=img;
                }else{
                    config=undefined;
                    throw('img expect string type');
                }
                if(typeof(desc)=='string'){
                    config.desc=desc;
                }else{
                    config=undefined;
                    throw('desc expect string type');
                }
                if(typeof(title)=='string'){
                    config.title=title;
                }else{
                    config=undefined;
                    throw('desc expect string type');
                }
            }
            config.img_width=width||80,config.img_height=height||80;
            appid&&(config.appid=appid);
            if(mqq.data){
                mqq.ui.setOnShareHandler(function(type){//点右上角分享按钮是触发
                    var _config={};
                    _config.title=config.title,_config.desc=config.desc,_config.share_url =config.link,_config.image_url=config.img_url,_config.share_type=type;
                    mqq.ui.shareMessage(_config,function(ret){
                        typeof(config.cb)=='function'&&config.cb(0==ret?'ok':'cancel');
                    });
                });
                return config;
            }else{
                return {};
            }
        }else{
            config=undefined;
            throw('url expect string type');
            return {};
        }
    });
});