//// Oom.Foo //// 1.2.11 //// February 2018 //// http://oom-foo.loop.coop/ /////

"use strict";
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo',
    VERSION: '1.2.11',
    HOMEPAGE: 'http://oom-foo.loop.coop/',
    REMARKS: 'Initial test of the oom-hub architecture',
    LOADED_FIRST: !ROOT.Oom
  };
  var KIT = assignKIT(META.LOADED_FIRST || !ROOT.Oom.KIT ? {} : ROOT.Oom.KIT);
  var Oom = ROOT.Oom = META.LOADED_FIRST ? function() {
    function Oom() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
    }
    return ($traceurRuntime.createClass)(Oom, {}, {get schema() {
        return Oom._norm_schema = Oom._norm_schema || KIT.normaliseSchema({
          stat: {
            NAME: 'Oom',
            VERSION: META.VERSION,
            HOMEPAGE: 'http://oom.loop.coop/',
            REMARKS: 'Base class for all Oom classes',
            bar_baz: {
              remarks: 'Test read-only static',
              default: 'initial value'
            },
            hilite: {
              remarks: 'General purpose, useful as a dev label or status',
              default: '#112233',
              type: 'color'
            }
          },
          attr: {
            FOO_BAR: 8080,
            foo_bar: 10000,
            hilite: {
              remarks: 'General purpose, useful as a dev label or status',
              default: '#445566',
              type: 'color'
            },
            fooBar: {
              default: 1000,
              type: 'number'
            }
          }
        });
      }});
  }() : ROOT.Oom;
  KIT.name(Oom, 'Oom');
  if (META.LOADED_FIRST) {
    Oom.stat = {};
    KIT.define(Oom.stat, Oom.schema.stat);
    Oom.prototype.attr = {};
    KIT.define(Oom.prototype.attr, Oom.schema.attr);
  }
  Object.defineProperty(Oom, 'memberTableVueTemplate', {get: function(innerHTML) {
      return innerHTML = "\n<div :class=\"'member-table '+objname\">\n  <table :class=\"{ hid:doHide }\">\n    <caption v-html=\"caption\"></caption>\n    <tr v-for=\"val, key in obj\" v-bind:class=\"'Oom-'+key\">\n      <td class=\"key\">{{key}}</td>\n      <td class=\"val\">\n        <input v-if=\"isReadWrite(key)\"    class=\"read-write\" v-model=\"obj[key]\">\n        <span v-else-if=\"isReadOnly(key)\" class=\"read-only\">{{val}}</span>\n        <span v-else-if=\"isConstant(key)\" class=\"constant\">{{val}}</span>\n        <span v-else                      class=\"private\">{{val}}</span>\n      </td>\n    </tr>\n  </table>\n</div>\n";
    }});
  Object.defineProperty(Oom, 'devMainVueTemplate', {get: function(innerHTML) {
      return innerHTML = "\n<div class=\"dev-main col-12\">\n  <member-table :obj=\"stat\" objname=\"stat\" :do-hide=\"ui.hideData\"\n    :caption=\"stat.NAME+' static properties:'\"></member-table>\n  <member-table :obj=\"attr\" objname=\"attr\" :do-hide=\"ui.hideData\"\n    :caption=\"stat.NAME+' attribute properties:'\"></member-table>\n</div>\n";
    }});
  Oom.devMainVue = {
    template: Oom.devMainVueTemplate,
    data: function() {
      return {
        stat: Oom.stat,
        attr: (new Oom()).attr,
        ui: {
          hideData: false,
          hideInners: false
        }
      };
    },
    beforeCreate: function() {
      var $__6 = KIT,
          isReadWrite = $__6.isReadWrite,
          isReadOnly = $__6.isReadOnly,
          isConstant = $__6.isConstant;
      Vue.component('member-table', {
        template: Oom.memberTableVueTemplate,
        props: {
          doHide: Boolean,
          caption: String,
          obj: Object,
          objname: String
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
  KIT.define(Oom.Foo.stat, KIT.normaliseSchema({a: META}).a);
  KIT.define(Oom.Foo.stat, KIT.normaliseSchema({a: META}).a);
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
      isValid: function(valid, value) {
        var PFX = 'KIT.isValid: ' + valid.name + '’s ';
        if ('string' === typeof valid.type)
          switch (valid.type) {
            case 'undefined':
              return valid.type === (typeof value === 'undefined' ? 'undefined' : $traceurRuntime.typeof(value));
            case 'color':
              return /^#[0-9a-fA-F]{6}$/.test(value);
            case 'int':
              return Number.isInteger(value);
            case 'null':
              return null === value;
            default:
              throw new TypeError(PFX + ("valid.type is '" + valid.type + "'"));
          }
        if (Number === valid.type)
          return 'number' === typeof value && !Number.isNaN(value);
        if (null === valid.type)
          return null === value;
        if ('undefined' === typeof valid.type)
          return 'undefined' === typeof value;
        if (!valid.type.name)
          throw new TypeError(PFX + "valid.type has no name");
        if (!value.constructor || !value.constructor.name)
          throw new TypeError(PFX + "value has no constructor.name");
        return valid.type.name === value.constructor.name;
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
            $__5 = 1; $__5 < arguments.length; $__5++)
          srcs[$__5 - 1] = arguments[$__5];
        return srcs.forEach(function(src) {
          var ME = 'KIT.define: ',
              def = {};
          var $__8 = function(k) {
            if ('undefined' === typeof src[k].default)
              throw Error(ME + k + ' is not a valid schema object');
            var value = src[k].default;
            if (KIT.isReadOnly(k)) {
              def['_' + k] = {
                writable: true,
                value: value,
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
              def['_' + k] = {
                writable: true,
                value: value,
                configurable: true,
                enumerable: true
              };
              def[k] = {
                get: function() {
                  return obj['_' + k];
                },
                set: function(v) {
                  if (KIT.isValid(src[k], v))
                    return obj['_' + k] = v;
                  var vCast;
                  if ('function' === typeof src[k].type) {
                    vCast = src[k].type(v);
                    if (KIT.isValid(src[k], vCast))
                      return obj['_' + k] = vCast;
                  }
                },
                configurable: true,
                enumerable: true
              };
            } else if (KIT.isConstant(k)) {
              def[k] = {
                writable: false,
                value: value,
                configurable: false,
                enumerable: true
              };
            } else {
              throw Error(ME + k + ' is an invalid property name');
            }
          };
          for (var k in src) {
            $__8(k);
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
      countKeyMatches: function(obj, matchFn) {
        var tally = arguments[2] !== (void 0) ? arguments[2] : 0;
        for (var key in obj)
          if (matchFn(key))
            tally++;
        return tally;
      },
      isConstant: function(k) {
        return /^[A-Z][_A-Z0-9]*$/.test(k);
      },
      isReadOnly: function(k) {
        return -1 !== k.indexOf('_') && /^[a-z][_a-z0-9]+$/.test(k);
      },
      isReadWrite: function(k) {
        return /^[a-z][A-Za-z0-9]*$/.test(k);
      },
      normaliseSchema: function(schema) {
        var out = {};
        for (var zone in schema) {
          out[zone] = {};
          for (var propName in schema[zone]) {
            var PFX = 'KIT.normaliseSchema: ' + propName + '’s ';
            var inDesc = schema[zone][propName];
            var outDesc = out[zone][propName] = {};
            outDesc.name = propName;
            outDesc.default = ('object' === (typeof inDesc === 'undefined' ? 'undefined' : $traceurRuntime.typeof(inDesc))) ? inDesc.default : inDesc;
            var strToObj = {
              array: Array,
              boolean: Boolean,
              function: Function,
              number: Number,
              object: Object,
              string: String,
              symbol: Symbol
            };
            var validStr = {
              undefined: 1,
              color: 1,
              int: 1,
              null: 1
            };
            if (!inDesc.hasOwnProperty('type'))
              outDesc.type = outDesc.default.constructor;
            else if (strToObj[inDesc.type])
              outDesc.type = strToObj[inDesc.type];
            else if (validStr[inDesc.type])
              outDesc.type = inDesc.type;
            else
              throw new TypeError(PFX + ("valid.type is '" + valid.type + "'"));
            if (inDesc.remarks)
              outDesc.remarks = inDesc.remarks;
          }
        }
        return out;
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
        var $__4 = this;
        if (this.setupStart)
          throw new Error("Oom.Foo.Post._getReady(): Can only run once");
        Object.defineProperty(this, 'setupStart', {value: KIT.getNow()});
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            Object.defineProperty($__4, 'setupEnd', {value: KIT.getNow()});
            resolve({setupDelay: $__4.setupEnd - $__4.setupStart});
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
        var $__6 = this,
            hub = $__6.hub,
            a = $__6.a,
            b = $__6.b,
            c = $__6.c;
        var $__7 = config,
            xx = $__7.xx,
            yy = $__7.yy,
            zz = $__7.zz;
      }
    }, {}, $__super);
  }(Oom.Foo);
  KIT.name(Class, 'Oom.Foo.Post');
  Oom.Foo.Post.stat = {};
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
        var $__4 = this;
        if (this.setupStart)
          throw new Error("Oom.Foo.Router._getReady(): Can only run once");
        Object.defineProperty(this, 'setupStart', {value: KIT.getNow()});
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            Object.defineProperty($__4, 'setupEnd', {value: KIT.getNow()});
            resolve({setupDelay: $__4.setupEnd - $__4.setupStart});
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
        var $__6 = this,
            hub = $__6.hub,
            a = $__6.a,
            b = $__6.b,
            c = $__6.c;
        var $__7 = config,
            xx = $__7.xx,
            yy = $__7.yy,
            zz = $__7.zz;
      }
    }, {}, $__super);
  }(Oom.Foo);
  KIT.name(Class, 'Oom.Foo.Router');
  Oom.Foo.Router.stat = {};
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.2.11 //\\//\\ http://oomtility.loop.coop /////////
