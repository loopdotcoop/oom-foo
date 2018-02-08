//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' != typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = OOM.OomFoo




test('The OomFoo.appfn() method', () => {
    const protoMethod = Class.prototype.appfn
    is('function' === typeof protoMethod, 'prototype.appfn() is a function')
    is('OomFoo.appfn' === protoMethod.NAME, "NAME is 'OomFoo.appfn'")
})




test('+ve appfn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.appfn('123'),
       "`appfn('123')` returns '123 ok!'")
    instance1.appfn('456')
    is(2 === instance1.xyz,
       'After two calls, `xyz` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.appfn('789')
    is(1 === instance2.xyz,
       'A second instance has its own `xyz` property')

})




test('-ve appfn()', () => {
    const protoMethod = Class.prototype.appfn
    throws( () => protoMethod('123')
      , 'OomFoo.appfn(): Must not be called as OomFoo.prototype.appfn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.appfn(123)
      , 'OomFoo.appfn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')


})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
