//// OomFoo //// 1.1.2 //// February 2018 //// http://oom-foo.loop.coop/ ///////

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
      is('OomFoo' === Class.NAME, 'NAME is OomFoo');
      is('OomFoo' === Class.name, 'name is OomFoo: "' + Class.name + '"');
      is('1.1.2' === Class.VERSION, 'VERSION is 1.1.2');
      is('http://oom-foo.loop.coop/' === Class.HOMEPAGE, 'HOMEPAGE is http://oom-foo.loop.coop/');
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
    test('The OomFoo.topLevel() method', function() {
      var protoMethod = Class.prototype.topLevel;
      is('function' === typeof protoMethod, 'prototype.topLevel() is a function');
      is('OomFoo.topLevel' === protoMethod.NAME, "NAME is 'OomFoo.topLevel'");
    });
    test('+ve topLevel()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.topLevel('123'), "`topLevel('123')` returns '123 ok!'");
      instance1.topLevel('456');
      is(2 === instance1.xyz, 'After two calls, `xyz` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.topLevel('789');
      is(1 === instance2.xyz, 'A second instance has its own `xyz` property');
    });
    test('-ve topLevel()', function() {
      var protoMethod = Class.prototype.topLevel;
      throws(function() {
        return protoMethod('123');
      }, 'OomFoo.topLevel(): Must not be called as OomFoo.prototype.topLevel()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.topLevel(123);
      }, 'OomFoo.topLevel(): abc has constructor.name Number not String', 'Passing a number into `abc`');
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
      is('OomFoo.Base' === Class.NAME, 'NAME is OomFoo.Base');
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
  if ('function' != typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    var Class = OOM.OomFoo.Base;
    test('The OomFoo.Base.foo() method', function() {
      var protoMethod = Class.prototype.foo;
      is('function' === typeof protoMethod, 'prototype.foo() is a function');
      is('OomFoo.Base.foo' === protoMethod.NAME, "NAME is 'OomFoo.Base.foo'");
    });
    test('+ve foo()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.foo('123'), "`foo('123')` returns '123 ok!'");
      instance1.foo('456');
      is(2 === instance1.xyz, 'After two calls, `xyz` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.foo('789');
      is(1 === instance2.xyz, 'A second instance has its own `xyz` property');
    });
    test('-ve foo()', function() {
      var protoMethod = Class.prototype.foo;
      throws(function() {
        return protoMethod('123');
      }, 'OomFoo.Base.foo(): Must not be called as OomFoo.Base.prototype.foo()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.foo(123);
      }, 'OomFoo.Base.foo(): abc has constructor.name Number not String', 'Passing a number into `abc`');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.1.2 //\\//\\ http://oomtility.loop.coop //////////
