//// OomFoo //// 1.1.1 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' != typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = OOM.OomFoo.Base




test('The OomFoo.Base.foo() method', () => {
    const protoMethod = Class.prototype.foo
    is('function' === typeof protoMethod, 'prototype.foo() is a function')
    is('OomFoo.Base.foo' === protoMethod.NAME, "NAME is 'OomFoo.Base.foo'")
})




test('+ve foo()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.foo('123'),
       "`foo('123')` returns '123 ok!'")
    instance1.foo('456')
    is(2 === instance1.xyz,
       'After two calls, `xyz` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.foo('789')
    is(1 === instance2.xyz,
       'A second instance has its own `xyz` property')

})




test('-ve foo()', () => {
    const protoMethod = Class.prototype.foo
    throws( () => protoMethod('123')
      , 'OomFoo.Base.foo(): Must not be called as OomFoo.Base.prototype.foo()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.foo(123)
      , 'OomFoo.Base.foo(): abc is type number not string'
      , 'Passing a number into `abc`')


})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
