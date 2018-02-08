//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     { value:'OomFoo.appfn' }
  , REMARKS:  { value:'@TODO' }
}


//// Shortcuts to Ooms namespace and toolkit.
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `OomFoo.appfn()` method.
const method = OOM.OomFoo.prototype.appfn = function (abc) {
    let err, ME = `OomFoo.appfn(): ` // error prefix
    if (! (this instanceof OOM.OomFoo)) throw new Error(ME
      + `Must not be called as OomFoo.prototype.appfn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.xyz++
    return abc + ' ok!'

}//OomFoo.appfn()

//// A tally of the number of times `appfn()` is called.
OOM.OomFoo.prototype.xyz = 0


//// Add static constants to the `appfn()` method.
Object.defineProperties(method, META)




}( 'object' === typeof global ? global : this ) // `window` in a browser
