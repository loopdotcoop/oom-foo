${{topline}}

!function (ROOT) { 'use strict'

//// Metadata for Oom.${{classname}}
const META = {
    NAME:     'Oom.${{classname}}'
  , VERSION:  '${{version}}' // OOMBUMPABLE
  , HOMEPAGE: '${{homepage}}'
  , REMARKS:  '${{remarks}}'
  , LOADED_FIRST: ! ROOT.Oom // true if the Oom class is defined by this module
}




//// KIT


//// Oom’s toolkit (created if not present). @TODO test with several modules
const KIT = assignKIT(META.LOADED_FIRST || ! ROOT.Oom.KIT ? {} :  ROOT.Oom.KIT)




//// Oom CLASS AND NAMESPACE


//// If not already present, define `Oom`, the base class for all Oom classes,
//// which is also Oom’s global namespace. Also, define a shortcut to it.
const Oom = ROOT.Oom = META.LOADED_FIRST ? class Oom {

    constructor (config={}) {

/*
        //// Define `attr`, a container for public instance-attributes. It’s a
        //// plain object, which Vue prefers.
        const attr = this.attr = {}

        //// attr.UUID: Oom instances have universally unique IDs.
        KIT.define( attr, { UUID: KIT.generateUUID() } )

        //// attr.INST_INDEX: the first Oom instance is 0, the second is 1, etc.
        //// Also increment this class’s (static) tally of instantiations.
        if (Oom === this.constructor) { // not being called by a child-class
            KIT.define( attr, { INST_INDEX: Oom.stat.inst_tally })
            Oom.stat._inst_tally++ // underlying value of a read-only static
        }
*/
    }


    //// Defines this class’s static and instance properties.
    //// May be modified by ‘Plus’ classes. @TODO create and use the Plus class
    static get schema () { return Oom._norm_schema = Oom._norm_schema ||
        KIT.normaliseSchema({

            //// Public static properties (known as ‘statics’ in Oom).
            stat: {

                //// Public constant statics.
                NAME:     'Oom'
              , VERSION:  META.VERSION
              , HOMEPAGE: 'http://oom.loop.coop/'
              , REMARKS:  'Base class for all Oom classes'

                //// Public read-only statics.
                //// Paired with underying underscore-prefixed statics.
              // , inst_tally: { // a schema descriptor-object
              //       remarks: 'Counts instantiations'
              //     , default: 0
              //   }

              , bar_baz: {
                    remarks: 'Test read-only static'
                  , default: 'initial value'
                }

                //// Public read-write statics.
              , hilite: {
                    remarks: 'General purpose, useful as a dev label or status'
                  , default: '#112233'
                  , type:    'color'
                }

            //// Public instance properties (known as ‘attributes’ in Oom).
            }, attr: {

                //// Public constant attributes.
                // UUID: KIT.generateUUID
                FOO_BAR: 8080

                //// Public read-only attributes.
                //// Paired with underying underscore-prefixed attributes.
              , foo_bar: 10000

                //// Public read-write attributes.
              , hilite: {
                    remarks: 'General purpose, useful as a dev label or status'
                  , default: '#445566'
                  , type:    'color'
                }
              , fooBar: { default:1000, type:'number' }

            }
        })//KIT.normaliseSchema()
     }//schema

} : ROOT.Oom
KIT.name(Oom, 'Oom') // prevents `name` from being changed


if (META.LOADED_FIRST) {

    //// Add public statics to `Oom.stat` (exposed to Vue etc).
    Oom.stat = {}
    KIT.define(Oom.stat, Oom.schema.stat)

    //// Add public attributes to `myOomInstance.attr` (exposed to Vue etc).
    Oom.prototype.attr = {}
    KIT.define(Oom.prototype.attr, Oom.schema.attr)
}




//// <member-table> shows a table of class or instance members.
Object.defineProperty(Oom, 'memberTableVueTemplate', {
get: function (innerHTML) { return innerHTML = `
<div :class="'member-table '+objname">
  <table :class="{ hid:doHide }">
    <caption v-html="caption"></caption>
    <tr v-for="val, key in obj" v-bind:class="'Oom-'+key">
      <td class="key">{{key}}</td>
      <td class="val">
        <input v-if="isReadWrite(key)"    class="read-write" v-model="obj[key]">
        <span v-else-if="isReadOnly(key)" class="read-only">{{val}}</span>
        <span v-else-if="isConstant(key)" class="constant">{{val}}</span>
        <span v-else                      class="private">{{val}}</span>
      </td>
    </tr>
  </table>
</div>
`} })


////
Object.defineProperty(Oom, 'devMainVueTemplate', {
get: function (innerHTML) { return innerHTML = `
<div class="dev-main col-12">
  <member-table :obj="stat" objname="stat" :do-hide="ui.hideData"
    :caption="stat.NAME+' static properties:'"></member-table>
  <member-table :obj="attr" objname="attr" :do-hide="ui.hideData"
    :caption="stat.NAME+' attribute properties:'"></member-table>
</div>
`} })


Oom.devMainVue = {
    template: Oom.devMainVueTemplate

  , data: function () { return {
        stat: Oom.stat
      , attr: (new Oom()).attr
      , ui: { hideData:false, hideInners:false }
    } }

/*
  , data: function () { return {
        instance: inners[inners.length-1].api
      , static: ROOT.Oom.Foo.Post.api
      , ui: { hideData:false }
    } }

  , props: {
        firstProp: Number
      , UUID: String
    }

  , methods: {
        // toggleHideData
    }
*/
    //// Register any component dependencies not already registered.
  , beforeCreate: function () {

        //@TODO if not already registered
        //// <member-table> shows a table of class and instance members.
        const { isReadWrite, isReadOnly, isConstant } = KIT
        Vue.component('member-table', {
            template: Oom.memberTableVueTemplate
          , props: {
                doHide: Boolean
              , caption: String
              , obj: Object
              , objname: String
            }
          , methods: { isReadWrite, isReadOnly, isConstant }
        })

    }

    //// Wrap Vue’s reactive getters and setters with our own.
  , created: function () {
        // KIT.wrapReadOnly(outers[outers.length-1]) //@TODO instance
        KIT.wrapReadOnly(ROOT.Oom.stat)
    }

}


//// Expose `KIT` globally.
Oom.KIT = KIT




//// Oom.${{classname}} CLASS


//// Define `Oom.${{classname}}`, this module’s specialism of `Oom`.
Oom.${{classname}} = class extends Oom {
}; KIT.name(Oom.${{classname}}, 'Oom.${{classname}}')


//// Add properties to `Oom.${{classname}}.stat` - these will be exposed to Vue etc.
Oom.${{classname}}.stat = {}
KIT.define(Oom.${{classname}}.stat, KIT.normaliseSchema({a:META}).a /*, { instTally:0 }*/)
KIT.define(Oom.Foo.stat, KIT.normaliseSchema({a:META}).a /*, { instTally:0 }*/)




//// KIT FUNCTIONS


function assignKIT (previousKIT={}) { return Object.assign({}, {

    //// Creates a sequence of six random characters (57 billion combinations),
    //// containing only uppercase and lowercase letters and digits.
    generateUUID: () => {
        const rndCh = (s, e) => String.fromCharCode( Math.random() * (e-s) + s )
        return 'x'.repeat(6)
           .replace( /./g,           c => rndCh(48,122) ) // ascii 0-z
           .replace( /[:-@\\[-\`]/g, c => rndCh(97,122) ) // ascii a-z
    }


    //// @TODO describe these three
  , applyDefault: (valid, config) => {
        if ( config.hasOwnProperty(valid.name) )
            return true // `true` here signifies default didn’t need to be applied
        if (! valid.hasOwnProperty('default') )
            return false // `false` signifies a missing mandatory field
        config[valid.name] = 'function' === typeof valid.default
          ? valid.default(config) // a value can depend on another config value
          : valid.default
        return true // `true` here signifies default was successfully applied
    }

    //// Validates a value against a given type.
  , validateType: (valid, value) => {
        const ME = 'KIT.validateType: ', C = 'constructor'
        if (null === valid.type)
            return (null === value) ? null : `is not null`
        if ('undefined' === typeof valid.type)
            return ('undefined' === typeof value) ? null : `is not undefined`
        if (! valid.type.name )
            throw new TypeError(ME+valid.name+`’s valid.type has no name`)
        if (! value[C] || ! value[C].name )
            throw new TypeError(ME+valid.name+`’s value has no ${C}.name`)
        return (valid.type.name === value[C].name)
          ? null : `has ${C}.name ${value[C].name} not ${valid.type.name}`
    }

  , validateRange: (valid, value) => {
        if (null != valid.min && valid.min > value)
            return `is less than the minimum ${valid.min}`
        if (null != valid.max && valid.max < value)
            return `is greater than the maximum ${valid.max}`
        if (null != valid.step && ((value/valid.step) % 1))
            return `${value} ÷ ${valid.step} leaves ${(value/valid.step) % 1}`
    }

    //// Validates a value against a given type.
  , isValid: (valid, value) => { // `valid` is a schema descriptor-object
        const PFX = 'KIT.isValid: '+valid.name+'’s '
        if ('string' === typeof valid.type)
            switch (valid.type) {
                case 'undefined': // not a Vue or A-Frame type
                    return valid.type === typeof value
                // case 'array': // Vue: `Array`  A-Frame: 'array'
                //     return Array.isArray(value)
                case 'color': // A-Frame: 'color'
                    return /^#[0-9a-fA-F]{6}$/.test(value)
                case 'int': // A-Frame: 'int'
                    return Number.isInteger(value)
                case 'null': // not a Vue or A-Frame type
                    return null === value
                //@TODO add more of these, following:
                //aframe.io/docs/master/core/component.html#property-types
                default:
                    throw new TypeError(PFX+`valid.type is '${valid.type}'`)
            }
        if (Number === valid.type)
            return 'number' === typeof value && ! Number.isNaN(value)
        if (null === valid.type)
            return null === value
        if ('undefined' === typeof valid.type)
            return 'undefined' === typeof value
        if (! valid.type.name )
            throw new TypeError(PFX+`valid.type has no name`)
        if (! value.constructor || ! value.constructor.name )
            throw new TypeError(PFX+`value has no constructor.name`)
        return valid.type.name === value.constructor.name
    }


    //// Get milliseconds since context began, to several decimal places.
  , getNow: () => {
        let now
        if ( // Node.js
            'object'   === typeof ROOT.process
         && 'function' === typeof ROOT.process.hrtime) {
            const hrtime = ROOT.process.hrtime()
            now = ( (hrtime[0] * 1e9) + hrtime[1] ) / 1e6 // in milliseconds
        } else { // modern browser @TODO legacy browser
            now = ROOT.performance.now()
        }
        return now
    }


    //// Adds one or more property to `obj`.
    //// Can also be used to change the value of existing properties. @TODO does Vue croak when that happens?
  , define: (obj, ...srcs) =>
        srcs.forEach( src => {
            const ME = 'KIT.define: ', def = {}
            for (let k in src) {
                if ('undefined' === typeof src[k].default)
                    throw Error(ME+k+' is not a valid schema object')
                const value = src[k].default
                if ( KIT.isReadOnly(k) ) { // eg 'foo_bar'
                    def['_'+k] = { // private property, still visible to Vue
                        writable:true, value
                      , configurable:true, enumerable:true }
                    def[k] = { // public read-only property (not a constant)
                        get: function ()  { return obj['_'+k] }
                      , set: function (v) { } // read-only
                      , configurable:true, enumerable:true }
                } else if ( KIT.isReadWrite(k) ) { // eg 'fooBar'
                    def['_'+k] = { // private property, still visible to Vue
                        writable:true, value
                      , configurable:true, enumerable:true }
                    def[k] = { // public read-write property
                        get: function ()  { return obj['_'+k] }
                      , set: function (v) {
                            if ( KIT.isValid(src[k], v) )
                                return obj['_'+k] = v
                            let vCast
                            if ('function' === typeof src[k].type) {
                                vCast = src[k].type(v)
                                if ( KIT.isValid(src[k], vCast) )
                                    return obj['_'+k] = vCast
                            }
                        }
                      , configurable:true, enumerable:true }
                } else if ( KIT.isConstant(k) ) { // eg 'FOO_BAR'
                    def[k] = { // public constant
                        writable:false, value
                      , configurable:false, enumerable:true }
                } else {
                    throw Error(ME+k+' is an invalid property name')
                }
            }
            Object.defineProperties(obj, def)
        })


    //// Set the unwritable, unconfigurable, non-enumerable `name` property of
    //// `obj`. Usage: `name(myFn, 'myFn')`.
  , name: (obj, value) =>
        Object.defineProperty(obj, 'name', { value, configurable:false })

    //// Wraps Vue’s reactive getter and setter for each read-only property.
    //// The wrapper prevents the property being set directly, and gets from the
    //// ‘shadow’ property (same name, but underscore-prefixed). `wrapReadOnly()
    //// should be called after Vue creates a component.
  , wrapReadOnly: obj => {
/* @TODO reinstate or remove
        for (let k in obj) {
            if (! KIT.isReadOnly(k) ) continue // ignore constant and read-write
            const { get, set } = Object.getOwnPropertyDescriptor(obj, k)
            // const propertyDescriptor =
            //     Object.getOwnPropertyDescriptor(obj, k)
            // const vueReactiveGetter = propertyDescriptor.get
            // const vueReactiveSetter = propertyDescriptor.set
            // if (! vueReactiveGetter) { continue } // probably a non-writable property
            if ('wrappedGet' === get.name) { console.log('!!!');continue} //@TODO more graceful way of avoiding double-wrap
            // console.log('wrap ' + k + ' getter and setter');
            const wrappedGet = function wrappedGet () {
                let val
                if ( KIT.isReadOnly(k) )
                    val = obj['_'+k] // read-only property’s value
                else
                    val = get()
                // console.log('get ' + k + ' ' + val);
                return val
            }
            const wrappedSet = function wrappedSet (val) {
                if ( KIT.isReadOnly(k) )
                    return
                // console.log('set ' + k + ' to ' + val);
                return set(val)
            }
            // console.log('wrapped '+k+' on '+obj.UUID)
            Object.defineProperty(obj, k, {
                configurable:true, enumerable:true
              , get: wrappedGet
              , set: wrappedSet
            })
        }
*/
    }

  , countKeyMatches: (obj, matchFn, tally=0) => {
        for (let key in obj) if ( matchFn(key) ) tally++; return tally }

    //// Classify property names, eg 'foo_bar_4', 'fooBar4' and 'FOO_BAR_4'.
    //// Minimal names are 'a_', 'a' and 'A'. Leading digits or underscores are
    //// not allowed.
  , isConstant:  k => /^[A-Z][_A-Z0-9]*$/.test(k)
  , isReadOnly:  k => -1 !== k.indexOf('_') && /^[a-z][_a-z0-9]+$/.test(k)
  , isReadWrite: k => /^[a-z][A-Za-z0-9]*$/.test(k)

    //// Validates a schema object, and then fills in any gaps.
  , normaliseSchema: schema => {
        const out = {}
        for (let zone in schema) {
            out[zone] = {} // eg `out.stat = {}` or `out.attr = {}`
            for (let propName in schema[zone]) {
                const PFX = 'KIT.normaliseSchema: '+propName+'’s '
                const inDesc = schema[zone][propName]
                const outDesc = out[zone][propName] = {}
                outDesc.name = propName // for better `isValid()` error messages
                outDesc.default = ('object' === typeof inDesc)
                  ? inDesc.default // full: `{ stat:{ OK:{ default:'Yep' } } }`
                  : inDesc // ...or allow shorthand: `{ stat:{ OK:'Yep' } }`
                const strToObj = {
                    array   : Array
                  , boolean : Boolean
                  , function: Function
                  , number  : Number
                  , object  : Object
                  , string  : String
                  , symbol  : Symbol
                }
                const validStr = {
                    undefined: 1 //@TODO add more of these, following:
                  , color    : 1 //aframe.io/docs/master/core/component.html#property-types
                  , int      : 1
                  , null     : 1
                }
                if (! inDesc.hasOwnProperty('type') )
                    outDesc.type = outDesc.default.constructor // 123 -> Number
                else if (strToObj[inDesc.type])
                    outDesc.type = strToObj[inDesc.type] // 'number' -> Number
                else if (validStr[inDesc.type])
                    outDesc.type = inDesc.type // 'int' -> 'int'
                else
                    throw new TypeError(PFX+`valid.type is '${valid.type}'`)
                if (inDesc.remarks) outDesc.remarks = inDesc.remarks
            }
        }
        return out
    }

}, previousKIT) }//assignKIT()


}( 'object' === typeof global ? global : this ) // `window` in a browser
