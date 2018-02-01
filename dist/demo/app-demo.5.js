//// OomFoo //// 1.1.3 //// February 2018 //// http://oom-foo.loop.coop/ ///////

"use strict";
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    Vue.component('oom-oomfoo', {template: '<span>A component based on OomFoo</span>'});
    new Vue({el: '#demo'});
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.1.3 //\\//\\ http://oomtility.loop.coop //////////
