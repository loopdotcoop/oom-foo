//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.Plain.Sub.subFn Universal')
const Class = Oom.Foo.Plain.Sub




test('The Oom.Foo.Plain.Sub.subFn() method', () => {
    const protoMethod = Class.prototype.subFn
    is('function' === typeof protoMethod, 'prototype.subFn() is a function')
    is('Oom.Foo.Plain.Sub.subFn' === protoMethod.NAME, "NAME is 'Oom.Foo.Plain.Sub.subFn'"+protoMethod.NAME)
})




test('+ve subFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.subFn('123'),
       "`subFn('123')` returns '123 ok!'")
    instance1.subFn('456')
    is(2 === instance1.subFn_calltally,
       'After two calls, `subFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.subFn('789')
    is(1 === instance2.subFn_calltally,
       'A second instance has its own `subFn_calltally` property')

})




test('-ve subFn()', () => {
    const protoMethod = Class.prototype.subFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.Plain.Sub.subFn(): Must not be called as Oom.Foo.Plain.Sub.prototype.subFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.subFn(123)
      , 'Oom.Foo.Plain.Sub.subFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
