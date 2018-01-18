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
