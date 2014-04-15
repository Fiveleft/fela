
!function( g )
{
	
	// usage: log('inside coolFunc', this, arguments);
	// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
	g.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);typeof console.log=="object"?log.apply.call(console.log,console,a):console.log.apply(console,a)}};(function(a){function b(){}for(var c="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),d;d=c.pop();)a[d]=a[d]||b})(function(){try{console.log();return window.console}catch(a){return window.console={}}}());(function(){var a=jQuery.event.special,b="D"+ +(new Date),c="D"+(+(new Date)+1);a.scrollstart={setup:function(){var c,d=function(b){var d=this,e=arguments;if(c)clearTimeout(c);else{b.type="scrollstart";jQuery.event.handle.apply(d,e)}c=setTimeout(function(){c=null},a.scrollstop.latency)};jQuery(this).bind("scroll",d).data(b,d)},teardown:function(){jQuery(this).unbind("scroll",jQuery(this).data(b))}};a.scrollstop={latency:300,setup:function(){var b,d=function(c){var d=this,e=arguments;b&&clearTimeout(b);b=setTimeout(function(){b=null;c.type="scrollstop";jQuery.event.handle.apply(d,e)},a.scrollstop.latency)};jQuery(this).bind("scroll",d).data(c,d)},teardown:function(){jQuery(this).unbind("scroll",jQuery(this).data(c))}}})();String.prototype.trunc=function(a,b){var c=this.length>a,d=c?this.substr(0,a-1):this;d=b&&c?d.substr(0,d.lastIndexOf(" ")):d;return c?d+"...":d};


	g.clamp = function( value, min, max )
	{
		return (value < min) ? min : (value > max) ? max : value;
	};

	g.isBetween = function (value, min, max)
	{
		return ((value > min) && (value < max));
	};

	g.inRange = function (value, min, max)
	{
		return ((value >= min) && (value <= max));
	};

	Array.prototype.firstToLast = function() {
		var item = this.shift();
		this.push(item);
		return item;
	}

	Array.prototype.lastToFirst = function() {
		var item = this.pop();
		this.unshift( item );
		return item;
	}

}(window);