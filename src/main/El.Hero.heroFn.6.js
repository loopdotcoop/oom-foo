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
