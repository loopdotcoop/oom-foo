${{topline}}

!function (ROOT) { 'use strict'

const META = {
    NAME:     { value:'${{methodname}}' }
  , REMARKS:  { value:'${{remarks}}' }
}


//// Shortcuts to Ooms namespace and toolkit.
const OOM     = ROOT.OOM    = ROOT.OOM    || {}
const TOOLKIT = OOM.TOOLKIT = OOM.TOOLKIT || {}


//// Define the `${{methodname}}()` method.
const method = OOM.${{classname}}.prototype.${{methodshort}} = function (abc) {
    let err, ME = `${{methodname}}(): ` // error prefix
    if (! (this instanceof OOM.${{classname}})) throw new Error(ME
      + `Must not be called as ${{classname}}.prototype.${{methodshort}}()`)
    if ( err = TOOLKIT.validateType({ type:'string' }, abc) )
        throw new TypeError(ME+`abc ${err}`)

    this.xyz++
    return abc + ' ok!'

}//${{methodname}}()

//// A tally of the number of times `${{methodshort}}()` is called.
OOM.${{classname}}.prototype.xyz = 0


//// Add static constants to the `${{methodshort}}()` method.
Object.defineProperties(method, META)




}( 'object' === typeof global ? global : this ) // `window` in a browser
