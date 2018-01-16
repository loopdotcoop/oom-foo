"use strict";
if ('function' != typeof jQuery)
  throw Error('jQuery not found');
jQuery(function($) {
  test('The OomFoo class', function() {
    is('object' === (typeof OOM === 'undefined' ? 'undefined' : $traceurRuntime.typeof(OOM)), 'The OOM namespace object exists');
    is('undefined' === typeof OomFoo, 'OomFoo is not global');
    var Class = OOM.OomFoo;
    is('function' === typeof Class, 'OomFoo is a function');
    is('OomFoo' === Class.NAME, 'NAME as expected');
    is('1.0.9' === Class.VERSION, 'VERSION as expected');
    is('http://oom-foo.loop.coop/' === Class.HOMEPAGE, 'HOMEPAGE as expected');
  });
});
//# sourceURL=<compile-source>




//\\//\\ built by Oomtility Make 1.0.9 //\\//\\ http://oomtility.loop.coop //\\//\\
