//// Oom.Foo //// 1.2.7 //// February 2018 //// http://oom-foo.loop.coop/ //////

"use strict";
!function(ROOT) {
  'use strict';
  if ('function' !== typeof ROOT.jQuery)
    ROOT.jQuery = function(fn) {
      return fn();
    };
  ROOT.jQuery(function($) {
    var chai = ROOT.chai || require('chai'),
        mocha = ROOT.mocha || require('mocha'),
        assert = ROOT.assert || chai.assert,
        expect = ROOT.expect || chai.expect,
        describe = ROOT.describe || mocha.describe,
        it = ROOT.it || mocha.it,
        eq = assert.strictEqual,
        ok = assert.isOk;
    describe("Bases Universal", function() {
      describe("+ve Oom class", function() {
        it("should be a class", function() {
          var Class = ROOT.Oom,
              stat = Class.stat;
          eq('function', (typeof Class === 'undefined' ? 'undefined' : $traceurRuntime.typeof(Class)), 'Oom should be a function');
        });
      });
    });
    describe("Another Universal", function() {
      describe("+ve Oom class", function() {
        it("should be a class", function() {
          var Class = ROOT.Oom,
              stat = Class.stat;
          eq('function', (typeof Class === 'undefined' ? 'undefined' : $traceurRuntime.typeof(Class)), 'Oom should be a function');
        });
      });
    });
    if ('object' !== (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)))
      mocha.run();
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  return;
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Post Universal');
    var Class = Oom.Foo.Post,
        stat = Class.stat;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.Post class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.Post is a function');
      try {
        Class.name = stat.NAME = 'Changed!';
      } catch (e) {}
      is(('Oom.Foo.Post' === Class.name && 'Oom.Foo.Post' === stat.NAME), 'name and stat.NAME are Oom.Foo.Post');
    });
    test('+ve Oom.Foo.Post instance', function() {
      var instance = Class.testInstanceFactory();
      var attr = instance.attr;
      is(instance instanceof Class, 'Is an instance of Oom.Foo.Post');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.Post');
      is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` is a six-character string');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  return;
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Router Universal');
    var Class = Oom.Foo.Router,
        stat = Class.stat;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.Router class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.Router is a function');
      try {
        Class.name = stat.NAME = 'Changed!';
      } catch (e) {}
      is(('Oom.Foo.Router' === Class.name && 'Oom.Foo.Router' === stat.NAME), 'name and stat.NAME are Oom.Foo.Router');
    });
    test('+ve Oom.Foo.Router instance', function() {
      var instance = Class.testInstanceFactory();
      var attr = instance.attr;
      is(instance instanceof Class, 'Is an instance of Oom.Foo.Router');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.Router');
      is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` is a six-character string');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.2.7 //\\//\\ http://oomtility.loop.coop //////////
