//// OomFoo //// 1.1.8 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' != typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = OOM.OomFoo.Base.Sub




test('The OomFoo.Base.Sub.subfn() method', () => {
    const protoMethod = Class.prototype.subfn
    is('function' === typeof protoMethod, 'prototype.subfn() is a function')
    is('OomFoo.Base.Sub.subfn' === protoMethod.NAME, "NAME is 'OomFoo.Base.Sub.subfn'")
})




test('+ve subfn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.subfn('123'),
       "`subfn('123')` returns '123 ok!'")
    instance1.subfn('456')
    is(2 === instance1.xyz,
       'After two calls, `xyz` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.subfn('789')
    is(1 === instance2.xyz,
       'A second instance has its own `xyz` property')

})




test('-ve subfn()', () => {
    const protoMethod = Class.prototype.subfn
    throws( () => protoMethod('123')
      , 'OomFoo.Base.Sub.subfn(): Must not be called as OomFoo.Base.Sub.prototype.subfn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.subfn(123)
      , 'OomFoo.Base.Sub.subfn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')


})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
