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
