halo.use(function(m){
	var util = function(){
		var _elementStyle = document.createElement('div').style;

		var getBF = function(){
	        var ua = navigator.userAgent.toLowerCase();
	        var scene = (ua.indexOf('micromessenger')) > -1 ? 'weixin' : ((/qq\/([\d\.]+)*/).test(ua) ? 'qq': 'web');
	        return scene;
	    }

	    var transitionEnd = function() {

	        var transEndEventNames = {
	          'WebkitTransition' : 'webkitTransitionEnd',
	          'MozTransition'    : 'transitionend',
	          'OTransition'      : 'oTransitionEnd otransitionend',
	          'transition'       : 'transitionend'
	        }

	        for (var name in transEndEventNames) {
	          if (_elementStyle[name] !== undefined) {
	            return { end: transEndEventNames[name] }
	          }
	        }

	        return false;
	    }

	    var requestAnimationFrame = window.requestAnimationFrame ||
	        window.mozRequestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	        window.msRequestAnimationFrame ||
	        window.oRequestAnimationFrame ||
	        function(callback) {return setTimeout(callback, 1000 / 60); };      

	    var cancelAnimationFrame = window.cancelAnimationFrame ||
	        window.mozCancelAnimationFrame ||
	        window.webkitCancelAnimationFrame ||
	        window.msCancelAnimationFrame ||
	        window.oCancelAnimationFrame ||
	        function(callback) {return clearTimeout(callback, 1000 / 60); };
	    var extend = function(){
	    	var args = Array.prototype.slice.call(arguments, 0), attr;
	    	var o = args[0];
	    	var deep = false;
	    	if(typeof args[args.length - 1] == 'boolean'){
	    		deep = args[args.length - 1];
	    		args.pop();
	    	}
	    	for(var i = 1; i < args.length; i++){
	    		for(attr in args[i]) {
	    			if(deep && typeof args[i][attr] == 'object'){
	    				o[attr] = {};
	    				extend(o[attr], args[i][attr], true);
	    			}
	    			else
		            	o[attr] = args[i][attr];
		        }
	    	}	        
	        return o;
	    }

	    var proxy = function(scope, fn){
	        scope = scope || null;
	        return function(){
	            fn.apply(scope, arguments);
	        }
	    }

	    var get = function(url, data, cb){
	    	var _createAjax = function() {
			    var xhr = null;
			    try {
			        //IE系列浏览器
			        xhr = new ActiveXObject("microsoft.xmlhttp");
			    } catch (e1) {
			        try {
			            //非IE浏览器
			            xhr = new XMLHttpRequest();
			        } catch (e2) {
			            window.alert("您的浏览器不支持ajax，请更换！");
			        }
			    }
			    return xhr;
			}
			var pram = '';
			if(typeof data == 'object'){
				for(var name in data){
					pram += '&' + name + '=' + data['name'];
				}
			}
			pram.replace(/^&/, '?');
			var xhr = _createAjax();
			if(!url) return;
			xhr.open('get', url + pram, true);
			xhr.send(null);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
		            cb&&cb();
		        }
			}
	    }

	    var noop = function(){};

	    var _vendor = (function () {
			var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
				transform,
				i = 0,
				l = vendors.length;

			for ( ; i < l; i++ ) {
				transform = vendors[i] + 'ransform';
				if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
			}
			return false;
		})();

		console.log(_vendor);

	    var _prefixStyle = function(style) {
			if ( _vendor === false ) return false;
			if ( _vendor === '' ) return style;
			return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
		}

		var hasClass = function (e, c) {
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
			return re.test(e.className);
		};

		var addClass = function (e, c) {
			if ( hasClass(e, c) ) {
				return;
			}

			var newclass = e.className.split(' ');
			newclass.push(c);
			e.className = newclass.join(' ');
		};

		var removeClass = function (e, c) {
			if ( !hasClass(e, c) ) {
				return;
			}

			var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
			e.className = e.className.replace(re, ' ');
		};

		var offset = function (el) {
			var left = -el.offsetLeft,
				top = -el.offsetTop;

			while (el = el.offsetParent) {
				left -= el.offsetLeft;
				top -= el.offsetTop;
			}

			return {
				left: left,
				top: top
			};
		};

		var timer = {
	        remainTime: function(y,mm,d,h,min,s){
	            var endDate = new Date(y,mm - 1,d,h,min,s).getTime();
	            var nowDate = new Date().getTime();
	            var _leftTime = endDate - nowDate; 
	            if(_leftTime < 0){
	                return {
		                'hour' : 0,
		                'min' : 0,
		                'sec' : 0
	                }
	            }
	            var hour = Math.floor(_leftTime/3600000);
	            _leftTime = _leftTime%3600000;
	            var min = Math.floor(_leftTime/60000);
	            _leftTime = _leftTime%60000;
	            var sec = Math.floor(_leftTime/1000);
	            return {
	                'hour' : hour,
	                'min' : min,
	                'sec' : sec
	            }
	        }
	    }

		return{
			'noop' : noop,
	        'transitionEnd' : transitionEnd,
	        'RAF' : requestAnimationFrame,
	        'cRAF' : cancelAnimationFrame,
	        'extend' : extend,
	        'proxy' : proxy,
	        'getBF' : getBF,
	        'get' : get,
	        'offset' : offset,
	        'hasClass' : hasClass,
	        'addClass' : addClass,
	        'timer' : timer,
	        'removeClass' : removeClass/*,
	        'addStyle' : add,
	        'getTransform' : get_transform_value*/
		}

	}();
	halo.add('util',util);
});