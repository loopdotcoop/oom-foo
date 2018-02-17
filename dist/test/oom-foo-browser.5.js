//// Oom.Foo //// 1.2.6 //// February 2018 //// http://oom-foo.loop.coop/ //////

"use strict";
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Bases Browser');
    test('+ve Oom.enduserMainVue', function(next) {
      var Class = ROOT.Oom;
      var $test = $('<h1 id="test"><oom-test>Loading...</oom-test></h1>');
      $('body').append($test);
      console.log($test);
      Vue.component('oom-test', Class.enduserMainVue);
      new Vue({el: '#test'});
      var expected = '\n  ${this.stat.NAME} is Oom' + '\n  {{stat.NAME}} is Oom' + '\n  {{stat.instTally}} is 1\n';
      is(($('#ok')[0] && expected === $('#ok').text()), 'div#ok exists and contains the expected text');
    }, true);
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




//// Made by Oomtility Make 1.2.6 //\\//\\ http://oomtility.loop.coop //////////
