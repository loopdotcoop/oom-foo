//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.ElMix.FooBar'
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
const Oom = ROOT.Oom
const TOOLKIT = Oom.TOOLKIT


//// Define the `Oom.Foo.ElMix.FooBar` class.
const Class = Oom.Foo.ElMix.FooBar = class extends Oom.Foo.ElMix {

    constructor (config={}, hub=Oom.HUB) {
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
        let err, value, ME = `Oom.Foo.ElMix.FooBar._validateConstructor(): ` // error prefix
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

}; TOOLKIT.name(Class, 'Oom.Foo.ElMix.FooBar')




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Properties added to `api` are exposed to Vue etc.
Class.api = { tally: 0 } // `tally` counts instantiations

//// Expose the `Oom.Foo.ElMix.FooBar` class’s static constants.
Object.defineProperties( Class    , TOOLKIT.toPropsObj(META) )
Object.defineProperties( Class.api, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser
