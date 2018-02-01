${{topline}}

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {




//// Generate an instance of ${classname} with default configuration.
const instance = new ROOT.OOM.${{classname}}({
    firstParameter: 100
  , secondParameter: new Date
})
console.log(instance)


//// Run the demo.
//@TODO




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
