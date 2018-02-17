//// Oom.Foo //// 1.2.6 //// February 2018 //// http://oom-foo.loop.coop/ //////

"use strict";
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    extendKludJs();
    var r;
    if (!(r = ROOT.Oom) || !(r = r.Foo) || !(r = r.stat) || !(r = r.LOADED_FIRST))
      throw Error('Can’t test: ROOT.Oom.Foo.stat.LOADED_FIRST does not exist');
    var LOADED_FIRST = ROOT.Oom.Foo.stat.LOADED_FIRST;
    title('Bases Universal');
    test('+ve Oom class', function() {
      var Class = ROOT.Oom,
          stat = Class.stat;
      is('function' === typeof Class, 'Oom is a function');
      tryHardSet(Class, 'name', 'Changed!');
      tryHardSet(stat, 'NAME,HOMEPAGE', 'Changed!');
      is(('Oom' === Class.name && 'Oom' === stat.NAME), 'name and stat.NAME are Oom');
      is(('http://oom.loop.coop/' === stat.HOMEPAGE), 'stat.HOMEPAGE is \'http://oom.loop.coop/\'');
      is(0 === stat.instTally, 'stat.instTally is zero');
    });
    if (LOADED_FIRST)
      test('+ve Oom class, defined in this module', function() {
        var Class = ROOT.Oom,
            stat = Class.stat;
        tryHardSet(stat, 'VERSION,REMARKS', 'Changed!');
        is(('1.2.6' === stat.VERSION), 'stat.VERSION is 1.2.6');
        is(('Base class for all Oom classes' === stat.REMARKS), 'stat.REMARKS is \'Base class for all Oom classes\'');
      });
    test('+ve Oom instance', function() {
      var Class = ROOT.Oom,
          instance = new Class(),
          attr = instance.attr;
      is(instance instanceof Class, 'Is an instance of Oom');
      is(Class === instance.constructor, '`constructor` is Oom');
      tryHardSet(attr, 'UUID', 'Changed!');
      is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` is a six-character string');
      tryHardSet(attr, 'INST_INDEX', 99);
      is(0 === attr.INST_INDEX, 'attr.INST_INDEX is zero');
      is(1 === Class.stat.instTally, 'stat.instTally has incremented to `1`');
    });
    test('+ve Oom.Foo class', function() {
      var Class = ROOT.Oom.Foo,
          stat = Class.stat;
      is('function' === typeof Class, 'Oom.Foo is a function');
      tryHardSet(Class, 'name', 'Changed!');
      tryHardSet(stat, 'NAME,HOMEPAGE,VERSION', 'Changed!');
      is(('Oom.Foo' === Class.name && 'Oom.Foo' === stat.NAME), 'name and stat.NAME are Oom.Foo');
      is(('http://oom-foo.loop.coop/' === stat.HOMEPAGE), 'stat.HOMEPAGE is \'http://oom-foo.loop.coop/\'');
      is(('1.2.6' === stat.VERSION), 'stat.VERSION is 1.2.6');
    });
    test('+ve Oom.Foo instance', function() {
      var Class = ROOT.Oom.Foo,
          instance = new Class(),
          attr = instance.attr;
      is(instance instanceof Class, 'Is an instance of Oom.Foo');
      is(Class === instance.constructor, '`constructor` is Oom.Foo');
      is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` is a six-character string');
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
      ROOT.trySoftSet = ROOT.trySoftSet || (function(obj, keylist, value) {
        keylist.split(',').forEach(function(key) {
          try {
            obj[key] = value;
          } catch (e) {}
        });
      });
      ROOT.tryHardSet = ROOT.tryHardSet || (function(obj, keylist, value) {
        keylist.split(',').forEach(function(key) {
          try {
            obj[key] = value;
          } catch (e) {}
          var def = {
            enumerable: true,
            value: value,
            configurable: true
          };
          try {
            Object.defineProperty(obj, key, def);
          } catch (e) {}
        });
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
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Post Universal');
    var Class = Oom.Foo.Post,
        stat = Class.stat;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.Post class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.Post is a function');
      try {
        Class.name = stat.NAME = 'Changed!';
      } catch (e) {}
      is(('Oom.Foo.Post' === Class.name && 'Oom.Foo.Post' === stat.NAME), 'name and stat.NAME are Oom.Foo.Post');
    });
    test('+ve Oom.Foo.Post instance', function() {
      var instance = Class.testInstanceFactory();
      var attr = instance.attr;
      is(instance instanceof Class, 'Is an instance of Oom.Foo.Post');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.Post');
      is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` is a six-character string');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Router Universal');
    var Class = Oom.Foo.Router,
        stat = Class.stat;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.Router class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.Router is a function');
      try {
        Class.name = stat.NAME = 'Changed!';
      } catch (e) {}
      is(('Oom.Foo.Router' === Class.name && 'Oom.Foo.Router' === stat.NAME), 'name and stat.NAME are Oom.Foo.Router');
    });
    test('+ve Oom.Foo.Router instance', function() {
      var instance = Class.testInstanceFactory();
      var attr = instance.attr;
      is(instance instanceof Class, 'Is an instance of Oom.Foo.Router');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.Router');
      is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID), '`attr.UUID` is a six-character string');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.2.6 //\\//\\ http://oomtility.loop.coop //////////
