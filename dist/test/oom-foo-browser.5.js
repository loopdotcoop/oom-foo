//// Oom.Foo //// 1.2.11 //// February 2018 //// http://oom-foo.loop.coop/ /////

"use strict";
!function(ROOT) {
  'use strict';
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      is = $__2.is,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals,
      stringOrName = $__2.stringOrName;
  var $__3 = Oom.KIT,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite;
  describe('Bases Browser', function() {
    describe('The Oom.devMainVue component', function(done) {
      $('.container').append('<div id="test" class="row"><oom-test>Loading...</oom-test></div>');
      var Class = ROOT.Oom,
          stat = Class.stat,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          cmp = Vue.component('oom-test', Class.devMainVue),
          vue = new Vue({
            el: '#test',
            mounted: testAfterMounted
          });
      after(function() {});
      function testAfterMounted() {
        it('is a viable Vue component', function() {
          try {
            eq($('#test').length, 1, '#test exists');
            eq($('#test .dev-main').length, 1, 'dev-main exists');
            eq($('#test .dev-main .member-table').length, 2, 'Two member-tables exist');
          } catch (e) {
            console.error(e.message);
            throw e;
          }
        });
        it('shows correct initial statics', function(done) {
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                var $el = $(("#test .stat .Oom-" + key + " .val"));
                var val = ($el.find('.read-write')[0]) ? $el.find('.read-write').val() : $el.text();
                eq(val, stat[key] + '', ("Vue should set .Oom-" + key + " to stat." + key));
              }
            } catch (e) {
              error = e;
              console.error(e.message);
            }
            done(error);
          }).bind(this));
        });
        it('shows that read-only statics have changed', function(done) {
          var cache = {good: {}};
          for (var key in stat) {
            if (!isReadOnly(key))
              continue;
            cache.good[key] = goodVals[stringOrName(schema.stat[key].type)];
            stat['_' + key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadOnly(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#test .stat .Oom-" + key + " .val")).text(), good, '`#test .stat .Oom-' + key + ' .val` has changed to ' + good);
              }
            } catch (e) {
              error = e;
              console.error(e.message);
            }
            done(error);
          }).bind(this));
        });
        it('shows that read-write statics have changed', function(done) {
          var cache = {good: {}};
          for (var key in stat) {
            if (!isReadWrite(key))
              continue;
            cache.good[key] = goodVals[stringOrName(schema.stat[key].type)];
            stat[key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadWrite(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#test .stat .Oom-" + key + " .val .read-write")).val(), good, '`#test .stat .Oom-' + key + ' .val` has changed to ' + good);
              }
            } catch (e) {
              error = e;
              console.error(e.message);
            }
            done(error);
          }).bind(this));
        });
        it('updates read-write statics after UI input', function(done) {
          var cache = {
            $el: {},
            good: {}
          };
          for (var key in stat) {
            if (!isReadWrite(key))
              continue;
            cache.$el[key] = $(("#test .stat .Oom-" + key + " .val .read-write"));
            cache.good[key] = goodVals[stringOrName(schema.stat[key].type)];
            simulateInput(cache.$el[key], cache.good[key]);
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadWrite(key))
                  continue;
                eq(cache.$el[key].val(), cache.good[key], "<INPUT> change should make Vue update stat." + key);
              }
            } catch (e) {
              error = e;
              console.error(e.message);
            }
            done(error);
          }).bind(this));
        });
        it('does not update read-write statics after invalid UI input', function(done) {
          var cache = {
            $el: {},
            orig: {}
          };
          for (var key in stat) {
            if (!isReadWrite(key))
              continue;
            cache.$el[key] = $(("#test .stat .Oom-" + key + " .val .read-write"));
            cache.orig[key] = cache.$el[key].val();
            simulateInput(cache.$el[key], badVals[stringOrName(schema.stat[key].type)]);
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadWrite(key))
                  continue;
                eq(cache.$el[key].val(), cache.orig[key], "invalid <INPUT> change does not update stat." + key);
              }
            } catch (e) {
              error = e;
              console.error(e.message);
            }
            done(error);
          }).bind(this));
        });
        it('shows correct initial attributes', function(done) {
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in attr) {
                var $el = $(("#test .attr .Oom-" + key + " .val"));
                var val = ($el.find('.read-write')[0]) ? $el.find('.read-write').val() : $el.text();
                eq(val, attr[key] + '', ("Vue should set .Oom-" + key + " to attr." + key));
              }
            } catch (e) {
              error = e;
              console.error(e.message);
            }
            done(error);
          }).bind(this));
        });
        it('shows that read-only attributes have changed', function(done) {
          var cache = {good: {}};
          for (var key in attr) {
            if (!isReadOnly(key))
              continue;
            cache.good[key] = goodVals[stringOrName(schema.attr[key].type)];
            attr['_' + key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in attr) {
                if (!isReadOnly(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#test .attr .Oom-" + key + " .val")).text(), good, '`#test .attr .Oom-' + key + ' .val` has changed to ' + good);
              }
            } catch (e) {
              error = e;
              console.error(e.message);
            }
            done(error);
          }).bind(this));
        });
        it('shows that read-write attributes have changed', function(done) {
          var cache = {good: {}};
          for (var key in attr) {
            if (!isReadWrite(key))
              continue;
            cache.good[key] = goodVals[stringOrName(schema.attr[key].type)];
            attr[key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in attr) {
                if (!isReadWrite(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#test .attr .Oom-" + key + " .val .read-write")).val(), good, '`#test .attr .Oom-' + key + ' .val` has changed to ' + good);
              }
            } catch (e) {
              error = e;
              console.error(e.message);
            }
            done(error);
          }).bind(this));
        });
        it('updates read-write attributes after UI input', function(done) {
          var cache = {
            $el: {},
            good: {}
          };
          for (var key in attr) {
            if (!isReadWrite(key))
              continue;
            cache.$el[key] = $(("#test .attr .Oom-" + key + " .val .read-write"));
            cache.good[key] = goodVals[stringOrName(schema.attr[key].type)];
            simulateInput(cache.$el[key], cache.good[key]);
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in attr) {
                if (!isReadWrite(key))
                  continue;
                eq(cache.$el[key].val(), cache.good[key] + '', "<INPUT> change should make Vue update attr." + key);
              }
            } catch (e) {
              error = e;
              console.error(e.message);
            }
            done(error);
          }).bind(this));
        });
        it('does not update read-write attributes after invalid UI input', function(done) {
          var cache = {
            $el: {},
            orig: {}
          };
          for (var key in attr) {
            if (!isReadWrite(key))
              continue;
            cache.$el[key] = $(("#test .attr .Oom-" + key + " .val .read-write"));
            cache.orig[key] = cache.$el[key].val();
            simulateInput(cache.$el[key], badVals[stringOrName(schema.attr[key].type)]);
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in attr) {
                if (!isReadWrite(key))
                  continue;
                eq(cache.$el[key].val(), cache.orig[key], "invalid <INPUT> change does not update attr." + key);
              }
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
  $input.val(val);
  var e = document.createEvent('HTMLEvents');
  e.initEvent('input', true, true);
  $input[0].dispatchEvent(e);
}
!function(ROOT) {
  'use strict';
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      is = $__2.is;
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
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      is = $__2.is;
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




//// Made by Oomtility Make 1.2.11 //\\//\\ http://oomtility.loop.coop /////////
