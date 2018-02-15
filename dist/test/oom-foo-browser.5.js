//// Oom.Foo //// 1.2.3 //// February 2018 //// http://oom-foo.loop.coop/ //////

"use strict";
!function(ROOT) {
  'use strict';
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




//// Made by Oomtility Make 1.2.3 //\\//\\ http://oomtility.loop.coop //////////
