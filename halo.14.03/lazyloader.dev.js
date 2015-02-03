(function (exports, halo) {
    var LazyLoader,
        getTop,
        extend,
        getWinH,
        proxy,
        _windowH;

    getTop = function(e) {
       var offset = e.offsetTop;
       if(e.offsetParent!=null){
         offset += getTop(e.offsetParent);
       }         
       return offset;
    }

    getWinH = function(){
        if(!_windowH)
            _windowH = window.screen.height;
        return _windowH;
    }

    extend = function(obj1, obj2){
        for(var attr in obj2) {
            obj1[attr] = obj2[attr];
        }
        return obj1;
    }

    proxy = function(scope, fn){
        scope = scope || null;
        return function(){
            fn.apply(scope, arguments);
        }
    }

    LazyLoader = (function () {
      
        function LazyLoader(options) {
            options = options || {};
            this._init(options);
            return this;
        }
        
        LazyLoader.prototype._onend = function(){};

        LazyLoader.prototype._init = function (options) {
            this.opt = extend(LazyLoader._defaults, options);
            var elements = document.querySelectorAll('[data-' + this.opt.data + ']');
            getWinH();
            var tops = [];
            for (var i = 0, len = elements.length, lazy; i < len; i++) {
                tops.push(getTop(elements[i]));
            };
            this.tops = tops;
            this.elements = elements;
            this.num = len;
            //this._initEvent();
            setTimeout(proxy(this, function(){
                this._lazy();
            }), 25)
            this._scrollListener();
        };

        LazyLoader.prototype._initEvent = function(e){
            this._delegate = proxy(this, this._lazy);
            window.addEventListener('scroll', this._delegate, false);
        }



        LazyLoader.prototype._scrollListener = function(e){
            this._interval = setInterval(proxy(this, this._lazy), this.opt.interval);
        }

        LazyLoader.prototype.changeUrl = function(dom, lazy){
            var tagName = dom.tagName;
            if('IMG' == tagName){
                    dom.src = lazy;
                    if(dom.dataset)
                        dom.dataset['lazy'] = null;
                    else
                        dom.setAttribute('data-' + this.opt.data, null);
            }else{
                dom.style.backgroundImage = lazy;
                if(dom.dataset) 
                    dom.dataset['lazy'] = null;
                else
                    dom.setAttribute('data-' + this.opt.data, null);
            }
            
        }
        LazyLoader.prototype.onend = function(cb){
            if(typeof cb == 'function'){
                this._onend = cb;
            }
            return this;
        }
        LazyLoader.prototype._lazy = function(){
            var top = document.documentElement.scrollTop || document.body.scrollTop,
                tops = this.tops,
                lazy,
                dom;
            for (var i = 0, len = tops.length; i < len; i++) {               
                dom = this.elements[i];
                if(dom.dataseta)
                    lazy = dom.dataset[this.opt.data];
                else
                    lazy = dom.getAttribute('data-' + this.opt.data);

                if(top + getWinH()*3 > tops[i] && 'null' != lazy){

                    this.changeUrl(dom, lazy);
                    this.num--;
                }
            }
            if(this.num <= 0){
                if(this._interval){
                    clearInterval(this._interval);
                }else{
                    window.removeEventListener('scroll', this._delegate, false);
                    this._onend();
                }
                
            }
        }

        return LazyLoader;

    })();


    LazyLoader._defaults = {
        data : 'lazy',
        interval : 200
    };

    if(typeof halo == 'undefined'){
        throw('缺少依赖库 halo.js');
        exports.Lazyloader = LazyLoader;
        return;
    }
        
    halo.add('lazyloader',LazyLoader);

})(window, halo);