//// Oom.Foo //// 1.2.3 //// February 2018 //// http://oom-foo.loop.coop/ //////
console.log('Router-universal.6.js');
!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.Router Universal')
const Class = Oom.Foo.Router




//// Instantiates a typical Oom.Foo.Router instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve Oom.Foo.Router class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.Router is a function')
    is( ('Oom.Foo.Router' === Class.NAME && 'Oom.Foo.Router' === Class.api.NAME)
      , 'NAME and api.NAME is Oom.Foo.Router')
    is('Oom.Foo.Router' === Class.name, 'name is Oom.Foo.Router')
})




test('+ve Oom.Foo.Router instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.Router')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.Router')
    is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
