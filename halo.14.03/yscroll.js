
halo.use('util', 'event', function(m){
	var util = m.util;
	var Event = m.event;

	var transitionEndEvent = util.transitionEnd().end;
	var RAF = util.RAF;
	var cancelRAF = util.cRAF;

	var _momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
		var distance = current - start,
			speed = Math.abs(distance) / time,
			destination,
			duration;

		deceleration = deceleration === undefined ? 0.0006 : deceleration;

		destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
		duration = speed / deceleration;

		if ( destination < lowerMargin ) {
			destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
			distance = Math.abs(destination - current);
			duration = distance / speed;
		} else if ( destination > 0 ) {
			destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
			distance = Math.abs(current) + destination;
			duration = distance / speed;
		}

		return {
			destination: Math.round(destination),
			duration: duration
		};
	}

	var Y = function(selector, opts){
		if(!selector) return;
		this.wrapper = typeof selector == 'string' ? document.querySelector(selector) : selector;
		var _opts = opts || {};
		this._init(_opts);
	}

	var _default_opts = {
		Scontainer : '.container',
		startX: 0,
		startY: 0,
		hScroll : false,
		vScroll : false,
		momentum : false,
		bounce : false,
		lockDirection : true,
		snap : true,
		nesting : false
	}

	Y.fn = Y.prototype;

	Y.fn._init = function(opts){
		var _opts = util.extend({},_default_opts, opts);
		var _el = this.wrapper.querySelector(_opts.Scontainer);
		this.startX = _opts.startX;
		this.startY = _opts.startY;
		this.el = _el;
		this.opts = _opts;

		this._initUi(_el);		

		this.direction = 0;//-1:x, 1:y
		if(_opts.lockDirection){
			this.direction = _opts.hScroll ? -1 : 1;
		}
		if(this.opts.lockDirection && this.opts.hScroll && this.opts.vScroll){
			this.direction = 0;
		}
		if(this.opts.snap){
			this._idx = 0;
		}
		this.drag = false;
		this.scrollTo(this.startX, this.startY);
		this._initEvent(opts);
	};

	Y.fn._initUi = function(el){
		if(!el) return;
		var _el = el;
		this.wrapperWidth = this.wrapper.offsetWidth;
		this.wrapperHeight = this.wrapper.offsetHeight;

		if(this.opts.snap){
			var _pageWidth = this.wrapperWidth;
        	var _pageHeight = this.wrapperHeight

			var li = _el.querySelectorAll('li');
			for (var i = 0, len = li.length; i < len; i++){
				li[i].style.width = _pageWidth + 'px';
				li[i].style.height = _pageHeight + 'px';
			};

			_el.style.height = _el.scrollHeight + 'px';
			_el.style.width = _el.scrollWidth + 'px';

			if(this.opts.hScroll && this.opts.vScroll){
				this._step = _el.scrollWidth / this.wrapperWidth;
			}
		}else{
			_el.style.height = _el.scrollHeight + 'px';
			_el.style.width = _el.scrollWidth + 'px';
		}
		var styleW = getComputedStyle(el, null).getPropertyValue("display");
		if(styleW == '-webkit-box'){
			var _w = 0;
			var _h = 0;
			var li = el.querySelectorAll('li');
			for (var i = 0, len = li.length; i < len; i++){
				_w += li[i].offsetWidth;
			}
			el.style.width = _w + 'px';
		}
		

		this.innerblockWidth = _el.offsetWidth;
		this.innerblockHeight = _el.offsetHeight;

		this.elTop = _el.offsetTop;
		this.elLeft = _el.offsetLeft;

		this._maxScrollY = this.wrapperHeight - this.innerblockHeight;
		this._maxScrollX = this.wrapperWidth - this.innerblockWidth;	
	};

	Y.fn.reset = function(){
		this._initUi(this.el);
	}
	Y.fn._initEvent = function(){
		this.el.addEventListener('touchstart', util.proxy(this, this._start));
		this.el.addEventListener('touchmove', util.proxy(this, this._move));
		this.el.addEventListener('touchend', util.proxy(this, this._end));
		this.el.addEventListener('touchcancel', util.proxy(this, this._end));
		if(this.opts.momentum)
			this.el.addEventListener( transitionEndEvent , util.proxy(this, this._transitionEnd), false);
	};

	Y.fn.scrollBefore = function(fn){
		this._scrollBefore = fn;
		Event.bind('scrollBefore', this._scrollBefore || util.noop);
		return this;
	}
	Y.fn.scrollEnd = function(fn){
		this._scrollEnd = fn;
		Event.bind('scrollEnd', this._scrollEnd || util.noop);
		return this;
	}
	Y.fn.scrolling = function(fn){
		this._scrolling = fn;
		Event.bind('scrolling', this._scrolling || util.noop);
		return this;
	}
	Y.fn.orientationchange = function(fn){
		this._orientationchange = fn;
		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", util.proxy(this, this._orientationchange || util.noop), false);
		return this;
	}
	Y.fn._start = function(e){
		if(this.drag) return;
		this.drag = true;
		target = e.targetTouches[0];
		this.disX = 0;
		this.disY = 0;
		this._x = this._x || this.startX;
		this._y = this._y || this.startY;

		this.startX    = this._x;
		this.startY    = this._y;
		this.absStartX = this._x;
		this.absStartY = this._y;
		this.pointX    = target.pageX;
		this.pointY    = target.pageY;

		this.srartTime = new Date();
		
		this.el.style.webkitTransitionDuration = '0ms';

		e.preventDefault();
		if(this._scrollBefore)
			Event.trigger('scrollBefore', this, e);
	}

	Y.fn._move = function(e){
		if(!this.drag) return;

		var temp;
		var target = e.targetTouches[0];
		var deltaX = target.pageX - this.pointX;
		var deltaY = target.pageY - this.pointY;

		this.pointX		= target.pageX;
		this.pointY		= target.pageY;	

		this.disX += deltaX;
		this.disY += deltaY;
		var abs_disX = Math.abs(this.disX);
		var abs_disY = Math.abs(this.disY);


		if(this.opts.lockDirection && this.opts.hScroll && this.opts.vScroll && this.direction == 0){			
			if( Math.abs(abs_disX - abs_disY) > 5){
				this.direction = abs_disX > abs_disY ? -1 : 1;
			}else{
				return;
			}			
		}

		var absDisX = Math.abs(this.disX);
		var absDisY = Math.abs(this.disY);
		var newX = this._x, newY = this._y;


		if(-1 == this.direction)
			newX = this._x + deltaX;
		if(1 == this.direction)
			newY = this._y + deltaY;

		e.preventDefault();
		this._translate(newX, newY);
		if(this._scrolling)
			Event.trigger('scrolling', this, e);
	}

	Y.fn.scrollToElement = function(idx, time){

		var li = this.el.querySelectorAll('li');
		if(idx < 0){
			idx = 0;
		}
		if(idx > li.length - 1){
			idx = li.length - 1;
		}
		if(this.opts.snap){
			this._idx = idx;

		}
		var currli = li[idx];
		var _left = this.elLeft - currli.offsetLeft;
		var _top = this.elTop - currli.offsetTop;
		var temp = this._bounce(_left, _top);
		_left = temp[0];
		_top = temp[1];
		this.scrollTo(_left, _top, time || 600);
	}

	Y.fn._end = function(e){
		if(!this.drag) return;
		this.drag = false;
		var endTime = new Date();
		var duration = endTime - this.srartTime;

		var momentumX,
			momentumY,
			newX = Math.round(this._x),
			newY = Math.round(this._y),
			distanceX = Math.abs(newX - this.startX),
			distanceY = Math.abs(newY - this.startY),
			time = 0,
			easing = '';
		if ( this.opts.momentum) {
			momentumX = this.opts.hScroll ? _momentum(this._x, this.startX, duration, this._maxScrollX, this.opts.bounce ? this.wrapperWidth : 0, this.opts.deceleration) : { destination: newX, duration: 0 };
			momentumY = this.opts.vScroll ? _momentum(this._y, this.startY, duration, this._maxScrollY, this.opts.bounce ? this.wrapperHeight : 0, this.opts.deceleration) : { destination: newY, duration: 0 };
			newX = momentumX.destination;
			newY = momentumY.destination;			
			if(duration < 300){
 				time = Math.max(momentumX.duration, momentumY.duration);
 			}else{
 				time = '';
 			}
		}
		if(this.opts.snap){
			var _idx = this._idx;
			if(newX - this.startX > 10 || newY - this.startY > 10){
				--_idx;
			}else if(newX - this.startX < -10 || newY - this.startY < -10){
				++_idx;
			}
			if(this.opts.hScroll && this.opts.vScroll && this._step){
				if(this.direction == -1){
					if(newY - this.startY > 10){
						--_idx;
					}else if(newY - this.startY < -10){						
						++_idx;
					}
				}else if(this.direction == 1){
					if(newY - this.startY > 10){
						_idx -= this._step - 1;
					}else if(newY - this.startY < -10){						
						_idx += this._step - 1;
					}
				}
			}
			this.scrollToElement(_idx, 300);	
		}else{
			this.scrollTo(newX, newY, time, easing);
		}

		if(this.opts.lockDirection && this.opts.hScroll && this.opts.vScroll){
			this.direction = 0;
		}
		
	}	


	Y.fn._translate = function(x, y){
		this.el.style.webkitTransform = 'translate(' + x + 'px,' + y + 'px) translateZ(0px)';
		this._x = x;
		this._y = y;
	}

	Y.fn._transitionEnd = function (e) {
		this._transitionTime();
		if ( !this.resetPosition(600) && this._scrollEnd) {
			Event.trigger('scrollEnd', this);
		}
	}

	Y.fn.resetPosition = function (time) {
		var x = this._x,
			y = this._y;

		time = time || 0;

		if ( !this.opts.hScroll || this._x > 0 ) {
			x = 0;
		} else if ( this._x < this._maxScrollX ) {
			x = this._maxScrollX;
		}

		if ( !this.opts.vScroll || this._y > 0 ) {
			y = 0;
		} else if ( this._y < this._maxScrollY ) {
			y = this._maxScrollY;
		}

		if ( x == this._x && y == this._y ) {
			return false;
		}
		this.scrollTo(x, y, time, this.opts.bounceEasing);

		return true;
	}

	Y.fn._bounce = function(x, y){
		if ( !this.opts.hScroll || x > 0 ) {
			x = 0;
		} else if ( x < this._maxScrollX ) {
			x = this._maxScrollX;
		}

		if ( !this.opts.vScroll || y > 0 ) {
			y = 0;
		} else if ( y < this._maxScrollY ) {
			y = this._maxScrollY;
		}
		return [x,y];
	}

	Y.fn._transitionTimingFunction = function () {
		this.el.style.webkitTransitionTimingFunction = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
	}

	Y.fn.scrollTo = function (x, y, time, easing) {
		easing = easing || 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

		this._transitionTimingFunction();
		this._transitionTime(time);
		this._translate(x, y);
		this.startX = x;
		this.startY = y;
	}

	Y.fn._transitionTime = function (time) {
		time = time || 0;
		this.el.style.webkitTransitionDuration = time + 'ms';
		if ( !time ) {
			this.el.style.webkitTransitionDuration = '0s';
		}
	}
	

    halo.add('yscroll',Y);

});