//\\//\\ src/main/Bases.6.js



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

        //// attr.INST_INDEX: the first Oom instance is 0, the second is 1, etc.
        //// Also increment this class’s (static) tally of instantiations.
        if (Oom === this.constructor) { // not being called by a child-class
            KIT.unwritables( attr, { INST_INDEX: Oom.stat.instTally })
            KIT.unwritables(Oom.stat, { instTally: Oom.stat.instTally+1 })
        }
    }

} : ROOT.Oom
KIT.name(Oom, 'Oom') // prevents `name` from being changed


//// Add properties to `Oom.stat` - these will be exposed to Vue etc.
if (META.LOADED_FIRST) {
    Oom.stat = {}
    KIT.unwritables( Oom.stat, {
        NAME:     'Oom'
      , VERSION:  META.VERSION
      , HOMEPAGE: 'http://oom.loop.coop/'
      , REMARKS:  'Base class for all Oom classes'
    }, { instTally:0 }) // counts instantiations
}


//// Expose `KIT` globally.
Oom.KIT = KIT




//// Oom.Foo CLASS


//// Define `Oom.Foo`, this module’s specialism of `Oom`.
Oom.Foo = class extends Oom {
}; KIT.name(Oom.Foo, 'Oom.Foo')


//// Add properties to `Oom.Foo.stat` - these will be exposed to Vue etc.
Oom.Foo.stat = {}
KIT.unwritables(Oom.Foo.stat, META, { instTally:0 })




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


    //// Adds one or more enumerable read-only property to `obj`. A property
    //// name which contains a lowercase letter is treated as configurable.
    //// Can also be used to change the value of existing properties. @TODO does Vue croak when that happens?
  , unwritables: (obj, ...srcs) =>
        srcs.forEach( src => {
            const def = {}
            for (let k in src) def[k] = {
                enumerable:true, value:src[k], configurable:/[a-z]/.test(k) }
            Object.defineProperties(obj, def)
        })


    //// Set the unwritable, unconfigurable, non-enumerable `name` property of
    //// `obj`. Usage: `name(myFn, 'myFn')`.
  , name: (obj, value) =>
        Object.defineProperty(obj, 'name', { value, configurable:false })

}, KIT) }//assignKit()


}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Post.6.js



//// Oom.Foo //// 1.2.4 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:    'Oom.Foo.Post'
  , REMARKS: '@TODO'
}

const PROPS = {
    propA: Number // or set to `null` to accept any type
  , propB: [ String, Number ] // multiple possible types
  , propC: { type:String, required:true } // a required string
  , propD: { type:Number, default:100 } // a number with default value
  , propE: { type:Object, default:function(){return[1]} } // must use factory fn
  , propF: { validator:function(v){return v>10} } // custom validator
}


//// Shortcuts to Oom’s global namespace and toolkit.
const Oom = ROOT.Oom
const KIT = Oom.KIT


//// Define the `Oom.Foo.Post` class.
const Class = Oom.Foo.Post = class extends Oom.Foo {

    constructor (config={}) {
        super(config)

        //// Validate the configuration object.
        this._validateConstructor(config)
/*
        //// Record config’s values to the `attr` object.
        this.validConstructor.forEach( valid => {
            const value = config[valid.name]
            Object.defineProperty(this.attr, valid.name, {
                value, enumerable:true, configurable:true, writable:true })
        })
        //// ready: a Promise which resolves when the instance has initialised.
        Object.defineProperty(this, 'ready', { value: this._getReady() })


        //// attr.index: the first instance of this class is `0`, the second is `1`, etc.
        if (Class === this.constructor) // not being called by a child-class
            attr.index = Class.stat.tally++ // also, update the static `tally`
*/
    }




    //// Returns a Promise which is recorded as the `ready` property, after
    //// the constructor() has validated `config` and recorded the config
    //// properties. Sub-classes can override _getReady() if they need to do
    //// other async preparation.
    //// Called by: constructor()
    _getReady () {

        //// setupStart: the time that `new Oom.Foo.Post({...})` was called.
        if (this.setupStart)
            throw new Error(`Oom.Foo.Post._getReady(): Can only run once`)
        Object.defineProperty(this, 'setupStart', { value:KIT.getNow() })

        //// `Oom.Foo.Post` does no setup, so could resolve the `ready`
        //// Promise immediately. However, to make _getReady()’s behavior
        //// consistent with classes which have a slow async setup, we introduce
        //// a miniscule delay.
        return new Promise( (resolve, reject) => { setTimeout( () => {

            //// setupEnd: the time that `_getReady()` finished running.
            Object.defineProperty(this, 'setupEnd', { value:KIT.getNow() })

            //// Define the instance’s `ready` property.
            resolve({
                setupDelay: this.setupEnd - this.setupStart
            })
        }, 0)})

    }




    //// Ensures the `config` argument passed to the `constructor()` is valid.
    //// Called by: constructor()
    _validateConstructor (config) {
        let err, value, ME = `Oom.Foo.Post._validateConstructor(): ` // error prefix
        if ('object' !== typeof config)
            throw new Error(ME+`config is type ${typeof config} not object`)
        this.validConstructor.forEach( valid => {
            if (! KIT.applyDefault(valid, config) )
                throw new TypeError(ME+`config.${valid.name} is mandatory`)
            value = config[valid.name]
            if ( err = KIT.validateType(valid, value) )
                throw new TypeError(ME+`config.${valid.name} ${err}`)
            if ( err = KIT.validateRange(valid, value) )
                throw new RangeError(ME+`config.${valid.name} ${err}`)
        })
    }


    //// Defines what the `config` argument passed to the `constructor()`
    //// should look like. Note that all of the `config` values are recorded
    //// as immutable instance properties.
    //// Called by: constructor()
    //// Called by: constructor() > _validateConstructor()
    //// Can also be used to auto-generate unit tests and auto-build GUIs.
    get validConstructor () { return [
        {
            title:   'Third Prop'
          , name:    'thirdProp'
          , alias:   'tp'

          , tooltip: 'An example object property, intended as a placeholder'
          , devtip:  'You should replace this placeholder with a real property'
          , form:    'text'

          , type:    String
          , default: 'Some default text'
        }


    ]}

    xxx (config) {
        const { hub, a, b, c } = this
        const { xx, yy, zz } = config

        ////

    }

}; KIT.name(Class, 'Oom.Foo.Post')




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Add properties to `Oom.Foo.Post.stat` - exposed to Vue etc.
Oom.Foo.Post.stat = {}
KIT.unwritables(Oom.Foo.Post.stat, META, { insts:0 })




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Router.6.js



