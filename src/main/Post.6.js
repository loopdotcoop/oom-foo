//// Oom.Foo //// 1.3.8 //// May 2018 //// http://oom-foo.loop.coop/ ///////////

!function (ROOT) { 'use strict'


//// Shortcuts to Oom’s global namespace and toolkit.
const Oom = ROOT.Oom
const KIT = Oom.KIT


//// Define the `Oom.Foo.Post` class.
const Class = Oom.Foo.Post = class extends Oom.Foo {

    constructor (config={}) {
        super(config)
/*
        //// Validate the configuration object.
        this._validateConstructor(config)

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


    //// Defines this class’s static and instance properties.
    //// May be modified by ‘Plus’ classes. @TODO create and use the Plus class
    // static get schema () {
    //     return KIT.normaliseSchema(Oom.Foo.Post, Oom.Foo, {
    //
     //        //// Public static properties (known as ‘statics’ in Oom).
     //        stat: {
     //
     //            //// Public constant statics.
     //            NAME:    'Oom.Foo.Post'
     //          , REMARKS: '@TODO'
     //
     //          // , propA: Number // or set to `null` to accept any type
     //          // , propB: [ String, Number ] // multiple possible types
     //          // , propC: { type:String, required:true } // a required string
     //          , prop_d: { type:'number', default:100 } // a number with default value
     //          // , propE: { type:Object, default:function(){return[1]} } // must use factory fn
     //          // , propF: { validator:function(v){return v>10} } // custom validator
     //          , propG: 44.4
     //
     //        //// Public instance properties (known as ‘attributes’ in Oom).
     //        }, attr: {
     //
     //            OK: 123
     //
     //          // , propA: Number // or set to `null` to accept any type
     //          // , propB: [ String, Number ] // multiple possible types
     //          // , propC: { type:String, required:true } // a required string
     //          , prop_d: { type:Number, default:5.5 } // a number with default value
     //          // , propE: { type:Object, default:function(){return[1]} } // must use factory fn
     //          // , propF: { validator:function(v){return v>10} } // custom validator
     //          , propG: 44.4
     //
     //        }
     //    })//KIT.normaliseSchema()
     // }//schema


/*
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
*/

}; KIT.name(Class, 'Oom.Foo.Post')


//// Define this class’s static and instance properties.
Oom.Foo.Post.mixin({
    title: 'The Oom.Foo.Post Schema'
  , remarks: 'Defines metadata for this module'
  , location: 'src/main/Post.6.js'

  , config: {} //@TODO

    //// Public static properties (known as ‘statics’ in Oom).
  , stat: {

        //// Public constant statics.
        NAME:    'Oom.Foo.Post'
      , REMARKS: '@TODO'

      // , propA: Number // or set to `null` to accept any type
      // , propB: [ String, Number ] // multiple possible types
      // , propC: { type:String, required:true } // a required string
      , prop_d: { type:'number', default:100 } // a number with default value
      // , propE: { type:Object, default:function(){return[1]} } // must use factory fn
      // , propF: { validator:function(v){return v>10} } // custom validator
      , propG: 44.4

    //// Public instance properties (known as ‘attributes’ in Oom).
    }, attr: {

        OK: 123

      // , propA: Number // or set to `null` to accept any type
      // , propB: [ String, Number ] // multiple possible types
      // , propC: { type:String, required:true } // a required string
      , prop_d: { type:Number, default:5.5 } // a number with default value
      // , propE: { type:Object, default:function(){return[1]} } // must use factory fn
      // , propF: { validator:function(v){return v>10} } // custom validator
      , propG: 44.4

    }

})//Oom.Foo.mixin()

// //// Create the plain `Class.stat` object (which Vue watches) and add public
// //// statics to it. Arg 2 of `KIT.define()` is `true` for statics.
// Oom.Foo.Post.stat = {}
// KIT.define(Oom.Foo.Post.stat, true, Oom.Foo.Post.schema.stat)
//
// //// Create the plain `inst.attr` object (which Vue watches) and add public
// //// attributes to it. Arg 2 of `KIT.define()` is `false` for attributes.
// Oom.Foo.Post.prototype.attr = {}
// KIT.define(Oom.Foo.Post.prototype.attr, false, Oom.Foo.Post.schema.attr)
//



//// PRIVATE FUNCTIONS


//// Place any private functions here.
// function noop () {}




}( 'object' === typeof global ? global : this ) // `window` in a browser
