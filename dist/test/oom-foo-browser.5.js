//// Oom.Foo //// 1.2.25 //// March 2018 //// http://oom-foo.loop.coop/ ////////

"use strict";
!function(ROOT) {
  'use strict';
  if (false)
    return $(mocha.run);
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      neq = $__2.neq,
      is = $__2.is,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite;
  describe('Oom (browser)', function() {
    var hid = true;
    describe('The Oom.devMainVue() component', function(done) {
      var Class = ROOT.Oom,
          testID = 'test-oom-devmainvue',
          stat = Class.stat,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          cmp = Vue.component(testID, Class.devMainVue(instance)),
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
            eq($('#' + testID + ' .dev-main .member-table').length, 2, 'Two member-tables exist (one for stat, one for attr)');
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
            var def = schema.stat[key];
            cache.good[key] = goodVals[def.typeStr];
            var shadowObj = def.perClass ? stat : def.definedIn.stat;
            shadowObj['_' + key] = cache.good[key];
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
              Class.reset();
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
              Class.reset();
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
              Class.reset();
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
              instance.reset();
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
              instance.reset();
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
              instance.reset();
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
    describe('The Oom.devMainAFrame() component', function(done) {
      var Class = ROOT.Oom,
          testID = 'test-oom-devmainaframe',
          stat = Class.stat,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          cmp = Vue.component(testID, Class.devMainAFrame(instance)),
          $container = $('a-scene').append(("<a-entity id=\"" + testID + "\">") + ("<" + testID + "></" + testID + "></a-entity>")),
          vue = new Vue({
            el: '#' + testID,
            mounted: testAfterMounted
          });
      function testAfterMounted() {
        it('on the outside, is a viable Vue component', function() {
          try {
            eq($('#' + testID).length, 1, '#' + testID + ' exists');
            eq($('#' + testID + ' a-box').length, 1, '#' + testID + ' a-box exists');
          } catch (e) {
            console.error(e.message);
            throw e;
          }
        });
        it('on the inside, is a viable A-Frame component', function() {
          try {} catch (e) {
            console.error(e.message);
            throw e;
          }
        });
        it('shows correct initial statics', function(done) {
          Vue.nextTick((function() {
            var error;
            try {
              var result = testPixel({
                tol: 30,
                exp: {
                  r: 255,
                  g: 0,
                  b: 0,
                  a: 255
                }
              });
              eq(result.passes, 4, ("initial hilite " + result.pixelRGBA + " is nearly " + result.expectedRGBA));
              $('#' + testID).remove();
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
  describe('Oom.Foo (browser)', function() {
    var hid = true;
    describe('The Oom.Foo.devMainVue() component', function(done) {
      var Class = ROOT.Oom.Foo,
          testID = 'test-oom-foo-devmainvue',
          stat = Class.stat,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          cmp = Vue.component(testID, Class.devMainVue(instance)),
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
            eq($('#' + testID + ' .dev-main .member-table').length, 2, 'Two member-tables exist (one for stat, one for attr)');
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
            var def = schema.stat[key];
            cache.good[key] = goodVals[def.typeStr];
            var shadowObj = def.perClass ? stat : def.definedIn.stat;
            shadowObj['_' + key] = cache.good[key];
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
              Class.reset();
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
              Class.reset();
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
              Class.reset();
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
              instance.reset();
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
              instance.reset();
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
              instance.reset();
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
    describe('The Oom.Foo.devMainAFrame() component', function(done) {
      var Class = ROOT.Oom.Foo,
          testID = 'test-oom-foo-devmainaframe',
          stat = Class.stat,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          cmp = Vue.component(testID, Class.devMainAFrame(instance)),
          $container = $('a-scene').append(("<a-entity id=\"" + testID + "\">") + ("<" + testID + "></" + testID + "></a-entity>")),
          vue = new Vue({
            el: '#' + testID,
            mounted: testAfterMounted
          });
      function testAfterMounted() {
        it('on the outside, is a viable Vue component', function() {
          try {
            eq($('#' + testID).length, 1, '#' + testID + ' exists');
            eq($('#' + testID + ' a-box').length, 1, '#' + testID + ' a-box exists');
          } catch (e) {
            console.error(e.message);
            throw e;
          }
        });
        it('on the inside, is a viable A-Frame component', function() {
          try {} catch (e) {
            console.error(e.message);
            throw e;
          }
        });
        it('shows correct initial statics', function(done) {
          Vue.nextTick((function() {
            var error;
            try {
              var result = testPixel({
                tol: 30,
                exp: {
                  r: 255,
                  g: 0,
                  b: 0,
                  a: 255
                }
              });
              eq(result.passes, 4, ("initial hilite " + result.pixelRGBA + " is nearly " + result.expectedRGBA));
              $('#' + testID).remove();
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
function testPixel(config) {
  var c = Object.assign({}, {
    x: 0.5,
    y: 0.5,
    tol: 5,
    exp: {
      r: 255,
      g: 0,
      b: 0,
      a: 255
    }
  }, config);
  var sceneEl = $('a-scene')[0];
  var captureCanvas = sceneEl.components.screenshot.getCanvas('perspective');
  var captureCtx = captureCanvas.getContext('2d');
  var cloneCanvas = document.createElement('canvas');
  var cloneCtx = cloneCanvas.getContext('2d');
  cloneCanvas.width = captureCanvas.width;
  cloneCanvas.height = captureCanvas.height;
  cloneCtx.drawImage(captureCanvas, 0, 0);
  $('#screenshots').append(cloneCanvas);
  var pixel = Array.from(captureCtx.getImageData(~~(captureCanvas.width * c.x), ~~(captureCanvas.height * c.y), 1, 1).data);
  var passes = 0;
  passes += (pixel[0] < (c.exp.r + c.tol)) && (pixel[0] > (c.exp.r - c.tol));
  passes += (pixel[1] < (c.exp.g + c.tol)) && (pixel[1] > (c.exp.g - c.tol));
  passes += (pixel[2] < (c.exp.b + c.tol)) && (pixel[2] > (c.exp.b - c.tol));
  passes += (pixel[3] < (c.exp.a + c.tol)) && (pixel[3] > (c.exp.a - c.tol));
  return {
    passes: passes,
    pixelRGBA: ("rgba(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + "," + pixel[3] + ")"),
    expectedRGBA: ("rgba(" + c.exp.r + "," + c.exp.g + "," + c.exp.b + "," + c.exp.a + ")")
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
      goodVals = $__2.goodVals,
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite;
  describe('Oom.Foo.Post (browser)', function() {
    var hid = true;
    describe('The Oom.Foo.Post.devMainVue() component', function(done) {
      var Class = ROOT.Oom.Foo.Post,
          testID = 'test-oom-foo-post-devmainvue',
          stat = Class.stat,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          cmp = Vue.component(testID, Class.devMainVue(instance)),
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
            eq($('#' + testID + ' .dev-main .member-table').length, 2, 'Two member-tables exist (one for stat, one for attr)');
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
            var def = schema.stat[key];
            cache.good[key] = goodVals[def.typeStr];
            var shadowObj = def.perClass ? stat : def.definedIn.stat;
            shadowObj['_' + key] = cache.good[key];
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
              Class.reset();
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
              Class.reset();
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
              Class.reset();
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
              instance.reset();
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
              instance.reset();
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
              instance.reset();
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
    describe('The Oom.Foo.Post.devMainAFrame() component', function(done) {
      var Class = ROOT.Oom.Foo.Post,
          testID = 'test-oom-foo-post-devmainaframe',
          stat = Class.stat,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          cmp = Vue.component(testID, Class.devMainAFrame(instance)),
          $container = $('a-scene').append(("<a-entity id=\"" + testID + "\">") + ("<" + testID + "></" + testID + "></a-entity>")),
          vue = new Vue({
            el: '#' + testID,
            mounted: testAfterMounted
          });
      function testAfterMounted() {
        it('on the outside, is a viable Vue component', function() {
          try {
            eq($('#' + testID).length, 1, '#' + testID + ' exists');
            eq($('#' + testID + ' a-box').length, 1, '#' + testID + ' a-box exists');
          } catch (e) {
            console.error(e.message);
            throw e;
          }
        });
        it('on the inside, is a viable A-Frame component', function() {
          try {} catch (e) {
            console.error(e.message);
            throw e;
          }
        });
        it('shows correct initial statics', function(done) {
          Vue.nextTick((function() {
            var error;
            try {
              var result = testPixel({
                tol: 30,
                exp: {
                  r: 255,
                  g: 0,
                  b: 0,
                  a: 255
                }
              });
              eq(result.passes, 4, ("initial hilite " + result.pixelRGBA + " is nearly " + result.expectedRGBA));
              $('#' + testID).remove();
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
  if (false)
    return;
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      neq = $__2.neq,
      is = $__2.is,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite;
  describe('Oom.Foo.Router (browser)', function() {
    var hid = true;
    describe('The Oom.Foo.Router.devMainVue() component', function(done) {
      var Class = ROOT.Oom.Foo.Router,
          testID = 'test-oom-foo-router-devmainvue',
          stat = Class.stat,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          cmp = Vue.component(testID, Class.devMainVue(instance)),
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
            eq($('#' + testID + ' .dev-main .member-table').length, 2, 'Two member-tables exist (one for stat, one for attr)');
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
            var def = schema.stat[key];
            cache.good[key] = goodVals[def.typeStr];
            var shadowObj = def.perClass ? stat : def.definedIn.stat;
            shadowObj['_' + key] = cache.good[key];
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
              Class.reset();
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
              Class.reset();
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
              Class.reset();
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
              instance.reset();
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
              instance.reset();
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
              instance.reset();
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
    describe('The Oom.Foo.Router.devMainAFrame() component', function(done) {
      var Class = ROOT.Oom.Foo.Router,
          testID = 'test-oom-foo-router-devmainaframe',
          stat = Class.stat,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          cmp = Vue.component(testID, Class.devMainAFrame(instance)),
          $container = $('a-scene').append(("<a-entity id=\"" + testID + "\">") + ("<" + testID + "></" + testID + "></a-entity>")),
          vue = new Vue({
            el: '#' + testID,
            mounted: testAfterMounted
          });
      function testAfterMounted() {
        it('on the outside, is a viable Vue component', function() {
          try {
            eq($('#' + testID).length, 1, '#' + testID + ' exists');
            eq($('#' + testID + ' a-box').length, 1, '#' + testID + ' a-box exists');
          } catch (e) {
            console.error(e.message);
            throw e;
          }
        });
        it('on the inside, is a viable A-Frame component', function() {
          try {} catch (e) {
            console.error(e.message);
            throw e;
          }
        });
        it('shows correct initial statics', function(done) {
          Vue.nextTick((function() {
            var error;
            try {
              var result = testPixel({
                tol: 30,
                exp: {
                  r: 255,
                  g: 0,
                  b: 0,
                  a: 255
                }
              });
              eq(result.passes, 4, ("initial hilite " + result.pixelRGBA + " is nearly " + result.expectedRGBA));
              $('#' + testID).remove();
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




//// Made by Oomtility Make 1.2.25 //\\//\\ http://oomtility.loop.coop /////////
