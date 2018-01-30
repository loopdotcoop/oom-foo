//\\//\\ src/main/App.6.js



//// OomFoo //// 1.0.15 //// January 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     { value:'OomFoo' }
  , VERSION:  { value:'1.0.15' } // OOMBUMPABLE
  , HOMEPAGE: { value:'http://oom-foo.loop.coop/' }
  , REMARKS:  { value:'Initial test of the oom-hub architecture' }
}


//// Shortcuts to Oom’s global namespace and toolkit.
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define `OomFoo`, this module’s main entry point.
const Class = OOM.OomFoo = class {

    constructor (config={}, hub=OOM.hub) {

        //// id: Oom instances have universally unique IDs (57 billion combos).
        Object.defineProperty(this, 'id', { value:
            '123456'.replace( /./g,         c=>TOOLKIT.rndCh(48,122) )    // 0-z
                    .replace( /[:-@\[-`]/g, c=>TOOLKIT.rndCh(97,122) ) }) // a-z

        //// hub: Oom instances keep a reference to the oom-hub.
        Object.defineProperty(this, 'hub', { value:hub })

        //// Validate the configuration object.
        this._validateConstructor(config)

        //// Record config’s values as immutable properties.
        this.validConstructor.forEach( valid => {
            const value = config[valid.name]
            if (null == value) throw Error('I am unreachable?') //@TODO remove
            Object.defineProperty(this, valid.name, { value })
        })

        //// ready: a Promise which resolves when the instance has initialised.
        Object.defineProperty(this, 'ready', { value: this._getReady() })

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
            title:   'First Param'
          , name:    'firstParam' // in Vue, a key-name in `props`
          , alias:   'fp'

          , tooltip: 'An example numeric parameter, intended as a placeholder'
          , devtip:  'You should replace this placeholder with a real parameter'
          , form:    'range'
          , power:   1 // eg `8` for an exponential range-slider
          , suffix:  'Units'

          , type:    'number' // `props.firstParam.type` in Vue
          //@TODO replace with String|Number|Boolean|Function|Object|Array|Symbol
          , min:     1
          , max:     100
          , step:    1
          , default: 50 // implies `props.firstParam.required: false` in Vue
          //@TODO `props.firstParam.validator`
        }
      , {
            title:   'Second Param'
          , name:    'secondParam'
          , alias:   'sp'

          , tooltip: 'An example object parameter, intended as a placeholder'
          , devtip:  'You should replace this placeholder with a real parameter'
          , form:    'hidden'

          , type:    Date

          // no `default`, so `props.firstParam.required: true` in Vue
        }
    ]}

    xxx (config) {
        const { hub, a, b, c } = this
        const { xx, yy, zz } = config

        ////

    }

}//OomFoo


//// Add static constants to the `OomFoo` class.
Object.defineProperties(Class, META)




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
    switch (typeof valid.type) {
        case 'string':   return (typeof value === valid.type)
                           ? null : `is type ${typeof value} not ${valid.type}`
        case 'function': return (value instanceof valid.type)
                           ? null : `is not an instance of ${valid.type.name}`
        case 'object':   return (value === valid.type)
                           ? null : `is not the expected object` }
    throw new TypeError(`TOOLKIT.validateType: `
      + `valid.type for ${valid.name} is ${typeof valid.type}`)
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




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/App.topLevel.6.js



//// OomFoo //// 1.0.15 //// January 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     { value:'OomFoo.topLevel' }
  , REMARKS:  { value:'@TODO' }
}


//// Shortcuts to Ooms namespace and toolkit.
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `OomFoo.topLevel()` method.
const method = OOM.OomFoo.prototype.topLevel = function (abc) {
    let err, ME = `OomFoo.topLevel(): ` // error prefix
    if (! (this instanceof OOM.OomFoo)) throw new Error(ME
      + `Must not be called as OomFoo.prototype.topLevel()`)
    if ( err = TOOLKIT.validateType({ type:'string' }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.xyz++
    return abc + ' ok!'

}//OomFoo.topLevel()

//// A tally of the number of times `topLevel()` is called.
OOM.OomFoo.prototype.xyz = 0


//// Add static constants to the `topLevel()` method.
Object.defineProperties(method, META)




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Base.6.js



//// OomFoo //// 1.0.15 //// January 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     { value:'OomFoo.Base' }
  , REMARKS:  { value:'@TODO' }
}


//// Shortcuts to Oom’s global namespace and toolkit.
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `OomFoo.Base` class.
const Class = OOM.OomFoo.Base = class {

    constructor (config={}, hub=OOM.hub) {

        //// id: Oom instances have universally unique IDs (57 billion combos).
        Object.defineProperty(this, 'id', { value:
            '123456'.replace( /./g,         c=>TOOLKIT.rndCh(48,122) )    // 0-z
                    .replace( /[:-@\[-`]/g, c=>TOOLKIT.rndCh(97,122) ) }) // a-z

        //// hub: Oom instances keep a reference to the oom-hub.
        Object.defineProperty(this, 'hub', { value:hub })

        //// Validate the configuration object.
        this._validateConstructor(config)

        //// Record config’s values as immutable properties.
        this.validConstructor.forEach( valid => {
            const value = config[valid.name]
            if (null == value) throw Error('I am unreachable?') //@TODO remove
            Object.defineProperty(this, valid.name, { value })
        })

        //// ready: a Promise which resolves when the instance has initialised.
        Object.defineProperty(this, 'ready', { value: this._getReady() })

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
            title:   'First Param'
          , name:    'firstParam' // in Vue, a key-name in `props`
          , alias:   'fp'

          , tooltip: 'An example numeric parameter, intended as a placeholder'
          , devtip:  'You should replace this placeholder with a real parameter'
          , form:    'range'
          , power:   1 // eg `8` for an exponential range-slider
          , suffix:  'Units'

          , type:    'number' // `props.firstParam.type` in Vue
          //@TODO replace with String|Number|Boolean|Function|Object|Array|Symbol
          , min:     1
          , max:     100
          , step:    1
          , default: 50 // implies `props.firstParam.required: false` in Vue
          //@TODO `props.firstParam.validator`
        }
      , {
            title:   'Second Param'
          , name:    'secondParam'
          , alias:   'sp'

          , tooltip: 'An example object parameter, intended as a placeholder'
          , devtip:  'You should replace this placeholder with a real parameter'
          , form:    'hidden'

          , type:    Date

          // no `default`, so `props.firstParam.required: true` in Vue
        }
    ]}

    xxx (config) {
        const { hub, a, b, c } = this
        const { xx, yy, zz } = config

        ////

    }

}//OomFoo.Base


//// Add static constants to the `OomFoo.Base` class.
Object.defineProperties(Class, META)




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Base.foo.6.js



//// OomFoo //// 1.0.15 //// January 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     { value:'OomFoo.Base.foo' }
  , REMARKS:  { value:'@TODO' }
}


//// Shortcuts to Ooms namespace and toolkit.
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `OomFoo.Base.foo()` method.
const method = OOM.OomFoo.Base.prototype.foo = function (abc) {
    let err, ME = `OomFoo.Base.foo(): ` // error prefix
    if (! (this instanceof OOM.OomFoo.Base)) throw new Error(ME
      + `Must not be called as OomFoo.Base.prototype.foo()`)
    if ( err = TOOLKIT.validateType({ type:'string' }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.xyz++
    return abc + ' ok!'

}//OomFoo.Base.foo()

//// A tally of the number of times `foo()` is called.
OOM.OomFoo.Base.prototype.xyz = 0


//// Add static constants to the `foo()` method.
Object.defineProperties(method, META)




}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.0.15 //\\//\\ http://oomtility.loop.coop /////////
