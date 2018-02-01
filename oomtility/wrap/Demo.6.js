${{topline}}

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {




//// Generate an instance of ${classname} with default configuration.
// const instance = new ROOT.OOM.${{classname}}({
//     firstProp: 100
//   , secondProp: new Date
// })
// console.log(instance)


//// Register the <oom-${{nameLC.split('.').pop()}}>, a Vue component version of ${{classname}}.
Vue.component('oom-${{nameLC.split("-").pop()}}', {
    template: '<span>A component based on ${{classname}}</span>'
})

//// Create a root instance.
new Vue({
    el: '#demo'
})


//// Run the demo.
//@TODO




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
