//// OomFoo //// 1.0.0 //// January 2018 //// http://oom-foo.loop.coop/ ////////

!function (ROOT) { 'use strict'
if ('function' != typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = OOM.OomFoo




test('The OomFoo.topLevel() method', () => {
    const protoMethod = Class.prototype.topLevel
    is('function' === typeof protoMethod, 'prototype.topLevel() is a function')
    is('OomFoo.topLevel' === protoMethod.NAME, "NAME is 'OomFoo.topLevel'")
})




test('+ve topLevel()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.topLevel('123'),
       "`topLevel('123')` returns '123 ok!'")
    instance1.topLevel('456')
    is(2 === instance1.xyz,
       'After two calls, `xyz` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.topLevel('789')
    is(1 === instance2.xyz,
       'A second instance has its own `xyz` property')

})




test('-ve topLevel()', () => {
    const protoMethod = Class.prototype.topLevel
    throws( () => protoMethod('123')
      , 'OomFoo.topLevel(): Must not be called as OomFoo.prototype.topLevel()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.topLevel(123)
      , 'OomFoo.topLevel(): abc is type number not string'
      , 'Passing a number into `abc`')


})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
