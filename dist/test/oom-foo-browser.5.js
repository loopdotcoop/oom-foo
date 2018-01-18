//// OomFoo //// 1.0.13 //// January 2018 //// http://oom-foo.loop.coop/ ///////

"use strict";
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    var Class = OOM.OomFoo;
    Class.testInstanceFactory = function() {
      return new Class({
        firstParameter: 100,
        secondParameter: new Date
      }, {});
    };
    test('Browser test the OomFoo class', function() {
      is(true, '@TODO');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' != typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    var Class = OOM.OomFoo;
    test('Browser test the OomFoo.topLevel() method', function() {
      is(true, '@TODO');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    var Class = OOM.OomFoo.Base;
    Class.testInstanceFactory = function() {
      return new Class({
        firstParameter: 100,
        secondParameter: new Date
      }, {});
    };
    test('Browser test the OomFoo.Base class', function() {
      is(true, '@TODO');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' != typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    var Class = OOM.OomFoo.Base;
    test('Browser test the OomFoo.Base.foo() method', function() {
      is(true, '@TODO');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.0.13 //\\//\\ http://oomtility.loop.coop /////////
