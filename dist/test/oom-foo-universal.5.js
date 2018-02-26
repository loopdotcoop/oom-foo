//// Oom.Foo //// 1.2.10 //// February 2018 //// http://oom-foo.loop.coop/ /////

"use strict";
!function(ROOT) {
  'use strict';
  ROOT.testify = testify;
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      is = $__2.is,
      tryHardSet = $__2.tryHardSet;
  describe('Bases Universal', function() {
    var r;
    if (!(r = ROOT.Oom) || !(r = r.Foo) || !(r = r.stat) || !(r = r.LOADED_FIRST))
      throw Error('Can’t test: ROOT.Oom.Foo.stat.LOADED_FIRST does not exist');
    var LOADED_FIRST = ROOT.Oom.Foo.stat.LOADED_FIRST;
    var initInstTally = ROOT.Oom.stat.inst_tally;
    describe('+ve Oom class', function() {
      var Class = ROOT.Oom,
          stat = Class.stat;
      it('should be a class', function() {
        try {
          eq((typeof Class === 'undefined' ? 'undefined' : $traceurRuntime.typeof(Class)), 'function', '`typeof Oom` is a function');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('should have correct initial static constant properties', function() {
        try {
          tryHardSet(Class, 'name', 'Changed!');
          eq(Class.name, 'Oom', 'name is Oom');
          tryHardSet(stat, 'NAME,REMARKS,HOMEPAGE', 'Changed!');
          eq(stat.NAME, 'Oom', 'stat.NAME is Oom');
          eq(stat.REMARKS, 'Base class for all Oom classes', 'stat.REMARKS is \'Base class for all Oom classes\'');
          eq(stat.HOMEPAGE, 'http://oom.loop.coop/', 'stat.HOMEPAGE is \'http://oom.loop.coop/\'');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('should have correct initial static read-only properties', function() {
        try {
          stat.inst_tally = 55;
          eq(0, initInstTally, 'stat.inst_tally is initially zero');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('It should change static read-only properties as expected', function() {
        try {
          initInstTally = stat.inst_tally;
          new Class();
          eq(stat.inst_tally, initInstTally + 1, 'stat.inst_tally increments after instantiation');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
    });
    if (LOADED_FIRST)
      describe('+ve Oom class, defined in this oom-foo module', function() {
        var Class = ROOT.Oom,
            stat = Class.stat;
        it('should have the same version as this oom-foo module', function() {
          try {
            tryHardSet(stat, 'VERSION', 'Changed!');
            eq(stat.VERSION, '1.2.10', 'stat.VERSION is 1.2.9');
          } catch (e) {
            console.error(e.message);
            throw e;
          }
        });
      });
    describe('+ve Oom instance', function() {
      initInstTally = ROOT.Oom.stat.inst_tally;
      var Class = ROOT.Oom,
          instance = new Class(),
          attr = instance.attr;
      it('should be an instance', function() {
        try {
          is(instance instanceof Class, 'Is an instance of Oom');
          eq(Class, instance.constructor, '`constructor` is Oom');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('should have correct initial instance properties', function() {
        try {
          tryHardSet(attr, 'UUID', 'Changed!');
          eq('string', $traceurRuntime.typeof(attr.UUID), '`attr.UUID` is a string');
          is(/^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` conforms to /^[0-9A-Za-z]{6}$/');
          tryHardSet(attr, 'INST_INDEX', 99);
          eq(0, attr.INST_INDEX, 'attr.INST_INDEX is zero');
          eq(initInstTally + 1, Class.stat.inst_tally, 'stat.inst_tally has incremented to ' + initInstTally);
        } catch (e) {
          console.error(e.message);
          throw e;
        }
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
    is: chai.assert.isOk,
    describe: this.describe || mocha.describe,
    it: this.it || mocha.it,
    tryHardSet: function(obj, keylist, value) {
      keylist.split(',').forEach(function(key) {
        var def = {
          enumerable: true,
          value: value,
          configurable: true
        };
        try {
          Object.defineProperty(obj, key, def);
        } catch (e) {}
      });
    }
  };
}
!function(ROOT) {
  'use strict';
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      is = $__2.is;
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
        is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
        is('function' === typeof Class, 'Oom.Foo.Post is a function');
        try {
          Class.name = stat.NAME = 'Changed!';
        } catch (e) {}
        is(('Oom.Foo.Post' === Class.name && 'Oom.Foo.Post' === stat.NAME), 'name and stat.NAME are Oom.Foo.Post');
      });
    });
    describe('+ve Oom.Foo.Post instance', function() {
      it("should be an instance", function() {
        var instance = Class.testInstanceFactory();
        var attr = instance.attr;
        is(instance instanceof Class, 'Is an instance of Oom.Foo.Post');
        is(Class === instance.constructor, '`constructor` is Oom.Foo.Post');
        is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` is a six-character string');
      });
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      is = $__2.is;
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
        is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
        is('function' === typeof Class, 'Oom.Foo.Router is a function');
        try {
          Class.name = stat.NAME = 'Changed!';
        } catch (e) {}
        is(('Oom.Foo.Router' === Class.name && 'Oom.Foo.Router' === stat.NAME), 'name and stat.NAME are Oom.Foo.Router');
      });
    });
    describe('+ve Oom.Foo.Router instance', function() {
      it("should be an instance", function() {
        var instance = Class.testInstanceFactory();
        var attr = instance.attr;
        is(instance instanceof Class, 'Is an instance of Oom.Foo.Router');
        is(Class === instance.constructor, '`constructor` is Oom.Foo.Router');
        is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` is a six-character string');
      });
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.2.10 //\\//\\ http://oomtility.loop.coop /////////
