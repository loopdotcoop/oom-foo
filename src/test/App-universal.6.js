//// OomFoo //// 1.1.3 //// February 2018 //// http://oom-foo.loop.coop/ ///////

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
    is('OomFoo' === Class.NAME, 'NAME is OomFoo')
    is('OomFoo' === Class.name, 'name is OomFoo')
    is('1.1.3' === Class.VERSION, 'VERSION is 1.1.3') // OOMBUMPABLE (twice!)
    is('http://oom-foo.loop.coop/' === Class.HOMEPAGE
      , 'HOMEPAGE is http://oom-foo.loop.coop/')
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
