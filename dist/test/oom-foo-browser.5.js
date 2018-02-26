//// Oom.Foo //// 1.2.10 //// February 2018 //// http://oom-foo.loop.coop/ /////

"use strict";
!function(ROOT) {
  'use strict';
  var $__1 = ROOT.testify(),
      describe = $__1.describe,
      it = $__1.it,
      eq = $__1.eq,
      is = $__1.is;
  describe('Bases Browser', function() {
    describe('+ve Oom.devMainVue', function(done) {
      $('.container').append('<div id="test" class="row"><oom-test>Loading...</oom-test></div>');
      var Class = ROOT.Oom,
          cmp = Vue.component('oom-test', Class.devMainVue),
          vue = new Vue({
            el: '#test',
            mounted: testAfterMounted
          });
      after(function() {});
      function testAfterMounted() {
        var initInstTally;
        it('should generates a viable Vue component', function() {
          try {
            eq($('#test').length, 1, '#test exists');
            eq($('#test .member-table').length, 1, '.member-table exists');
          } catch (e) {
            console.error(e.message);
            throw e;
          }
        });
        it('Vue should initially show correct static properties', function(done) {
          Vue.nextTick((function() {
            var error;
            try {
              initInstTally = Class.stat.inst_tally;
              for (var key in Class.stat) {
                var $el = $(("#test .Oom-" + key + " .val"));
                if ($el.find('.read-write')[0])
                  eq($el.find('.read-write').val(), Class.stat[key] + '', ("Vue should set .Oom-" + key + " to stat." + key));
                else
                  eq($el.text(), Class.stat[key] + '', ("Vue should set .Oom-" + key + " to stat." + key));
              }
            } catch (e) {
              error = e;
              console.error(e.message);
            }
            done(error);
          }).bind(this));
        });
        it('Vue should update HTML when static properties change', function(done) {
          initInstTally = Class.stat.inst_tally;
          Class.stat.color = '#000001';
          Class.stat.inst_tally = 44;
          var instance = new Class();
          Vue.nextTick((function() {
            var error;
            try {
              eq($('#test .Oom-inst_tally .val').text(), (initInstTally + 1) + '', "Vue should see stat.inst_tally has updated");
              eq($('#test .Oom-color .val input').val(), '#000001', "Vue should see stat.color has updated");
            } catch (e) {
              error = e;
              console.error(e.message);
            }
            done(error);
          }).bind(this));
        });
        it('Vue should change read-write static properties after UI input', function(done) {
          simulateInput($('#test .Oom-color .val input'), '#339966');
          Vue.nextTick((function() {
            var error;
            try {
              eq(Class.stat.color, '#339966', "<INPUT> change should make Vue update stat.color", 1);
            } catch (e) {
              error = e;
              console.error(e.message);
            }
            done(error);
          }).bind(this));
        });
      }
    });
  });
  $(mocha.run);
}(window);
function simulateInput($input, val) {
  $input.val('#339966');
  var e = document.createEvent('HTMLEvents');
  e.initEvent('input', true, true);
  $input[0].dispatchEvent(e);
}
!function(ROOT) {
  'use strict';
  var $__1 = ROOT.testify(),
      describe = $__1.describe,
      it = $__1.it,
      eq = $__1.eq,
      is = $__1.is;
  describe("Oom.Foo.Post Browser", function() {
    var Class = Oom.Foo.Post,
        stat = Class.stat;
    describe("+ve Oom.Foo.Post class", function() {
      it("@TODO", function() {
        is(true, '@TODO');
      });
    });
  });
}(window);
!function(ROOT) {
  'use strict';
  var $__1 = ROOT.testify(),
      describe = $__1.describe,
      it = $__1.it,
      eq = $__1.eq,
      is = $__1.is;
  describe("Oom.Foo.Router Browser", function() {
    var Class = Oom.Foo.Router,
        stat = Class.stat;
    describe("+ve Oom.Foo.Router class", function() {
      it("@TODO", function() {
        is(true, '@TODO');
      });
    });
  });
}(window);




//// Made by Oomtility Make 1.2.10 //\\//\\ http://oomtility.loop.coop /////////
