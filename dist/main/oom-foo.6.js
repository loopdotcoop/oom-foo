//\\//\\ src/main/App.6.js



//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'OomFoo'
  , VERSION:  '1.1.7' // OOMBUMPABLE
  , HOMEPAGE: 'http://oom-foo.loop.coop/'
  , REMARKS:  'Initial test of the oom-hub architecture'
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
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define `OomFoo`, this module’s main entry point.
const Class = OOM.OomFoo = class OomFoo {

    constructor (config={}, hub=OOM.hub) {
        //// Properties added to `api` are exposed to Vue etc.
        const api = this.api = {}

        //// api.UUID: Oom instances have universally unique IDs (57 billion combos).
        Object.defineProperty(api, 'UUID', { enumerable:true, configurable:false, value:
            '123456'.replace( /./g,         c=>TOOLKIT.rndCh(48,122) )    // 0-z
                    .replace( /[:-@\[-`]/g, c=>TOOLKIT.rndCh(97,122) ) }) // a-z


        //// hub: Oom instances keep a reference to the oom-hub.
        Object.defineProperty(this, 'hub', { value:hub })

        //// Validate the configuration object.
        this._validateConstructor(config)

        //// Record config’s values to the `api` object.
        this.validConstructor.forEach( valid => {
            const value = config[valid.name]
            Object.defineProperty(this.api, valid.name, {
                value, enumerable:true, configurable:true, writable:true })
        })
        //// ready: a Promise which resolves when the instance has initialised.
        Object.defineProperty(this, 'ready', { value: this._getReady() })


        //// api.index: the first instance of this class is `0`, the second is `1`, etc.
        if (Class === this.constructor) // not being called by a child-class
            api.index = Class.api.tally++ // also, update the static `tally`
    }




    //// Returns a Promise which is recorded as the `ready` property, after
    //// the constructor() has validated `config` and recorded the config
    //// properties. Sub-classes can override _getReady() if they need to do
    //// other async preparation.
    //// Called by: constructor()
    _getReady () {

        //// setupStart: the time that `new OomFoo({...})` was called.
        if (this.setupStart)
            throw new Error(`OomFoo._getReady(): Can only run once`)
        Object.defineProperty(this, 'setupStart', { value:TOOLKIT.getNow() })

        //// `OomFoo` does no setup, so could resolve the `ready`
        //// Promise immediately. However, to make _getReady()’s behavior
        //// consistent with classes which have a slow async setup, we introduce
        //// a miniscule delay.
        return new Promise( (resolve, reject) => { setTimeout( () => {

            //// setupEnd: the time that `_getReady()` finished running.
            Object.defineProperty(this, 'setupEnd', { value:TOOLKIT.getNow() })

            //// Define the instance’s `ready` property.
            resolve({
                setupDelay: this.setupEnd - this.setupStart
            })
        }, 0)})

    }




    //// Ensures the `config` argument passed to the `constructor()` is valid.
    //// Called by: constructor()
    _validateConstructor (config) {
        let err, value, ME = `OomFoo._validateConstructor(): ` // error prefix
        if ('object' !== typeof config)
            throw new Error(ME+`config is type ${typeof config} not object`)
        this.validConstructor.forEach( valid => {
            if (! TOOLKIT.applyDefault(valid, config) )
                throw new TypeError(ME+`config.${valid.name} is mandatory`)
            value = config[valid.name]
            if ( err = TOOLKIT.validateType(valid, value) )
                throw new TypeError(ME+`config.${valid.name} ${err}`)
            if ( err = TOOLKIT.validateRange(valid, value) )
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
            title:   'First Prop'
          , name:    'firstProp' // in Vue, a key-name in `props`
          , alias:   'fp'

          , tooltip: 'An example numeric property, intended as a placeholder'
          , devtip:  'You should replace this placeholder with a real property'
          , form:    'range'
          , power:   1 // eg `8` for an exponential range-slider
          , suffix:  'Units'

          , type:    Number // `props.firstProp.type` in Vue
          , min:     1
          , max:     100
          , step:    1
          , default: 50 // implies `props.firstProp.required: false` in Vue
          //@TODO `props.firstProp.validator`
        }
      , {
            title:   'Second Prop'
          , name:    'secondProp'
          , alias:   'sp'

          , tooltip: 'An example object property, intended as a placeholder'
          , devtip:  'You should replace this placeholder with a real property'
          , form:    'hidden'

          , type:    Date
          // no `default`, so `props.firstProp.required: true` in Vue
        }


    ]}

    xxx (config) {
        const { hub, a, b, c } = this
        const { xx, yy, zz } = config

        ////

    }

}//OomFoo




//// TOOLKIT FUNCTIONS


//// Return a random character within char-code start/end positions 's' and 'e'.
TOOLKIT.rndCh = TOOLKIT.rndCh || ( (s, e) =>
    String.fromCharCode(Math.random() * (e-s) + s) )


//// @TODO describe these three
TOOLKIT.applyDefault = TOOLKIT.applyDefault || ( (valid, config) => {
    if ( config.hasOwnProperty(valid.name) )
        return true // `true` here signifies default didn’t need to be applied
    if (! valid.hasOwnProperty('default') )
        return false // `false` signifies a missing mandatory field
    config[valid.name] = 'function' === typeof valid.default
      ? valid.default(config) // a value can depend on another config value
      : valid.default
    return true // `true` here signifies default was successfully applied
})

TOOLKIT.validateType = TOOLKIT.validateType || ( (valid, value) => {
    const ME = `TOOLKIT.validateType: `, C = 'constructor'
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
})

TOOLKIT.validateRange = TOOLKIT.validateRange || ( (valid, value) => {
    if (null != valid.min && valid.min > value)
        return `is less than the minimum ${valid.min}`
    if (null != valid.max && valid.max < value)
        return `is greater than the maximum ${valid.max}`
    if (null != valid.step && ((value/valid.step) % 1))
        return `${value} ÷ ${valid.step} leaves ${(value/valid.step) % 1}`
})


//// Cross-platform millisecond-timer.
TOOLKIT.getNow = TOOLKIT.getNow || ( () => {
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
})


//// Convert an object like { FOO:1, BAR:2 } to
//// { FOO:{ value:1, enumerable:true }, BAR:{ value:2, enumerable:true} }
//// making it suitable to pass to `Object.defineProperties()`.
TOOLKIT.toPropsObj = TOOLKIT.toPropsObj || ( src => {
    const obj = {}
    for (let k in src) obj[k] = { value:src[k], enumerable:true }
    return obj
})




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Properties added to `api` are exposed to Vue etc.
Class.api = { tally: 0 } // `tally` counts instantiations

//// Expose the `OomFoo` class’s static constants.
Object.defineProperties( Class    , TOOLKIT.toPropsObj(META) )
Object.defineProperties( Class.api, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/App.appfn.6.js



//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     { value:'OomFoo.appfn' }
  , REMARKS:  { value:'@TODO' }
}


//// Shortcuts to Ooms namespace and toolkit.
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `OomFoo.appfn()` method.
const method = OOM.OomFoo.prototype.appfn = function (abc) {
    let err, ME = `OomFoo.appfn(): ` // error prefix
    if (! (this instanceof OOM.OomFoo)) throw new Error(ME
      + `Must not be called as OomFoo.prototype.appfn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.xyz++
    return abc + ' ok!'

}//OomFoo.appfn()

//// A tally of the number of times `appfn()` is called.
OOM.OomFoo.prototype.xyz = 0


//// Add static constants to the `appfn()` method.
Object.defineProperties(method, META)




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Base.6.js



//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'OomFoo.Base'
  , REMARKS:  '@TODO'
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
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `OomFoo.Base` class.
const Class = OOM.OomFoo.Base = class Base {

    constructor (config={}, hub=OOM.hub) {
        //// Properties added to `api` are exposed to Vue etc.
        const api = this.api = {}

        //// api.UUID: Oom instances have universally unique IDs (57 billion combos).
        Object.defineProperty(api, 'UUID', { enumerable:true, configurable:false, value:
            '123456'.replace( /./g,         c=>TOOLKIT.rndCh(48,122) )    // 0-z
                    .replace( /[:-@\[-`]/g, c=>TOOLKIT.rndCh(97,122) ) }) // a-z


        //// hub: Oom instances keep a reference to the oom-hub.
        Object.defineProperty(this, 'hub', { value:hub })

        //// Validate the configuration object.
        this._validateConstructor(config)

        //// Record config’s values to the `api` object.
        this.validConstructor.forEach( valid => {
            const value = config[valid.name]
            Object.defineProperty(this.api, valid.name, {
                value, enumerable:true, configurable:true, writable:true })
        })
        //// ready: a Promise which resolves when the instance has initialised.
        Object.defineProperty(this, 'ready', { value: this._getReady() })


        //// api.index: the first instance of this class is `0`, the second is `1`, etc.
        if (Class === this.constructor) // not being called by a child-class
            api.index = Class.api.tally++ // also, update the static `tally`
    }




    //// Returns a Promise which is recorded as the `ready` property, after
    //// the constructor() has validated `config` and recorded the config
    //// properties. Sub-classes can override _getReady() if they need to do
    //// other async preparation.
    //// Called by: constructor()
    _getReady () {

        //// setupStart: the time that `new OomFoo.Base({...})` was called.
        if (this.setupStart)
            throw new Error(`OomFoo.Base._getReady(): Can only run once`)
        Object.defineProperty(this, 'setupStart', { value:TOOLKIT.getNow() })

        //// `OomFoo.Base` does no setup, so could resolve the `ready`
        //// Promise immediately. However, to make _getReady()’s behavior
        //// consistent with classes which have a slow async setup, we introduce
        //// a miniscule delay.
        return new Promise( (resolve, reject) => { setTimeout( () => {

            //// setupEnd: the time that `_getReady()` finished running.
            Object.defineProperty(this, 'setupEnd', { value:TOOLKIT.getNow() })

            //// Define the instance’s `ready` property.
            resolve({
                setupDelay: this.setupEnd - this.setupStart
            })
        }, 0)})

    }




    //// Ensures the `config` argument passed to the `constructor()` is valid.
    //// Called by: constructor()
    _validateConstructor (config) {
        let err, value, ME = `OomFoo.Base._validateConstructor(): ` // error prefix
        if ('object' !== typeof config)
            throw new Error(ME+`config is type ${typeof config} not object`)
        this.validConstructor.forEach( valid => {
            if (! TOOLKIT.applyDefault(valid, config) )
                throw new TypeError(ME+`config.${valid.name} is mandatory`)
            value = config[valid.name]
            if ( err = TOOLKIT.validateType(valid, value) )
                throw new TypeError(ME+`config.${valid.name} ${err}`)
            if ( err = TOOLKIT.validateRange(valid, value) )
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

}//OomFoo.Base




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Properties added to `api` are exposed to Vue etc.
Class.api = { tally: 0 } // `tally` counts instantiations

//// Expose the `OomFoo.Base` class’s static constants.
Object.defineProperties( Class    , TOOLKIT.toPropsObj(META) )
Object.defineProperties( Class.api, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Base.Sub.6.js



//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'OomFoo.Base.Sub'
  , REMARKS:  '@TODO'
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
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `OomFoo.Base.Sub` class.
const Class = OOM.OomFoo.Base.Sub = class Sub extends OOM.OomFoo.Base {

    constructor (config={}, hub=OOM.hub) {
        super(config, hub)

        //// Properties added to `api` are exposed to Vue etc.
        const api = this.api = {}


        //// hub: Oom instances keep a reference to the oom-hub.
        Object.defineProperty(this, 'hub', { value:hub })

        //// Validate the configuration object.
        this._validateConstructor(config)

        //// Record config’s values to the `api` object.
        this.validConstructor.forEach( valid => {
            const value = config[valid.name]
            Object.defineProperty(this.api, valid.name, {
                value, enumerable:true, configurable:true, writable:true })
        })

        //// api.index: the first instance of this class is `0`, the second is `1`, etc.
        if (Class === this.constructor) // not being called by a child-class
            api.index = Class.api.tally++ // also, update the static `tally`
    }




    //// Ensures the `config` argument passed to the `constructor()` is valid.
    //// Called by: constructor()
    _validateConstructor (config) {
        let err, value, ME = `OomFoo.Base.Sub._validateConstructor(): ` // error prefix
        if ('object' !== typeof config)
            throw new Error(ME+`config is type ${typeof config} not object`)
        this.validConstructor.forEach( valid => {
            if (! TOOLKIT.applyDefault(valid, config) )
                throw new TypeError(ME+`config.${valid.name} is mandatory`)
            value = config[valid.name]
            if ( err = TOOLKIT.validateType(valid, value) )
                throw new TypeError(ME+`config.${valid.name} ${err}`)
            if ( err = TOOLKIT.validateRange(valid, value) )
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

}//OomFoo.Base.Sub




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Properties added to `api` are exposed to Vue etc.
Class.api = { tally: 0 } // `tally` counts instantiations

//// Expose the `OomFoo.Base.Sub` class’s static constants.
Object.defineProperties( Class    , TOOLKIT.toPropsObj(META) )
Object.defineProperties( Class.api, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Base.Sub.subfn.6.js



//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     { value:'OomFoo.Base.Sub.subfn' }
  , REMARKS:  { value:'@TODO' }
}


//// Shortcuts to Ooms namespace and toolkit.
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `OomFoo.Base.Sub.subfn()` method.
const method = OOM.OomFoo.Base.Sub.prototype.subfn = function (abc) {
    let err, ME = `OomFoo.Base.Sub.subfn(): ` // error prefix
    if (! (this instanceof OOM.OomFoo.Base.Sub)) throw new Error(ME
      + `Must not be called as OomFoo.Base.Sub.prototype.subfn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.xyz++
    return abc + ' ok!'

}//OomFoo.Base.Sub.subfn()

//// A tally of the number of times `subfn()` is called.
OOM.OomFoo.Base.Sub.prototype.xyz = 0


//// Add static constants to the `subfn()` method.
Object.defineProperties(method, META)




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Base.basefn.6.js



//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     { value:'OomFoo.Base.basefn' }
  , REMARKS:  { value:'@TODO' }
}


//// Shortcuts to Ooms namespace and toolkit.
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `OomFoo.Base.basefn()` method.
const method = OOM.OomFoo.Base.prototype.basefn = function (abc) {
    let err, ME = `OomFoo.Base.basefn(): ` // error prefix
    if (! (this instanceof OOM.OomFoo.Base)) throw new Error(ME
      + `Must not be called as OomFoo.Base.prototype.basefn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.xyz++
    return abc + ' ok!'

}//OomFoo.Base.basefn()

//// A tally of the number of times `basefn()` is called.
OOM.OomFoo.Base.prototype.xyz = 0


//// Add static constants to the `basefn()` method.
Object.defineProperties(method, META)




}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.1.7 //\\//\\ http://oomtility.loop.coop //////////
