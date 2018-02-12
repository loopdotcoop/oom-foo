//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.Mix.Red.redFn Universal')
const Class = Oom.Foo.Mix.Red




test('The Oom.Foo.Mix.Red.redFn() method', () => {
    const protoMethod = Class.prototype.redFn
    is('function' === typeof protoMethod, 'prototype.redFn() is a function')
    is('Oom.Foo.Mix.Red.redFn' === protoMethod.NAME, "NAME is 'Oom.Foo.Mix.Red.redFn'"+protoMethod.NAME)
})




test('+ve redFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.redFn('123'),
       "`redFn('123')` returns '123 ok!'")
    instance1.redFn('456')
    is(2 === instance1.redFn_calltally,
       'After two calls, `redFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.redFn('789')
    is(1 === instance2.redFn_calltally,
       'A second instance has its own `redFn_calltally` property')

})




test('-ve redFn()', () => {
    const protoMethod = Class.prototype.redFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.Mix.Red.redFn(): Must not be called as Oom.Foo.Mix.Red.prototype.redFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.redFn(123)
      , 'Oom.Foo.Mix.Red.redFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
