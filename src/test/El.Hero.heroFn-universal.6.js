//// Oom.Foo //// 1.2.2 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.El.Hero.heroFn Universal')
const Class = Oom.Foo.El.Hero




test('The Oom.Foo.El.Hero.heroFn() method', () => {
    const protoMethod = Class.prototype.heroFn
    is('function' === typeof protoMethod, 'prototype.heroFn() is a function')
    is('Oom.Foo.El.Hero.heroFn' === protoMethod.NAME, "NAME is 'Oom.Foo.El.Hero.heroFn'"+protoMethod.NAME)
})




test('+ve heroFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.heroFn('123'),
       "`heroFn('123')` returns '123 ok!'")
    instance1.heroFn('456')
    is(2 === instance1.heroFn_calltally,
       'After two calls, `heroFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.heroFn('789')
    is(1 === instance2.heroFn_calltally,
       'A second instance has its own `heroFn_calltally` property')

})




test('-ve heroFn()', () => {
    const protoMethod = Class.prototype.heroFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.El.Hero.heroFn(): Must not be called as Oom.Foo.El.Hero.prototype.heroFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.heroFn(123)
      , 'Oom.Foo.El.Hero.heroFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
