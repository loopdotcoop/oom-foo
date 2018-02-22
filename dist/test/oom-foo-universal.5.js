//// Oom.Foo //// 1.2.9 //// February 2018 //// http://oom-foo.loop.coop/ //////

"use strict";
!function(ROOT) {
  'use strict';
  ROOT.testify = testify;
  var $__1 = ROOT.testify(),
      chai = $__1.chai,
      mocha = $__1.mocha,
      assert = $__1.assert,
      expect = $__1.expect,
      describe = $__1.describe,
      it = $__1.it,
      eq = $__1.eq,
      ok = $__1.ok;
  describe("Bases Universal", function() {
    describe("+ve Oom class", function() {
      it("should be a class", function() {
        var Class = ROOT.Oom,
            stat = Class.stat;
        eq('function', (typeof Class === 'undefined' ? 'undefined' : $traceurRuntime.typeof(Class)), 'Oom should be a function');
      });
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
function testify() {
  this.chai = this.chai || require('chai');
  this.mocha = this.mocha || require('mocha');
  return {
    chai: chai,
    mocha: mocha,
    assert: chai.assert,
    expect: chai.expect,
    eq: chai.assert.strictEqual,
    ok: chai.assert.isOk,
    describe: this.describe || mocha.describe,
    it: this.it || mocha.it
  };
}
!function(ROOT) {
  'use strict';
  var $__1 = ROOT.testify(),
      chai = $__1.chai,
      mocha = $__1.mocha,
      assert = $__1.assert,
      expect = $__1.expect,
      describe = $__1.describe,
      it = $__1.it,
      eq = $__1.eq,
      ok = $__1.ok;
  describe("Oom.Foo.Post Universal", function() {
    var Class = Oom.Foo.Post,
        stat = Class.stat;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    describe("+ve Oom.Foo.Post class", function() {
      it("should be a class", function() {
        ok('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
        ok('function' === typeof Class, 'Oom.Foo.Post is a function');
        try {
          Class.name = stat.NAME = 'Changed!';
        } catch (e) {}
        ok(('Oom.Foo.Post' === Class.name && 'Oom.Foo.Post' === stat.NAME), 'name and stat.NAME are Oom.Foo.Post');
      });
    });
    describe('+ve Oom.Foo.Post instance', function() {
      it("should be an instance", function() {
        var instance = Class.testInstanceFactory();
        var attr = instance.attr;
        ok(instance instanceof Class, 'Is an instance of Oom.Foo.Post');
        ok(Class === instance.constructor, '`constructor` is Oom.Foo.Post');
        ok('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` is a six-character string');
      });
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var $__1 = ROOT.testify(),
      chai = $__1.chai,
      mocha = $__1.mocha,
      assert = $__1.assert,
      expect = $__1.expect,
      describe = $__1.describe,
      it = $__1.it,
      eq = $__1.eq,
      ok = $__1.ok;
  describe("Oom.Foo.Router Universal", function() {
    var Class = Oom.Foo.Router,
        stat = Class.stat;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    describe("+ve Oom.Foo.Router class", function() {
      it("should be a class", function() {
        ok('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
        ok('function' === typeof Class, 'Oom.Foo.Router is a function');
        try {
          Class.name = stat.NAME = 'Changed!';
        } catch (e) {}
        ok(('Oom.Foo.Router' === Class.name && 'Oom.Foo.Router' === stat.NAME), 'name and stat.NAME are Oom.Foo.Router');
      });
    });
    describe('+ve Oom.Foo.Router instance', function() {
      it("should be an instance", function() {
        var instance = Class.testInstanceFactory();
        var attr = instance.attr;
        ok(instance instanceof Class, 'Is an instance of Oom.Foo.Router');
        ok(Class === instance.constructor, '`constructor` is Oom.Foo.Router');
        ok('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` is a six-character string');
      });
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.2.9 //\\//\\ http://oomtility.loop.coop //////////
