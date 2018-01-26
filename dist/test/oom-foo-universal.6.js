//\\//\\ src/test/App-universal.6.js



//// OomFoo //// 1.0.14 //// January 2018 //// http://oom-foo.loop.coop/ ///////

//// Node.js:    7.2.0
//// Rhino:      @TODO get Rhino working
//// Windows XP: Firefox 6, Chrome 15 (and probably lower), Opera 12.10
//// Windows 7:  IE 9, Safari 5.1
//// OS X 10.6:  Firefox 6, Chrome 16 (and probably lower), Opera 12, Safari 5.1
//// iOS:        iPad 3rd (iOS 6) Safari, iPad Air (iOS 7) Chrome
//// Android:    Xperia Tipo (Android 4), Pixel XL (Android 7.1)

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = OOM.OomFoo




//// Instantiates a typical OomFoo instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstParam: 100
      , secondParam: new Date
    },{
        /* @TODO hub API */
    })




test('The OomFoo class', () => {
    is('object' === typeof OOM, 'The OOM namespace object exists')
    is('undefined' === typeof OomFoo, 'OomFoo is not global')
    is('function' === typeof Class, 'OomFoo is a function')
    is('OomFoo' === Class.NAME, 'NAME is OomFoo')
    is('1.0.14' === Class.VERSION, 'VERSION is 1.0.14') // OOMBUMPABLE (twice!)
    is('http://oom-foo.loop.coop/' === Class.HOMEPAGE
      , 'HOMEPAGE is http://oom-foo.loop.coop/')
})




test('Successful OomFoo instantiation', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of OomFoo')
    is('object' === typeof instance.hub, '`hub` property is an object')
})




//// EXTEND KLUD.JS

//// Test for an expected exception.
ROOT.throws = ROOT.throws || ( (fn, expect, prefix) => {
    let nl = // newline plus colon and indent (klud.js test for Node.js, btw)
        'undefined' === typeof window ? ':\n    ' : ':<br>'+' &nbsp;'.repeat(6)
    let didntThrow = true
    try {
        fn()
    } catch (e) {
        didntThrow = false
        const ok = expect === e.message
        is(ok, `${prefix} has ${ok?'':'un'}expected error${ok?'':nl+e.message}`)
    }
    if (didntThrow) is(0, prefix + ` did not throw an error`)
})





})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/App.topLevel-universal.6.js



//// OomFoo //// 1.0.14 //// January 2018 //// http://oom-foo.loop.coop/ ///////

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




//\\//\\ src/test/Base-universal.6.js



//// OomFoo //// 1.0.14 //// January 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = OOM.OomFoo.Base




//// Instantiates a typical OomFoo.Base instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstParam: 100
      , secondParam: new Date
    },{
        /* @TODO hub API */
    })




test('The OomFoo.Base class', () => {
    is('object' === typeof OOM, 'The OOM namespace object exists')
    is('function' === typeof Class, 'OomFoo.Base is a function')
    is('OomFoo.Base' === Class.NAME, 'NAME is OomFoo.Base')
})




test('Successful OomFoo.Base instantiation', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of OomFoo.Base')
    is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Base.foo-universal.6.js



//// OomFoo //// 1.0.14 //// January 2018 //// http://oom-foo.loop.coop/ ///////

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




//// Made by Oomtility Make 1.0.14 //\\//\\ http://oomtility.loop.coop /////////
