//// Oom.Foo //// 1.2.1 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.El.Hero Universal')
const Class = Oom.Foo.El.Hero




//// Instantiates a typical Oom.Foo.El.Hero instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve Oom.Foo.El.Hero class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.El.Hero is a function')
    is( ('Oom.Foo.El.Hero' === Class.NAME && 'Oom.Foo.El.Hero' === Class.api.NAME)
      , 'NAME and api.NAME is Oom.Foo.El.Hero')
    is('Oom.Foo.El.Hero' === Class.name, 'name is Oom.Foo.El.Hero')
})




test('+ve Oom.Foo.El.Hero instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.El.Hero')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.El.Hero')
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
