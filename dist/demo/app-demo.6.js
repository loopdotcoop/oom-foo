//\\//\\ src/demo/App-demo.6.js



//// OomFoo //// 1.0.14 //// January 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {




//// Generate an instance of OomFoo with default configuration.
const instance = new ROOT.OOM.OomFoo({
    firstParameter: 100
  , secondParameter: new Date
})
console.log(instance)


//// Run the demo.
//@TODO




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.0.14 //\\//\\ http://oomtility.loop.coop /////////