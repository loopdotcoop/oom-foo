//// Oom.Foo //// 1.2.15 //// March 2018 //// http://oom-foo.loop.coop/ ////////

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
      badVals = $__2.badVals;
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
          schema = Class.schema,
          stat = Class.stat;
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
            is(isValid(valid, stat[key]), 'stat.' + key + ' is a valid ' + valid.typeStr);
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
            stat[key] = goodVals[schema.stat[key].typeStr];
            var valid = schema.stat[key];
            eq(stat[key], valid.default, 'stat.' + key + ' is initially ' + valid.default.toString());
            is(isValid(valid, stat[key]), 'stat.' + key + ' is a valid ' + valid.typeStr);
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
            var good = goodVals[schema.stat[key].typeStr];
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
            is(isValid(valid, stat[key]), 'stat.' + key + ' is a valid ' + valid.typeStr);
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
            var good = goodVals[schema.stat[key].typeStr];
            var bad = badVals[schema.stat[key].typeStr];
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
            is(isValid(valid, attr[key]), 'attr.' + key + ' is a valid ' + valid.typeStr);
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
            attr[key] = goodVals[schema.attr[key].typeStr];
            var valid = schema.attr[key];
            eq(attr[key], valid.default, 'attr.' + key + ' is initially ' + valid.default.toString());
            is(isValid(valid, attr[key]), 'attr.' + key + ' is a valid ' + valid.typeStr);
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
            var good = goodVals[schema.attr[key].typeStr];
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
            is(isValid(valid, attr[key]), 'attr.' + key + ' is a valid ' + valid.typeStr);
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
            var good = goodVals[schema.attr[key].typeStr];
            var bad = badVals[schema.attr[key].typeStr];
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
    }
  };
}
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
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      countKeyMatches = $__3.countKeyMatches,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite,
      isValid = $__3.isValid;
  describe('Oom.Foo.Post All', function() {
    describe('The Oom.Foo.Post class', function() {
      var Class = ROOT.Oom.Foo.Post,
          schema = Class.schema,
          stat = Class.stat;
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
          eq(Class.name, 'Oom.Foo.Post', 'name is Oom.Foo.Post');
          for (var key in schema.stat) {
            if (!isConstant(key))
              continue;
            tryHardSet(stat, key, 'Changed!');
            var valid = schema.stat[key];
            eq(stat[key], valid.default, 'stat.' + key + ' is ' + valid.default.toString());
            is(isValid(valid, stat[key]), 'stat.' + key + ' is a valid ' + valid.typeStr);
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
            stat[key] = goodVals[schema.stat[key].typeStr];
            var valid = schema.stat[key];
            eq(stat[key], valid.default, 'stat.' + key + ' is initially ' + valid.default.toString());
            is(isValid(valid, stat[key]), 'stat.' + key + ' is a valid ' + valid.typeStr);
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
            var good = goodVals[schema.stat[key].typeStr];
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
            is(isValid(valid, stat[key]), 'stat.' + key + ' is a valid ' + valid.typeStr);
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
            var good = goodVals[schema.stat[key].typeStr];
            var bad = badVals[schema.stat[key].typeStr];
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
    describe('An Oom.Foo.Post instance', function() {
      var Class = ROOT.Oom.Foo.Post,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr;
      it('is an instance', function() {
        try {
          is(instance instanceof Class, 'Is an instance of Oom.Foo.Post');
          eq(Class, instance.constructor, '`constructor` is Oom.Foo.Post');
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
            is(isValid(valid, attr[key]), 'attr.' + key + ' is a valid ' + valid.typeStr);
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
            attr[key] = goodVals[schema.attr[key].typeStr];
            var valid = schema.attr[key];
            eq(attr[key], valid.default, 'attr.' + key + ' is initially ' + valid.default.toString());
            is(isValid(valid, attr[key]), 'attr.' + key + ' is a valid ' + valid.typeStr);
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
            var good = goodVals[schema.attr[key].typeStr];
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
            is(isValid(valid, attr[key]), 'attr.' + key + ' is a valid ' + valid.typeStr);
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
            var good = goodVals[schema.attr[key].typeStr];
            var bad = badVals[schema.attr[key].typeStr];
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
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      countKeyMatches = $__3.countKeyMatches,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite,
      isValid = $__3.isValid;
  describe('Oom.Foo.Router All', function() {
    describe('The Oom.Foo.Router class', function() {
      var Class = ROOT.Oom.Foo.Router,
          schema = Class.schema,
          stat = Class.stat;
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
          eq(Class.name, 'Oom.Foo.Router', 'name is Oom.Foo.Router');
          for (var key in schema.stat) {
            if (!isConstant(key))
              continue;
            tryHardSet(stat, key, 'Changed!');
            var valid = schema.stat[key];
            eq(stat[key], valid.default, 'stat.' + key + ' is ' + valid.default.toString());
            is(isValid(valid, stat[key]), 'stat.' + key + ' is a valid ' + valid.typeStr);
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
            stat[key] = goodVals[schema.stat[key].typeStr];
            var valid = schema.stat[key];
            eq(stat[key], valid.default, 'stat.' + key + ' is initially ' + valid.default.toString());
            is(isValid(valid, stat[key]), 'stat.' + key + ' is a valid ' + valid.typeStr);
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
            var good = goodVals[schema.stat[key].typeStr];
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
            is(isValid(valid, stat[key]), 'stat.' + key + ' is a valid ' + valid.typeStr);
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
            var good = goodVals[schema.stat[key].typeStr];
            var bad = badVals[schema.stat[key].typeStr];
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
    describe('An Oom.Foo.Router instance', function() {
      var Class = ROOT.Oom.Foo.Router,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr;
      it('is an instance', function() {
        try {
          is(instance instanceof Class, 'Is an instance of Oom.Foo.Router');
          eq(Class, instance.constructor, '`constructor` is Oom.Foo.Router');
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
            is(isValid(valid, attr[key]), 'attr.' + key + ' is a valid ' + valid.typeStr);
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
            attr[key] = goodVals[schema.attr[key].typeStr];
            var valid = schema.attr[key];
            eq(attr[key], valid.default, 'attr.' + key + ' is initially ' + valid.default.toString());
            is(isValid(valid, attr[key]), 'attr.' + key + ' is a valid ' + valid.typeStr);
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
            var good = goodVals[schema.attr[key].typeStr];
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
            is(isValid(valid, attr[key]), 'attr.' + key + ' is a valid ' + valid.typeStr);
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
            var good = goodVals[schema.attr[key].typeStr];
            var bad = badVals[schema.attr[key].typeStr];
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




//// Made by Oomtility Make 1.2.15 //\\//\\ http://oomtility.loop.coop /////////
