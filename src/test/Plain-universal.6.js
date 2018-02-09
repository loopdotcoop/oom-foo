//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.Plain




//// Instantiates a typical Oom.Foo.Plain instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve Oom.Foo.Plain class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.Plain is a function')
    is( ('Oom.Foo.Plain' === Class.NAME && 'Oom.Foo.Plain' === Class.api.NAME)
      , 'NAME and api.NAME is Oom.Foo.Plain')
    is('Oom.Foo.Plain' === Class.name, 'name is Oom.Foo.Plain')
})




test('+ve Oom.Foo.Plain instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.Plain')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.Plain')
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
