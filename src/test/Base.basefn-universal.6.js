//// OomFoo //// 1.1.5 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' != typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = OOM.OomFoo.Base




test('The OomFoo.Base.basefn() method', () => {
    const protoMethod = Class.prototype.basefn
    is('function' === typeof protoMethod, 'prototype.basefn() is a function')
    is('OomFoo.Base.basefn' === protoMethod.NAME, "NAME is 'OomFoo.Base.basefn'")
})




test('+ve basefn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.basefn('123'),
       "`basefn('123')` returns '123 ok!'")
    instance1.basefn('456')
    is(2 === instance1.xyz,
       'After two calls, `xyz` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.basefn('789')
    is(1 === instance2.xyz,
       'A second instance has its own `xyz` property')

})




test('-ve basefn()', () => {
    const protoMethod = Class.prototype.basefn
    throws( () => protoMethod('123')
      , 'OomFoo.Base.basefn(): Must not be called as OomFoo.Base.prototype.basefn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.basefn(123)
      , 'OomFoo.Base.basefn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')


})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
