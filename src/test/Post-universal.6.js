//// Oom.Foo //// 1.2.3 //// February 2018 //// http://oom-foo.loop.coop/ //////
console.log('Post-universal.6.js');
!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.Post Universal')
const Class = Oom.Foo.Post




//// Instantiates a typical Oom.Foo.Post instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve Oom.Foo.Post class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.Post is a function')
    is( ('Oom.Foo.Post' === Class.NAME && 'Oom.Foo.Post' === Class.api.NAME)
      , 'NAME and api.NAME is Oom.Foo.Post')
    is('Oom.Foo.Post' === Class.name, 'name is Oom.Foo.Post')
})




test('+ve Oom.Foo.Post instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.Post')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.Post')
    is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
