//// Oom.Foo //// 1.2.2 //// February 2018 //// http://oom-foo.loop.coop/ //////

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
          var $i = $(this);
          collapseTitle($i, !$i.hasClass('collapsed'));
        });
        $title.data('orig-html', $title.html());
        var $prevTitle = $title.prevAll('.kludjs-title').first();
        if ($prevTitle[0] && $prevTitle.data('pass') === $prevTitle.data('all'))
          collapseTitle($prevTitle);
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
      function collapseTitle($i) {
        var doCollapse = arguments[1] !== (void 0) ? arguments[1] : true;
        $i[(doCollapse ? 'add' : 'remove') + 'Class']('collapsed');
        var collapse = $i.hasClass('collapsed');
        while (($i = $i.next()) && $i[0] && !$i.hasClass('kludjs-title'))
          $i[collapse ? 'hide' : 'show']();
      }
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
    title('Oom.Foo.El.Hero Universal');
    var Class = Oom.Foo.El.Hero;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.El.Hero class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.El.Hero is a function');
      is(('Oom.Foo.El.Hero' === Class.NAME && 'Oom.Foo.El.Hero' === Class.api.NAME), 'NAME and api.NAME is Oom.Foo.El.Hero');
      is('Oom.Foo.El.Hero' === Class.name, 'name is Oom.Foo.El.Hero');
    });
    test('+ve Oom.Foo.El.Hero instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of Oom.Foo.El.Hero');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.El.Hero');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
    ROOT.throws = ROOT.throws || (function(fn, expect, prefix) {
      var nl = 'undefined' === typeof window ? ':\n    ' : ':<br>' + ' &nbsp;'.repeat(6);
      var didntThrow = true;
      try {
        fn();
      } catch (e) {
        didntThrow = false;
        var ok = expect === e.message;
        is(ok, (prefix + " has " + (ok ? '' : 'un') + "expected error" + (ok ? '' : nl + e.message)));
      }
      if (didntThrow)
        is(0, prefix + " did not throw an error");
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.El.Hero.Sub Universal');
    var Class = Oom.Foo.El.Hero.Sub;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.El.Hero.Sub class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.El.Hero.Sub is a function');
      is(('Oom.Foo.El.Hero.Sub' === Class.NAME && 'Oom.Foo.El.Hero.Sub' === Class.api.NAME), 'NAME and api.NAME is Oom.Foo.El.Hero.Sub');
      is('Oom.Foo.El.Hero.Sub' === Class.name, 'name is Oom.Foo.El.Hero.Sub');
    });
    test('+ve Oom.Foo.El.Hero.Sub instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of Oom.Foo.El.Hero.Sub');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.El.Hero.Sub');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
    ROOT.throws = ROOT.throws || (function(fn, expect, prefix) {
      var nl = 'undefined' === typeof window ? ':\n    ' : ':<br>' + ' &nbsp;'.repeat(6);
      var didntThrow = true;
      try {
        fn();
      } catch (e) {
        didntThrow = false;
        var ok = expect === e.message;
        is(ok, (prefix + " has " + (ok ? '' : 'un') + "expected error" + (ok ? '' : nl + e.message)));
      }
      if (didntThrow)
        is(0, prefix + " did not throw an error");
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.El.Hero.Sub.subFn Universal');
    var Class = Oom.Foo.El.Hero.Sub;
    test('The Oom.Foo.El.Hero.Sub.subFn() method', function() {
      var protoMethod = Class.prototype.subFn;
      is('function' === typeof protoMethod, 'prototype.subFn() is a function');
      is('Oom.Foo.El.Hero.Sub.subFn' === protoMethod.NAME, "NAME is 'Oom.Foo.El.Hero.Sub.subFn'" + protoMethod.NAME);
    });
    test('+ve subFn()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.subFn('123'), "`subFn('123')` returns '123 ok!'");
      instance1.subFn('456');
      is(2 === instance1.subFn_calltally, 'After two calls, `subFn_calltally` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.subFn('789');
      is(1 === instance2.subFn_calltally, 'A second instance has its own `subFn_calltally` property');
    });
    test('-ve subFn()', function() {
      var protoMethod = Class.prototype.subFn;
      throws(function() {
        return protoMethod('123');
      }, 'Oom.Foo.El.Hero.Sub.subFn(): Must not be called as Oom.Foo.El.Hero.Sub.prototype.subFn()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.subFn(123);
      }, 'Oom.Foo.El.Hero.Sub.subFn(): abc has constructor.name Number not String', 'Passing a number into `abc`');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.El.Hero.heroFn Universal');
    var Class = Oom.Foo.El.Hero;
    test('The Oom.Foo.El.Hero.heroFn() method', function() {
      var protoMethod = Class.prototype.heroFn;
      is('function' === typeof protoMethod, 'prototype.heroFn() is a function');
      is('Oom.Foo.El.Hero.heroFn' === protoMethod.NAME, "NAME is 'Oom.Foo.El.Hero.heroFn'" + protoMethod.NAME);
    });
    test('+ve heroFn()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.heroFn('123'), "`heroFn('123')` returns '123 ok!'");
      instance1.heroFn('456');
      is(2 === instance1.heroFn_calltally, 'After two calls, `heroFn_calltally` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.heroFn('789');
      is(1 === instance2.heroFn_calltally, 'A second instance has its own `heroFn_calltally` property');
    });
    test('-ve heroFn()', function() {
      var protoMethod = Class.prototype.heroFn;
      throws(function() {
        return protoMethod('123');
      }, 'Oom.Foo.El.Hero.heroFn(): Must not be called as Oom.Foo.El.Hero.prototype.heroFn()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.heroFn(123);
      }, 'Oom.Foo.El.Hero.heroFn(): abc has constructor.name Number not String', 'Passing a number into `abc`');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.ElMix.FooBar Universal');
    var Class = Oom.Foo.ElMix.FooBar;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.ElMix.FooBar class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.ElMix.FooBar is a function');
      is(('Oom.Foo.ElMix.FooBar' === Class.NAME && 'Oom.Foo.ElMix.FooBar' === Class.api.NAME), 'NAME and api.NAME is Oom.Foo.ElMix.FooBar');
      is('Oom.Foo.ElMix.FooBar' === Class.name, 'name is Oom.Foo.ElMix.FooBar');
    });
    test('+ve Oom.Foo.ElMix.FooBar instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of Oom.Foo.ElMix.FooBar');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.ElMix.FooBar');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
    ROOT.throws = ROOT.throws || (function(fn, expect, prefix) {
      var nl = 'undefined' === typeof window ? ':\n    ' : ':<br>' + ' &nbsp;'.repeat(6);
      var didntThrow = true;
      try {
        fn();
      } catch (e) {
        didntThrow = false;
        var ok = expect === e.message;
        is(ok, (prefix + " has " + (ok ? '' : 'un') + "expected error" + (ok ? '' : nl + e.message)));
      }
      if (didntThrow)
        is(0, prefix + " did not throw an error");
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.ElMix.FooBar.Sub Universal');
    var Class = Oom.Foo.ElMix.FooBar.Sub;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.ElMix.FooBar.Sub class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.ElMix.FooBar.Sub is a function');
      is(('Oom.Foo.ElMix.FooBar.Sub' === Class.NAME && 'Oom.Foo.ElMix.FooBar.Sub' === Class.api.NAME), 'NAME and api.NAME is Oom.Foo.ElMix.FooBar.Sub');
      is('Oom.Foo.ElMix.FooBar.Sub' === Class.name, 'name is Oom.Foo.ElMix.FooBar.Sub');
    });
    test('+ve Oom.Foo.ElMix.FooBar.Sub instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of Oom.Foo.ElMix.FooBar.Sub');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.ElMix.FooBar.Sub');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
    ROOT.throws = ROOT.throws || (function(fn, expect, prefix) {
      var nl = 'undefined' === typeof window ? ':\n    ' : ':<br>' + ' &nbsp;'.repeat(6);
      var didntThrow = true;
      try {
        fn();
      } catch (e) {
        didntThrow = false;
        var ok = expect === e.message;
        is(ok, (prefix + " has " + (ok ? '' : 'un') + "expected error" + (ok ? '' : nl + e.message)));
      }
      if (didntThrow)
        is(0, prefix + " did not throw an error");
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.ElMix.FooBar.Sub.subFn Universal');
    var Class = Oom.Foo.ElMix.FooBar.Sub;
    test('The Oom.Foo.ElMix.FooBar.Sub.subFn() method', function() {
      var protoMethod = Class.prototype.subFn;
      is('function' === typeof protoMethod, 'prototype.subFn() is a function');
      is('Oom.Foo.ElMix.FooBar.Sub.subFn' === protoMethod.NAME, "NAME is 'Oom.Foo.ElMix.FooBar.Sub.subFn'" + protoMethod.NAME);
    });
    test('+ve subFn()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.subFn('123'), "`subFn('123')` returns '123 ok!'");
      instance1.subFn('456');
      is(2 === instance1.subFn_calltally, 'After two calls, `subFn_calltally` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.subFn('789');
      is(1 === instance2.subFn_calltally, 'A second instance has its own `subFn_calltally` property');
    });
    test('-ve subFn()', function() {
      var protoMethod = Class.prototype.subFn;
      throws(function() {
        return protoMethod('123');
      }, 'Oom.Foo.ElMix.FooBar.Sub.subFn(): Must not be called as Oom.Foo.ElMix.FooBar.Sub.prototype.subFn()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.subFn(123);
      }, 'Oom.Foo.ElMix.FooBar.Sub.subFn(): abc has constructor.name Number not String', 'Passing a number into `abc`');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.ElMix.FooBar.fbFn Universal');
    var Class = Oom.Foo.ElMix.FooBar;
    test('The Oom.Foo.ElMix.FooBar.fbFn() method', function() {
      var protoMethod = Class.prototype.fbFn;
      is('function' === typeof protoMethod, 'prototype.fbFn() is a function');
      is('Oom.Foo.ElMix.FooBar.fbFn' === protoMethod.NAME, "NAME is 'Oom.Foo.ElMix.FooBar.fbFn'" + protoMethod.NAME);
    });
    test('+ve fbFn()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.fbFn('123'), "`fbFn('123')` returns '123 ok!'");
      instance1.fbFn('456');
      is(2 === instance1.fbFn_calltally, 'After two calls, `fbFn_calltally` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.fbFn('789');
      is(1 === instance2.fbFn_calltally, 'A second instance has its own `fbFn_calltally` property');
    });
    test('-ve fbFn()', function() {
      var protoMethod = Class.prototype.fbFn;
      throws(function() {
        return protoMethod('123');
      }, 'Oom.Foo.ElMix.FooBar.fbFn(): Must not be called as Oom.Foo.ElMix.FooBar.prototype.fbFn()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.fbFn(123);
      }, 'Oom.Foo.ElMix.FooBar.fbFn(): abc has constructor.name Number not String', 'Passing a number into `abc`');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Mix.Red Universal');
    var Class = Oom.Foo.Mix.Red;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.Mix.Red class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.Mix.Red is a function');
      is(('Oom.Foo.Mix.Red' === Class.NAME && 'Oom.Foo.Mix.Red' === Class.api.NAME), 'NAME and api.NAME is Oom.Foo.Mix.Red');
      is('Oom.Foo.Mix.Red' === Class.name, 'name is Oom.Foo.Mix.Red');
    });
    test('+ve Oom.Foo.Mix.Red instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of Oom.Foo.Mix.Red');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.Mix.Red');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
    ROOT.throws = ROOT.throws || (function(fn, expect, prefix) {
      var nl = 'undefined' === typeof window ? ':\n    ' : ':<br>' + ' &nbsp;'.repeat(6);
      var didntThrow = true;
      try {
        fn();
      } catch (e) {
        didntThrow = false;
        var ok = expect === e.message;
        is(ok, (prefix + " has " + (ok ? '' : 'un') + "expected error" + (ok ? '' : nl + e.message)));
      }
      if (didntThrow)
        is(0, prefix + " did not throw an error");
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Mix.Red.Sub Universal');
    var Class = Oom.Foo.Mix.Red.Sub;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.Mix.Red.Sub class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.Mix.Red.Sub is a function');
      is(('Oom.Foo.Mix.Red.Sub' === Class.NAME && 'Oom.Foo.Mix.Red.Sub' === Class.api.NAME), 'NAME and api.NAME is Oom.Foo.Mix.Red.Sub');
      is('Oom.Foo.Mix.Red.Sub' === Class.name, 'name is Oom.Foo.Mix.Red.Sub');
    });
    test('+ve Oom.Foo.Mix.Red.Sub instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of Oom.Foo.Mix.Red.Sub');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.Mix.Red.Sub');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
    ROOT.throws = ROOT.throws || (function(fn, expect, prefix) {
      var nl = 'undefined' === typeof window ? ':\n    ' : ':<br>' + ' &nbsp;'.repeat(6);
      var didntThrow = true;
      try {
        fn();
      } catch (e) {
        didntThrow = false;
        var ok = expect === e.message;
        is(ok, (prefix + " has " + (ok ? '' : 'un') + "expected error" + (ok ? '' : nl + e.message)));
      }
      if (didntThrow)
        is(0, prefix + " did not throw an error");
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Mix.Red.Sub.subFn Universal');
    var Class = Oom.Foo.Mix.Red.Sub;
    test('The Oom.Foo.Mix.Red.Sub.subFn() method', function() {
      var protoMethod = Class.prototype.subFn;
      is('function' === typeof protoMethod, 'prototype.subFn() is a function');
      is('Oom.Foo.Mix.Red.Sub.subFn' === protoMethod.NAME, "NAME is 'Oom.Foo.Mix.Red.Sub.subFn'" + protoMethod.NAME);
    });
    test('+ve subFn()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.subFn('123'), "`subFn('123')` returns '123 ok!'");
      instance1.subFn('456');
      is(2 === instance1.subFn_calltally, 'After two calls, `subFn_calltally` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.subFn('789');
      is(1 === instance2.subFn_calltally, 'A second instance has its own `subFn_calltally` property');
    });
    test('-ve subFn()', function() {
      var protoMethod = Class.prototype.subFn;
      throws(function() {
        return protoMethod('123');
      }, 'Oom.Foo.Mix.Red.Sub.subFn(): Must not be called as Oom.Foo.Mix.Red.Sub.prototype.subFn()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.subFn(123);
      }, 'Oom.Foo.Mix.Red.Sub.subFn(): abc has constructor.name Number not String', 'Passing a number into `abc`');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Mix.Red.redFn Universal');
    var Class = Oom.Foo.Mix.Red;
    test('The Oom.Foo.Mix.Red.redFn() method', function() {
      var protoMethod = Class.prototype.redFn;
      is('function' === typeof protoMethod, 'prototype.redFn() is a function');
      is('Oom.Foo.Mix.Red.redFn' === protoMethod.NAME, "NAME is 'Oom.Foo.Mix.Red.redFn'" + protoMethod.NAME);
    });
    test('+ve redFn()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.redFn('123'), "`redFn('123')` returns '123 ok!'");
      instance1.redFn('456');
      is(2 === instance1.redFn_calltally, 'After two calls, `redFn_calltally` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.redFn('789');
      is(1 === instance2.redFn_calltally, 'A second instance has its own `redFn_calltally` property');
    });
    test('-ve redFn()', function() {
      var protoMethod = Class.prototype.redFn;
      throws(function() {
        return protoMethod('123');
      }, 'Oom.Foo.Mix.Red.redFn(): Must not be called as Oom.Foo.Mix.Red.prototype.redFn()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.redFn(123);
      }, 'Oom.Foo.Mix.Red.redFn(): abc has constructor.name Number not String', 'Passing a number into `abc`');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Plain Universal');
    var Class = Oom.Foo.Plain;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.Plain class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.Plain is a function');
      is(('Oom.Foo.Plain' === Class.NAME && 'Oom.Foo.Plain' === Class.api.NAME), 'NAME and api.NAME is Oom.Foo.Plain');
      is('Oom.Foo.Plain' === Class.name, 'name is Oom.Foo.Plain');
    });
    test('+ve Oom.Foo.Plain instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of Oom.Foo.Plain');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.Plain');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
    ROOT.throws = ROOT.throws || (function(fn, expect, prefix) {
      var nl = 'undefined' === typeof window ? ':\n    ' : ':<br>' + ' &nbsp;'.repeat(6);
      var didntThrow = true;
      try {
        fn();
      } catch (e) {
        didntThrow = false;
        var ok = expect === e.message;
        is(ok, (prefix + " has " + (ok ? '' : 'un') + "expected error" + (ok ? '' : nl + e.message)));
      }
      if (didntThrow)
        is(0, prefix + " did not throw an error");
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Plain.Sub Universal');
    var Class = Oom.Foo.Plain.Sub;
    Class.testInstanceFactory = function() {
      return new Class({
        firstProp: 100,
        secondProp: new Date
      }, {});
    };
    test('+ve Oom.Foo.Plain.Sub class', function() {
      is('function' === typeof ROOT.Oom, 'The Oom namespace class exists');
      is('function' === typeof Class, 'Oom.Foo.Plain.Sub is a function');
      is(('Oom.Foo.Plain.Sub' === Class.NAME && 'Oom.Foo.Plain.Sub' === Class.api.NAME), 'NAME and api.NAME is Oom.Foo.Plain.Sub');
      is('Oom.Foo.Plain.Sub' === Class.name, 'name is Oom.Foo.Plain.Sub');
    });
    test('+ve Oom.Foo.Plain.Sub instance', function() {
      var instance = Class.testInstanceFactory();
      is(instance instanceof Class, 'Is an instance of Oom.Foo.Plain.Sub');
      is(Class === instance.constructor, '`constructor` is Oom.Foo.Plain.Sub');
      is('object' === $traceurRuntime.typeof(instance.hub), '`hub` property is an object');
    });
    ROOT.throws = ROOT.throws || (function(fn, expect, prefix) {
      var nl = 'undefined' === typeof window ? ':\n    ' : ':<br>' + ' &nbsp;'.repeat(6);
      var didntThrow = true;
      try {
        fn();
      } catch (e) {
        didntThrow = false;
        var ok = expect === e.message;
        is(ok, (prefix + " has " + (ok ? '' : 'un') + "expected error" + (ok ? '' : nl + e.message)));
      }
      if (didntThrow)
        is(0, prefix + " did not throw an error");
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Plain.Sub.subFn Universal');
    var Class = Oom.Foo.Plain.Sub;
    test('The Oom.Foo.Plain.Sub.subFn() method', function() {
      var protoMethod = Class.prototype.subFn;
      is('function' === typeof protoMethod, 'prototype.subFn() is a function');
      is('Oom.Foo.Plain.Sub.subFn' === protoMethod.NAME, "NAME is 'Oom.Foo.Plain.Sub.subFn'" + protoMethod.NAME);
    });
    test('+ve subFn()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.subFn('123'), "`subFn('123')` returns '123 ok!'");
      instance1.subFn('456');
      is(2 === instance1.subFn_calltally, 'After two calls, `subFn_calltally` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.subFn('789');
      is(1 === instance2.subFn_calltally, 'A second instance has its own `subFn_calltally` property');
    });
    test('-ve subFn()', function() {
      var protoMethod = Class.prototype.subFn;
      throws(function() {
        return protoMethod('123');
      }, 'Oom.Foo.Plain.Sub.subFn(): Must not be called as Oom.Foo.Plain.Sub.prototype.subFn()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.subFn(123);
      }, 'Oom.Foo.Plain.Sub.subFn(): abc has constructor.name Number not String', 'Passing a number into `abc`');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    title('Oom.Foo.Plain.plnFn Universal');
    var Class = Oom.Foo.Plain;
    test('The Oom.Foo.Plain.plnFn() method', function() {
      var protoMethod = Class.prototype.plnFn;
      is('function' === typeof protoMethod, 'prototype.plnFn() is a function');
      is('Oom.Foo.Plain.plnFn' === protoMethod.NAME, "NAME is 'Oom.Foo.Plain.plnFn'" + protoMethod.NAME);
    });
    test('+ve plnFn()', function() {
      var instance1 = Class.testInstanceFactory();
      is('123 ok!' === instance1.plnFn('123'), "`plnFn('123')` returns '123 ok!'");
      instance1.plnFn('456');
      is(2 === instance1.plnFn_calltally, 'After two calls, `plnFn_calltally` is 2');
      var instance2 = Class.testInstanceFactory();
      instance2.plnFn('789');
      is(1 === instance2.plnFn_calltally, 'A second instance has its own `plnFn_calltally` property');
    });
    test('-ve plnFn()', function() {
      var protoMethod = Class.prototype.plnFn;
      throws(function() {
        return protoMethod('123');
      }, 'Oom.Foo.Plain.plnFn(): Must not be called as Oom.Foo.Plain.prototype.plnFn()', 'Prototype call');
      var instance = Class.testInstanceFactory();
      throws(function() {
        return instance.plnFn(123);
      }, 'Oom.Foo.Plain.plnFn(): abc has constructor.name Number not String', 'Passing a number into `abc`');
    });
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.2.2 //\\//\\ http://oomtility.loop.coop //////////
