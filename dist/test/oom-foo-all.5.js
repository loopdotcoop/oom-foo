//// Oom.Foo //// 1.3.8 //// May 2018 //// http://oom-foo.loop.coop/ ///////////

"use strict";
!function(ROOT) {
  'use strict';
  ROOT.testify = testify;
  if (false)
    return;
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      neq = $__2.neq,
      is = $__2.is,
      trySoftSet = $__2.trySoftSet,
      tryHardSet = $__2.tryHardSet,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      countKeyMatches = $__3.countKeyMatches,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite,
      isValid = $__3.isValid;
  describe('Oom (all)', function() {
    describe('The Oom class', function() {
      var Class = ROOT.Oom,
          schema = Class.schema,
          stat = Class.stat;
      it('is a class with base methods', function() {
        try {
          eq((typeof Class === 'undefined' ? 'undefined' : $traceurRuntime.typeof(Class)), 'function', '`typeof Oom` is a function');
          eq($traceurRuntime.typeof(Class.reset), 'function', 'Oom.reset() is a static method');
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
            var def = schema.stat[key];
            tryHardSet(stat, key, goodVals[def.typeStr]);
            eq(stat[key], def.default, 'stat.' + key + ' is ' + def.default.toString());
            is(isValid(def, stat[key]), 'stat.' + key + ' is a valid ' + def.typeStr);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.stat, isReadOnly);
      it(("has " + n + " read-only static" + (1 == n ? '' : 's')), function() {
        try {
          Class.reset();
          for (var key in schema.stat) {
            if (!isReadOnly(key))
              continue;
            var def = schema.stat[key];
            stat[key] = goodVals[def.typeStr];
            eq(stat[key], def.default, 'stat.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, stat[key]), 'stat.' + key + ' is a valid ' + def.typeStr);
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
            var def = schema.stat[key];
            var good = goodVals[def.typeStr];
            var shadowObj = def.perClass ? stat : def.definedIn.stat;
            shadowObj['_' + key] = good;
            eq(stat[key], good, 'stat.' + key + ' has changed to ' + good);
            Class.reset();
            eq(stat[key], def.default, 'stat.' + key + ' has been reset to ' + def.default);
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
            var def = schema.stat[key];
            eq(stat[key], def.default, 'stat.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, stat[key]), 'stat.' + key + ' is a valid ' + def.typeStr);
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
            Class.reset();
            eq(stat[key], schema.stat[key].default, 'stat.' + key + ' has been reset to ' + schema.stat[key].default);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('has read-only static `inst_tally`', function() {
        try {
          Class.reset();
          eq(stat.inst_tally, 0, 'stat.inst_tally is zero after a ‘hard class reset’');
          var instance = new Class();
          eq(stat.inst_tally, 1, 'stat.inst_tally is 1 after an instantiation');
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
          attr = instance.attr,
          unchanged = new Class();
      it('is an instance with base methods', function() {
        try {
          is(instance instanceof Class, 'is an instance of Oom');
          eq(Class, instance.constructor, '`constructor` is Oom');
          eq($traceurRuntime.typeof(instance.reset), 'function', 'myOom.reset() is an instance method');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      var n = countKeyMatches(schema.attr, function(key) {
        return isConstant(key) && schema.attr[key].isFn;
      });
      it(("has " + n + " constant attribute" + (1 == n ? '' : 's') + " from function"), function() {
        try {
          for (var key in schema.attr) {
            var def = schema.attr[key];
            if (!isConstant(key) || !def.isFn)
              continue;
            var origValue = attr[key];
            trySoftSet(attr, key, goodVals[def.typeStr]);
            eq(attr[key], origValue, 'attr.' + key + ' remains ' + origValue.toString() + ' after simple set');
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.attr, function(key) {
        return isConstant(key) && !schema.attr[key].isFn;
      });
      it(("has " + n + " constant attribute" + (1 == n ? '' : 's') + " NOT from function"), function() {
        try {
          for (var key in schema.attr) {
            var def = schema.attr[key];
            if (!isConstant(key) || def.isFn)
              continue;
            tryHardSet(attr, key, goodVals[def.typeStr]);
            eq(attr[key], def.default, 'attr.' + key + ' is ' + def.default.toString());
            is(isValid(def, attr[key]), 'attr.' + key + ' is a valid ' + def.typeStr);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.attr, isReadOnly);
      it(("has " + n + " read-only attribute" + (1 == n ? '' : 's')), function() {
        try {
          instance.reset();
          for (var key in schema.attr) {
            if (!isReadOnly(key))
              continue;
            var def = schema.attr[key];
            attr[key] = goodVals[def.typeStr];
            eq(attr[key], def.default, 'attr.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, attr[key]), 'attr.' + key + ' is a valid ' + def.typeStr);
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
            neq(unchanged.attr[key], good, 'unchanged.attr.' + key + ' has NOT changed to ' + good);
            instance.reset();
            unchanged.reset();
            eq(attr[key], schema.attr[key].default, 'attr.' + key + ' has been reset to ' + schema.attr[key].default);
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
            var def = schema.attr[key];
            eq(attr[key], def.default, 'attr.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, attr[key]), 'attr.' + key + ' is a valid ' + def.typeStr);
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
            neq(unchanged.attr[key], good, 'unchanged.attr.' + key + ' has NOT changed to ' + good);
            attr[key] = bad;
            eq(attr[key], good, 'attr.' + key + ' has NOT changed to ' + bad);
            neq(unchanged.attr[key], bad, 'unchanged.attr.' + key + ' has NOT changed to ' + bad);
            instance.reset();
            unchanged.reset();
            eq(attr[key], schema.attr[key].default, 'attr.' + key + ' has been reset to ' + schema.attr[key].default);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('has constant attribute `INST_INDEX`', function() {
        try {
          Class.reset();
          var instance0 = new Class();
          var instance1 = new Class();
          eq(instance0.attr.INST_INDEX, 0, 'First instance after a ‘hard class reset’ has attr.INST_INDEX 0');
          eq(instance1.attr.INST_INDEX, 1, 'Second instance after a ‘hard class reset’ has attr.INST_INDEX 1');
          eq('string', $traceurRuntime.typeof(attr.UUID), '`attr.UUID` is a string');
          is(/^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` conforms to /^[0-9A-Za-z]{6}$/');
          neq(instance0.attr.UUID, instance1.attr.UUID, 'Two instances have different UUIDs');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
    });
  });
  describe('Oom.Foo (all)', function() {
    describe('The Oom.Foo class', function() {
      var Class = ROOT.Oom.Foo,
          schema = Class.schema,
          stat = Class.stat;
      it('is a class with base methods', function() {
        try {
          eq((typeof Class === 'undefined' ? 'undefined' : $traceurRuntime.typeof(Class)), 'function', '`typeof Oom.Foo` is a function');
          eq($traceurRuntime.typeof(Class.reset), 'function', 'Oom.Foo.reset() is a static method');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      var n = countKeyMatches(schema.stat, isConstant);
      it(("has " + n + " constant static" + (1 == n ? '' : 's')), function() {
        try {
          tryHardSet(Class, 'name', 'Changed!');
          eq(Class.name, 'Oom.Foo', 'name is Oom.Foo');
          for (var key in schema.stat) {
            if (!isConstant(key))
              continue;
            var def = schema.stat[key];
            tryHardSet(stat, key, goodVals[def.typeStr]);
            eq(stat[key], def.default, 'stat.' + key + ' is ' + def.default.toString());
            is(isValid(def, stat[key]), 'stat.' + key + ' is a valid ' + def.typeStr);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.stat, isReadOnly);
      it(("has " + n + " read-only static" + (1 == n ? '' : 's')), function() {
        try {
          Class.reset();
          for (var key in schema.stat) {
            if (!isReadOnly(key))
              continue;
            var def = schema.stat[key];
            stat[key] = goodVals[def.typeStr];
            eq(stat[key], def.default, 'stat.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, stat[key]), 'stat.' + key + ' is a valid ' + def.typeStr);
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
            var def = schema.stat[key];
            var good = goodVals[def.typeStr];
            var shadowObj = def.perClass ? stat : def.definedIn.stat;
            shadowObj['_' + key] = good;
            eq(stat[key], good, 'stat.' + key + ' has changed to ' + good);
            Class.reset();
            eq(stat[key], def.default, 'stat.' + key + ' has been reset to ' + def.default);
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
            var def = schema.stat[key];
            eq(stat[key], def.default, 'stat.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, stat[key]), 'stat.' + key + ' is a valid ' + def.typeStr);
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
            Class.reset();
            eq(stat[key], schema.stat[key].default, 'stat.' + key + ' has been reset to ' + schema.stat[key].default);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('has read-only static `inst_tally`', function() {
        try {
          Class.reset();
          eq(stat.inst_tally, 0, 'stat.inst_tally is zero after a ‘hard class reset’');
          var instance = new Class();
          eq(stat.inst_tally, 1, 'stat.inst_tally is 1 after an instantiation');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
    });
    describe('An Oom.Foo instance', function() {
      var Class = ROOT.Oom.Foo,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          unchanged = new Class();
      it('is an instance with base methods', function() {
        try {
          is(instance instanceof Class, 'is an instance of Oom.Foo');
          eq(Class, instance.constructor, '`constructor` is Oom.Foo');
          eq($traceurRuntime.typeof(instance.reset), 'function', 'myOomFoo.reset() is an instance method');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      var n = countKeyMatches(schema.attr, function(key) {
        return isConstant(key) && schema.attr[key].isFn;
      });
      it(("has " + n + " constant attribute" + (1 == n ? '' : 's') + " from function"), function() {
        try {
          for (var key in schema.attr) {
            var def = schema.attr[key];
            if (!isConstant(key) || !def.isFn)
              continue;
            var origValue = attr[key];
            trySoftSet(attr, key, goodVals[def.typeStr]);
            eq(attr[key], origValue, 'attr.' + key + ' remains ' + origValue.toString() + ' after simple set');
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.attr, function(key) {
        return isConstant(key) && !schema.attr[key].isFn;
      });
      it(("has " + n + " constant attribute" + (1 == n ? '' : 's') + " NOT from function"), function() {
        try {
          for (var key in schema.attr) {
            var def = schema.attr[key];
            if (!isConstant(key) || def.isFn)
              continue;
            tryHardSet(attr, key, goodVals[def.typeStr]);
            eq(attr[key], def.default, 'attr.' + key + ' is ' + def.default.toString());
            is(isValid(def, attr[key]), 'attr.' + key + ' is a valid ' + def.typeStr);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.attr, isReadOnly);
      it(("has " + n + " read-only attribute" + (1 == n ? '' : 's')), function() {
        try {
          instance.reset();
          for (var key in schema.attr) {
            if (!isReadOnly(key))
              continue;
            var def = schema.attr[key];
            attr[key] = goodVals[def.typeStr];
            eq(attr[key], def.default, 'attr.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, attr[key]), 'attr.' + key + ' is a valid ' + def.typeStr);
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
            neq(unchanged.attr[key], good, 'unchanged.attr.' + key + ' has NOT changed to ' + good);
            instance.reset();
            unchanged.reset();
            eq(attr[key], schema.attr[key].default, 'attr.' + key + ' has been reset to ' + schema.attr[key].default);
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
            var def = schema.attr[key];
            eq(attr[key], def.default, 'attr.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, attr[key]), 'attr.' + key + ' is a valid ' + def.typeStr);
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
            neq(unchanged.attr[key], good, 'unchanged.attr.' + key + ' has NOT changed to ' + good);
            attr[key] = bad;
            eq(attr[key], good, 'attr.' + key + ' has NOT changed to ' + bad);
            neq(unchanged.attr[key], bad, 'unchanged.attr.' + key + ' has NOT changed to ' + bad);
            instance.reset();
            unchanged.reset();
            eq(attr[key], schema.attr[key].default, 'attr.' + key + ' has been reset to ' + schema.attr[key].default);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('has constant attribute `INST_INDEX`', function() {
        try {
          Class.reset();
          var instance0 = new Class();
          var instance1 = new Class();
          eq(instance0.attr.INST_INDEX, 0, 'First instance after a ‘hard class reset’ has attr.INST_INDEX 0');
          eq(instance1.attr.INST_INDEX, 1, 'Second instance after a ‘hard class reset’ has attr.INST_INDEX 1');
          eq('string', $traceurRuntime.typeof(attr.UUID), '`attr.UUID` is a string');
          is(/^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` conforms to /^[0-9A-Za-z]{6}$/');
          neq(instance0.attr.UUID, instance1.attr.UUID, 'Two instances have different UUIDs');
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
    neq: chai.assert.notStrictEqual,
    is: chai.assert.isOk,
    describe: this.describe || mocha.describe,
    it: this.it || mocha.it,
    trySoftSet: function(obj, keylist, value) {
      keylist.split(',').forEach(function(key) {
        try {
          obj[key] = value;
        } catch (e) {}
      });
    },
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
      color: '#C84CED',
      Number: 12345,
      String: 'A new valid str'
    },
    badVals: {
      color: 'C84CED',
      Number: '11.22.33',
      String: /Not a valid str/
    }
  };
}
!function(ROOT) {
  'use strict';
  if (false)
    return;
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      neq = $__2.neq,
      is = $__2.is,
      trySoftSet = $__2.trySoftSet,
      tryHardSet = $__2.tryHardSet,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      countKeyMatches = $__3.countKeyMatches,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite,
      isValid = $__3.isValid;
  describe('Oom.Foo.Post (all)', function() {
    describe('The Oom.Foo.Post class', function() {
      var Class = ROOT.Oom.Foo.Post,
          schema = Class.schema,
          stat = Class.stat;
      it('is a class with base methods', function() {
        try {
          eq((typeof Class === 'undefined' ? 'undefined' : $traceurRuntime.typeof(Class)), 'function', '`typeof Oom.Foo.Post` is a function');
          eq($traceurRuntime.typeof(Class.reset), 'function', 'Oom.Foo.Post.reset() is a static method');
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
            var def = schema.stat[key];
            tryHardSet(stat, key, goodVals[def.typeStr]);
            eq(stat[key], def.default, 'stat.' + key + ' is ' + def.default.toString());
            is(isValid(def, stat[key]), 'stat.' + key + ' is a valid ' + def.typeStr);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.stat, isReadOnly);
      it(("has " + n + " read-only static" + (1 == n ? '' : 's')), function() {
        try {
          Class.reset();
          for (var key in schema.stat) {
            if (!isReadOnly(key))
              continue;
            var def = schema.stat[key];
            stat[key] = goodVals[def.typeStr];
            eq(stat[key], def.default, 'stat.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, stat[key]), 'stat.' + key + ' is a valid ' + def.typeStr);
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
            var def = schema.stat[key];
            var good = goodVals[def.typeStr];
            var shadowObj = def.perClass ? stat : def.definedIn.stat;
            shadowObj['_' + key] = good;
            eq(stat[key], good, 'stat.' + key + ' has changed to ' + good);
            Class.reset();
            eq(stat[key], def.default, 'stat.' + key + ' has been reset to ' + def.default);
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
            var def = schema.stat[key];
            eq(stat[key], def.default, 'stat.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, stat[key]), 'stat.' + key + ' is a valid ' + def.typeStr);
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
            Class.reset();
            eq(stat[key], schema.stat[key].default, 'stat.' + key + ' has been reset to ' + schema.stat[key].default);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('has read-only static `inst_tally`', function() {
        try {
          Class.reset();
          eq(stat.inst_tally, 0, 'stat.inst_tally is zero after a ‘hard class reset’');
          var instance = new Class();
          eq(stat.inst_tally, 1, 'stat.inst_tally is 1 after an instantiation');
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
          attr = instance.attr,
          unchanged = new Class();
      it('is an instance with base methods', function() {
        try {
          is(instance instanceof Class, 'is an instance of Oom.Foo.Post');
          eq(Class, instance.constructor, '`constructor` is Oom.Foo.Post');
          eq($traceurRuntime.typeof(instance.reset), 'function', 'myOomFooPost.reset() is an instance method');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      var n = countKeyMatches(schema.attr, function(key) {
        return isConstant(key) && schema.attr[key].isFn;
      });
      it(("has " + n + " constant attribute" + (1 == n ? '' : 's') + " from function"), function() {
        try {
          for (var key in schema.attr) {
            var def = schema.attr[key];
            if (!isConstant(key) || !def.isFn)
              continue;
            var origValue = attr[key];
            trySoftSet(attr, key, goodVals[def.typeStr]);
            eq(attr[key], origValue, 'attr.' + key + ' remains ' + origValue.toString() + ' after simple set');
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.attr, function(key) {
        return isConstant(key) && !schema.attr[key].isFn;
      });
      it(("has " + n + " constant attribute" + (1 == n ? '' : 's') + " NOT from function"), function() {
        try {
          for (var key in schema.attr) {
            var def = schema.attr[key];
            if (!isConstant(key) || def.isFn)
              continue;
            tryHardSet(attr, key, goodVals[def.typeStr]);
            eq(attr[key], def.default, 'attr.' + key + ' is ' + def.default.toString());
            is(isValid(def, attr[key]), 'attr.' + key + ' is a valid ' + def.typeStr);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.attr, isReadOnly);
      it(("has " + n + " read-only attribute" + (1 == n ? '' : 's')), function() {
        try {
          instance.reset();
          for (var key in schema.attr) {
            if (!isReadOnly(key))
              continue;
            var def = schema.attr[key];
            attr[key] = goodVals[def.typeStr];
            eq(attr[key], def.default, 'attr.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, attr[key]), 'attr.' + key + ' is a valid ' + def.typeStr);
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
            neq(unchanged.attr[key], good, 'unchanged.attr.' + key + ' has NOT changed to ' + good);
            instance.reset();
            unchanged.reset();
            eq(attr[key], schema.attr[key].default, 'attr.' + key + ' has been reset to ' + schema.attr[key].default);
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
            var def = schema.attr[key];
            eq(attr[key], def.default, 'attr.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, attr[key]), 'attr.' + key + ' is a valid ' + def.typeStr);
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
            neq(unchanged.attr[key], good, 'unchanged.attr.' + key + ' has NOT changed to ' + good);
            attr[key] = bad;
            eq(attr[key], good, 'attr.' + key + ' has NOT changed to ' + bad);
            neq(unchanged.attr[key], bad, 'unchanged.attr.' + key + ' has NOT changed to ' + bad);
            instance.reset();
            unchanged.reset();
            eq(attr[key], schema.attr[key].default, 'attr.' + key + ' has been reset to ' + schema.attr[key].default);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('has constant attribute `INST_INDEX`', function() {
        try {
          Class.reset();
          var instance0 = new Class();
          var instance1 = new Class();
          eq(instance0.attr.INST_INDEX, 0, 'First instance after a ‘hard class reset’ has attr.INST_INDEX 0');
          eq(instance1.attr.INST_INDEX, 1, 'Second instance after a ‘hard class reset’ has attr.INST_INDEX 1');
          eq('string', $traceurRuntime.typeof(attr.UUID), '`attr.UUID` is a string');
          is(/^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` conforms to /^[0-9A-Za-z]{6}$/');
          neq(instance0.attr.UUID, instance1.attr.UUID, 'Two instances have different UUIDs');
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
  if (false)
    return;
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      neq = $__2.neq,
      is = $__2.is,
      trySoftSet = $__2.trySoftSet,
      tryHardSet = $__2.tryHardSet,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      countKeyMatches = $__3.countKeyMatches,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite,
      isValid = $__3.isValid;
  describe('Oom.Foo.Router (all)', function() {
    describe('The Oom.Foo.Router class', function() {
      var Class = ROOT.Oom.Foo.Router,
          schema = Class.schema,
          stat = Class.stat;
      it('is a class with base methods', function() {
        try {
          eq((typeof Class === 'undefined' ? 'undefined' : $traceurRuntime.typeof(Class)), 'function', '`typeof Oom.Foo.Router` is a function');
          eq($traceurRuntime.typeof(Class.reset), 'function', 'Oom.Foo.Router.reset() is a static method');
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
            var def = schema.stat[key];
            tryHardSet(stat, key, goodVals[def.typeStr]);
            eq(stat[key], def.default, 'stat.' + key + ' is ' + def.default.toString());
            is(isValid(def, stat[key]), 'stat.' + key + ' is a valid ' + def.typeStr);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.stat, isReadOnly);
      it(("has " + n + " read-only static" + (1 == n ? '' : 's')), function() {
        try {
          Class.reset();
          for (var key in schema.stat) {
            if (!isReadOnly(key))
              continue;
            var def = schema.stat[key];
            stat[key] = goodVals[def.typeStr];
            eq(stat[key], def.default, 'stat.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, stat[key]), 'stat.' + key + ' is a valid ' + def.typeStr);
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
            var def = schema.stat[key];
            var good = goodVals[def.typeStr];
            var shadowObj = def.perClass ? stat : def.definedIn.stat;
            shadowObj['_' + key] = good;
            eq(stat[key], good, 'stat.' + key + ' has changed to ' + good);
            Class.reset();
            eq(stat[key], def.default, 'stat.' + key + ' has been reset to ' + def.default);
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
            var def = schema.stat[key];
            eq(stat[key], def.default, 'stat.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, stat[key]), 'stat.' + key + ' is a valid ' + def.typeStr);
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
            Class.reset();
            eq(stat[key], schema.stat[key].default, 'stat.' + key + ' has been reset to ' + schema.stat[key].default);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('has read-only static `inst_tally`', function() {
        try {
          Class.reset();
          eq(stat.inst_tally, 0, 'stat.inst_tally is zero after a ‘hard class reset’');
          var instance = new Class();
          eq(stat.inst_tally, 1, 'stat.inst_tally is 1 after an instantiation');
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
          attr = instance.attr,
          unchanged = new Class();
      it('is an instance with base methods', function() {
        try {
          is(instance instanceof Class, 'is an instance of Oom.Foo.Router');
          eq(Class, instance.constructor, '`constructor` is Oom.Foo.Router');
          eq($traceurRuntime.typeof(instance.reset), 'function', 'myOomFooRouter.reset() is an instance method');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      var n = countKeyMatches(schema.attr, function(key) {
        return isConstant(key) && schema.attr[key].isFn;
      });
      it(("has " + n + " constant attribute" + (1 == n ? '' : 's') + " from function"), function() {
        try {
          for (var key in schema.attr) {
            var def = schema.attr[key];
            if (!isConstant(key) || !def.isFn)
              continue;
            var origValue = attr[key];
            trySoftSet(attr, key, goodVals[def.typeStr]);
            eq(attr[key], origValue, 'attr.' + key + ' remains ' + origValue.toString() + ' after simple set');
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.attr, function(key) {
        return isConstant(key) && !schema.attr[key].isFn;
      });
      it(("has " + n + " constant attribute" + (1 == n ? '' : 's') + " NOT from function"), function() {
        try {
          for (var key in schema.attr) {
            var def = schema.attr[key];
            if (!isConstant(key) || def.isFn)
              continue;
            tryHardSet(attr, key, goodVals[def.typeStr]);
            eq(attr[key], def.default, 'attr.' + key + ' is ' + def.default.toString());
            is(isValid(def, attr[key]), 'attr.' + key + ' is a valid ' + def.typeStr);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      n = countKeyMatches(schema.attr, isReadOnly);
      it(("has " + n + " read-only attribute" + (1 == n ? '' : 's')), function() {
        try {
          instance.reset();
          for (var key in schema.attr) {
            if (!isReadOnly(key))
              continue;
            var def = schema.attr[key];
            attr[key] = goodVals[def.typeStr];
            eq(attr[key], def.default, 'attr.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, attr[key]), 'attr.' + key + ' is a valid ' + def.typeStr);
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
            neq(unchanged.attr[key], good, 'unchanged.attr.' + key + ' has NOT changed to ' + good);
            instance.reset();
            unchanged.reset();
            eq(attr[key], schema.attr[key].default, 'attr.' + key + ' has been reset to ' + schema.attr[key].default);
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
            var def = schema.attr[key];
            eq(attr[key], def.default, 'attr.' + key + ' is initially ' + def.default.toString());
            is(isValid(def, attr[key]), 'attr.' + key + ' is a valid ' + def.typeStr);
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
            neq(unchanged.attr[key], good, 'unchanged.attr.' + key + ' has NOT changed to ' + good);
            attr[key] = bad;
            eq(attr[key], good, 'attr.' + key + ' has NOT changed to ' + bad);
            neq(unchanged.attr[key], bad, 'unchanged.attr.' + key + ' has NOT changed to ' + bad);
            instance.reset();
            unchanged.reset();
            eq(attr[key], schema.attr[key].default, 'attr.' + key + ' has been reset to ' + schema.attr[key].default);
          }
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
      it('has constant attribute `INST_INDEX`', function() {
        try {
          Class.reset();
          var instance0 = new Class();
          var instance1 = new Class();
          eq(instance0.attr.INST_INDEX, 0, 'First instance after a ‘hard class reset’ has attr.INST_INDEX 0');
          eq(instance1.attr.INST_INDEX, 1, 'Second instance after a ‘hard class reset’ has attr.INST_INDEX 1');
          eq('string', $traceurRuntime.typeof(attr.UUID), '`attr.UUID` is a string');
          is(/^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` conforms to /^[0-9A-Za-z]{6}$/');
          neq(instance0.attr.UUID, instance1.attr.UUID, 'Two instances have different UUIDs');
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      });
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.3.8 //\\//\\ http://oomtility.loop.coop //////////
