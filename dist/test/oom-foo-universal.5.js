//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

"use strict";
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    var Class = OOM.OomFoo;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve OomFoo class', function() {
      is('object' === (typeof OOM === 'undefined' ? 'undefined' : $traceurRuntime.typeof(OOM)), 'The OOM namespace object exists');
      is('undefined' === typeof OomFoo, 'OomFoo is not global');
      is('function' === typeof Class, 'OomFoo is a function');
      is(('OomFoo' === Class.NAME && 'OomFoo' === Class.api.NAME), 'NAME and api.NAME is OomFoo');
      is('OomFoo' === Class.name, 'name is OomFoo');
      is(('1.1.7' === Class.VERSION && '1.1.7' === Class.api.VERSION), 'VERSION and api.VERSION is 1.1.7');
      is(('http://oom-foo.loop.coop/' === Class.HOMEPAGE && 'http://oom-foo.loop.coop/' === Class.api.HOMEPAGE), 'HOMEPAGE and api.HOMEPAGE is http://oom-foo.loop.coop/');
    });
    test('+ve OomFoo instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of OomFoo');
      is(Class === instance.constructor, '`constructor` is OomFoo');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
    ROOT.throws = ROOT.throws || (function(fn, expect, prefix) {
      var nl = 'undefined' === typeof window ? ':\n    ' : ':<br>' + ' &nbsp;'.repeat(6);
      var didntThrow = true;
      try {
        fn();
      } catch (e) {
        didntThrow = false;
        var ok = expect === e.message;
        is(ok, (prefix + " has " + (ok ? '' : 'un') + "expected error" + (ok ? '' : nl + e.message)));
      }
      if (didntThrow)
        is(0, prefix + " did not throw an error");
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' != typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    var Class = OOM.OomFoo;
    test('The OomFoo.appfn() method', function() {
      var protoMethod = Class.prototype.appfn;
      is('function' === typeof protoMethod, 'prototype.appfn() is a function');
      is('OomFoo.appfn' === protoMethod.NAME, "NAME is 'OomFoo.appfn'");
    });
    test('+ve appfn()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.appfn('123'), "`appfn('123')` returns '123 ok!'");
      instance1.appfn('456');
      is(2 === instance1.xyz, 'After two calls, `xyz` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.appfn('789');
      is(1 === instance2.xyz, 'A second instance has its own `xyz` property');
    });
    test('-ve appfn()', function() {
      var protoMethod = Class.prototype.appfn;
      throws(function() {
        return protoMethod('123');
      }, 'OomFoo.appfn(): Must not be called as OomFoo.prototype.appfn()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.appfn(123);
      }, 'OomFoo.appfn(): abc has constructor.name Number not String', 'Passing a number into `abc`');
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
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve OomFoo.Base class', function() {
      is('object' === (typeof OOM === 'undefined' ? 'undefined' : $traceurRuntime.typeof(OOM)), 'The OOM namespace object exists');
      is('function' === typeof Class, 'OomFoo.Base is a function');
      is(('OomFoo.Base' === Class.NAME && 'OomFoo.Base' === Class.api.NAME), 'NAME and api.NAME is OomFoo.Base');
      is('Base' === Class.name, 'name is Base');
    });
    test('+ve OomFoo.Base instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of OomFoo.Base');
      is(Class === instance.constructor, '`constructor` is OomFoo.Base');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    var Class = OOM.OomFoo.Base.Sub;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve OomFoo.Base.Sub class', function() {
      is('object' === (typeof OOM === 'undefined' ? 'undefined' : $traceurRuntime.typeof(OOM)), 'The OOM namespace object exists');
      is('function' === typeof Class, 'OomFoo.Base.Sub is a function');
      is(('OomFoo.Base.Sub' === Class.NAME && 'OomFoo.Base.Sub' === Class.api.NAME), 'NAME and api.NAME is OomFoo.Base.Sub');
      is('Sub' === Class.name, 'name is Sub');
    });
    test('+ve OomFoo.Base.Sub instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of OomFoo.Base.Sub');
      is(Class === instance.constructor, '`constructor` is OomFoo.Base.Sub');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' != typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    var Class = OOM.OomFoo.Base.Sub;
    test('The OomFoo.Base.Sub.subfn() method', function() {
      var protoMethod = Class.prototype.subfn;
      is('function' === typeof protoMethod, 'prototype.subfn() is a function');
      is('OomFoo.Base.Sub.subfn' === protoMethod.NAME, "NAME is 'OomFoo.Base.Sub.subfn'");
    });
    test('+ve subfn()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.subfn('123'), "`subfn('123')` returns '123 ok!'");
      instance1.subfn('456');
      is(2 === instance1.xyz, 'After two calls, `xyz` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.subfn('789');
      is(1 === instance2.xyz, 'A second instance has its own `xyz` property');
    });
    test('-ve subfn()', function() {
      var protoMethod = Class.prototype.subfn;
      throws(function() {
        return protoMethod('123');
      }, 'OomFoo.Base.Sub.subfn(): Must not be called as OomFoo.Base.Sub.prototype.subfn()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.subfn(123);
      }, 'OomFoo.Base.Sub.subfn(): abc has constructor.name Number not String', 'Passing a number into `abc`');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' != typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    var Class = OOM.OomFoo.Base;
    test('The OomFoo.Base.basefn() method', function() {
      var protoMethod = Class.prototype.basefn;
      is('function' === typeof protoMethod, 'prototype.basefn() is a function');
      is('OomFoo.Base.basefn' === protoMethod.NAME, "NAME is 'OomFoo.Base.basefn'");
    });
    test('+ve basefn()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.basefn('123'), "`basefn('123')` returns '123 ok!'");
      instance1.basefn('456');
      is(2 === instance1.xyz, 'After two calls, `xyz` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.basefn('789');
      is(1 === instance2.xyz, 'A second instance has its own `xyz` property');
    });
    test('-ve basefn()', function() {
      var protoMethod = Class.prototype.basefn;
      throws(function() {
        return protoMethod('123');
      }, 'OomFoo.Base.basefn(): Must not be called as OomFoo.Base.prototype.basefn()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.basefn(123);
      }, 'OomFoo.Base.basefn(): abc has constructor.name Number not String', 'Passing a number into `abc`');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.1.7 //\\//\\ http://oomtility.loop.coop //////////
