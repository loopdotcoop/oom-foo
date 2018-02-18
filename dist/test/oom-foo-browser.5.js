//// Oom.Foo //// 1.2.7 //// February 2018 //// http://oom-foo.loop.coop/ //////

"use strict";
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    var eq = chai.assert.strictEqual,
        ok = chai.assert.isOk;
    describe("1st Browser", function() {
      describe("+ve Oom class", function() {
        it("should be a class", function() {
          var Class = ROOT.Oom,
              stat = Class.stat;
          eq('function', (typeof Class === 'undefined' ? 'undefined' : $traceurRuntime.typeof(Class)), 'Oom should be a function');
        });
      });
    });
    describe("2nd Browser", function() {
      describe("+ve Oom class", function() {
        it("should be a class", function() {
          var Class = ROOT.Oom,
              stat = Class.stat;
          eq('function', (typeof Class === 'undefined' ? 'undefined' : $traceurRuntime.typeof(Class)), 'Oom should be a function');
        });
      });
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  return;
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Post Browser');
    var Class = Oom.Foo.Post;
    test('Browser test the Oom.Foo.Post class', function() {
      is(true, '@TODO');
    });
    var $t = $('.kludjs-title').last();
    if ($t[0])
      ROOT.collapseTitle($t, null, true);
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  return;
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Router Browser');
    var Class = Oom.Foo.Router;
    test('Browser test the Oom.Foo.Router class', function() {
      is(true, '@TODO');
    });
    var $t = $('.kludjs-title').last();
    if ($t[0])
      ROOT.collapseTitle($t, null, true);
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.2.7 //\\//\\ http://oomtility.loop.coop //////////
