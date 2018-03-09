//// Oom.Foo //// 1.2.20 //// March 2018 //// http://oom-foo.loop.coop/ ////////

!function (ROOT) { 'use strict'

//// Metadata for Oom.Foo
const META = {
    NAME:     'Oom.Foo'
  , VERSION:  '1.2.20' // OOMBUMPABLE
  , HOMEPAGE: 'http://oom-foo.loop.coop/'
  , REMARKS:  'Initial test of the oom-hub architecture'
  , LOADED_FIRST: ! ROOT.Oom // true if the Oom class is defined by this module
}




//// INITIALISE KIT


//// Oom’s toolkit (created if not present). @TODO test with several modules
const KIT = assignKIT(META.LOADED_FIRST || ! ROOT.Oom.KIT ? {} :  ROOT.Oom.KIT)




//// THE Oom CLASS AND NAMESPACE


//// If not already present, define `Oom`, the base class for all Oom classes,
//// which is also Oom’s global namespace. Also, define a shortcut to it.
const Oom = ROOT.Oom = META.LOADED_FIRST ? class Oom {

    constructor (config={}) {

        //// Update `attr.inst_index` - the first instance is 0, the second is 1
        //// etc.  Also increment `stat.inst_tally`, this class’s static tally
        //// of instantiations.
        this.attr._inst_index = this.constructor.stat.inst_tally // the '_' prefix is...
        this.constructor.stat._inst_tally++ // ...the ‘shadow’ of a read-only static

/*
        if (Oom === this.constructor) { // not being called by a child-class
          // ...
        }

        //// Define `attr`, a container for public instance-attributes. It’s a
        //// plain object, which Vue prefers.
        const attr = this.attr = {}

        //// attr.UUID: Oom instances have universally unique IDs.
        KIT.define( attr, { UUID: KIT.generateUUID() } )
*/
    }


    //// Resets all statics to their initial default values.
    static reset () { //@TODO smarter reset, remove local shadow
        const statSchema = this.schema.stat // `this` is the current class
        for (let key in statSchema) {
            if ( KIT.isConstant(key) ) continue // no need to reset constants
            const def = statSchema[key]
            const shadowObj = def.perClass ? this.stat : def.definedIn.stat
            if ( KIT.isReadOnly(key) ) // reset a read-only static’s ‘shadow’
                shadowObj['_'+key] = def.default
            else // a read-write static
                shadowObj[key] = def.default
        }
    }


    //// Resets all attributes to their initial default values.
    reset () { //@TODO smarter reset, remove local shadow
        const attrSchema = this.constructor.schema.attr // the current class
        for (let key in attrSchema) {
            if ( KIT.isConstant(key) ) continue // no need to reset constants
            const def = attrSchema[key]
            if ( KIT.isReadOnly(key) ) // reset a read-only attribute’s ‘shadow’
                this.attr['_'+key] = def.default
            else // a read-write attribute
                this.attr[key] = def.default
        }
    }


    //// Merge a new schema into the current class’s existing schema.
    static mixin (shorthandSchema) {
        const ME = 'Oom.mixin(): '

        //// Merge a normalised version of the new schema into the existing one.
        const existing = this.schema
        const normalised = KIT.normaliseSchema(this, shorthandSchema)
        this.schema = {} // reset this class’s schema
        this.schema.stat = Object.assign({}, existing.stat, normalised.stat)
        this.schema.attr = Object.assign({}, existing.attr, normalised.attr)

        //// Create or replace the plain `Class.stat` object (which Vue will
        //// reactively watch) and add public statics to it.
        this.stat = {}
        for (let key in this.schema.stat) {
            const def = this.schema.stat[key] // a single stat schema-definition
            if ( KIT.isConstant(key) )
                KIT.define.constant.stat(this.stat, def)
            else if ( KIT.isReadOnly(key) )
                KIT.define.readOnly.stat(this.stat, def)
            else if ( KIT.isReadWrite(key) )
                KIT.define.readWrite.stat(this.stat, def)
            else
                throw Error(ME+key+' is an invalid static name')
        }

        //// Create or replace the plain `inst.attr` object (which Vue will
        //// reactively watch) and add public attributes to it.
        this.prototype.attr = {}
        for (let key in this.schema.attr) {
            const def = this.schema.attr[key] // a single attr schema-definition
            if ( KIT.isConstant(key) )
                KIT.define.constant.attr(this.prototype.attr, def)
            else if ( KIT.isReadOnly(key) )
                KIT.define.readOnly.attr(this.prototype.attr, def)
            else if ( KIT.isReadWrite(key) )
                KIT.define.readWrite.attr(this.prototype.attr, def)
            else
                throw Error(ME+key+' is an invalid attribute name')
        }

    }

} : ROOT.Oom
KIT.name(Oom, 'Oom') // prevents `name` from being changed


//// Expose `KIT` globally.
Oom.KIT = KIT




if (META.LOADED_FIRST) {

    ////@TODO comment
    //// Oom is the base class, so its schema is not xxxxx @TODO describe
    Oom.schema = {}

    //// Define Oom’s static and instance properties.
    Oom.mixin({
        title: 'The Base Schema'
      , remarks: 'The foundational schema, defined by the base Oom class'
      , location: 'src/main/Bases.6.js'

      , config: {} //@TODO

        //// Public static properties (known as ‘statics’ in Oom).
      , stat: {

            //// Public constant statics.
            NAME:     'Oom'
          , VERSION:  META.VERSION
          , HOMEPAGE: 'http://oom.loop.coop/'
          , REMARKS:  'Base class for all Oom classes'

            //// Public read-only statics.
            //// Paired with underying underscore-prefixed ‘shadow’ statics.
          , inst_tally: {
                remarks: 'The number of Oom instantiations made so far'
              , default: 0
            }

            //// Public read-write statics.
            //// Paired with underying underscore-prefixed ‘shadow’ statics.
          , hilite: {
                remarks: 'General purpose, useful as a dev label or status'
              , default: '#112233'
              , type:    'color'
            }

        //// Public instance properties (known as ‘attributes’ in Oom).
        }, attr: {

            //// Public constant attributes.
            UUID: 44
            // UUID: KIT.generateUUID
            // INST_INDEX: () => Oom.stat.inst_tally

            //// Public read-only attributes.
            //// Paired with underying underscore-prefixed ‘shadow’ attributes.
          , inst_index: 0 // set to `Oom.stat.inst_tally` by `constructor()`

            //// Public read-write attributes.
            //// Paired with underying underscore-prefixed ‘shadow’ attributes.
          , hilite: {
                remarks: 'General purpose, useful as a dev label or status'
              , default: '#445566'
              , type:    'color'
            }
          , fooBar: { default:1000, type:Number }

        }

    })//Oom.mixin()
    //
    // //// Create the plain `Class.stat` object (which Vue watches) and add public
    // //// statics to it. Arg 2 of `KIT.define()` is `true` for statics.
    // Oom.stat = {}
    // KIT.define(Oom.stat, true, Oom.schema.stat)
    //
    // //// Create the plain `inst.attr` object (which Vue watches) and add public
    // //// attributes to it. Arg 2 of `KIT.define()` is `false` for attributes.
    // Oom.prototype.attr = {}
    // KIT.define(Oom.prototype.attr, false, Oom.schema.attr)
}




//// <member-table> shows a table of class or instance members.
Object.defineProperty(Oom, 'memberTableVueTemplate', {
get: function (innerHTML) { return innerHTML = `
<div :class="'member-table '+objname">
  <table :class="{ hid:doHide }">
    <caption v-html="caption"></caption>
    <tr>
      <th>Name</th>
      <th>Value</th>
      <th>Default</th>
      <th>Type</th>
      <th>Defined In</th>
    </tr>
    <tr v-for="val, key in obj" v-bind:class="'Oom-'+key">
      <td class="key">{{key}}</td>
      <td class="val">
        <input v-if="isReadWrite(key)"    class="read-write" v-model="obj[key]">
        <span v-else-if="isReadOnly(key)" class="read-only">{{val}}</span>
        <span v-else-if="isConstant(key)" class="constant">{{val}}</span>
        <span v-else                      class="private">{{val}}</span>
      </td>
      <td class="is-default">{{schema[key] ? schema[key].default === val ? '√' : 'x' : '-'}}</td>
      <td class="type">{{schema[key] ? schema[key].typeStr : '-'}}</td>
      <td class="defined-in">{{schema[key] ? schema[key].definedInStr : '-'}}</td>
    </tr>
  </table>
</div>
`} })


////
Object.defineProperty(Oom, 'devMainVueTemplate', {
get: function (innerHTML) { return innerHTML = `
<div class="dev-main col-12">
  <member-table :schema="schema.stat" :obj="stat" objname="stat" :do-hide="ui.hideData"
    :caption="stat.NAME+' static properties:'"></member-table>
  <member-table :schema="schema.attr" :obj="attr" objname="attr" :do-hide="ui.hideData"
    :caption="stat.NAME+' attribute properties:'"></member-table>
</div>
`} })


Oom.devMainVue = function (Class) { return {
    template: Oom.devMainVueTemplate

  , data: function () { return {
        schema: Class.schema
      , stat: Class.stat
      , attr: (new Class()).attr
      , ui: { hideData:false, hideInners:false }
    } }

/*
  , props: {
        firstProp: Number
      , UUID: String
    }
*/
  , methods: {
    }

    //// Register any component dependencies not already registered.
  , beforeCreate: function () {

        //@TODO if not already registered
        //// <member-table> shows a table of class and instance members.
        const { isReadWrite, isReadOnly, isConstant, stringOrName } = KIT
        Vue.component('member-table', {
            template: Oom.memberTableVueTemplate
          , props: {
                doHide: Boolean
              , caption: String
              , schema: Object
              , obj: Object
              , objname: String
            }
          , methods: { isReadWrite, isReadOnly, isConstant, stringOrName }
        })

    }

    //// Wrap Vue’s reactive getters and setters with our own.
  , created: function () {
        // KIT.wrapReadOnly(outers[outers.length-1]) //@TODO instance
        KIT.wrapReadOnly(ROOT.Oom.stat)
    }

} }//Oom.devMainVue()


Oom.devMainAFrame = function (Class) { return {

} }//Oom.devMainAFrame()




//// Oom.Foo CLASS


//// Define `Oom.Foo`, this module’s specialism of `Oom`.
Oom.Foo = class extends Oom {
    constructor (config={}) {
        super(config)
    }

}; KIT.name(Oom.Foo, 'Oom.Foo')


//// Define this class’s static and instance properties.
Oom.Foo.mixin({
    title: 'The Oom.Foo Schema'
  , remarks: 'Defines metadata for this module'
  , location: 'src/main/Bases.6.js'

  , config: {} //@TODO

    //// Public static properties (known as ‘statics’ in Oom).
  , stat: META

    //// Public instance properties (known as ‘attributes’ in Oom).
  , attr: {}

})//Oom.Foo.mixin()


// //// Add public statics to `Oom.Foo.stat` (exposed to Vue etc).
// Oom.Foo.stat = {}
// KIT.define(Oom.Foo.stat, true, Oom.Foo.schema.stat)
//
// //// Add public attributes to `myOomFoo.attr` (exposed to Vue etc).
// Oom.Foo.prototype.attr = {}
// KIT.define(Oom.Foo.prototype.attr, false, Oom.Foo.schema.attr)




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
            throw TypeError(ME+valid.name+`’s valid.type has no name`)
        if (! value[C] || ! value[C].name )
            throw TypeError(ME+valid.name+`’s value has no ${C}.name`)
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
                    throw TypeError(PFX+`valid.type is '${valid.type}'`)
            }
        if (Number === valid.type)
            return 'number' === typeof value && ! Number.isNaN(value)
        if (null === valid.type)
            return null === value
        if ('undefined' === typeof valid.type)
            return 'undefined' === typeof value
        if (! valid.type.name )
            throw TypeError(PFX+`valid.type has no name`)
        if (! value.constructor || ! value.constructor.name )
            throw TypeError(PFX+`value has no constructor.name`)
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

    //// Functions in the `define` set are used to initialise the statics and
    //// attributes defined in a class’s schema. They are primarily used by
    //// `Oom.mixin()`. `def` should be a single property-definition from a
    //// normalised schema object.
  , define: {

        //// Initialise a constant, eg `FOO_BAR`.
        constant: {
            stat: (stat, def) => KIT.define.constant.any(stat, def)
          , attr: (attr, def) => KIT.define.constant.any(attr, def)
          , any:  (obj, def)  =>
                Object.defineProperty(obj, def.name, { value:def.default
                  , configurable:false, enumerable:true, writable:false })
        }

        //// Initialise a read-only property, eg `foo_bar`.
      , readOnly: {
            stat: (stat, def) => {
                const shadowObj = def.perClass ? stat : def.definedIn.stat
                KIT.define.shadow(shadowObj, def)
                KIT.define.readOnly.any(stat, def, shadowObj)
            }
          , attr: (attr, def) => {
                KIT.define.shadow(attr, def)
                KIT.define.readOnly.any(attr, def, attr)
            }
          , any:  (obj, def, shadowObj) =>
                Object.defineProperty(obj, def.name, {
                    get: function ()  { return shadowObj['_'+def.name] }
                  , set: function (value) { } // do nothing - it’s read-only
                  , configurable:true, enumerable:true })
        }

        //// Initialise a read-write property, eg `fooBar`.
      , readWrite: {
            stat: (stat, def) => {
                const shadowObj = def.perClass ? stat : def.definedIn.stat
                KIT.define.shadow(shadowObj, def)
                KIT.define.readWrite.any(stat, def, shadowObj)
            }
          , attr: (attr, def) => {
                KIT.define.shadow(attr, def)
                KIT.define.readWrite.any(attr, def, attr)
            }
          , any:  (obj, def, shadowObj) =>
                Object.defineProperty(obj, def.name, {
                    get: function ()  { return shadowObj['_'+def.name] }
                  , set: function (value) {
                        if ( KIT.isValid(def, value) )
                            return shadowObj['_'+def.name] = value
                        if ('function' !== typeof def.type) return // give up
                        let castValue = def.type(value) // eg `Number("123")`
                        if ( KIT.isValid(def, castValue) )
                            return shadowObj['_'+def.name] = castValue
                    }
                  , configurable:true, enumerable:true })
        }

        //// Used by `readOnly.*t**()` and `readWrite.*t**()` to initialise a
        //// ‘shadow’ property, eg `_foo_bar` or `_fooBar`.
      , shadow: (shadowObj, def) =>
            Object.defineProperty(shadowObj, '_'+def.name, { value:def.default
              , configurable:true, enumerable:true, writable:true })
    }
