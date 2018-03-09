//// Oom.Foo //// 1.2.18 //// March 2018 //// http://oom-foo.loop.coop/ ////////

"use strict";
!function(ROOT) {
  'use strict';
  var META = {
    NAME: 'Oom.Foo',
    VERSION: '1.2.18',
    HOMEPAGE: 'http://oom-foo.loop.coop/',
    REMARKS: 'Initial test of the oom-hub architecture',
    LOADED_FIRST: !ROOT.Oom
  };
  var KIT = assignKIT(META.LOADED_FIRST || !ROOT.Oom.KIT ? {} : ROOT.Oom.KIT);
  var Oom = ROOT.Oom = META.LOADED_FIRST ? function() {
    function Oom() {
      var config = arguments[0] !== (void 0) ? arguments[0] : {};
      if (Oom === this.constructor) {
        this.attr._inst_index = Oom.stat.inst_tally;
        Oom.stat._inst_tally++;
      }
    }
    return ($traceurRuntime.createClass)(Oom, {reset: function() {
        var attrSchema = this.constructor.schema.attr;
        for (var key in attrSchema) {
          if (KIT.isConstant(key))
            continue;
          if (KIT.isReadOnly(key))
            this.attr['_' + key] = attrSchema[key].default;
          else
            this.attr[key] = attrSchema[key].default;
        }
      }}, {
      reset: function() {
        var statSchema = this.schema.stat;
        for (var key in statSchema) {
          if (KIT.isConstant(key))
            continue;
          if (KIT.isReadOnly(key))
            statSchema[key].definedIn.stat['_' + key] = statSchema[key].default;
          else
            this.stat[key] = statSchema[key].default;
        }
      },
      mixin: function(shorthandSchema) {
        var existing = this.schema;
        var normalised = KIT.normaliseSchema(this, shorthandSchema);
        this.schema = {};
        this.schema.stat = Object.assign({}, existing.stat, normalised.stat);
        this.schema.attr = Object.assign({}, existing.attr, normalised.attr);
        this.stat = {};
        KIT.define(this.stat, true, this.schema.stat);
        this.prototype.attr = {};
        KIT.define(this.prototype.attr, false, this.schema.attr);
      }
    });
  }() : ROOT.Oom;
  KIT.name(Oom, 'Oom');
  Oom.KIT = KIT;
  if (META.LOADED_FIRST) {
    Oom.schema = {};
    Oom.mixin({
      location: 'src/main/Bases.6.js:122',
      title: 'The Base Schema',
      remarks: 'The foundational schema, defined by the base Oom class',
      config: {},
      stat: {
        NAME: 'Oom',
        VERSION: META.VERSION,
        HOMEPAGE: 'http://oom.loop.coop/',
        REMARKS: 'Base class for all Oom classes',
        inst_tally: {
          remarks: 'The number of Oom instantiations made so far',
          default: 0
        },
        hilite: {
          remarks: 'General purpose, useful as a dev label or status',
          default: '#112233',
          type: 'color'
        }
      },
      attr: {
        UUID: 44,
        inst_index: 0,
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
  }
  Object.defineProperty(Oom, 'memberTableVueTemplate', {get: function(innerHTML) {
      return innerHTML = "\n<div :class=\"'member-table '+objname\">\n  <table :class=\"{ hid:doHide }\">\n    <caption v-html=\"caption\"></caption>\n    <tr>\n      <th>Name</th>\n      <th>Value</th>\n      <th>Default</th>\n      <th>Type</th>\n      <th>Defined In</th>\n    </tr>\n    <tr v-for=\"val, key in obj\" v-bind:class=\"'Oom-'+key\">\n      <td class=\"key\">{{key}}</td>\n      <td class=\"val\">\n        <input v-if=\"isReadWrite(key)\"    class=\"read-write\" v-model=\"obj[key]\">\n        <span v-else-if=\"isReadOnly(key)\" class=\"read-only\">{{val}}</span>\n        <span v-else-if=\"isConstant(key)\" class=\"constant\">{{val}}</span>\n        <span v-else                      class=\"private\">{{val}}</span>\n      </td>\n      <td class=\"is-default\">{{schema[key] ? schema[key].default === val ? '√' : 'x' : '-'}}</td>\n      <td class=\"type\">{{schema[key] ? schema[key].typeStr : '-'}}</td>\n      <td class=\"defined-in\">{{schema[key] ? schema[key].definedInStr : '-'}}</td>\n    </tr>\n  </table>\n</div>\n";
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
        var $__3 = KIT,
            isReadWrite = $__3.isReadWrite,
            isReadOnly = $__3.isReadOnly,
            isConstant = $__3.isConstant,
            stringOrName = $__3.stringOrName;
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
  Oom.devMainAFrame = function(Class) {
    return {};
  };
  Oom.Foo = function($__super) {
    function $__1() {
      $traceurRuntime.superConstructor($__1).apply(this, arguments);
    }
    return ($traceurRuntime.createClass)($__1, {}, {}, $__super);
  }(Oom);
  KIT.name(Oom.Foo, 'Oom.Foo');
  Oom.Foo.mixin({
    location: 'src/main/Bases.6.js:299',
    title: 'The Oom.Foo Schema',
    remarks: 'Defines metadata for this module',
    config: {},
    stat: META,
    attr: {}
  });
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
      define: function(obj, isStatic) {
        for (var srcs = [],
            $__2 = 2; $__2 < arguments.length; $__2++)
          srcs[$__2 - 2] = arguments[$__2];
        return srcs.forEach(function(src) {
          var ME = 'KIT.define: ',
              def = {};
          var $__4 = function(k) {
            if ('undefined' === typeof src[k].default)
              throw Error(ME + k + ' is not a valid schema object');
            var value = src[k].default;
            if (KIT.isReadOnly(k)) {
              if (isStatic) {
                if (!src[k].definedIn.stat['_' + k])
                  Object.defineProperty(src[k].definedIn.stat, '_' + k, {
                    writable: true,
                    value: value,
                    configurable: true,
                    enumerable: true
                  });
                def[k] = {
                  get: function() {
                    return src[k].definedIn.stat['_' + k];
                  },
                  set: function(v) {},
                  configurable: true,
                  enumerable: true
                };
              } else {
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
              }
            } else if (KIT.isReadWrite(k)) {
              if (isStatic) {
                if (src[k].definedIn.stat['_' + k])
                  console.log(src[k].definedInStr, 'already has', '_' + k);
                else
                  Object.defineProperty(src[k].definedIn.stat, '_' + k, {
                    writable: true,
                    value: value,
                    configurable: true,
                    enumerable: true
                  });
                def[k] = {
                  get: function() {
                    return src[k].definedIn.stat['_' + k];
                  },
                  set: function(v) {
                    if (KIT.isValid(src[k], v))
                      return src[k].definedIn.stat['_' + k] = v;
                    var vCast;
                    if ('function' === typeof src[k].type) {
                      vCast = src[k].type(v);
                      if (KIT.isValid(src[k], vCast))
                        return src[k].definedIn.stat['_' + k] = vCast;
                    }
                  },
                  configurable: true,
                  enumerable: true
                };
              } else {
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
              }
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
            $__4(k);
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
      stringOrName: function(val) {
        return 'string' === typeof val ? val : val.name;
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
      normaliseSchema: function(Class, schema) {
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
    return ($traceurRuntime.createClass)($__0, {}, {}, $__super);
  }(Oom.Foo);
  KIT.name(Class, 'Oom.Foo.Post');
  Oom.Foo.Post.mixin({
    location: 'src/main/Post.6.js:203',
    title: 'The Oom.Foo.Post Schema',
    remarks: 'Defines metadata for this module',
    config: {},
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
    return ($traceurRuntime.createClass)($__0, {}, {}, $__super);
  }(Oom.Foo);
  KIT.name(Class, 'Oom.Foo.Router');
  Oom.Foo.Router.mixin({
    location: 'src/main/Router.6.js:203',
    title: 'The Oom.Foo.Router Schema',
    remarks: 'Defines metadata for this module',
    config: {},
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
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.2.18 //\\//\\ http://oomtility.loop.coop /////////
