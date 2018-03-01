//// Oom.Foo //// 1.2.15 //// March 2018 //// http://oom-foo.loop.coop/ ////////

"use strict";
!function(ROOT) {
  'use strict';
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      is = $__2.is,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite;
  describe('Bases Browser', function() {
    var hid = true;
    describe('The Oom.devMainVue() component', function(done) {
      var Class = ROOT.Oom,
          testID = 'test-oom-devmainvue',
          stat = Class.stat,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          cmp = Vue.component(testID, Class.devMainVue(Class)),
          $container = $('.container').append(("<div class=\"row " + (hid ? 'hid' : '') + "\" ") + ("id=\"" + testID + "\"><" + testID + ">Loading...</" + testID + "></div>")),
          vue = new Vue({
            el: '#' + testID,
            mounted: testAfterMounted
          });
      function testAfterMounted() {
        it('is a viable Vue component', function() {
          try {
            eq($('#' + testID).length, 1, '#' + testID + ' exists');
            eq($('#' + testID + ' .dev-main').length, 1, 'dev-main exists');
            eq($('#' + testID + ' .dev-main .member-table').length, 2, 'Two member-tables exist');
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
                var $el = $(("#" + testID + " .stat .Oom-" + key + " .val"));
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
            cache.good[key] = goodVals[schema.stat[key].typeStr];
            stat['_' + key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadOnly(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#" + testID + " .stat .Oom-" + key + " .val")).text(), good, '`#' + testID + ' .stat .Oom-' + key + ' .val` changed to ' + good);
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
            cache.good[key] = goodVals[schema.stat[key].typeStr];
            stat[key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadWrite(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#" + testID + " .stat .Oom-" + key + " .val .read-write")).val(), good, '`#' + testID + ' .stat .Oom-' + key + ' .val` changed to ' + good);
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
            cache.$el[key] = $(("#" + testID + " .stat .Oom-" + key + " .val .read-write"));
            cache.good[key] = goodVals[schema.stat[key].typeStr];
            simulateInput(cache.$el[key], cache.good[key]);
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadWrite(key))
                  continue;
                eq(cache.$el[key].val(), cache.good[key] + '', "<INPUT> change should make Vue update stat." + key);
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
            cache.$el[key] = $(("#" + testID + " .stat .Oom-" + key + " .val .read-write"));
            cache.orig[key] = cache.$el[key].val();
            simulateInput(cache.$el[key], badVals[schema.stat[key].typeStr]);
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
                var $el = $(("#" + testID + " .attr .Oom-" + key + " .val"));
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
            cache.good[key] = goodVals[schema.attr[key].typeStr];
            attr['_' + key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in attr) {
                if (!isReadOnly(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#" + testID + " .attr .Oom-" + key + " .val")).text(), good, '`#' + testID + ' .attr .Oom-' + key + ' .val` changed to ' + good);
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
            cache.good[key] = goodVals[schema.attr[key].typeStr];
            attr[key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in attr) {
                if (!isReadWrite(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#" + testID + " .attr .Oom-" + key + " .val .read-write")).val(), good, '`#' + testID + ' .attr .Oom-' + key + ' .val` changed to ' + good);
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
            cache.$el[key] = $(("#" + testID + " .attr .Oom-" + key + " .val .read-write"));
            cache.good[key] = goodVals[schema.attr[key].typeStr];
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
            cache.$el[key] = $(("#" + testID + " .attr .Oom-" + key + " .val .read-write"));
            cache.orig[key] = cache.$el[key].val();
            simulateInput(cache.$el[key], badVals[schema.attr[key].typeStr]);
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
      is = $__2.is,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite;
  describe('Oom.Foo.Post Browser', function() {
    var hid = 0;
    describe('The Oom.Foo.Post.devMainVue component', function(done) {
      var Class = ROOT.Oom.Foo.Post,
          testID = 'test-oom-foo-post-devmainvue',
          stat = Class.stat,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          cmp = Vue.component(testID, Class.devMainVue(Class)),
          $container = $('.container').append(("<div class=\"row " + (hid ? 'hid' : '') + "\" ") + ("id=\"" + testID + "\"><" + testID + ">Loading...</" + testID + "></div>")),
          vue = new Vue({
            el: '#' + testID,
            mounted: testAfterMounted
          });
      function testAfterMounted() {
        it('is a viable Vue component', function() {
          try {
            eq($('#' + testID).length, 1, '#' + testID + ' exists');
            eq($('#' + testID + ' .dev-main').length, 1, 'dev-main exists');
            eq($('#' + testID + ' .dev-main .member-table').length, 2, 'Two member-tables exist');
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
                var $el = $(("#" + testID + " .stat .Oom-" + key + " .val"));
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
            cache.good[key] = goodVals[schema.stat[key].typeStr];
            stat['_' + key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadOnly(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#" + testID + " .stat .Oom-" + key + " .val")).text(), good, '`#' + testID + ' .stat .Oom-' + key + ' .val` changed to ' + good);
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
            cache.good[key] = goodVals[schema.stat[key].typeStr];
            stat[key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadWrite(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#" + testID + " .stat .Oom-" + key + " .val .read-write")).val(), good, '`#' + testID + ' .stat .Oom-' + key + ' .val` changed to ' + good);
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
            cache.$el[key] = $(("#" + testID + " .stat .Oom-" + key + " .val .read-write"));
            cache.good[key] = goodVals[schema.stat[key].typeStr];
            simulateInput(cache.$el[key], cache.good[key]);
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadWrite(key))
                  continue;
                eq(cache.$el[key].val(), cache.good[key] + '', "<INPUT> change should make Vue update stat." + key);
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
            cache.$el[key] = $(("#" + testID + " .stat .Oom-" + key + " .val .read-write"));
            cache.orig[key] = cache.$el[key].val();
            simulateInput(cache.$el[key], badVals[schema.stat[key].typeStr]);
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
                var $el = $(("#" + testID + " .attr .Oom-" + key + " .val"));
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
            cache.good[key] = goodVals[schema.attr[key].typeStr];
            attr['_' + key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in attr) {
                if (!isReadOnly(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#" + testID + " .attr .Oom-" + key + " .val")).text(), good, '`#' + testID + ' .attr .Oom-' + key + ' .val` changed to ' + good);
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
            cache.good[key] = goodVals[schema.attr[key].typeStr];
            attr[key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in attr) {
                if (!isReadWrite(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#" + testID + " .attr .Oom-" + key + " .val .read-write")).val(), good, '`#' + testID + ' .attr .Oom-' + key + ' .val` changed to ' + good);
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
            cache.$el[key] = $(("#" + testID + " .attr .Oom-" + key + " .val .read-write"));
            cache.good[key] = goodVals[schema.attr[key].typeStr];
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
            cache.$el[key] = $(("#" + testID + " .attr .Oom-" + key + " .val .read-write"));
            cache.orig[key] = cache.$el[key].val();
            simulateInput(cache.$el[key], badVals[schema.attr[key].typeStr]);
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
}(window);
!function(ROOT) {
  'use strict';
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      is = $__2.is,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite;
  describe('Oom.Foo.Router Browser', function() {
    var hid = true;
    describe('The Oom.Foo.Router.devMainVue component', function(done) {
      var Class = ROOT.Oom.Foo.Router,
          testID = 'test-oom-foo-router-devmainvue',
          stat = Class.stat,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          cmp = Vue.component(testID, Class.devMainVue(Class)),
          $container = $('.container').append(("<div class=\"row " + (hid ? 'hid' : '') + "\" ") + ("id=\"" + testID + "\"><" + testID + ">Loading...</" + testID + "></div>")),
          vue = new Vue({
            el: '#' + testID,
            mounted: testAfterMounted
          });
      function testAfterMounted() {
        it('is a viable Vue component', function() {
          try {
            eq($('#' + testID).length, 1, '#' + testID + ' exists');
            eq($('#' + testID + ' .dev-main').length, 1, 'dev-main exists');
            eq($('#' + testID + ' .dev-main .member-table').length, 2, 'Two member-tables exist');
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
                var $el = $(("#" + testID + " .stat .Oom-" + key + " .val"));
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
            cache.good[key] = goodVals[schema.stat[key].typeStr];
            stat['_' + key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadOnly(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#" + testID + " .stat .Oom-" + key + " .val")).text(), good, '`#' + testID + ' .stat .Oom-' + key + ' .val` changed to ' + good);
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
            cache.good[key] = goodVals[schema.stat[key].typeStr];
            stat[key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadWrite(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#" + testID + " .stat .Oom-" + key + " .val .read-write")).val(), good, '`#' + testID + ' .stat .Oom-' + key + ' .val` changed to ' + good);
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
            cache.$el[key] = $(("#" + testID + " .stat .Oom-" + key + " .val .read-write"));
            cache.good[key] = goodVals[schema.stat[key].typeStr];
            simulateInput(cache.$el[key], cache.good[key]);
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in stat) {
                if (!isReadWrite(key))
                  continue;
                eq(cache.$el[key].val(), cache.good[key] + '', "<INPUT> change should make Vue update stat." + key);
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
            cache.$el[key] = $(("#" + testID + " .stat .Oom-" + key + " .val .read-write"));
            cache.orig[key] = cache.$el[key].val();
            simulateInput(cache.$el[key], badVals[schema.stat[key].typeStr]);
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
                var $el = $(("#" + testID + " .attr .Oom-" + key + " .val"));
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
            cache.good[key] = goodVals[schema.attr[key].typeStr];
            attr['_' + key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in attr) {
                if (!isReadOnly(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#" + testID + " .attr .Oom-" + key + " .val")).text(), good, '`#' + testID + ' .attr .Oom-' + key + ' .val` changed to ' + good);
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
            cache.good[key] = goodVals[schema.attr[key].typeStr];
            attr[key] = cache.good[key];
          }
          Vue.nextTick((function() {
            var error;
            try {
              for (var key in attr) {
                if (!isReadWrite(key))
                  continue;
                var good = cache.good[key] + '';
                eq($(("#" + testID + " .attr .Oom-" + key + " .val .read-write")).val(), good, '`#' + testID + ' .attr .Oom-' + key + ' .val` changed to ' + good);
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
            cache.$el[key] = $(("#" + testID + " .attr .Oom-" + key + " .val .read-write"));
            cache.good[key] = goodVals[schema.attr[key].typeStr];
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
            cache.$el[key] = $(("#" + testID + " .attr .Oom-" + key + " .val .read-write"));
            cache.orig[key] = cache.$el[key].val();
            simulateInput(cache.$el[key], badVals[schema.attr[key].typeStr]);
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
}(window);




//// Made by Oomtility Make 1.2.15 //\\//\\ http://oomtility.loop.coop /////////
