//\\//\\ src/demo/Base-demo.6.js



//// OomFoo //// 1.0.13 //// January 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {




//// Generate an instance of OomFoo.Base with default configuration.
const instance = new ROOT.OOM.OomFoo.Base({
    firstParameter: 100
  , secondParameter: new Date
})
console.log(instance)


//// Run the demo.
//@TODO




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.0.13 //\\//\\ http://oomtility.loop.coop /////////
