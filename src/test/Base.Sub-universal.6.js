//// OomFoo //// 1.1.5 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = OOM.OomFoo.Base.Sub




//// Instantiates a typical OomFoo.Base.Sub instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve OomFoo.Base.Sub class', () => {
    is('object' === typeof OOM, 'The OOM namespace object exists')
    is('function' === typeof Class, 'OomFoo.Base.Sub is a function')
    is( ('OomFoo.Base.Sub' === Class.NAME && 'OomFoo.Base.Sub' === Class.api.NAME)
      , 'NAME and api.NAME is OomFoo.Base.Sub')
    is('Sub' === Class.name, 'name is Sub')
})




test('+ve OomFoo.Base.Sub instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of OomFoo.Base.Sub')
    is(Class === instance.constructor, '`constructor` is OomFoo.Base.Sub')
    is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
