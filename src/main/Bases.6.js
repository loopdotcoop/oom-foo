//// Oom.Foo //// 1.2.4 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

//// Metadata for Oom.Foo
const META = {
    NAME:     'Oom.Foo'
  , VERSION:  '1.2.4' // OOMBUMPABLE
  , HOMEPAGE: 'http://oom-foo.loop.coop/'
  , REMARKS:  'Initial test of the oom-hub architecture'
  , LOADED_FIRST: ! ROOT.Oom // true if the Oom class is defined by this module
}




//// KIT


//// Oom’s toolkit (created if not present). @TODO test with several modules
const KIT = assignKit(META.LOADED_FIRST || ! ROOT.Oom.KIT ? {} :  ROOT.Oom.KIT)




//// Oom CLASS AND NAMESPACE


//// If not already present, define `Oom`, the base class for all Oom classes,
//// which is also Oom’s global namespace. Also, define a shortcut to it.
const Oom = ROOT.Oom = META.LOADED_FIRST ? class Oom {

    constructor (config={}) {

        //// Define `attr`, a container for public instance-attributes. It’s a
        //// plain object, which Vue prefers.
        const attr = this.attr = {}

        //// attr.UUID: Oom instances have universally unique IDs.
        KIT.unwritables( attr, { UUID: KIT.generateUUID() } )

    }

} : ROOT.Oom


//// Add properties to `Oom.stat` - these will be exposed to Vue etc.
if (META.LOADED_FIRST) {
    Oom.stat = {}
    KIT.unwritables( Oom.stat, {
        NAME:     'Oom'
      , VERSION:  META.VERSION
      , HOMEPAGE: 'http://oom.loop.coop/'
      , REMARKS:  'Base class for all Oom classes'
    }, { insts:   0 }) // counts instantiations
}


//// Expose `KIT` globally.
Oom.KIT = KIT




//// Oom.Foo CLASS


//// Define `Oom.Foo`, this module’s specialism of `Oom`.
Oom.Foo = class extends Oom {
}; KIT.name(Oom.Foo, 'Oom.Foo')


//// Add properties to `Oom.Foo.stat` - these will be exposed to Vue etc.
Oom.Foo.stat = {}
KIT.unwritables(Oom.Foo.stat, META, { insts:0 })




//// KIT FUNCTIONS


function assignKit (KIT={}) { return Object.assign({}, {

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

  , validateType: (valid, value) => {
        const ME = `KIT.validateType: `, C = 'constructor'
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


    //// Adds one or more enumerable read-only values to `obj`.
    //// Each source object, eg { FOO:1, BAR:2 }, will be converted to
    //// { FOO:{ enumerable:true, value:1 }, BAR:{ enumerable:true, value:2 } }
  , unwritables: (obj, ...srcs) =>
        srcs.forEach( src => {
            const def = {}
            for (let k in src) def[k] = { enumerable:true, value:src[k] }
            Object.defineProperties(obj, def)
        })


    //// Set the unwritable non-enumerable `name` property of `obj`,
    //// eg `name(myFn, 'myFn')`.
  , name: (obj, value) =>
        Object.defineProperty(obj, 'name', { value })

}, KIT) }//assignKit()


}( 'object' === typeof global ? global : this ) // `window` in a browser
