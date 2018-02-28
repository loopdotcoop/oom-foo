//// Oom.Foo //// 1.2.11 //// February 2018 //// http://oom-foo.loop.coop/ /////

"use strict";
!function(ROOT) {
  'use strict';
  ROOT.testify = testify;
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      is = $__2.is,
      tryHardSet = $__2.tryHardSet,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals,
      stringOrName = $__2.stringOrName;
  var $__3 = Oom.KIT,
      countKeyMatches = $__3.countKeyMatches,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite,
      isValid = $__3.isValid;
  describe('Bases All', function() {
    var r;
    if (!(r = ROOT.Oom) || !(r = r.Foo) || !(r = r.stat) || !(r = r.LOADED_FIRST))
      throw Error('Can’t test: ROOT.Oom.Foo.stat.LOADED_FIRST does not exist');
    var LOADED_FIRST = ROOT.Oom.Foo.stat.LOADED_FIRST;
    describe('The Oom class', function() {
      var Class = ROOT.Oom,
          stat = Class.stat,
          schema = Class.schema;
      it('is a class', function() {
        try {
          eq((typeof Class === 'undefined' ? 'undefined' : $traceurRuntime.typeof(Class)), 'function', '`typeof Oom` is a function');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      var n = countKeyMatches(schema.stat, isConstant);
      it(("has " + n + " constant static" + (1 == n ? '' : 's')), function() {
        try {
          tryHardSet(Class, 'name', 'Changed!');
          eq(Class.name, 'Oom', 'name is Oom');
          for (var key in schema.stat) {
            if (!isConstant(key))
              continue;
            tryHardSet(stat, key, 'Changed!');
            var valid = schema.stat[key];
            eq(stat[key], valid.default, 'stat.' + key + ' is ' + valid.default.toString());
            is(isValid(valid, stat[key]), 'stat.' + key + ' is a valid ' + stringOrName(valid.type));
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.stat, isReadOnly);
      it(("has " + n + " read-only static" + (1 == n ? '' : 's')), function() {
        try {
          for (var key in schema.stat) {
            if (!isReadOnly(key))
              continue;
            stat[key] = 123;
            var valid = schema.stat[key];
            eq(stat[key], valid.default, 'stat.' + key + ' is initially ' + valid.default.toString());
            is(isValid(valid, stat[key]), 'stat.' + key + ' is a valid ' + stringOrName(valid.type));
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('sees when read-only statics change', function() {
        try {
          for (var key in schema.stat) {
            if (!isReadOnly(key))
              continue;
            var good = goodVals[stringOrName(schema.stat[key].type)];
            stat['_' + key] = good;
            eq(stat[key], good, 'stat.' + key + ' has changed to ' + good);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.stat, isReadWrite);
      it(("has " + n + " read-write static" + (1 == n ? '' : 's')), function() {
        try {
          for (var key in schema.stat) {
            if (!isReadWrite(key))
              continue;
            var valid = schema.stat[key];
            eq(stat[key], valid.default, 'stat.' + key + ' is initially ' + valid.default.toString());
            is(isValid(valid, stat[key]), 'stat.' + key + ' is a valid ' + stringOrName(valid.type));
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('allows read-write statics to be changed', function() {
        try {
          for (var key in schema.stat) {
            if (!isReadWrite(key))
              continue;
            var good = goodVals[stringOrName(schema.stat[key].type)];
            var bad = badVals[stringOrName(schema.stat[key].type)];
            stat[key] = good;
            eq(stat[key], good, 'stat.' + key + ' has changed to ' + good);
            stat[key] = bad;
            eq(stat[key], good, 'stat.' + key + ' has NOT changed to ' + bad);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
    });
    describe('An Oom instance', function() {
      var Class = ROOT.Oom,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr;
      it('is an instance', function() {
        try {
          is(instance instanceof Class, 'Is an instance of Oom');
          eq(Class, instance.constructor, '`constructor` is Oom');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      var n = countKeyMatches(schema.attr, isConstant);
      it(("has " + n + " constant attribute" + (1 == n ? '' : 's')), function() {
        try {
          for (var key in schema.attr) {
            if (!isConstant(key))
              continue;
            tryHardSet(attr, key, 'Changed!');
            var valid = schema.attr[key];
            eq(attr[key], valid.default, 'attr.' + key + ' is ' + valid.default.toString());
            is(isValid(valid, attr[key]), 'attr.' + key + ' is a valid ' + stringOrName(valid.type));
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.attr, isReadOnly);
      it(("has " + n + " read-only attribute" + (1 == n ? '' : 's')), function() {
        try {
          for (var key in schema.attr) {
            if (!isReadOnly(key))
              continue;
            attr[key] = 123;
            var valid = schema.attr[key];
            eq(attr[key], valid.default, 'attr.' + key + ' is initially ' + valid.default.toString());
            is(isValid(valid, attr[key]), 'attr.' + key + ' is a valid ' + stringOrName(valid.type));
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('sees when read-only attributes change', function() {
        try {
          for (var key in schema.attr) {
            if (!isReadOnly(key))
              continue;
            var good = goodVals[stringOrName(schema.attr[key].type)];
            attr['_' + key] = good;
            eq(attr[key], good, 'attr.' + key + ' has changed to ' + good);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.attr, isReadWrite);
      it(("has " + n + " read-write attribute" + (1 == n ? '' : 's')), function() {
        try {
          for (var key in schema.attr) {
            if (!isReadWrite(key))
              continue;
            var valid = schema.attr[key];
            eq(attr[key], valid.default, 'attr.' + key + ' is initially ' + valid.default.toString());
            is(isValid(valid, attr[key]), 'attr.' + key + ' is a valid ' + stringOrName(valid.type));
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('allows read-write attributes to be changed', function() {
        try {
          for (var key in schema.attr) {
            if (!isReadWrite(key))
              continue;
            var good = goodVals[stringOrName(schema.attr[key].type)];
            var bad = badVals[stringOrName(schema.attr[key].type)];
            attr[key] = good;
            eq(attr[key], good, 'attr.' + key + ' has changed to ' + good);
            attr[key] = bad;
            eq(attr[key], good, 'attr.' + key + ' has NOT changed to ' + bad);
          }
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
    },
    goodVals: {
      color: '#89abCD',
      Number: 12345,
      String: 'ok!'
    },
    badVals: {
      color: '89abCD',
      Number: '11.22.33',
      String: /nope!/
    },
    stringOrName: function(val) {
      return 'string' === typeof val ? val : val.name;
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
  describe.skip("Oom.Foo.Post All", function() {
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
  describe.skip("Oom.Foo.Router All", function() {
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




//// Made by Oomtility Make 1.2.11 //\\//\\ http://oomtility.loop.coop /////////
