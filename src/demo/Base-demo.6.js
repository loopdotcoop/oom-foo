//// OomFoo //// 1.1.1 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {




//// Generate an instance of ${classname} with default configuration.
const instance = new ROOT.OOM.OomFoo.Base({
    firstParam: 100
  , secondParam: new Date
})
console.log(instance)


//// Run the demo.
//@TODO




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
