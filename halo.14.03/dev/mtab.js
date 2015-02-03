/*
    @author:weiqilei
    @tab 插件
    @可以自定义触发事件；
*/

halo.use(function(m){
halo.add('mtab',function(config){
/////////////////////// Start

    var P = {};

    var _holder;
    var _tab = [];          //tab 节点缓存
    var _tab_data = [];
    var _body = [];         // body 节点缓存

    var _index = 0;             //当前态

    var _top_offset = 30;   // 偏移 fixed 触发偏移  top > tab_top - 30


    var clear_class = function(e , c){
        var cur = c || null;
        if (cur == null) return;
            cur = ' ' + cur;
        var name = e.getAttribute('class').replace(cur, '');
        return name;
    };

    var removeClass = function(e , c){
        var name = clear_class(e , c);
        e.setAttribute('class', name);
    };

    var addClass = function(e , c){
        //  hello func
        var name = clear_class(e , c) + ' ' + c;
        e.setAttribute('class', name);
    }

    //初始化
    P.init = function(c){
        if (c == null) return;

        _holder = c.holder;
        if(typeof(_holder) != "object") return;

        if(_holder == null) return;

        var tab_name = c.tab || null;
        if (tab_name == null) return;
        _tab =  _holder.querySelectorAll(tab_name);

        _body = c.body || [];

        console.log(_holder,_tab,_body);

        var len = _tab.length;
        var _this = this;

        var init_touch = function (i) {
            m.on(_tab[i],'flick',function(e){
                _this.switch_tab(i);
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        };

        for( i = 0 ; i < len ; ++i ){
            init_touch(i);
        }

        console.log('mtab : init');

        var fixed = c.fixed || false;
        if (fixed) {
            _this.init_scroll();
        };

        var cb    = c.cb || null;
        if (cb) {
            _this.set_action({
                cb : cb
            });
        };
    };

    //初始化 滚动 fixed
    P.init_scroll = function(){

        var scroll = function(){

            var tab_top = _holder.offsetTop;
            var top = document.body.scrollTop;

            // var name = clear_class(_holder,'fixed');
            if(top > tab_top - _top_offset){
                // _holder.setAttribute('class', name + ' fixed');
                addClass(_holder , 'fixed');
            }else{
                // _holder.setAttribute('class', name);
                removeClass(_holder , 'fixed');
            }
        };

        var scroll_timer;

        var call_scroll = function(){
            if(scroll_timer){
                clearTimeout(scroll_timer);
            }
            scroll_timer = setTimeout(scroll, 100);
        }

        window.addEventListener('scroll' , function () {
            call_scroll();
        });

    };


    P.switch_tab = function(index){
        this.switch_tab_item(index);
        this.switch_body(index);
    };

    //切换 tab
    P.switch_tab_item = function(index){
        var len = _tab.length;
        var name;

        if(len == 0) return;

        for( i = 0 ; i < len ; ++i ){
            removeClass(_tab[i] , 'cur');
        }
        addClass(_tab[index] , 'cur');

        console.log('mtab :　switch - to ' + index + ' tab');
    };


    P.switch_body = function(index){

        var len = _body.length;
        var name;

        if(len == 0) return;

        for( i = 0 ; i < len ; ++i ){
            addClass(_body[i] , 'hide');
        }

        var body = _body[index];

        //show index body
        if(body){
            //switch data if exist
            this.switch_data(index);
            console.log('mtab :  switch - to ' + index + ' body');
            removeClass(body , 'hide');
        }
        
    }

    P.switch_data = function(index){
        //  hello func
        var s  = _tab_data[index] || null;
        if (s == null) { return };

        var callback = s.callback || function(){};

        callback(s);

        s.is_first = false; //first flag trigger;

    }


    // 初始化 tab 行为数据  - 激活 tab con 用
    P.set_action = function(s){

        var all = s.index == null ? true : false;

        var index       = s.index || 0;

        var do_data = function(i, s){
            //  hello func
            var d = {
                index       :  i,               // index
                flag        :  s.flag || true,      // 开关
                is_first    :  true,                // 是否最后
                body        :  s.body || null,      // 内容 节点
                callback    :  s.cb || null         // 回调
            };

            return d;
        }

        if (all) {
            var len = _tab.length;
            for( i = 0 ; i < len ; ++i ){
                _tab_data[i] = do_data(i, s);
            }

            _tab_data[0].is_first = false;

        }else{
            _tab_data[index] = do_data(i, s);
        };

    };

    P.init(config);

    return P;


/////////////////////// End
});
});