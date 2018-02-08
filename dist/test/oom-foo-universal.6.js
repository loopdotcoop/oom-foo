//\\//\\ src/test/App-universal.6.js



//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

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
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve OomFoo class', () => {
    is('object' === typeof OOM, 'The OOM namespace object exists')
    is('undefined' === typeof OomFoo, 'OomFoo is not global')
    is('function' === typeof Class, 'OomFoo is a function')
    is( ('OomFoo' === Class.NAME && 'OomFoo' === Class.api.NAME)
      , 'NAME and api.NAME is OomFoo')
    is('OomFoo' === Class.name, 'name is OomFoo')
    is( ('1.1.7' === Class.VERSION && '1.1.7' === Class.api.VERSION) // OOMBUMPABLE (twice!)
      , 'VERSION and api.VERSION is 1.1.7') // OOMBUMPABLE
    is( ('http://oom-foo.loop.coop/' === Class.HOMEPAGE && 'http://oom-foo.loop.coop/' === Class.api.HOMEPAGE)
      , 'HOMEPAGE and api.HOMEPAGE is http://oom-foo.loop.coop/')
    //@TODO test for REMARKS
})




test('+ve OomFoo instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of OomFoo')
    is(Class === instance.constructor, '`constructor` is OomFoo')
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




//\\//\\ src/test/App.appfn-universal.6.js



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




//\\//\\ src/test/Base-universal.6.js



//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = OOM.OomFoo.Base




//// Instantiates a typical OomFoo.Base instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve OomFoo.Base class', () => {
    is('object' === typeof OOM, 'The OOM namespace object exists')
    is('function' === typeof Class, 'OomFoo.Base is a function')
    is( ('OomFoo.Base' === Class.NAME && 'OomFoo.Base' === Class.api.NAME)
      , 'NAME and api.NAME is OomFoo.Base')
    is('Base' === Class.name, 'name is Base')
})




test('+ve OomFoo.Base instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of OomFoo.Base')
    is(Class === instance.constructor, '`constructor` is OomFoo.Base')
    is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Base.Sub-universal.6.js



//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = OOM.OomFoo.Base.Sub




//// Instantiates a typical OomFoo.Base.Sub instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve OomFoo.Base.Sub class', () => {
    is('object' === typeof OOM, 'The OOM namespace object exists')
    is('function' === typeof Class, 'OomFoo.Base.Sub is a function')
    is( ('OomFoo.Base.Sub' === Class.NAME && 'OomFoo.Base.Sub' === Class.api.NAME)
      , 'NAME and api.NAME is OomFoo.Base.Sub')
    is('Sub' === Class.name, 'name is Sub')
})




test('+ve OomFoo.Base.Sub instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of OomFoo.Base.Sub')
    is(Class === instance.constructor, '`constructor` is OomFoo.Base.Sub')
    is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Base.Sub.subfn-universal.6.js



//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

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




//\\//\\ src/test/Base.basefn-universal.6.js



//// OomFoo //// 1.1.7 //// February 2018 //// http://oom-foo.loop.coop/ ///////

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




//// Made by Oomtility Make 1.1.7 //\\//\\ http://oomtility.loop.coop //////////
