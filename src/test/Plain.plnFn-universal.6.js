//// Oom.Foo //// 1.2.2 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.Plain.plnFn Universal')
const Class = Oom.Foo.Plain




test('The Oom.Foo.Plain.plnFn() method', () => {
    const protoMethod = Class.prototype.plnFn
    is('function' === typeof protoMethod, 'prototype.plnFn() is a function')
    is('Oom.Foo.Plain.plnFn' === protoMethod.NAME, "NAME is 'Oom.Foo.Plain.plnFn'"+protoMethod.NAME)
})




test('+ve plnFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.plnFn('123'),
       "`plnFn('123')` returns '123 ok!'")
    instance1.plnFn('456')
    is(2 === instance1.plnFn_calltally,
       'After two calls, `plnFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.plnFn('789')
    is(1 === instance2.plnFn_calltally,
       'A second instance has its own `plnFn_calltally` property')

})




test('-ve plnFn()', () => {
    const protoMethod = Class.prototype.plnFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.Plain.plnFn(): Must not be called as Oom.Foo.Plain.prototype.plnFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.plnFn(123)
      , 'Oom.Foo.Plain.plnFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
