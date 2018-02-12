//\\//\\ src/main/Bases.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Foo'
  , VERSION:  '1.2.1' // OOMBUMPABLE
  , HOMEPAGE: 'http://oom-foo.loop.coop/'
  , REMARKS:  'Initial test of the oom-hub architecture'
}




//// THE Oom CLASS AND NAMESPACE


//// If not already present, define `Oom`, the base class for all Oom classes,
//// which is also Oom’s global namespace. Also, define a shortcut to it.
const Oom = ROOT.Oom = ROOT.Oom || class Oom {
}//Oom


//// Shortcut to Oom’s global toolkit (created if not present).
const TOOLKIT = Oom.TOOLKIT = assignToolkit(Oom.TOOLKIT) //@TODO test with several modules


//// Define `Oom.Foo`, this module’s specialism of `Oom`.
Oom.Foo = class extends Oom {
}; TOOLKIT.name(Oom.Foo, 'Oom.Foo')
Object.defineProperties(Oom.Foo, TOOLKIT.toPropsObj(META) )




//// THE Oom.El CLASS


//// If not present, define `Oom.El`. It’s used for displaying one or more of:
//// - A Vue component
//// - An A-Frame ‘primative’ entity
//// - An OomBox
//// You can configure your Oom.El instance’s nesting rules (analogous to
//// the way <table>, <tr> and <td> work).
Oom.El = Oom.El || class extends Oom {
}; TOOLKIT.name(Oom.El, 'Oom.El')


//// Define `Oom.Foo.El`, this module’s specialism of `Oom.El`.
Oom.Foo.El = class extends Oom.Foo {
}; TOOLKIT.name(Oom.Foo.El, 'Oom.Foo.El')
//@TODO add the `el` property




//// THE Oom.Mix CLASS


//// If not present, define `Oom.Mix`. It’s used for creating an A-Frame
//// component, but not an A-Frame primative entity (use `Oom.El` or `Oom.ElMix`
//// for that). It’s intended for attributes like 'position' and 'material', not
//// like 'sphere' or 'camera'. It may optionally define an A-Frame `system`.
Oom.Mix = Oom.Mix || class extends Oom {
}; TOOLKIT.name(Oom.Mix, 'Oom.Mix')


//// Define `Oom.Foo.Mix`, this module’s specialism of `Oom.Mix`.
Oom.Foo.Mix = class extends Oom.Foo {
}; TOOLKIT.name(Oom.Foo.Mix, 'Oom.Foo.Mix')
//@TODO add the `mix` property




//// THE Oom.ElMix CLASS


//// If not present, define `Oom.ElMix`. It combines features of `Oom.El` and,
//// `Oom.Mix`, typically to create an A-Frame ‘primative’ entity which is based
//// on an A-Frame component.
Oom.ElMix = Oom.ElMix || class extends Oom {
}; TOOLKIT.name(Oom.ElMix, 'Oom.ElMix')


//// Define `Oom.Foo.ElMix`, this module’s specialism of `Oom.ElMix`.
Oom.Foo.ElMix = class extends Oom.Foo {
}; TOOLKIT.name(Oom.Foo.ElMix, 'Oom.Foo.ElMix')
//@TODO add the `elMix` property




//// TOOLKIT FUNCTIONS


function assignToolkit (TOOLKIT={}) { return Object.assign({}, {

    //// Return a random character within char-code start/end positions 's' and 'e'.
    rndCh: (s, e) => String.fromCharCode(Math.random() * (e-s) + s)


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


    //// Convert an object like { FOO:1, BAR:2 } to
    //// { FOO:{ value:1, enumerable:true }, BAR:{ value:2, enumerable:true} }
    //// making it suitable to pass to `Object.defineProperties()`.
  , toPropsObj: src => {
        const obj = {}
        for (let k in src) obj[k] = { value:src[k], enumerable:true }
        return obj
    }


    //// Set the unwritable `name` property of `obj`, eg `name(myFn, 'myFn')`.
  , name: (obj, name) =>
        Object.defineProperty(obj, 'name', { value:name, writable:false })

}, TOOLKIT) }//assignToolkit()


}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/El.Hero.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.El.Hero'
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


//// Define the `Oom.Foo.El.Hero` class.
const Class = Oom.Foo.El.Hero = class extends Oom.Foo.El {

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
        let err, value, ME = `Oom.Foo.El.Hero._validateConstructor(): ` // error prefix
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

}; TOOLKIT.name(Class, 'Oom.Foo.El.Hero')




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Properties added to `api` are exposed to Vue etc.
Class.api = { tally: 0 } // `tally` counts instantiations

