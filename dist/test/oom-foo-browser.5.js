//// Oom.Foo //// 1.2.9 //// February 2018 //// http://oom-foo.loop.coop/ //////

"use strict";
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
  describe('Bases Browser', function() {
    beforeEach(function() {});
    afterEach(function() {});
    describe('+ve Oom.enduserMainVue', function() {
      var Class = ROOT.Oom,
          testsAfterUpdate = [];
      $('body').append('<h1 id="test"><oom-test>Loading...</oom-test></h1>');
      initVueTests(Class.enduserMainVue, testAfterMounted, testsAfterUpdate);
      beforeEach(function() {});
      afterEach(function() {});
      after(function() {
        $('#test').remove();
      });
      function testAfterMounted() {
        var initialInstTally = Class.stat.instTally;
        it('Generates a viable Vue component', function() {
          eq(1, $('#test').length, 'div#test exists');
          var lines = textToLines($('#test').text());
          eq(lines[0], '${this.stat.NAME} is Oom', 'First line bakes stat.NAME into template');
          eq(lines[1], '{{stat.NAME}} is Oom', 'Second line gets stat.NAME via Vue');
          eq(lines[2], '{{stat.instTally}} is 0', 'Third line gets stat.instTally via Vue');
        });
        it('Vue updates HTML when static properties change', function(done) {
          var that = this;
          Vue.nextTick(function(x) {
            testsAfterUpdate.push(updateTestFn.bind(that));
            var instance = new Class();
          });
          function updateTestFn() {
            var lines = textToLines($('#test').text());
            eq(lines[2], '{{stat.instTally}} is 1', 'Third line shows Vue sees stat.instTally has updated');
            done();
          }
        });
      }
    });
  });
  $(mocha.run);
}(window);
function initVueTests(origDefinition, testAfterMounted, testsAfterUpdate) {
  var definition = Object.assign({}, origDefinition, {updated: function() {
      if (origDefinition.updated)
        origDefinition.updated.call(this);
      var utFn;
      while (utFn = testsAfterUpdate.shift())
        utFn();
    }}),
      cmp = Vue.component('oom-test', definition),
      vue = new Vue({
        el: '#test',
        mounted: testAfterMounted
      });
}
function textToLines(text) {
  return text.trim().split('\n').map(function(l) {
    return l.trim();
  });
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
  describe("Oom.Foo.Post Browser", function() {
    var Class = Oom.Foo.Post,
        stat = Class.stat;
    describe("+ve Oom.Foo.Post class", function() {
      it("@TODO", function() {
        ok(true, '@TODO');
      });
    });
  });
}(window);
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
  describe("Oom.Foo.Router Browser", function() {
    var Class = Oom.Foo.Router,
        stat = Class.stat;
    describe("+ve Oom.Foo.Router class", function() {
      it("@TODO", function() {
        ok(true, '@TODO');
      });
    });
  });
}(window);




//// Made by Oomtility Make 1.2.9 //\\//\\ http://oomtility.loop.coop //////////
