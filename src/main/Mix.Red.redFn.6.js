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
