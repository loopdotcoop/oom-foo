//// OomFoo //// 1.1.3 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {




//// Generate an instance of ${classname} with default configuration.
// const instance = new ROOT.OOM.OomFoo.Base({
//     firstProp: 100
//   , secondProp: new Date
// })
// console.log(instance)


//// Register the <oom-base>, a Vue component version of OomFoo.Base.
Vue.component('oom-base', {
    template: '<span>A component based on OomFoo.Base</span>'
})

//// Create a root instance.
new Vue({
    el: '#demo'
})


//// Run the demo.
//@TODO




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
