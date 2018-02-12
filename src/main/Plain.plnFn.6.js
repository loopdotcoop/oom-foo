//// Oom.Foo //// 1.2.2 //// February 2018 //// http://oom-foo.loop.coop/ //////

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
