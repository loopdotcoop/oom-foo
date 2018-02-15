//// Oom.Foo //// 1.2.3 //// February 2018 //// http://oom-foo.loop.coop/ //////

"use strict";
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    extendKludJs();
    title('Bases');
    test('+ve Oom class', function() {
      var Class = ROOT.Oom;
      is('function' === typeof Class, 'Oom is a function');
      is(('Oom' === Class.name), 'Oom.name is Oom');
    });
    test('+ve Oom instance', function() {
      var Class = ROOT.Oom;
      var instance = new Class();
      is(instance instanceof Class, 'Is an instance of Oom');
      is(Class === instance.constructor, '`constructor` is Oom');
    });
    test('+ve Oom.Foo class', function() {
      var Class = ROOT.Oom.Foo;
      is('function' === typeof Class, 'Oom.Foo is a function');
      is(('Oom.Foo' === Class.name), 'Oom.Foo.name is Oom.Foo');
    });
    test('+ve Oom.Foo instance', function() {
      var Class = ROOT.Oom.Foo;
      var instance = new Class();
      is(instance instanceof Class, 'Is an instance of Oom.Foo');
      is(Class === instance.constructor, '`constructor` is Oom.Foo');
    });
    test('+ve Oom.El class', function() {
      var Class = ROOT.Oom.El;
      is('function' === typeof Class, 'Oom.El is a function');
      is(('Oom.El' === Class.name), 'Oom.El.name is Oom.El');
    });
    test('+ve Oom.El instance', function() {
      var Class = ROOT.Oom.El;
      var instance = new Class();
      is(instance instanceof Class, 'Is an instance of Oom.El');
      is(Class === instance.constructor, '`constructor` is Oom.El');
    });
    test('+ve Oom.Foo.El class', function() {
      var Class = ROOT.Oom.Foo.El;
      is('function' === typeof Class, 'Oom.Foo.El is a function');
      is(('Oom.Foo.El' === Class.name), 'Oom.Foo.El.name is Oom.Foo.El');
    });
    test('+ve Oom.Foo.El instance', function() {
      var Class = ROOT.Oom.Foo.El;
      var instance = new Class();
      is(instance instanceof Class, 'Is an instance of Oom.Foo.El');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.El');
    });
    function extendKludJs() {
      ROOT.title = ROOT.title || (function(text) {
        if ('undefined' === typeof window)
          return console.log(text);
        if (!$('ul.kludjs')[0]) {
          test('__kludjs_init__', function(x) {
            return is(1, '');
          });
          $('li.kludjs-singleton:contains("__kludjs_init__")').remove();
        }
        var $title = $(("<li class=\"kludjs-title\"><span>▶</span> " + text + "</li>")).appendTo($('ul.kludjs')).click(function() {
          var $title = $(this);
          ROOT.collapseTitle($title, !$title.hasClass('collapsed'));
        });
        $title.data('orig-html', $title.html());
        var $prevTitle = $title.prevAll('.kludjs-title').first();
        if ($prevTitle[0])
          ROOT.collapseTitle($prevTitle, null, true);
      });
      ROOT.throws = ROOT.throws || (function(fn, expect, pre) {
        var nl = 'undefined' === typeof window ? ':\n    ' : ':<br>' + ' &nbsp;'.repeat(6);
        var didntThrow = true;
        try {
          fn();
        } catch (e) {
          didntThrow = false;
          var ok = expect === e.message;
          is(ok, (pre + " has " + (ok ? '' : 'un') + "expected error" + (ok ? '' : nl + e.message)));
        }
        if (didntThrow)
          is(0, pre + ' did not throw an error');
      });
      if ('undefined' !== typeof window) {
        var oldTest = ROOT.test;
        var $total = $('<h4> Total: </h4>');
        $total.data('orig-html', $total.html());
        $('div.kludjs').append($total);
        ROOT.test = function(text, fn) {
          oldTest(text, fn);
          if ('__kludjs_init__' === text)
            return;
          $('ul.kludjs >li').each(function(i, el) {
            var $__2,
                $__3;
            if (text === el.innerText.slice(0, text.length)) {
              var $__1 = el.innerText.match(/\((\d+)\/(\d+)\)/),
                  x = ($__2 = $__1[Symbol.iterator](), ($__3 = $__2.next()).done ? void 0 : $__3.value),
                  pass = ($__3 = $__2.next()).done ? void 0 : $__3.value,
                  all = ($__3 = $__2.next()).done ? void 0 : $__3.value;
              updateHeading($total, pass, all);
              updateHeading($(el).prevAll('.kludjs-title').first(), pass, all);
            }
          });
        };
      }
      ROOT.collapseTitle = ROOT.collapseTitle || (function($i, doCollapse, ifPass) {
        if (ifPass)
          doCollapse = $i.data('pass') === $i.data('all');
        $i[(doCollapse ? 'add' : 'remove') + 'Class']('collapsed');
        while (($i = $i.next()) && $i[0] && !$i.hasClass('kludjs-title'))
          $i[doCollapse ? 'hide' : 'show']();
      });
      function updateHeading($el, pass, all) {
        $el.data('pass', ($el.data('pass') || 0) + (+pass)).data('all', ($el.data('all') || 0) + (+all)).removeClass('kludjs-pass', 'kludjs-fail').addClass('kludjs-' + ($el.data('pass') === $el.data('all') ? 'pass' : 'fail')).html(($el.data('orig-html') + "\n                (" + $el.data('pass') + "/" + $el.data('all') + ")"));
      }
    }
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
console.log('Post-universal.6.js');
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Post Universal');
    var Class = Oom.Foo.Post;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.Post class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.Post is a function');
      is(('Oom.Foo.Post' === Class.NAME && 'Oom.Foo.Post' === Class.api.NAME), 'NAME and api.NAME is Oom.Foo.Post');
      is('Oom.Foo.Post' === Class.name, 'name is Oom.Foo.Post');
    });
    test('+ve Oom.Foo.Post instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of Oom.Foo.Post');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.Post');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
console.log('Router-universal.6.js');
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Router Universal');
    var Class = Oom.Foo.Router;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.Router class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.Router is a function');
      is(('Oom.Foo.Router' === Class.NAME && 'Oom.Foo.Router' === Class.api.NAME), 'NAME and api.NAME is Oom.Foo.Router');
      is('Oom.Foo.Router' === Class.name, 'name is Oom.Foo.Router');
    });
    test('+ve Oom.Foo.Router instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of Oom.Foo.Router');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.Router');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.2.3 //\\//\\ http://oomtility.loop.coop //////////
