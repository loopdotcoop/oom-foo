//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

"use strict";
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Foo',
    VERSION: '1.2.1',
    HOMEPAGE: 'http://oom-foo.loop.coop/',
    REMARKS: 'Initial test of the oom-hub architecture'
  };
  var Oom = ROOT.Oom = ROOT.Oom || function() {
    function Oom() {}
    return ($traceurRuntime.createClass)(Oom, {}, {});
  }();
  var TOOLKIT = Oom.TOOLKIT = assignToolkit(Oom.TOOLKIT);
  Oom.Foo = function($__super) {
    function $__1() {
      $traceurRuntime.superConstructor($__1).apply(this, arguments);
    }
    return ($traceurRuntime.createClass)($__1, {}, {}, $__super);
  }(Oom);
  TOOLKIT.name(Oom.Foo, 'Oom.Foo');
  Object.defineProperties(Oom.Foo, TOOLKIT.toPropsObj(META));
  Oom.El = Oom.El || function($__super) {
    function $__3() {
      $traceurRuntime.superConstructor($__3).apply(this, arguments);
    }
    return ($traceurRuntime.createClass)($__3, {}, {}, $__super);
  }(Oom);
  TOOLKIT.name(Oom.El, 'Oom.El');
  Oom.Foo.El = function($__super) {
    function $__5() {
      $traceurRuntime.superConstructor($__5).apply(this, arguments);
    }
    return ($traceurRuntime.createClass)($__5, {}, {}, $__super);
  }(Oom.Foo);
  TOOLKIT.name(Oom.Foo.El, 'Oom.Foo.El');
  Oom.Mix = Oom.Mix || function($__super) {
    function $__7() {
      $traceurRuntime.superConstructor($__7).apply(this, arguments);
    }
    return ($traceurRuntime.createClass)($__7, {}, {}, $__super);
  }(Oom);
  TOOLKIT.name(Oom.Mix, 'Oom.Mix');
  Oom.Foo.Mix = function($__super) {
    function $__9() {
      $traceurRuntime.superConstructor($__9).apply(this, arguments);
    }
    return ($traceurRuntime.createClass)($__9, {}, {}, $__super);
  }(Oom.Foo);
  TOOLKIT.name(Oom.Foo.Mix, 'Oom.Foo.Mix');
  Oom.ElMix = Oom.ElMix || function($__super) {
    function $__11() {
      $traceurRuntime.superConstructor($__11).apply(this, arguments);
    }
    return ($traceurRuntime.createClass)($__11, {}, {}, $__super);
  }(Oom);
  TOOLKIT.name(Oom.ElMix, 'Oom.ElMix');
  Oom.Foo.ElMix = function($__super) {
    function $__13() {
      $traceurRuntime.superConstructor($__13).apply(this, arguments);
    }
    return ($traceurRuntime.createClass)($__13, {}, {}, $__super);
  }(Oom.Foo);
  TOOLKIT.name(Oom.Foo.ElMix, 'Oom.Foo.ElMix');
  function assignToolkit() {
    var TOOLKIT = arguments[0] !== (void 0) ? arguments[0] : {};
    return Object.assign({}, {
      rndCh: function(s, e) {
        return String.fromCharCode(Math.random() * (e - s) + s);
      },
      applyDefault: function(valid, config) {
        if (config.hasOwnProperty(valid.name))
          return true;
        if (!valid.hasOwnProperty('default'))
          return false;
        config[valid.name] = 'function' === typeof valid.default ? valid.default(config) : valid.default;
        return true;
      },
      validateType: function(valid, value) {
        var ME = "TOOLKIT.validateType: ",
            C = 'constructor';
        if (null === valid.type)
          return (null === value) ? null : "is not null";
        if ('undefined' === typeof valid.type)
          return ('undefined' === typeof value) ? null : "is not undefined";
        if (!valid.type.name)
          throw new TypeError(ME + valid.name + "’s valid.type has no name");
        if (!value[C] || !value[C].name)
          throw new TypeError(ME + valid.name + ("’s value has no " + C + ".name"));
        return (valid.type.name === value[C].name) ? null : ("has " + C + ".name " + value[C].name + " not " + valid.type.name);
      },
      validateRange: function(valid, value) {
        if (null != valid.min && valid.min > value)
          return ("is less than the minimum " + valid.min);
        if (null != valid.max && valid.max < value)
          return ("is greater than the maximum " + valid.max);
        if (null != valid.step && ((value / valid.step) % 1))
          return (value + " ÷ " + valid.step + " leaves " + (value / valid.step) % 1);
      },
      getNow: function() {
        var now;
        if ('object' === $traceurRuntime.typeof(ROOT.process) && 'function' === typeof ROOT.process.hrtime) {
          var hrtime = ROOT.process.hrtime();
          now = ((hrtime[0] * 1e9) + hrtime[1]) / 1e6;
        } else {
          now = ROOT.performance.now();
        }
        return now;
      },
      toPropsObj: function(src) {
        var obj = {};
        for (var k in src)
          obj[k] = {
            value: src[k],
            enumerable: true
          };
        return obj;
      },
      name: function(obj, name) {
        return Object.defineProperty(obj, 'name', {
          value: name,
          writable: false
        });
      }
    }, TOOLKIT);
  }
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.El.Hero',
    REMARKS: '@TODO'
  };
  var PROPS = {
    propA: Number,
    propB: [String, Number],
    propC: {
      type: String,
      required: true
    },
    propD: {
      type: Number,
      default: 100
    },
    propE: {
      type: Object,
      default: function() {
        return [1];
      }
    },
    propF: {validator: function(v) {
        return v > 10;
      }}
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.El.Hero = function($__super) {
    function $__0() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var hub = arguments[1] !== (void 0) ? arguments[1] : Oom.HUB;
      var $__17;
      $traceurRuntime.superConstructor($__0).call(this, config, hub);
      var api = this.api = {};
      Object.defineProperty(this, 'hub', {value: hub});
      this._validateConstructor(config);
      this.validConstructor.forEach(($__17 = this, function(valid) {
        var value = config[valid.name];
        Object.defineProperty($__17.api, valid.name, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }));
      if (Class === this.constructor)
        api.index = Class.api.tally++;
    }
    return ($traceurRuntime.createClass)($__0, {
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "Oom.Foo.El.Hero._validateConstructor(): ";
        if ('object' !== (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)))
          throw new Error(ME + ("config is type " + (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)) + " not object"));
        this.validConstructor.forEach(function(valid) {
          if (!TOOLKIT.applyDefault(valid, config))
            throw new TypeError(ME + ("config." + valid.name + " is mandatory"));
          value = config[valid.name];
          if (err = TOOLKIT.validateType(valid, value))
            throw new TypeError(ME + ("config." + valid.name + " " + err));
          if (err = TOOLKIT.validateRange(valid, value))
            throw new RangeError(ME + ("config." + valid.name + " " + err));
        });
      },
      get validConstructor() {
        return [{
          title: 'Third Prop',
          name: 'thirdProp',
          alias: 'tp',
          tooltip: 'An example object property, intended as a placeholder',
          devtip: 'You should replace this placeholder with a real property',
          form: 'text',
          type: String,
          default: 'Some default text'
        }];
      },
      xxx: function(config) {
        var $__18 = this,
            hub = $__18.hub,
            a = $__18.a,
            b = $__18.b,
            c = $__18.c;
        var $__19 = config,
            xx = $__19.xx,
            yy = $__19.yy,
            zz = $__19.zz;
      }
    }, {}, $__super);
  }(Oom.Foo.El);
  TOOLKIT.name(Class, 'Oom.Foo.El.Hero');
  Class.api = {tally: 0};
  Object.defineProperties(Class, TOOLKIT.toPropsObj(META));
  Object.defineProperties(Class.api, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.El.Hero.Sub',
    REMARKS: '@TODO'
  };
  var PROPS = {
    propA: Number,
    propB: [String, Number],
    propC: {
      type: String,
      required: true
    },
    propD: {
      type: Number,
      default: 100
    },
    propE: {
      type: Object,
      default: function() {
        return [1];
      }
    },
    propF: {validator: function(v) {
        return v > 10;
      }}
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.El.Hero.Sub = function($__super) {
    function $__0() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var hub = arguments[1] !== (void 0) ? arguments[1] : Oom.HUB;
      var $__17;
      $traceurRuntime.superConstructor($__0).call(this, config, hub);
      var api = this.api = {};
      Object.defineProperty(this, 'hub', {value: hub});
      this._validateConstructor(config);
      this.validConstructor.forEach(($__17 = this, function(valid) {
        var value = config[valid.name];
        Object.defineProperty($__17.api, valid.name, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }));
      if (Class === this.constructor)
        api.index = Class.api.tally++;
    }
    return ($traceurRuntime.createClass)($__0, {
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "Oom.Foo.El.Hero.Sub._validateConstructor(): ";
        if ('object' !== (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)))
          throw new Error(ME + ("config is type " + (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)) + " not object"));
        this.validConstructor.forEach(function(valid) {
          if (!TOOLKIT.applyDefault(valid, config))
            throw new TypeError(ME + ("config." + valid.name + " is mandatory"));
          value = config[valid.name];
          if (err = TOOLKIT.validateType(valid, value))
            throw new TypeError(ME + ("config." + valid.name + " " + err));
          if (err = TOOLKIT.validateRange(valid, value))
            throw new RangeError(ME + ("config." + valid.name + " " + err));
        });
      },
      get validConstructor() {
        return [{
          title: 'Third Prop',
          name: 'thirdProp',
          alias: 'tp',
          tooltip: 'An example object property, intended as a placeholder',
          devtip: 'You should replace this placeholder with a real property',
          form: 'text',
          type: String,
          default: 'Some default text'
        }];
      },
      xxx: function(config) {
        var $__18 = this,
            hub = $__18.hub,
            a = $__18.a,
            b = $__18.b,
            c = $__18.c;
        var $__19 = config,
            xx = $__19.xx,
            yy = $__19.yy,
            zz = $__19.zz;
      }
    }, {}, $__super);
  }(Oom.Foo.El.Hero);
  TOOLKIT.name(Class, 'Oom.Foo.El.Hero.Sub');
  Class.api = {tally: 0};
  Object.defineProperties(Class, TOOLKIT.toPropsObj(META));
  Object.defineProperties(Class.api, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.El.Hero.Sub.subFn',
    REMARKS: '@TODO'
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.El.Hero.Sub;
  var method = Class.prototype.subFn = function(abc) {
    var err,
        ME = "Oom.Foo.El.Hero.Sub.subFn(): ";
    if (!(this instanceof Class))
      throw new Error(ME + "Must not be called as Oom.Foo.El.Hero.Sub.prototype.subFn()");
    if (err = TOOLKIT.validateType({type: String}, abc))
      throw new TypeError(ME + ("abc " + err));
    this.subFn_calltally++;
    return abc + ' ok!';
  };
  Class.prototype.subFn_calltally = 0;
  Object.defineProperties(method, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.El.Hero.heroFn',
    REMARKS: '@TODO'
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.El.Hero;
  var method = Class.prototype.heroFn = function(abc) {
    var err,
        ME = "Oom.Foo.El.Hero.heroFn(): ";
    if (!(this instanceof Class))
      throw new Error(ME + "Must not be called as Oom.Foo.El.Hero.prototype.heroFn()");
    if (err = TOOLKIT.validateType({type: String}, abc))
      throw new TypeError(ME + ("abc " + err));
    this.heroFn_calltally++;
    return abc + ' ok!';
  };
  Class.prototype.heroFn_calltally = 0;
  Object.defineProperties(method, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.ElMix.FooBar',
    REMARKS: '@TODO'
  };
  var PROPS = {
    propA: Number,
    propB: [String, Number],
    propC: {
      type: String,
      required: true
    },
    propD: {
      type: Number,
      default: 100
    },
    propE: {
      type: Object,
      default: function() {
        return [1];
      }
    },
    propF: {validator: function(v) {
        return v > 10;
      }}
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.ElMix.FooBar = function($__super) {
    function $__0() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var hub = arguments[1] !== (void 0) ? arguments[1] : Oom.HUB;
      var $__17;
      $traceurRuntime.superConstructor($__0).call(this, config, hub);
      var api = this.api = {};
      Object.defineProperty(this, 'hub', {value: hub});
      this._validateConstructor(config);
      this.validConstructor.forEach(($__17 = this, function(valid) {
        var value = config[valid.name];
        Object.defineProperty($__17.api, valid.name, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }));
      if (Class === this.constructor)
        api.index = Class.api.tally++;
    }
    return ($traceurRuntime.createClass)($__0, {
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "Oom.Foo.ElMix.FooBar._validateConstructor(): ";
        if ('object' !== (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)))
          throw new Error(ME + ("config is type " + (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)) + " not object"));
        this.validConstructor.forEach(function(valid) {
          if (!TOOLKIT.applyDefault(valid, config))
            throw new TypeError(ME + ("config." + valid.name + " is mandatory"));
          value = config[valid.name];
          if (err = TOOLKIT.validateType(valid, value))
            throw new TypeError(ME + ("config." + valid.name + " " + err));
          if (err = TOOLKIT.validateRange(valid, value))
            throw new RangeError(ME + ("config." + valid.name + " " + err));
        });
      },
      get validConstructor() {
        return [{
          title: 'Third Prop',
          name: 'thirdProp',
          alias: 'tp',
          tooltip: 'An example object property, intended as a placeholder',
          devtip: 'You should replace this placeholder with a real property',
          form: 'text',
          type: String,
          default: 'Some default text'
        }];
      },
      xxx: function(config) {
        var $__18 = this,
            hub = $__18.hub,
            a = $__18.a,
            b = $__18.b,
            c = $__18.c;
        var $__19 = config,
            xx = $__19.xx,
            yy = $__19.yy,
            zz = $__19.zz;
      }
    }, {}, $__super);
  }(Oom.Foo.ElMix);
  TOOLKIT.name(Class, 'Oom.Foo.ElMix.FooBar');
  Class.api = {tally: 0};
  Object.defineProperties(Class, TOOLKIT.toPropsObj(META));
  Object.defineProperties(Class.api, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.ElMix.FooBar.Sub',
    REMARKS: '@TODO'
  };
  var PROPS = {
    propA: Number,
    propB: [String, Number],
    propC: {
      type: String,
      required: true
    },
    propD: {
      type: Number,
      default: 100
    },
    propE: {
      type: Object,
      default: function() {
        return [1];
      }
    },
    propF: {validator: function(v) {
        return v > 10;
      }}
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.ElMix.FooBar.Sub = function($__super) {
    function $__0() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var hub = arguments[1] !== (void 0) ? arguments[1] : Oom.HUB;
      var $__17;
      $traceurRuntime.superConstructor($__0).call(this, config, hub);
      var api = this.api = {};
      Object.defineProperty(this, 'hub', {value: hub});
      this._validateConstructor(config);
      this.validConstructor.forEach(($__17 = this, function(valid) {
        var value = config[valid.name];
        Object.defineProperty($__17.api, valid.name, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }));
      if (Class === this.constructor)
        api.index = Class.api.tally++;
    }
    return ($traceurRuntime.createClass)($__0, {
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "Oom.Foo.ElMix.FooBar.Sub._validateConstructor(): ";
        if ('object' !== (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)))
          throw new Error(ME + ("config is type " + (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)) + " not object"));
        this.validConstructor.forEach(function(valid) {
          if (!TOOLKIT.applyDefault(valid, config))
            throw new TypeError(ME + ("config." + valid.name + " is mandatory"));
          value = config[valid.name];
          if (err = TOOLKIT.validateType(valid, value))
            throw new TypeError(ME + ("config." + valid.name + " " + err));
          if (err = TOOLKIT.validateRange(valid, value))
            throw new RangeError(ME + ("config." + valid.name + " " + err));
        });
      },
      get validConstructor() {
        return [{
          title: 'Third Prop',
          name: 'thirdProp',
          alias: 'tp',
          tooltip: 'An example object property, intended as a placeholder',
          devtip: 'You should replace this placeholder with a real property',
          form: 'text',
          type: String,
          default: 'Some default text'
        }];
      },
      xxx: function(config) {
        var $__18 = this,
            hub = $__18.hub,
            a = $__18.a,
            b = $__18.b,
            c = $__18.c;
        var $__19 = config,
            xx = $__19.xx,
            yy = $__19.yy,
            zz = $__19.zz;
      }
    }, {}, $__super);
  }(Oom.Foo.ElMix.FooBar);
  TOOLKIT.name(Class, 'Oom.Foo.ElMix.FooBar.Sub');
  Class.api = {tally: 0};
  Object.defineProperties(Class, TOOLKIT.toPropsObj(META));
  Object.defineProperties(Class.api, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.ElMix.FooBar.Sub.subFn',
    REMARKS: '@TODO'
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.ElMix.FooBar.Sub;
  var method = Class.prototype.subFn = function(abc) {
    var err,
        ME = "Oom.Foo.ElMix.FooBar.Sub.subFn(): ";
    if (!(this instanceof Class))
      throw new Error(ME + "Must not be called as Oom.Foo.ElMix.FooBar.Sub.prototype.subFn()");
    if (err = TOOLKIT.validateType({type: String}, abc))
      throw new TypeError(ME + ("abc " + err));
    this.subFn_calltally++;
    return abc + ' ok!';
  };
  Class.prototype.subFn_calltally = 0;
  Object.defineProperties(method, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.ElMix.FooBar.fbFn',
    REMARKS: '@TODO'
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.ElMix.FooBar;
  var method = Class.prototype.fbFn = function(abc) {
    var err,
        ME = "Oom.Foo.ElMix.FooBar.fbFn(): ";
    if (!(this instanceof Class))
      throw new Error(ME + "Must not be called as Oom.Foo.ElMix.FooBar.prototype.fbFn()");
    if (err = TOOLKIT.validateType({type: String}, abc))
      throw new TypeError(ME + ("abc " + err));
    this.fbFn_calltally++;
    return abc + ' ok!';
  };
  Class.prototype.fbFn_calltally = 0;
  Object.defineProperties(method, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.Mix.Red',
    REMARKS: '@TODO'
  };
  var PROPS = {
    propA: Number,
    propB: [String, Number],
    propC: {
      type: String,
      required: true
    },
    propD: {
      type: Number,
      default: 100
    },
    propE: {
      type: Object,
      default: function() {
        return [1];
      }
    },
    propF: {validator: function(v) {
        return v > 10;
      }}
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.Mix.Red = function($__super) {
    function $__0() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var hub = arguments[1] !== (void 0) ? arguments[1] : Oom.HUB;
      var $__17;
      $traceurRuntime.superConstructor($__0).call(this, config, hub);
      var api = this.api = {};
      Object.defineProperty(this, 'hub', {value: hub});
      this._validateConstructor(config);
      this.validConstructor.forEach(($__17 = this, function(valid) {
        var value = config[valid.name];
        Object.defineProperty($__17.api, valid.name, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }));
      if (Class === this.constructor)
        api.index = Class.api.tally++;
    }
    return ($traceurRuntime.createClass)($__0, {
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "Oom.Foo.Mix.Red._validateConstructor(): ";
        if ('object' !== (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)))
          throw new Error(ME + ("config is type " + (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)) + " not object"));
        this.validConstructor.forEach(function(valid) {
          if (!TOOLKIT.applyDefault(valid, config))
            throw new TypeError(ME + ("config." + valid.name + " is mandatory"));
          value = config[valid.name];
          if (err = TOOLKIT.validateType(valid, value))
            throw new TypeError(ME + ("config." + valid.name + " " + err));
          if (err = TOOLKIT.validateRange(valid, value))
            throw new RangeError(ME + ("config." + valid.name + " " + err));
        });
      },
      get validConstructor() {
        return [{
          title: 'Third Prop',
          name: 'thirdProp',
          alias: 'tp',
          tooltip: 'An example object property, intended as a placeholder',
          devtip: 'You should replace this placeholder with a real property',
          form: 'text',
          type: String,
          default: 'Some default text'
        }];
      },
      xxx: function(config) {
        var $__18 = this,
            hub = $__18.hub,
            a = $__18.a,
            b = $__18.b,
            c = $__18.c;
        var $__19 = config,
            xx = $__19.xx,
            yy = $__19.yy,
            zz = $__19.zz;
      }
    }, {}, $__super);
  }(Oom.Foo.Mix);
  TOOLKIT.name(Class, 'Oom.Foo.Mix.Red');
  Class.api = {tally: 0};
  Object.defineProperties(Class, TOOLKIT.toPropsObj(META));
  Object.defineProperties(Class.api, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.Mix.Red.Sub',
    REMARKS: '@TODO'
  };
  var PROPS = {
    propA: Number,
    propB: [String, Number],
    propC: {
      type: String,
      required: true
    },
    propD: {
      type: Number,
      default: 100
    },
    propE: {
      type: Object,
      default: function() {
        return [1];
      }
    },
    propF: {validator: function(v) {
        return v > 10;
      }}
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.Mix.Red.Sub = function($__super) {
    function $__0() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var hub = arguments[1] !== (void 0) ? arguments[1] : Oom.HUB;
      var $__17;
      $traceurRuntime.superConstructor($__0).call(this, config, hub);
      var api = this.api = {};
      Object.defineProperty(this, 'hub', {value: hub});
      this._validateConstructor(config);
      this.validConstructor.forEach(($__17 = this, function(valid) {
        var value = config[valid.name];
        Object.defineProperty($__17.api, valid.name, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }));
      if (Class === this.constructor)
        api.index = Class.api.tally++;
    }
    return ($traceurRuntime.createClass)($__0, {
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "Oom.Foo.Mix.Red.Sub._validateConstructor(): ";
        if ('object' !== (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)))
          throw new Error(ME + ("config is type " + (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)) + " not object"));
        this.validConstructor.forEach(function(valid) {
          if (!TOOLKIT.applyDefault(valid, config))
            throw new TypeError(ME + ("config." + valid.name + " is mandatory"));
          value = config[valid.name];
          if (err = TOOLKIT.validateType(valid, value))
            throw new TypeError(ME + ("config." + valid.name + " " + err));
          if (err = TOOLKIT.validateRange(valid, value))
            throw new RangeError(ME + ("config." + valid.name + " " + err));
        });
      },
      get validConstructor() {
        return [{
          title: 'Third Prop',
          name: 'thirdProp',
          alias: 'tp',
          tooltip: 'An example object property, intended as a placeholder',
          devtip: 'You should replace this placeholder with a real property',
          form: 'text',
          type: String,
          default: 'Some default text'
        }];
      },
      xxx: function(config) {
        var $__18 = this,
            hub = $__18.hub,
            a = $__18.a,
            b = $__18.b,
            c = $__18.c;
        var $__19 = config,
            xx = $__19.xx,
            yy = $__19.yy,
            zz = $__19.zz;
      }
    }, {}, $__super);
  }(Oom.Foo.Mix.Red);
  TOOLKIT.name(Class, 'Oom.Foo.Mix.Red.Sub');
  Class.api = {tally: 0};
  Object.defineProperties(Class, TOOLKIT.toPropsObj(META));
  Object.defineProperties(Class.api, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.Mix.Red.Sub.subFn',
    REMARKS: '@TODO'
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.Mix.Red.Sub;
  var method = Class.prototype.subFn = function(abc) {
    var err,
        ME = "Oom.Foo.Mix.Red.Sub.subFn(): ";
    if (!(this instanceof Class))
      throw new Error(ME + "Must not be called as Oom.Foo.Mix.Red.Sub.prototype.subFn()");
    if (err = TOOLKIT.validateType({type: String}, abc))
      throw new TypeError(ME + ("abc " + err));
    this.subFn_calltally++;
    return abc + ' ok!';
  };
  Class.prototype.subFn_calltally = 0;
  Object.defineProperties(method, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.Mix.Red.redFn',
    REMARKS: '@TODO'
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.Mix.Red;
  var method = Class.prototype.redFn = function(abc) {
    var err,
        ME = "Oom.Foo.Mix.Red.redFn(): ";
    if (!(this instanceof Class))
      throw new Error(ME + "Must not be called as Oom.Foo.Mix.Red.prototype.redFn()");
    if (err = TOOLKIT.validateType({type: String}, abc))
      throw new TypeError(ME + ("abc " + err));
    this.redFn_calltally++;
    return abc + ' ok!';
  };
  Class.prototype.redFn_calltally = 0;
  Object.defineProperties(method, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.Plain',
    REMARKS: '@TODO'
  };
  var PROPS = {
    propA: Number,
    propB: [String, Number],
    propC: {
      type: String,
      required: true
    },
    propD: {
      type: Number,
      default: 100
    },
    propE: {
      type: Object,
      default: function() {
        return [1];
      }
    },
    propF: {validator: function(v) {
        return v > 10;
      }}
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.Plain = function($__super) {
    function $__0() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var hub = arguments[1] !== (void 0) ? arguments[1] : Oom.HUB;
      var $__17;
      $traceurRuntime.superConstructor($__0).call(this, config, hub);
      var api = this.api = {};
      Object.defineProperty(api, 'UUID', {
        enumerable: true,
        configurable: false,
        value: '123456'.replace(/./g, function(c) {
          return TOOLKIT.rndCh(48, 122);
        }).replace(/[:-@\[-`]/g, function(c) {
          return TOOLKIT.rndCh(97, 122);
        })
      });
      Object.defineProperty(this, 'hub', {value: hub});
      this._validateConstructor(config);
      this.validConstructor.forEach(($__17 = this, function(valid) {
        var value = config[valid.name];
        Object.defineProperty($__17.api, valid.name, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }));
      Object.defineProperty(this, 'ready', {value: this._getReady()});
      if (Class === this.constructor)
        api.index = Class.api.tally++;
    }
    return ($traceurRuntime.createClass)($__0, {
      _getReady: function() {
        var $__17 = this;
        if (this.setupStart)
          throw new Error("Oom.Foo.Plain._getReady(): Can only run once");
        Object.defineProperty(this, 'setupStart', {value: TOOLKIT.getNow()});
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            Object.defineProperty($__17, 'setupEnd', {value: TOOLKIT.getNow()});
            resolve({setupDelay: $__17.setupEnd - $__17.setupStart});
          }, 0);
        });
      },
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "Oom.Foo.Plain._validateConstructor(): ";
        if ('object' !== (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)))
          throw new Error(ME + ("config is type " + (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)) + " not object"));
        this.validConstructor.forEach(function(valid) {
          if (!TOOLKIT.applyDefault(valid, config))
            throw new TypeError(ME + ("config." + valid.name + " is mandatory"));
          value = config[valid.name];
          if (err = TOOLKIT.validateType(valid, value))
            throw new TypeError(ME + ("config." + valid.name + " " + err));
          if (err = TOOLKIT.validateRange(valid, value))
            throw new RangeError(ME + ("config." + valid.name + " " + err));
        });
      },
      get validConstructor() {
        return [{
          title: 'Third Prop',
          name: 'thirdProp',
          alias: 'tp',
          tooltip: 'An example object property, intended as a placeholder',
          devtip: 'You should replace this placeholder with a real property',
          form: 'text',
          type: String,
          default: 'Some default text'
        }];
      },
      xxx: function(config) {
        var $__18 = this,
            hub = $__18.hub,
            a = $__18.a,
            b = $__18.b,
            c = $__18.c;
        var $__19 = config,
            xx = $__19.xx,
            yy = $__19.yy,
            zz = $__19.zz;
      }
    }, {}, $__super);
  }(Oom.Foo);
  TOOLKIT.name(Class, 'Oom.Foo.Plain');
  Class.api = {tally: 0};
  Object.defineProperties(Class, TOOLKIT.toPropsObj(META));
  Object.defineProperties(Class.api, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.Plain.Sub',
    REMARKS: '@TODO'
  };
  var PROPS = {
    propA: Number,
    propB: [String, Number],
    propC: {
      type: String,
      required: true
    },
    propD: {
      type: Number,
      default: 100
    },
    propE: {
      type: Object,
      default: function() {
        return [1];
      }
    },
    propF: {validator: function(v) {
        return v > 10;
      }}
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.Plain.Sub = function($__super) {
    function $__0() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var hub = arguments[1] !== (void 0) ? arguments[1] : Oom.HUB;
      var $__17;
      $traceurRuntime.superConstructor($__0).call(this, config, hub);
      var api = this.api = {};
      Object.defineProperty(this, 'hub', {value: hub});
      this._validateConstructor(config);
      this.validConstructor.forEach(($__17 = this, function(valid) {
        var value = config[valid.name];
        Object.defineProperty($__17.api, valid.name, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }));
      if (Class === this.constructor)
        api.index = Class.api.tally++;
    }
    return ($traceurRuntime.createClass)($__0, {
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "Oom.Foo.Plain.Sub._validateConstructor(): ";
        if ('object' !== (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)))
          throw new Error(ME + ("config is type " + (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)) + " not object"));
        this.validConstructor.forEach(function(valid) {
          if (!TOOLKIT.applyDefault(valid, config))
            throw new TypeError(ME + ("config." + valid.name + " is mandatory"));
          value = config[valid.name];
          if (err = TOOLKIT.validateType(valid, value))
            throw new TypeError(ME + ("config." + valid.name + " " + err));
          if (err = TOOLKIT.validateRange(valid, value))
            throw new RangeError(ME + ("config." + valid.name + " " + err));
        });
      },
      get validConstructor() {
        return [{
          title: 'Third Prop',
          name: 'thirdProp',
          alias: 'tp',
          tooltip: 'An example object property, intended as a placeholder',
          devtip: 'You should replace this placeholder with a real property',
          form: 'text',
          type: String,
          default: 'Some default text'
        }];
      },
      xxx: function(config) {
        var $__18 = this,
            hub = $__18.hub,
            a = $__18.a,
            b = $__18.b,
            c = $__18.c;
        var $__19 = config,
            xx = $__19.xx,
            yy = $__19.yy,
            zz = $__19.zz;
      }
    }, {}, $__super);
  }(Oom.Foo.Plain);
  TOOLKIT.name(Class, 'Oom.Foo.Plain.Sub');
  Class.api = {tally: 0};
  Object.defineProperties(Class, TOOLKIT.toPropsObj(META));
  Object.defineProperties(Class.api, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.Plain.Sub.subFn',
    REMARKS: '@TODO'
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.Plain.Sub;
  var method = Class.prototype.subFn = function(abc) {
    var err,
        ME = "Oom.Foo.Plain.Sub.subFn(): ";
    if (!(this instanceof Class))
      throw new Error(ME + "Must not be called as Oom.Foo.Plain.Sub.prototype.subFn()");
    if (err = TOOLKIT.validateType({type: String}, abc))
      throw new TypeError(ME + ("abc " + err));
    this.subFn_calltally++;
    return abc + ' ok!';
  };
  Class.prototype.subFn_calltally = 0;
  Object.defineProperties(method, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.Plain.plnFn',
    REMARKS: '@TODO'
  };
  var Oom = ROOT.Oom;
  var TOOLKIT = Oom.TOOLKIT;
  var Class = Oom.Foo.Plain;
  var method = Class.prototype.plnFn = function(abc) {
    var err,
        ME = "Oom.Foo.Plain.plnFn(): ";
    if (!(this instanceof Class))
      throw new Error(ME + "Must not be called as Oom.Foo.Plain.prototype.plnFn()");
    if (err = TOOLKIT.validateType({type: String}, abc))
      throw new TypeError(ME + ("abc " + err));
    this.plnFn_calltally++;
    return abc + ' ok!';
  };
  Class.prototype.plnFn_calltally = 0;
  Object.defineProperties(method, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.2.1 //\\//\\ http://oomtility.loop.coop //////////
