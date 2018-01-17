//// OomFoo //// 1.0.12 //// January 2018 //// http://oom-foo.loop.coop/ ///////

"use strict";
if ('function' !== typeof jQuery)
  throw Error('jQuery not found');
jQuery(function($) {
  var Class = OOM.OomFoo;
  test('The OomFoo class', function() {
    is('object' === (typeof OOM === 'undefined' ? 'undefined' : $traceurRuntime.typeof(OOM)), 'The OOM namespace object exists');
    is('undefined' === typeof OomFoo, 'OomFoo is not global');
    is('function' === typeof Class, 'OomFoo is a function');
    is('OomFoo' === Class.NAME, 'NAME as expected');
    is('1.0.12' === Class.VERSION, 'VERSION as expected');
    is('http://oom-foo.loop.coop/' === Class.HOMEPAGE, 'HOMEPAGE as expected');
  });
  test('Successful OomFoo instantiation', function() {
    var instance = new Class({
      firstParameter: 100,
      secondParameter: new Date
    }, getMockHub());
    is(instance instanceof Class, 'instance as expected');
  });
  function getMockHub() {
    return {};
  }
});




//// Made by Oomtility Make 1.0.12 //\\//\\ http://oomtility.loop.coop /////////
