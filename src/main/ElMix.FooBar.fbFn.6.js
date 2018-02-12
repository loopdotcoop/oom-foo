//// Oom.Foo //// 1.2.2 //// February 2018 //// http://oom-foo.loop.coop/ //////

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
