//\\//\\ src/test/App-nonbrowser.6.js



//// OomFoo //// 1.0.13 //// January 2018 //// http://oom-foo.loop.coop/ ///////

//// Node.js:    7.2.0
//// Rhino:      @TODO get Rhino working

!function (ROOT) { 'use strict'
const Class = OOM.OomFoo




//// Instantiates a typical OomFoo instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstParameter: 100
      , secondParameter: new Date
    },{
        /* @TODO hub API */
    })




test('Nonbrowser test the OomFoo class', () => {
    is(true, '@TODO')
})




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/App.topLevel-nonbrowser.6.js



//// OomFoo //// 1.0.13 //// January 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' != typeof jQuery) throw Error('jQuery not found')
const Class = OOM.OomFoo




test('Nonbrowser test the OomFoo.topLevel() method', () => {
    is(true, '@TODO')
})




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Base-nonbrowser.6.js



//// OomFoo //// 1.0.13 //// January 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
const Class = OOM.OomFoo.Base




//// Instantiates a typical OomFoo.Base instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstParameter: 100
      , secondParameter: new Date
    },{
        /* @TODO hub API */
    })




test('Nonbrowser test the OomFoo.Base class', () => {
    is(true, '@TODO')
})




}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Base.foo-nonbrowser.6.js



//// OomFoo //// 1.0.13 //// January 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' != typeof jQuery) throw Error('jQuery not found')
const Class = OOM.OomFoo.Base




test('Nonbrowser test the OomFoo.Base.foo() method', () => {
    is(true, '@TODO')
})




}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.0.13 //\\//\\ http://oomtility.loop.coop /////////