/*

    //// Adds one or more property to `obj`. @TODO refactor - too messy
    //// Can also be used to change the value of existing properties. @TODO does Vue croak when that happens?
  , define: (obj, isStatic, ...srcs) =>
        srcs.forEach( src => {
            const ME = 'KIT.define: ', def = {}
            for (let k in src) {
                if ('undefined' === typeof src[k].default)
                    throw Error(ME+k+' is not a valid schema object')
                const value = src[k].default
                if ( KIT.isReadOnly(k) ) { // eg 'foo_bar'
                    if (isStatic) {
                        if (! src[k].definedIn.stat['_'+k])
                            Object.defineProperty(src[k].definedIn.stat, '_'+k, {
                                writable:true, value
                              , configurable:true, enumerable:true })
                        def[k] = { // public read-only property
                            get: function ()  { return src[k].definedIn.stat['_'+k] }
                          , set: function (v) { } // read-only
                          , configurable:true, enumerable:true }
                    } else { // attribute
                        def['_'+k] = { // private property, still visible to Vue
                            writable:true, value
                          , configurable:true, enumerable:true }
                        def[k] = { // public read-only property (not a constant)
                            get: function ()  { return obj['_'+k] }
                          , set: function (v) { } // read-only
                          , configurable:true, enumerable:true }
                    }
                } else if ( KIT.isReadWrite(k) ) { // eg 'fooBar'
                    if (isStatic) {
                        if (src[k].definedIn.stat['_'+k])
                            console.log(src[k].definedInStr, 'already has', '_'+k);
                        else
                            Object.defineProperty(src[k].definedIn.stat, '_'+k, {
                                writable:true, value
                              , configurable:true, enumerable:true })
                        def[k] = { // public read-write property
                            get: function ()  { return src[k].definedIn.stat['_'+k] }
                          , set: function (v) {
                                if ( KIT.isValid(src[k], v) )
                                    return src[k].definedIn.stat['_'+k] = v
                                let vCast
                                if ('function' === typeof src[k].type) {
                                    vCast = src[k].type(v)
                                    if ( KIT.isValid(src[k], vCast) )
                                        return src[k].definedIn.stat['_'+k] = vCast
                                }
                            }
                          , configurable:true, enumerable:true }
                    } else { // attribute
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
                    }
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
*/

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

    ////
  , stringOrName: val => 'string' === typeof val ? val : val.name

    //// Three helpers which classify property names, eg 'foo_bar_4', 'fooBar4'
    //// and 'FOO_BAR_4'. Minimal names are 'a_', 'a' and 'A'. Leading digits or
    //// underscores are not allowed.
  , isConstant:  k => /^[A-Z][_A-Z0-9]*$/.test(k)
  , isReadOnly:  k => -1 !== k.indexOf('_') && /^[a-z][_a-z0-9]+$/.test(k)
  , isReadWrite: k => /^[a-z][A-Za-z0-9]*$/.test(k)

    //// Validates a schema object and fills in any gaps.
  , normaliseSchema: (Class, schema) => {
        const out = {}
        for (let zone in schema) {
            out[zone] = {} // eg `out.stat = {}` or `out.attr = {}`
            for (let propName in schema[zone]) {
                const PFX = 'KIT.normaliseSchema: '+propName+'’s '
                const inDesc = schema[zone][propName]
                const outDesc = out[zone][propName] = {}
                // if (null != inDesc.typeStr)
                //     throw TypeError(PFX+`inDesc.typeStr has already been set`)
                // if (null != inDesc.definedIn)
                //     throw TypeError(PFX+`inDesc.definedIn has already been set`)
                // if (null != inDesc.definedInStr)
                //     throw TypeError(PFX+`inDesc.definedInStr has already been set`)
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
                else {
                    if ('function' !== typeof inDesc.type)
                        throw TypeError(PFX+`inDesc.type is not a string or a function`)
                    if (! inDesc.type.name )
                        throw TypeError(PFX+`inDesc.type has no name`)
                    outDesc.type = inDesc.type
                }
                outDesc.typeStr = KIT.stringOrName(outDesc.type) // can be passed to a Vue component, unlike functions
                outDesc.definedIn = Class
                outDesc.definedInStr = Class.name
                outDesc.perClass = null == inDesc.perClass ? true : inDesc.perClass
                if (inDesc.remarks) outDesc.remarks = inDesc.remarks
            }
        }
        return out
    }//normaliseSchema()

}, previousKIT) }//assignKIT()


}( 'object' === typeof global ? global : this ) // `window` in a browser