//// Expose the `Oom.Foo.El.Hero` class’s static constants.
Object.defineProperties( Class    , TOOLKIT.toPropsObj(META) )
Object.defineProperties( Class.api, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/El.Hero.Sub.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.El.Hero.Sub'
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


//// Define the `Oom.Foo.El.Hero.Sub` class.
const Class = Oom.Foo.El.Hero.Sub = class extends Oom.Foo.El.Hero {

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
        let err, value, ME = `Oom.Foo.El.Hero.Sub._validateConstructor(): ` // error prefix
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

}; TOOLKIT.name(Class, 'Oom.Foo.El.Hero.Sub')




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Properties added to `api` are exposed to Vue etc.
Class.api = { tally: 0 } // `tally` counts instantiations

//// Expose the `Oom.Foo.El.Hero.Sub` class’s static constants.
Object.defineProperties( Class    , TOOLKIT.toPropsObj(META) )
Object.defineProperties( Class.api, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/El.Hero.Sub.subFn.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.El.Hero.Sub.subFn'
  , REMARKS:  '@TODO'
}


//// Shortcuts to Oom’s global namespace and toolkit, and this method’s class.
const Oom = ROOT.Oom
const TOOLKIT = Oom.TOOLKIT
const Class = Oom.Foo.El.Hero.Sub


//// Define the `Oom.Foo.El.Hero.Sub.subFn()` method.
const method = Class.prototype.subFn = function (abc) {
    let err, ME = `Oom.Foo.El.Hero.Sub.subFn(): ` // error prefix
    if (! (this instanceof Class)) throw new Error(ME
      + `Must not be called as Oom.Foo.El.Hero.Sub.prototype.subFn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.subFn_calltally++
    return abc + ' ok!'

}//Oom.Foo.El.Hero.Sub.subFn()


//// A tally of the number of times `subFn()` is called.
Class.prototype.subFn_calltally = 0


//// Add static constants to the `subFn()` method.
Object.defineProperties( method, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/El.Hero.heroFn.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.El.Hero.heroFn'
  , REMARKS:  '@TODO'
}


//// Shortcuts to Oom’s global namespace and toolkit, and this method’s class.
const Oom = ROOT.Oom
const TOOLKIT = Oom.TOOLKIT
const Class = Oom.Foo.El.Hero


//// Define the `Oom.Foo.El.Hero.heroFn()` method.
const method = Class.prototype.heroFn = function (abc) {
    let err, ME = `Oom.Foo.El.Hero.heroFn(): ` // error prefix
    if (! (this instanceof Class)) throw new Error(ME
      + `Must not be called as Oom.Foo.El.Hero.prototype.heroFn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.heroFn_calltally++
    return abc + ' ok!'

}//Oom.Foo.El.Hero.heroFn()


//// A tally of the number of times `heroFn()` is called.
Class.prototype.heroFn_calltally = 0


//// Add static constants to the `heroFn()` method.
Object.defineProperties( method, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/ElMix.FooBar.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

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




//\\//\\ src/main/ElMix.FooBar.Sub.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.ElMix.FooBar.Sub'
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


//// Define the `Oom.Foo.ElMix.FooBar.Sub` class.
const Class = Oom.Foo.ElMix.FooBar.Sub = class extends Oom.Foo.ElMix.FooBar {

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
        let err, value, ME = `Oom.Foo.ElMix.FooBar.Sub._validateConstructor(): ` // error prefix
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

}; TOOLKIT.name(Class, 'Oom.Foo.ElMix.FooBar.Sub')




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Properties added to `api` are exposed to Vue etc.
Class.api = { tally: 0 } // `tally` counts instantiations

//// Expose the `Oom.Foo.ElMix.FooBar.Sub` class’s static constants.
Object.defineProperties( Class    , TOOLKIT.toPropsObj(META) )
Object.defineProperties( Class.api, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/ElMix.FooBar.Sub.subFn.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.ElMix.FooBar.Sub.subFn'
  , REMARKS:  '@TODO'
}


//// Shortcuts to Oom’s global namespace and toolkit, and this method’s class.
const Oom = ROOT.Oom
const TOOLKIT = Oom.TOOLKIT
const Class = Oom.Foo.ElMix.FooBar.Sub


//// Define the `Oom.Foo.ElMix.FooBar.Sub.subFn()` method.
const method = Class.prototype.subFn = function (abc) {
    let err, ME = `Oom.Foo.ElMix.FooBar.Sub.subFn(): ` // error prefix
    if (! (this instanceof Class)) throw new Error(ME
      + `Must not be called as Oom.Foo.ElMix.FooBar.Sub.prototype.subFn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.subFn_calltally++
    return abc + ' ok!'

}//Oom.Foo.ElMix.FooBar.Sub.subFn()


//// A tally of the number of times `subFn()` is called.
Class.prototype.subFn_calltally = 0


//// Add static constants to the `subFn()` method.
Object.defineProperties( method, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/ElMix.FooBar.fbFn.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.ElMix.FooBar.fbFn'
  , REMARKS:  '@TODO'
}


//// Shortcuts to Oom’s global namespace and toolkit, and this method’s class.
const Oom = ROOT.Oom
const TOOLKIT = Oom.TOOLKIT
const Class = Oom.Foo.ElMix.FooBar


//// Define the `Oom.Foo.ElMix.FooBar.fbFn()` method.
const method = Class.prototype.fbFn = function (abc) {
    let err, ME = `Oom.Foo.ElMix.FooBar.fbFn(): ` // error prefix
    if (! (this instanceof Class)) throw new Error(ME
      + `Must not be called as Oom.Foo.ElMix.FooBar.prototype.fbFn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.fbFn_calltally++
    return abc + ' ok!'

}//Oom.Foo.ElMix.FooBar.fbFn()


//// A tally of the number of times `fbFn()` is called.
Class.prototype.fbFn_calltally = 0


//// Add static constants to the `fbFn()` method.
Object.defineProperties( method, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Mix.Red.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.Mix.Red'
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


//// Define the `Oom.Foo.Mix.Red` class.
const Class = Oom.Foo.Mix.Red = class extends Oom.Foo.Mix {

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
        let err, value, ME = `Oom.Foo.Mix.Red._validateConstructor(): ` // error prefix
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

}; TOOLKIT.name(Class, 'Oom.Foo.Mix.Red')




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Properties added to `api` are exposed to Vue etc.
Class.api = { tally: 0 } // `tally` counts instantiations

//// Expose the `Oom.Foo.Mix.Red` class’s static constants.
Object.defineProperties( Class    , TOOLKIT.toPropsObj(META) )
Object.defineProperties( Class.api, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Mix.Red.Sub.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.Mix.Red.Sub'
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


//// Define the `Oom.Foo.Mix.Red.Sub` class.
const Class = Oom.Foo.Mix.Red.Sub = class extends Oom.Foo.Mix.Red {

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
        let err, value, ME = `Oom.Foo.Mix.Red.Sub._validateConstructor(): ` // error prefix
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

}; TOOLKIT.name(Class, 'Oom.Foo.Mix.Red.Sub')




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Properties added to `api` are exposed to Vue etc.
Class.api = { tally: 0 } // `tally` counts instantiations

//// Expose the `Oom.Foo.Mix.Red.Sub` class’s static constants.
Object.defineProperties( Class    , TOOLKIT.toPropsObj(META) )
Object.defineProperties( Class.api, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Mix.Red.Sub.subFn.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.Mix.Red.Sub.subFn'
  , REMARKS:  '@TODO'
}


//// Shortcuts to Oom’s global namespace and toolkit, and this method’s class.
const Oom = ROOT.Oom
const TOOLKIT = Oom.TOOLKIT
const Class = Oom.Foo.Mix.Red.Sub


//// Define the `Oom.Foo.Mix.Red.Sub.subFn()` method.
const method = Class.prototype.subFn = function (abc) {
    let err, ME = `Oom.Foo.Mix.Red.Sub.subFn(): ` // error prefix
    if (! (this instanceof Class)) throw new Error(ME
      + `Must not be called as Oom.Foo.Mix.Red.Sub.prototype.subFn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.subFn_calltally++
    return abc + ' ok!'

}//Oom.Foo.Mix.Red.Sub.subFn()


//// A tally of the number of times `subFn()` is called.
Class.prototype.subFn_calltally = 0


//// Add static constants to the `subFn()` method.
Object.defineProperties( method, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Mix.Red.redFn.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.Mix.Red.redFn'
  , REMARKS:  '@TODO'
}


//// Shortcuts to Oom’s global namespace and toolkit, and this method’s class.
const Oom = ROOT.Oom
const TOOLKIT = Oom.TOOLKIT
const Class = Oom.Foo.Mix.Red


//// Define the `Oom.Foo.Mix.Red.redFn()` method.
const method = Class.prototype.redFn = function (abc) {
    let err, ME = `Oom.Foo.Mix.Red.redFn(): ` // error prefix
    if (! (this instanceof Class)) throw new Error(ME
      + `Must not be called as Oom.Foo.Mix.Red.prototype.redFn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.redFn_calltally++
    return abc + ' ok!'

}//Oom.Foo.Mix.Red.redFn()


//// A tally of the number of times `redFn()` is called.
Class.prototype.redFn_calltally = 0


//// Add static constants to the `redFn()` method.
Object.defineProperties( method, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Plain.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.Plain'
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


//// Define the `Oom.Foo.Plain` class.
const Class = Oom.Foo.Plain = class extends Oom.Foo {

    constructor (config={}, hub=Oom.HUB) {
        super(config, hub)

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

        //// setupStart: the time that `new Oom.Foo.Plain({...})` was called.
        if (this.setupStart)
            throw new Error(`Oom.Foo.Plain._getReady(): Can only run once`)
        Object.defineProperty(this, 'setupStart', { value:TOOLKIT.getNow() })

        //// `Oom.Foo.Plain` does no setup, so could resolve the `ready`
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
        let err, value, ME = `Oom.Foo.Plain._validateConstructor(): ` // error prefix
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

}; TOOLKIT.name(Class, 'Oom.Foo.Plain')




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Properties added to `api` are exposed to Vue etc.
Class.api = { tally: 0 } // `tally` counts instantiations

//// Expose the `Oom.Foo.Plain` class’s static constants.
Object.defineProperties( Class    , TOOLKIT.toPropsObj(META) )
Object.defineProperties( Class.api, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Plain.Sub.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.Plain.Sub'
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


//// Define the `Oom.Foo.Plain.Sub` class.
const Class = Oom.Foo.Plain.Sub = class extends Oom.Foo.Plain {

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
        let err, value, ME = `Oom.Foo.Plain.Sub._validateConstructor(): ` // error prefix
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

}; TOOLKIT.name(Class, 'Oom.Foo.Plain.Sub')




//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




//// FINISHING UP


//// Properties added to `api` are exposed to Vue etc.
Class.api = { tally: 0 } // `tally` counts instantiations

//// Expose the `Oom.Foo.Plain.Sub` class’s static constants.
Object.defineProperties( Class    , TOOLKIT.toPropsObj(META) )
Object.defineProperties( Class.api, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Plain.Sub.subFn.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.Plain.Sub.subFn'
  , REMARKS:  '@TODO'
}


//// Shortcuts to Oom’s global namespace and toolkit, and this method’s class.
const Oom = ROOT.Oom
const TOOLKIT = Oom.TOOLKIT
const Class = Oom.Foo.Plain.Sub


//// Define the `Oom.Foo.Plain.Sub.subFn()` method.
const method = Class.prototype.subFn = function (abc) {
    let err, ME = `Oom.Foo.Plain.Sub.subFn(): ` // error prefix
    if (! (this instanceof Class)) throw new Error(ME
      + `Must not be called as Oom.Foo.Plain.Sub.prototype.subFn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.subFn_calltally++
    return abc + ' ok!'

}//Oom.Foo.Plain.Sub.subFn()


//// A tally of the number of times `subFn()` is called.
Class.prototype.subFn_calltally = 0


//// Add static constants to the `subFn()` method.
Object.defineProperties( method, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/main/Plain.plnFn.6.js



//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'

const META = {
    NAME:     'Oom.Foo.Plain.plnFn'
  , REMARKS:  '@TODO'
}


//// Shortcuts to Oom’s global namespace and toolkit, and this method’s class.
const Oom = ROOT.Oom
const TOOLKIT = Oom.TOOLKIT
const Class = Oom.Foo.Plain


//// Define the `Oom.Foo.Plain.plnFn()` method.
const method = Class.prototype.plnFn = function (abc) {
    let err, ME = `Oom.Foo.Plain.plnFn(): ` // error prefix
    if (! (this instanceof Class)) throw new Error(ME
      + `Must not be called as Oom.Foo.Plain.prototype.plnFn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.plnFn_calltally++
    return abc + ' ok!'

}//Oom.Foo.Plain.plnFn()


//// A tally of the number of times `plnFn()` is called.
Class.prototype.plnFn_calltally = 0


//// Add static constants to the `plnFn()` method.
Object.defineProperties( method, TOOLKIT.toPropsObj(META) )




}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.2.1 //\\//\\ http://oomtility.loop.coop //////////
