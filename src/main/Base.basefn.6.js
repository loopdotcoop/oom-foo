//// OomFoo //// 1.1.6 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     { value:'OomFoo.Base.basefn' }
  , REMARKS:  { value:'@TODO' }
}


//// Shortcuts to Ooms namespace and toolkit.
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `OomFoo.Base.basefn()` method.
const method = OOM.OomFoo.Base.prototype.basefn = function (abc) {
    let err, ME = `OomFoo.Base.basefn(): ` // error prefix
    if (! (this instanceof OOM.OomFoo.Base)) throw new Error(ME
      + `Must not be called as OomFoo.Base.prototype.basefn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.xyz++
    return abc + ' ok!'

}//OomFoo.Base.basefn()

//// A tally of the number of times `basefn()` is called.
OOM.OomFoo.Base.prototype.xyz = 0


//// Add static constants to the `basefn()` method.
Object.defineProperties(method, META)




}( 'object' === typeof global ? global : this ) // `window` in a browser
