/*
    @author:weiqilei
    @滚动触发
    @大堆数据拼节点的时候 使用滚动来触发 插入新增结构
*/
halo.use(function(m){
halo.add('lazyshow',function(config){
/////////////////////// Start

    // console.log('lazyshow' , config);

    var P = {};

    var _holder;      // 缓存 节点

    var _data   = {}; // 储存数据
    var _scroll = {}; // 储存滚动数据

    var _index;  // 多数据的时候 用来切换数据


    // 初始化 滚动数据 设置 - 新增 数据用
    P.set_scroll = function(s){

        var index = s.index;

        var d = {
            loader      :  s.loader || null,    // loading dom 用语判断的位置
            body        :  s.body || null,      // 内容 节点
            callback    :  s.callback || null,  // 回调
            flag        :  true,                // 开关
            page        :  0,                   // 默认是 0 当前加载了几页
            num         :  parseInt(s.num) || 10,          //每页显示的个数 (默认:10)
            is_end      :  false                // 是否最后
        };

        if(index != null){
            _scroll[index] = d;
        }
        // console.log(s);

    };

    // 更新 滚动数据 判断是否到底了
    P.next_scroll = function(){

        var i    = _index;
        var s    = _scroll[i];
        var d    = _data[i];

        var p    = s.page;

        var start  = s.num * p;
        var end    = s.num * p + s.num;
        var len    = d.length;

        if (end > len) {
            end = len ;
            s.is_end = true;
        }else{
            s.flag = true;
        };

        s.list = d.slice(start, end);

        s.page++;

        return s;
    };

    P.init_scroll = function () {

        var h = window.innerHeight;

        var scroll  = function () {

            var index = _index;
            if(index == null) return;

            var s = _scroll[index];
            var flag = s.flag || false;
            if(flag == false) return;

            var loader   = s.loader || null;
            var callback = s.callback || null;
            if(!loader || !callback) return;

            var top = document.body.scrollTop;  // get doc top
            var load_top = loader.offsetTop;  // get load top;
            if (!load_top) return;

            if( top > load_top - 60 - h){
                s.flag = false;
                callback();
                scroll(); // if first in top >> load_top
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

        scroll(); // scroll once;

        console.log('lazyshow : init');
    };

    //初始化 接口
    P.init = function(c){

        if (c) _index = 0; // init index if has config

        this.push_data(c);
        this.init_scroll();
        // call next once;
    };

    //多数据 接口

    P.push_data = function(c){

        if (c == null) return;

        var index = c.index || 0;

        _data[index]  = c.data || [];

        _holder = c.holder;
        if(typeof(_holder) != "object") return;

        var load_name = c.tigger || '.loading';
        var body_name = c.body   || '.list'; 

        var loader  = _holder.querySelector(load_name); //get load dom
        var body    = _holder.querySelector(body_name); //get body dom

        var callback = c.cb || function(){};

        var _this = this;

        var next  = function(){
            var data = _this.next_scroll(); // do next data sroll
            callback(data);
        }

        this.set_scroll({
            index   : index,
            loader  : loader,
            body    : body,
            callback: next
        });

        if (_index == index) {
            next(); // auto show
        };
    };

    P.get_data = function(index){
        var s = _scroll[index] || {};
        return s;
    }

    P.switch_data = function(index , flag){
        _index = index;

        if (flag) {
            var s = _scroll[_index] || {};
            if (s.callback == null) return;
            s.callback();
        };
    };

    P.show_data = function(){
    };


    P.init(config);

    return P;

/////////////////////// End
});
});