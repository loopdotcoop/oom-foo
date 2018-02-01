//// OomFoo //// 1.1.1 //// February 2018 //// http://oom-foo.loop.coop/ ///////

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
