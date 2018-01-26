//// OomFoo //// 1.0.14 //// January 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = OOM.OomFoo.Base




//// Instantiates a typical OomFoo.Base instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstParam: 100
      , secondParam: new Date
    },{
        /* @TODO hub API */
    })




test('The OomFoo.Base class', () => {
    is('object' === typeof OOM, 'The OOM namespace object exists')
    is('function' === typeof Class, 'OomFoo.Base is a function')
    is('OomFoo.Base' === Class.NAME, 'NAME is OomFoo.Base')
})




test('Successful OomFoo.Base instantiation', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of OomFoo.Base')
    is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
