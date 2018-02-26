//// Oom.Foo //// 1.2.10 //// February 2018 //// http://oom-foo.loop.coop/ /////

"use strict";
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo',
    VERSION: '1.2.10',
    HOMEPAGE: 'http://oom-foo.loop.coop/',
    REMARKS: 'Initial test of the oom-hub architecture',
    LOADED_FIRST: !ROOT.Oom
  };
  var KIT = assignKIT(META.LOADED_FIRST || !ROOT.Oom.KIT ? {} : ROOT.Oom.KIT);
  var Oom = ROOT.Oom = META.LOADED_FIRST ? function() {
    function Oom() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var attr = this.attr = {};
      KIT.define(attr, {UUID: KIT.generateUUID()});
      if (Oom === this.constructor) {
        KIT.define(attr, {INST_INDEX: Oom.stat.inst_tally});
        Oom.stat._inst_tally++;
      }
    }
    return ($traceurRuntime.createClass)(Oom, {}, {});
  }() : ROOT.Oom;
  KIT.name(Oom, 'Oom');
  if (META.LOADED_FIRST) {
    Oom.stat = {};
    KIT.define(Oom.stat, {
      NAME: 'Oom',
      VERSION: META.VERSION,
      HOMEPAGE: 'http://oom.loop.coop/',
      REMARKS: 'Base class for all Oom classes'
    }, {inst_tally: 0}, {color: '#112233'});
  }
  Object.defineProperty(Oom, 'memberTableVueTemplate', {get: function() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var innerHTML = arguments[1];
      return innerHTML = "\n<div class=\"col-12 member-table\">\n  <table v-bind:class=\"{ hid:doHide }\">\n    <caption v-html=\"caption\"></caption>\n    <tr v-for=\"val, key in obj\" v-bind:class=\"'Oom-'+key\">\n      <td class=\"key\">{{key}}</td>\n      <td class=\"val\">\n        <input v-if=\"isReadWrite(key)\"    class=\"read-write\" v-model=\"obj[key]\">\n        <span v-else-if=\"isReadOnly(key)\" class=\"read-only\">{{val}}</span>\n        <span v-else-if=\"isConstant(key)\" class=\"constant\">{{val}}</span>\n        <span v-else                      class=\"private\">{{val}}</span>\n      </td>\n    </tr>\n  </table>\n</div>\n";
    }});
  Object.defineProperty(Oom, 'devMainVueTemplate', {get: function() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      var innerHTML = arguments[1];
      return innerHTML = "\n<member-table :obj=\"stat\" :do-hide=\"ui.hideData\"\n  :caption=\"stat.NAME+' static members:'\"></member-table>\n";
    }});
  Oom.devMainVue = {
    template: Oom.devMainVueTemplate,
    data: function() {
      return {
        stat: Oom.stat,
        ui: {
          hideData: false,
          hideInners: false
        }
      };
    },
    beforeCreate: function() {
      var $__4 = KIT,
          isReadWrite = $__4.isReadWrite,
          isReadOnly = $__4.isReadOnly,
          isConstant = $__4.isConstant;
      Vue.component('member-table', {
        template: Oom.memberTableVueTemplate,
        props: {
          doHide: Boolean,
          caption: String,
          obj: Object
        },
        methods: {
          isReadWrite: isReadWrite,
          isReadOnly: isReadOnly,
          isConstant: isConstant
        }
      });
    },
    created: function() {
      KIT.wrapReadOnly(ROOT.Oom.stat);
    }
  };
  Oom.KIT = KIT;
  Oom.Foo = function($__super) {
    function $__1() {
      $traceurRuntime.superConstructor($__1).apply(this, arguments);
    }
    return ($traceurRuntime.createClass)($__1, {}, {}, $__super);
  }(Oom);
  KIT.name(Oom.Foo, 'Oom.Foo');
  Oom.Foo.stat = {};
  KIT.define(Oom.Foo.stat, META, {instTally: 0});
  function assignKIT() {
    var previousKIT = arguments[0] !== (void 0) ? arguments[0] : {};
    return Object.assign({}, {
      generateUUID: function() {
        var rndCh = function(s, e) {
          return String.fromCharCode(Math.random() * (e - s) + s);
        };
        return 'x'.repeat(6).replace(/./g, function(c) {
          return rndCh(48, 122);
        }).replace(/[:-@\\[-\`]/g, function(c) {
          return rndCh(97, 122);
        });
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
        var ME = 'KIT.validateType: ',
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
      define: function(obj) {
        for (var srcs = [],
            $__3 = 1; $__3 < arguments.length; $__3++)
          srcs[$__3 - 1] = arguments[$__3];
        return srcs.forEach(function(src) {
          var ME = 'KIT.define: ',
              def = {};
          var $__6 = function(k) {
            if (KIT.isReadOnly(k)) {
              def['_' + k] = {
                writable: true,
                value: src[k],
                configurable: true,
                enumerable: true
              };
              def[k] = {
                get: function() {
                  return obj['_' + k];
                },
                set: function(v) {},
                configurable: true,
                enumerable: true
              };
            } else if (KIT.isReadWrite(k)) {
              def[k] = {
                writable: true,
                value: src[k],
                configurable: true,
                enumerable: true
              };
            } else if (KIT.isConstant(k)) {
              def[k] = {
                writable: false,
                value: src[k],
                configurable: false,
                enumerable: true
              };
            } else {
              throw Error(ME + k + ' is an invalid property name');
            }
          };
          for (var k in src) {
            $__6(k);
          }
          Object.defineProperties(obj, def);
        });
      },
      name: function(obj, value) {
        return Object.defineProperty(obj, 'name', {
          value: value,
          configurable: false
        });
      },
      wrapReadOnly: function(obj) {},
      isReadOnly: function(k) {
        return -1 !== k.indexOf('_') && /^[a-z][_a-z0-9]+$/.test(k);
      },
      isReadWrite: function(k) {
        return /^[a-z][A-Za-z0-9]*$/.test(k);
      },
      isConstant: function(k) {
        return /^[A-Z][_A-Z0-9]*$/.test(k);
      }
    }, previousKIT);
  }
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.Post',
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
  var KIT = Oom.KIT;
  var Class = Oom.Foo.Post = function($__super) {
    function $__0() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      $traceurRuntime.superConstructor($__0).call(this, config);
      this._validateConstructor(config);
    }
    return ($traceurRuntime.createClass)($__0, {
      _getReady: function() {
        var $__2 = this;
        if (this.setupStart)
          throw new Error("Oom.Foo.Post._getReady(): Can only run once");
        Object.defineProperty(this, 'setupStart', {value: KIT.getNow()});
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            Object.defineProperty($__2, 'setupEnd', {value: KIT.getNow()});
            resolve({setupDelay: $__2.setupEnd - $__2.setupStart});
          }, 0);
        });
      },
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "Oom.Foo.Post._validateConstructor(): ";
        if ('object' !== (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)))
          throw new Error(ME + ("config is type " + (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)) + " not object"));
        this.validConstructor.forEach(function(valid) {
          if (!KIT.applyDefault(valid, config))
            throw new TypeError(ME + ("config." + valid.name + " is mandatory"));
          value = config[valid.name];
          if (err = KIT.validateType(valid, value))
            throw new TypeError(ME + ("config." + valid.name + " " + err));
          if (err = KIT.validateRange(valid, value))
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
        var $__4 = this,
            hub = $__4.hub,
            a = $__4.a,
            b = $__4.b,
            c = $__4.c;
        var $__5 = config,
            xx = $__5.xx,
            yy = $__5.yy,
            zz = $__5.zz;
      }
    }, {}, $__super);
  }(Oom.Foo);
  KIT.name(Class, 'Oom.Foo.Post');
  Oom.Foo.Post.stat = {};
  KIT.define(Oom.Foo.Post.stat, META, {insts: 0});
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo.Router',
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
  var KIT = Oom.KIT;
  var Class = Oom.Foo.Router = function($__super) {
    function $__0() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      $traceurRuntime.superConstructor($__0).call(this, config);
      this._validateConstructor(config);
    }
    return ($traceurRuntime.createClass)($__0, {
      _getReady: function() {
        var $__2 = this;
        if (this.setupStart)
          throw new Error("Oom.Foo.Router._getReady(): Can only run once");
        Object.defineProperty(this, 'setupStart', {value: KIT.getNow()});
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            Object.defineProperty($__2, 'setupEnd', {value: KIT.getNow()});
            resolve({setupDelay: $__2.setupEnd - $__2.setupStart});
          }, 0);
        });
      },
      _validateConstructor: function(config) {
        var err,
            value,
            ME = "Oom.Foo.Router._validateConstructor(): ";
        if ('object' !== (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)))
          throw new Error(ME + ("config is type " + (typeof config === 'undefined' ? 'undefined' : $traceurRuntime.typeof(config)) + " not object"));
        this.validConstructor.forEach(function(valid) {
          if (!KIT.applyDefault(valid, config))
            throw new TypeError(ME + ("config." + valid.name + " is mandatory"));
          value = config[valid.name];
          if (err = KIT.validateType(valid, value))
            throw new TypeError(ME + ("config." + valid.name + " " + err));
          if (err = KIT.validateRange(valid, value))
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
        var $__4 = this,
            hub = $__4.hub,
            a = $__4.a,
            b = $__4.b,
            c = $__4.c;
        var $__5 = config,
            xx = $__5.xx,
            yy = $__5.yy,
            zz = $__5.zz;
      }
    }, {}, $__super);
  }(Oom.Foo);
  KIT.name(Class, 'Oom.Foo.Router');
  Oom.Foo.Router.stat = {};
  KIT.define(Oom.Foo.Router.stat, META, {insts: 0});
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.2.10 //\\//\\ http://oomtility.loop.coop /////////
