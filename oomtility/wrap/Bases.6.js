${{topline}}

!function (ROOT) { 'use strict'

const META = {
    NAME:     '${{classname}}'
  , VERSION:  '${{version}}' // OOMBUMPABLE
  , HOMEPAGE: '${{homepage}}'
  , REMARKS:  '${{remarks}}'
}




//// THE Oom CLASS AND NAMESPACE


//// If not already present, define `Oom`, the base class for all Oom classes,
//// which is also Oom’s global namespace. Also, define a shortcut to it.
const Oom = ROOT.Oom = ROOT.Oom || class Oom {
}//Oom


//// Shortcut to Oom’s global toolkit (created if not present).
const TOOLKIT = Oom.TOOLKIT = assignToolkit(Oom.TOOLKIT) //@TODO test with several modules


//// Define `Oom.${{classname}}`, this module’s specialism of `Oom`.
Oom.${{classname}} = class extends Oom {
}; TOOLKIT.name(Oom.${{classname}}, 'Oom.${{classname}}')
Object.defineProperties(Oom.${{classname}}, TOOLKIT.toPropsObj(META) )




//// THE Oom.El CLASS


//// If not present, define `Oom.El`. It’s used for displaying one or more of:
//// - A Vue component
//// - An A-Frame ‘primative’ entity
//// - An OomBox
//// You can configure your Oom.El instance’s nesting rules (analogous to
//// the way <table>, <tr> and <td> work).
Oom.El = Oom.El || class extends Oom {
}; TOOLKIT.name(Oom.El, 'Oom.El')


//// Define `Oom.${{classname}}.El`, this module’s specialism of `Oom.El`.
Oom.${{classname}}.El = class extends Oom.${{classname}} {
}; TOOLKIT.name(Oom.${{classname}}.El, 'Oom.${{classname}}.El')
//@TODO add the `el` property




//// THE Oom.Mix CLASS


//// If not present, define `Oom.Mix`. It’s used for creating an A-Frame
//// component, but not an A-Frame primative entity (use `Oom.El` or `Oom.ElMix`
//// for that). It’s intended for attributes like 'position' and 'material', not
//// like 'sphere' or 'camera'. It may optionally define an A-Frame `system`.
Oom.Mix = Oom.Mix || class extends Oom {
}; TOOLKIT.name(Oom.Mix, 'Oom.Mix')


//// Define `Oom.${{classname}}.Mix`, this module’s specialism of `Oom.Mix`.
Oom.${{classname}}.Mix = class extends Oom.${{classname}} {
}; TOOLKIT.name(Oom.${{classname}}.Mix, 'Oom.${{classname}}.Mix')
//@TODO add the `mix` property




//// THE Oom.ElMix CLASS


//// If not present, define `Oom.ElMix`. It combines features of `Oom.El` and,
//// `Oom.Mix`, typically to create an A-Frame ‘primative’ entity which is based
//// on an A-Frame component.
Oom.ElMix = Oom.ElMix || class extends Oom {
}; TOOLKIT.name(Oom.ElMix, 'Oom.ElMix')


//// Define `Oom.${{classname}}.ElMix`, this module’s specialism of `Oom.ElMix`.
Oom.${{classname}}.ElMix = class extends Oom.${{classname}} {
}; TOOLKIT.name(Oom.${{classname}}.ElMix, 'Oom.${{classname}}.ElMix')
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
