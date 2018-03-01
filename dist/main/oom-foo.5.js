//// Oom.Foo //// 1.2.15 //// March 2018 //// http://oom-foo.loop.coop/ ////////

"use strict";
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo',
    VERSION: '1.2.15',
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
        return KIT.normaliseSchema(Oom, null, {
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
              type: Number
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
      return innerHTML = "\n<div :class=\"'member-table '+objname\">\n  <table :class=\"{ hid:doHide }\">\n    <caption v-html=\"caption\"></caption>\n    <tr>\n      <th>Name</th>\n      <th>Value</th>\n      <th>Type</th>\n      <th>Defined In</th>\n    </tr>\n    <tr v-for=\"val, key in obj\" v-bind:class=\"'Oom-'+key\">\n      <td class=\"key\">{{key}}</td>\n      <td class=\"val\">\n        <input v-if=\"isReadWrite(key)\"    class=\"read-write\" v-model=\"obj[key]\">\n        <span v-else-if=\"isReadOnly(key)\" class=\"read-only\">{{val}}</span>\n        <span v-else-if=\"isConstant(key)\" class=\"constant\">{{val}}</span>\n        <span v-else                      class=\"private\">{{val}}</span>\n      </td>\n      <td class=\"type\">{{schema[key] ? schema[key].typeStr : '-'}}</td>\n      <td class=\"defined-in\">{{schema[key] ? schema[key].definedInStr : '-'}}</td>\n    </tr>\n  </table>\n</div>\n";
    }});
  Object.defineProperty(Oom, 'devMainVueTemplate', {get: function(innerHTML) {
      return innerHTML = "\n<div class=\"dev-main col-12\">\n  <member-table :schema=\"schema.stat\" :obj=\"stat\" objname=\"stat\" :do-hide=\"ui.hideData\"\n    :caption=\"stat.NAME+' static properties:'\"></member-table>\n  <member-table :schema=\"schema.attr\" :obj=\"attr\" objname=\"attr\" :do-hide=\"ui.hideData\"\n    :caption=\"stat.NAME+' attribute properties:'\"></member-table>\n</div>\n";
    }});
  Oom.devMainVue = function(Class) {
    return {
      template: Oom.devMainVueTemplate,
      data: function() {
        return {
          schema: Class.schema,
          stat: Class.stat,
          attr: (new Class()).attr,
          ui: {
            hideData: false,
            hideInners: false
          }
        };
      },
      methods: {},
      beforeCreate: function() {
        var $__5 = KIT,
            isReadWrite = $__5.isReadWrite,
            isReadOnly = $__5.isReadOnly,
            isConstant = $__5.isConstant,
            stringOrName = $__5.stringOrName;
        Vue.component('member-table', {
          template: Oom.memberTableVueTemplate,
          props: {
            doHide: Boolean,
            caption: String,
            schema: Object,
            obj: Object,
            objname: String
          },
          methods: {
            isReadWrite: isReadWrite,
            isReadOnly: isReadOnly,
            isConstant: isConstant,
            stringOrName: stringOrName
          }
        });
      },
      created: function() {
        KIT.wrapReadOnly(ROOT.Oom.stat);
      }
    };
  };
  Oom.KIT = KIT;
  Oom.Foo = function($__super) {
    function $__1() {
      $traceurRuntime.superConstructor($__1).apply(this, arguments);
    }
    return ($traceurRuntime.createClass)($__1, {}, {get schema() {
        return KIT.normaliseSchema(Oom.Foo, Oom, {
          stat: META,
          attr: {}
        });
      }}, $__super);
  }(Oom);
  KIT.name(Oom.Foo, 'Oom.Foo');
  Oom.Foo.stat = {};
  KIT.define(Oom.Foo.stat, Oom.Foo.schema.stat);
  Oom.Foo.prototype.attr = {};
  KIT.define(Oom.Foo.prototype.attr, Oom.Foo.schema.attr);
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
          throw TypeError(ME + valid.name + "’s valid.type has no name");
        if (!value[C] || !value[C].name)
          throw TypeError(ME + valid.name + ("’s value has no " + C + ".name"));
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
              throw TypeError(PFX + ("valid.type is '" + valid.type + "'"));
          }
        if (Number === valid.type)
          return 'number' === typeof value && !Number.isNaN(value);
        if (null === valid.type)
          return null === value;
        if ('undefined' === typeof valid.type)
          return 'undefined' === typeof value;
        if (!valid.type.name)
          throw TypeError(PFX + "valid.type has no name");
        if (!value.constructor || !value.constructor.name)
          throw TypeError(PFX + "value has no constructor.name");
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
            $__4 = 1; $__4 < arguments.length; $__4++)
          srcs[$__4 - 1] = arguments[$__4];
        return srcs.forEach(function(src) {
          var ME = 'KIT.define: ',
              def = {};
          var $__6 = function(k) {
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
      stringOrName: function(val) {
        return 'string' === typeof val ? val : val.name;
      },
      normaliseSchema: function(Class, ParentClass, schema) {
        var out = {};
        for (var zone in schema) {
          out[zone] = {};
          for (var propName in schema[zone]) {
            var PFX = 'KIT.normaliseSchema: ' + propName + '’s ';
            var inDesc = schema[zone][propName];
            var outDesc = out[zone][propName] = {};
            if (null != inDesc.typeStr)
              throw TypeError(PFX + "inDesc.typeStr has already been set");
            if (null != inDesc.definedIn)
              throw TypeError(PFX + "inDesc.definedIn has already been set");
            if (null != inDesc.definedInStr)
              throw TypeError(PFX + "inDesc.definedInStr has already been set");
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
            else {
              if ('function' !== typeof inDesc.type)
                throw TypeError(PFX + "inDesc.type is not a string or a function");
              if (!inDesc.type.name)
                throw TypeError(PFX + "inDesc.type has no name");
              outDesc.type = inDesc.type;
            }
            outDesc.typeStr = KIT.stringOrName(outDesc.type);
            outDesc.definedIn = Class;
            outDesc.definedInStr = Class.name;
            if (inDesc.remarks)
              outDesc.remarks = inDesc.remarks;
          }
        }
        if (ParentClass) {
          out.stat = Object.assign({}, ParentClass.schema.stat, out.stat);
          out.attr = Object.assign({}, ParentClass.schema.attr, out.attr);
        }
        return out;
      }
    }, previousKIT);
  }
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var Oom = ROOT.Oom;
  var KIT = Oom.KIT;
  var Class = Oom.Foo.Post = function($__super) {
    function $__0() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      $traceurRuntime.superConstructor($__0).call(this, config);
    }
    return ($traceurRuntime.createClass)($__0, {}, {get schema() {
        return KIT.normaliseSchema(Oom.Foo.Post, Oom.Foo, {
          stat: {
            NAME: 'Oom.Foo.Post',
            REMARKS: '@TODO',
            prop_d: {
              type: 'number',
              default: 100
            },
            propG: 44.4
          },
          attr: {
            OK: 123,
            prop_d: {
              type: Number,
              default: 5.5
            },
            propG: 44.4
          }
        });
      }}, $__super);
  }(Oom.Foo);
  KIT.name(Class, 'Oom.Foo.Post');
  Oom.Foo.Post.stat = {};
  KIT.define(Oom.Foo.Post.stat, Oom.Foo.Post.schema.stat);
  Oom.Foo.Post.prototype.attr = {};
  KIT.define(Oom.Foo.Post.prototype.attr, Oom.Foo.Post.schema.attr);
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);
!function(ROOT) {
  'use strict';
  var Oom = ROOT.Oom;
  var KIT = Oom.KIT;
  var Class = Oom.Foo.Router = function($__super) {
    function $__0() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      $traceurRuntime.superConstructor($__0).call(this, config);
    }
    return ($traceurRuntime.createClass)($__0, {}, {get schema() {
        return KIT.normaliseSchema(Oom.Foo.Router, Oom.Foo, {
          stat: {
            NAME: 'Oom.Foo.Router',
            REMARKS: '@TODO',
            prop_d: {
              type: 'number',
              default: 100
            },
            propG: 44.4
          },
          attr: {
            OK: 123,
            prop_d: {
              type: Number,
              default: 5.5
            },
            propG: 44.4
          }
        });
      }}, $__super);
  }(Oom.Foo);
  KIT.name(Class, 'Oom.Foo.Router');
  Oom.Foo.Router.stat = {};
  KIT.define(Oom.Foo.Router.stat, Oom.Foo.Router.schema.stat);
  Oom.Foo.Router.prototype.attr = {};
  KIT.define(Oom.Foo.Router.prototype.attr, Oom.Foo.Router.schema.attr);
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.2.15 //\\//\\ http://oomtility.loop.coop /////////
