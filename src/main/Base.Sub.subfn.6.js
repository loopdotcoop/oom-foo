//// OomFoo //// 1.1.5 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'

const META = {
    NAME:     { value:'OomFoo.Base.Sub.subfn' }
  , REMARKS:  { value:'@TODO' }
}


//// Shortcuts to Ooms namespace and toolkit.
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `OomFoo.Base.Sub.subfn()` method.
const method = OOM.OomFoo.Base.Sub.prototype.subfn = function (abc) {
    let err, ME = `OomFoo.Base.Sub.subfn(): ` // error prefix
    if (! (this instanceof OOM.OomFoo.Base.Sub)) throw new Error(ME
      + `Must not be called as OomFoo.Base.Sub.prototype.subfn()`)
    if ( err = TOOLKIT.validateType({ type:String }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.xyz++
    return abc + ' ok!'

}//OomFoo.Base.Sub.subfn()

//// A tally of the number of times `subfn()` is called.
OOM.OomFoo.Base.Sub.prototype.xyz = 0


//// Add static constants to the `subfn()` method.
Object.defineProperties(method, META)




}( 'object' === typeof global ? global : this ) // `window` in a browser