//// Oom.Foo //// 1.2.4 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:    'Oom.Foo.Router'
  , REMARKS: '@TODO'
}

const PROPS = {
    propA: Number // or set to `null` to accept any type
  , propB: [ String, Number ] // multiple possible types
  , propC: { type:String, required:true } // a required string
  , propD: { type:Number, default:100 } // a number with default value
  , propE: { type:Object, default:function(){return[1]} } // must use factory fn
  , propF: { validator:function(v){return v>10} } // custom validator
}


//// Shortcuts to Oom’s global namespace and toolkit.
const Oom = ROOT.Oom
const KIT = Oom.KIT


//// Define the `Oom.Foo.Router` class.
const Class = Oom.Foo.Router = class extends Oom.Foo {

    constructor (config={}) {
        super(config)

        //// Validate the configuration object.
        this._validateConstructor(config)
/*
        //// Record config’s values to the `attr` object.
        this.validConstructor.forEach( valid => {
            const value = config[valid.name]
            Object.defineProperty(this.attr, valid.name, {
                value, enumerable:true, configurable:true, writable:true })
        })
        //// ready: a Promise which resolves when the instance has initialised.
        Object.defineProperty(this, 'ready', { value: this._getReady() })


        //// attr.index: the first instance of this class is `0`, the second is `1`, etc.
        if (Class === this.constructor) // not being called by a child-class
            attr.index = Class.stat.tally++ // also, update the static `tally`
*/
    }




    //// Returns a Promise which is recorded as the `ready` property, after
    //// the constructor() has validated `config` and recorded the config
    //// properties. Sub-classes can override _getReady() if they need to do
    //// other async preparation.
    //// Called by: constructor()
    _getReady () {

        //// setupStart: the time that `new Oom.Foo.Router({...})` was called.
        if (this.setupStart)
            throw new Error(`Oom.Foo.Router._getReady(): Can only run once`)
        Object.defineProperty(this, 'setupStart', { value:KIT.getNow() })

        //// `Oom.Foo.Router` does no setup, so could resolve the `ready`
        //// Promise immediately. However, to make _getReady()’s behavior
        //// consistent with classes which have a slow async setup, we introduce
        //// a miniscule delay.
        return new Promise( (resolve, reject) => { setTimeout( () => {

            //// setupEnd: the time that `_getReady()` finished running.
            Object.defineProperty(this, 'setupEnd', { value:KIT.getNow() })

            //// Define the instance’s `ready` property.
            resolve({
                setupDelay: this.setupEnd - this.setupStart
            })
        }, 0)})

    }




    //// Ensures the `config` argument passed to the `constructor()` is valid.
    //// Called by: constructor()
    _validateConstructor (config) {
        let err, value, ME = `Oom.Foo.Router._validateConstructor(): ` // error prefix
        if ('object' !== typeof config)
            throw new Error(ME+`config is type ${typeof config} not object`)
        this.validConstructor.forEach( valid => {
            if (! KIT.applyDefault(valid, config) )
                throw new TypeError(ME+`config.${valid.name} is mandatory`)
            value = config[valid.name]
            if ( err = KIT.validateType(valid, value) )
                throw new TypeError(ME+`config.${valid.name} ${err}`)
            if ( err = KIT.validateRange(valid, value) )
                throw new RangeError(ME+`config.${valid.name} ${err}`)
        })
    }


    //// Defines what the `config` argument passed to the `constructor()`
    //// should look like. Note that all of the `config` values are recorded
    //// as immutable instance properties.
    //// Called by: constructor()
    //// Called by: constructor() > _validateConstructor()
    //// Can also be used to auto-generate unit tests and auto-build GUIs.
    get validConstructor () { return [
        {
            title:   'Third Prop'
          , name:    'thirdProp'
          , alias:   'tp'

          , tooltip: 'An example object property, intended as a placeholder'
          , devtip:  'You should replace this placeholder with a real property'
          , form:    'text'

          , type:    String
          , default: 'Some default text'
        }


    ]}

    xxx (config) {
        const { hub, a, b, c } = this
        const { xx, yy, zz } = config

        ////

    }

}; KIT.name(Class, 'Oom.Foo.Router')




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Add properties to `Oom.Foo.Router.stat` - exposed to Vue etc.
Oom.Foo.Router.stat = {}
KIT.unwritables(Oom.Foo.Router.stat, META, { insts:0 })




}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.2.4 //\\//\\ http://oomtility.loop.coop //////////
