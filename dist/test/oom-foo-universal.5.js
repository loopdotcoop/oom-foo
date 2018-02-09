//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

"use strict";
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
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




//// Made by Oomtility Make 1.2.0 //\\//\\ http://oomtility.loop.coop //////////
