//// Oom.Foo //// 1.2.12 //// February 2018 //// http://oom-foo.loop.coop/ /////

!function (ROOT) { 'use strict'
const { describe, it, eq, is } = ROOT.testify()
describe.skip(`Oom.Foo.Post All`, () => {




const Class = Oom.Foo.Post, stat = Class.stat

//// Instantiates a typical Oom.Foo.Post instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




describe(`+ve Oom.Foo.Post class`, () => {

    it(`should be a class`, () => {
        is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
        is('function' === typeof Class, 'Oom.Foo.Post is a function')
        try { Class.name = stat.NAME = 'Changed!'} catch (e) {}
        is( ('Oom.Foo.Post' === Class.name && 'Oom.Foo.Post' === stat.NAME)
          , 'name and stat.NAME are Oom.Foo.Post')
    })

})




describe('+ve Oom.Foo.Post instance', () => {

    it(`should be an instance`, () => {
        const instance = Class.testInstanceFactory()
        const attr = instance.attr
        is(instance instanceof Class, 'Is an instance of Oom.Foo.Post')
        is(Class === instance.constructor, '`constructor` is Oom.Foo.Post')
        is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID)
          , '`attr.UUID` is a six-character string')
        // is('object' === typeof instance.hub, '`hub` property is an object')
    })

})




})//describe()
}( 'object' === typeof global ? global : this ) // `window` in a browser

/*
!function (ROOT) { 'use strict'
return //@TODO convert to Mocha
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.Post All')
const Class = Oom.Foo.Post, stat = Class.stat




//// Instantiates a typical Oom.Foo.Post instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        // @TODO hub API
    })




test('+ve Oom.Foo.Post class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.Post is a function')
    try { Class.name = stat.NAME = 'Changed!'} catch (e) {}
    is( ('Oom.Foo.Post' === Class.name && 'Oom.Foo.Post' === stat.NAME)
      , 'name and stat.NAME are Oom.Foo.Post')
})




test('+ve Oom.Foo.Post instance', () => {
    const instance = Class.testInstanceFactory()
    const attr = instance.attr
    is(instance instanceof Class, 'Is an instance of Oom.Foo.Post')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.Post')
    is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID)
      , '`attr.UUID` is a six-character string')
    // is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
*/
