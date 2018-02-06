//// OomFoo //// 1.1.5 //// February 2018 //// http://oom-foo.loop.coop/ ///////

"use strict";
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'OomFoo',
    VERSION: '1.1.5',
    HOMEPAGE: 'http://oom-foo.loop.coop/',
    REMARKS: 'Initial test of the oom-hub architecture'
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
  var OOM = ROOT.OOM = ROOT.OOM || {};
  var TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {};
  var Class = OOM.OomFoo = function() {
    function OomFoo() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var hub = arguments[1] !== (void 0) ? arguments[1] : OOM.hub;
      var $__2 = this;
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
      this.validConstructor.forEach(function(valid) {
        var value = config[valid.name];
        Object.defineProperty($__2.api, valid.name, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      });
      Object.defineProperty(this, 'ready', {value: this._getReady()});
      if (Class === this.constructor)
        api.index = Class.api.tally++;
    }
    return ($traceurRuntime.createClass)(OomFoo, {
      _getReady: function() {
        var $__2 = this;
        if (this.setupStart)
          throw new Error("OomFoo._getReady(): Can only run once");
        Object.defineProperty(this, 'setupStart', {value: TOOLKIT.getNow()});
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            Object.defineProperty($__2, 'setupEnd', {value: TOOLKIT.getNow()});
            resolve({setupDelay: $__2.setupEnd - $__2.setupStart});
          }, 0);
        });
      },
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "OomFoo._validateConstructor(): ";
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
          title: 'First Prop',
          name: 'firstProp',
          alias: 'fp',
          tooltip: 'An example numeric property, intended as a placeholder',
          devtip: 'You should replace this placeholder with a real property',
          form: 'range',
          power: 1,
          suffix: 'Units',
          type: Number,
          min: 1,
          max: 100,
          step: 1,
          default: 50
        }, {
          title: 'Second Prop',
          name: 'secondProp',
          alias: 'sp',
          tooltip: 'An example object property, intended as a placeholder',
          devtip: 'You should replace this placeholder with a real property',
          form: 'hidden',
          type: Date
        }];
      },
      xxx: function(config) {
        var $__3 = this,
            hub = $__3.hub,
            a = $__3.a,
            b = $__3.b,
            c = $__3.c;
        var $__4 = config,
            xx = $__4.xx,
            yy = $__4.yy,
            zz = $__4.zz;
      }
    }, {});
  }();
  TOOLKIT.rndCh = TOOLKIT.rndCh || (function(s, e) {
    return String.fromCharCode(Math.random() * (e - s) + s);
  });
  TOOLKIT.applyDefault = TOOLKIT.applyDefault || (function(valid, config) {
    if (config.hasOwnProperty(valid.name))
      return true;
    if (!valid.hasOwnProperty('default'))
      return false;
    config[valid.name] = 'function' === typeof valid.default ? valid.default(config) : valid.default;
    return true;
  });
  TOOLKIT.validateType = TOOLKIT.validateType || (function(valid, value) {
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
  });
  TOOLKIT.validateRange = TOOLKIT.validateRange || (function(valid, value) {
    if (null != valid.min && valid.min > value)
      return ("is less than the minimum " + valid.min);
    if (null != valid.max && valid.max < value)
      return ("is greater than the maximum " + valid.max);
    if (null != valid.step && ((value / valid.step) % 1))
      return (value + " ÷ " + valid.step + " leaves " + (value / valid.step) % 1);
  });
  TOOLKIT.getNow = TOOLKIT.getNow || (function() {
    var now;
    if ('object' === $traceurRuntime.typeof(ROOT.process) && 'function' === typeof ROOT.process.hrtime) {
      var hrtime = ROOT.process.hrtime();
      now = ((hrtime[0] * 1e9) + hrtime[1]) / 1e6;
    } else {
      now = ROOT.performance.now();
    }
    return now;
  });
  TOOLKIT.toPropsObj = TOOLKIT.toPropsObj || (function(src) {
    var obj = {};
    for (var k in src)
      obj[k] = {
        value: src[k],
        enumerable: true
      };
    return obj;
  });
  Class.api = {tally: 0};
  Object.defineProperties(Class, TOOLKIT.toPropsObj(META));
  Object.defineProperties(Class.api, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: {value: 'OomFoo.appfn'},
    REMARKS: {value: '@TODO'}
  };
  var OOM = ROOT.OOM = ROOT.OOM || {};
  var TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {};
  var method = OOM.OomFoo.prototype.appfn = function(abc) {
    var err,
        ME = "OomFoo.appfn(): ";
    if (!(this instanceof OOM.OomFoo))
      throw new Error(ME + "Must not be called as OomFoo.prototype.appfn()");
    if (err = TOOLKIT.validateType({type: String}, abc))
      throw new TypeError(ME + ("abc " + err));
    this.xyz++;
    return abc + ' ok!';
  };
  OOM.OomFoo.prototype.xyz = 0;
  Object.defineProperties(method, META);
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'OomFoo.Base',
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
  var OOM = ROOT.OOM = ROOT.OOM || {};
  var TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {};
  var Class = OOM.OomFoo.Base = function() {
    function Base() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var hub = arguments[1] !== (void 0) ? arguments[1] : OOM.hub;
      var $__2 = this;
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
      this.validConstructor.forEach(function(valid) {
        var value = config[valid.name];
        Object.defineProperty($__2.api, valid.name, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      });
      Object.defineProperty(this, 'ready', {value: this._getReady()});
      if (Class === this.constructor)
        api.index = Class.api.tally++;
    }
    return ($traceurRuntime.createClass)(Base, {
      _getReady: function() {
        var $__2 = this;
        if (this.setupStart)
          throw new Error("OomFoo.Base._getReady(): Can only run once");
        Object.defineProperty(this, 'setupStart', {value: TOOLKIT.getNow()});
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            Object.defineProperty($__2, 'setupEnd', {value: TOOLKIT.getNow()});
            resolve({setupDelay: $__2.setupEnd - $__2.setupStart});
          }, 0);
        });
      },
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "OomFoo.Base._validateConstructor(): ";
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
        var $__3 = this,
            hub = $__3.hub,
            a = $__3.a,
            b = $__3.b,
            c = $__3.c;
        var $__4 = config,
            xx = $__4.xx,
            yy = $__4.yy,
            zz = $__4.zz;
      }
    }, {});
  }();
  Class.api = {tally: 0};
  Object.defineProperties(Class, TOOLKIT.toPropsObj(META));
  Object.defineProperties(Class.api, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'OomFoo.Base.Sub',
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
  var OOM = ROOT.OOM = ROOT.OOM || {};
  var TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {};
  var Class = OOM.OomFoo.Base.Sub = function($__super) {
    function Sub() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var hub = arguments[1] !== (void 0) ? arguments[1] : OOM.hub;
      var $__2;
      $traceurRuntime.superConstructor(Sub).call(this, config, hub);
      var api = this.api = {};
      Object.defineProperty(this, 'hub', {value: hub});
      this._validateConstructor(config);
      this.validConstructor.forEach(($__2 = this, function(valid) {
        var value = config[valid.name];
        Object.defineProperty($__2.api, valid.name, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }));
      if (Class === this.constructor)
        api.index = Class.api.tally++;
    }
    return ($traceurRuntime.createClass)(Sub, {
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "OomFoo.Base.Sub._validateConstructor(): ";
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
        var $__3 = this,
            hub = $__3.hub,
            a = $__3.a,
            b = $__3.b,
            c = $__3.c;
        var $__4 = config,
            xx = $__4.xx,
            yy = $__4.yy,
            zz = $__4.zz;
      }
    }, {}, $__super);
  }(OOM.OomFoo.Base);
  Class.api = {tally: 0};
  Object.defineProperties(Class, TOOLKIT.toPropsObj(META));
  Object.defineProperties(Class.api, TOOLKIT.toPropsObj(META));
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: {value: 'OomFoo.Base.Sub.subfn'},
    REMARKS: {value: '@TODO'}
  };
  var OOM = ROOT.OOM = ROOT.OOM || {};
  var TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {};
  var method = OOM.OomFoo.Base.Sub.prototype.subfn = function(abc) {
    var err,
        ME = "OomFoo.Base.Sub.subfn(): ";
    if (!(this instanceof OOM.OomFoo.Base.Sub))
      throw new Error(ME + "Must not be called as OomFoo.Base.Sub.prototype.subfn()");
    if (err = TOOLKIT.validateType({type: String}, abc))
      throw new TypeError(ME + ("abc " + err));
    this.xyz++;
    return abc + ' ok!';
  };
  OOM.OomFoo.Base.Sub.prototype.xyz = 0;
  Object.defineProperties(method, META);
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: {value: 'OomFoo.Base.basefn'},
    REMARKS: {value: '@TODO'}
  };
  var OOM = ROOT.OOM = ROOT.OOM || {};
  var TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {};
  var method = OOM.OomFoo.Base.prototype.basefn = function(abc) {
    var err,
        ME = "OomFoo.Base.basefn(): ";
    if (!(this instanceof OOM.OomFoo.Base))
      throw new Error(ME + "Must not be called as OomFoo.Base.prototype.basefn()");
    if (err = TOOLKIT.validateType({type: String}, abc))
      throw new TypeError(ME + ("abc " + err));
    this.xyz++;
    return abc + ' ok!';
  };
  OOM.OomFoo.Base.prototype.xyz = 0;
  Object.defineProperties(method, META);
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.1.5 //\\//\\ http://oomtility.loop.coop //////////
