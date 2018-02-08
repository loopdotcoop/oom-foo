//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = OOM.OomFoo.Base




//// Instantiates a typical OomFoo.Base instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve OomFoo.Base class', () => {
    is('object' === typeof OOM, 'The OOM namespace object exists')
    is('function' === typeof Class, 'OomFoo.Base is a function')
    is( ('OomFoo.Base' === Class.NAME && 'OomFoo.Base' === Class.api.NAME)
      , 'NAME and api.NAME is OomFoo.Base')
    is('Base' === Class.name, 'name is Base')
})




test('+ve OomFoo.Base instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of OomFoo.Base')
    is(Class === instance.constructor, '`constructor` is OomFoo.Base')
    is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
