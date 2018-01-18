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
