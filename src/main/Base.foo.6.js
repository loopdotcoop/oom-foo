//// OomFoo //// 1.1.4 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     { value:'OomFoo.Base.foo' }
  , REMARKS:  { value:'@TODO' }
}


//// Shortcuts to Ooms namespace and toolkit.
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `OomFoo.Base.foo()` method.
const method = OOM.OomFoo.Base.prototype.foo = function (abc) {
    let err, ME = `OomFoo.Base.foo(): ` // error prefix
    if (! (this instanceof OOM.OomFoo.Base)) throw new Error(ME
      + `Must not be called as OomFoo.Base.prototype.foo()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.xyz++
    return abc + ' ok!'

}//OomFoo.Base.foo()

//// A tally of the number of times `foo()` is called.
OOM.OomFoo.Base.prototype.xyz = 0


//// Add static constants to the `foo()` method.
Object.defineProperties(method, META)




}( 'object' === typeof global ? global : this ) // `window` in a browser
