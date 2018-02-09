//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.ElMix.FooBar




test('The Oom.Foo.ElMix.FooBar.fbFn() method', () => {
    const protoMethod = Class.prototype.fbFn
    is('function' === typeof protoMethod, 'prototype.fbFn() is a function')
    is('Oom.Foo.ElMix.FooBar.fbFn' === protoMethod.NAME, "NAME is 'Oom.Foo.ElMix.FooBar.fbFn'"+protoMethod.NAME)
})




test('+ve fbFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.fbFn('123'),
       "`fbFn('123')` returns '123 ok!'")
    instance1.fbFn('456')
    is(2 === instance1.fbFn_calltally,
       'After two calls, `fbFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.fbFn('789')
    is(1 === instance2.fbFn_calltally,
       'A second instance has its own `fbFn_calltally` property')

})




test('-ve fbFn()', () => {
    const protoMethod = Class.prototype.fbFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.ElMix.FooBar.fbFn(): Must not be called as Oom.Foo.ElMix.FooBar.prototype.fbFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.fbFn(123)
      , 'Oom.Foo.ElMix.FooBar.fbFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
