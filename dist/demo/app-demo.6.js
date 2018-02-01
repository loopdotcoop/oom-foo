//\\//\\ src/demo/App-demo.6.js



//// OomFoo //// 1.1.3 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {




//// Generate an instance of ${classname} with default configuration.
// const instance = new ROOT.OOM.OomFoo({
//     firstProp: 100
//   , secondProp: new Date
// })
// console.log(instance)


//// Register the <oom-oomfoo>, a Vue component version of OomFoo.
Vue.component('oom-oomfoo', {
    template: '<span>A component based on OomFoo</span>'
})

//// Create a root instance.
new Vue({
    el: '#demo'
})


//// Run the demo.
//@TODO




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.1.3 //\\//\\ http://oomtility.loop.coop //////////
