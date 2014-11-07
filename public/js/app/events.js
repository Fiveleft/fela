// app/events.js
define(
  ['underscore','backbone'],
  function(_, Backbone){
    var o = {
      scrollTo : "window:scrollTo",
      scrollToEnd : "window:scrollToEnd",
      transitionEnd : "webkitTransitionEnd MozTransitionEnd oTransitionEnd transitionend",
    };
    _.extend( o, Backbone.Events );
    return o;
  });