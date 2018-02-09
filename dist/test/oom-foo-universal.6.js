//\\//\\ src/test/El.Hero-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
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




//\\//\\ src/test/El.Hero.Sub-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.El.Hero.Sub




//// Instantiates a typical Oom.Foo.El.Hero.Sub instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve Oom.Foo.El.Hero.Sub class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.El.Hero.Sub is a function')
    is( ('Oom.Foo.El.Hero.Sub' === Class.NAME && 'Oom.Foo.El.Hero.Sub' === Class.api.NAME)
      , 'NAME and api.NAME is Oom.Foo.El.Hero.Sub')
    is('Oom.Foo.El.Hero.Sub' === Class.name, 'name is Oom.Foo.El.Hero.Sub')
})




test('+ve Oom.Foo.El.Hero.Sub instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.El.Hero.Sub')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.El.Hero.Sub')
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




//\\//\\ src/test/El.Hero.Sub.subFn-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.El.Hero.Sub




test('The Oom.Foo.El.Hero.Sub.subFn() method', () => {
    const protoMethod = Class.prototype.subFn
    is('function' === typeof protoMethod, 'prototype.subFn() is a function')
    is('Oom.Foo.El.Hero.Sub.subFn' === protoMethod.NAME, "NAME is 'Oom.Foo.El.Hero.Sub.subFn'"+protoMethod.NAME)
})




test('+ve subFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.subFn('123'),
       "`subFn('123')` returns '123 ok!'")
    instance1.subFn('456')
    is(2 === instance1.subFn_calltally,
       'After two calls, `subFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.subFn('789')
    is(1 === instance2.subFn_calltally,
       'A second instance has its own `subFn_calltally` property')

})




test('-ve subFn()', () => {
    const protoMethod = Class.prototype.subFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.El.Hero.Sub.subFn(): Must not be called as Oom.Foo.El.Hero.Sub.prototype.subFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.subFn(123)
      , 'Oom.Foo.El.Hero.Sub.subFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/El.Hero.heroFn-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.El.Hero




test('The Oom.Foo.El.Hero.heroFn() method', () => {
    const protoMethod = Class.prototype.heroFn
    is('function' === typeof protoMethod, 'prototype.heroFn() is a function')
    is('Oom.Foo.El.Hero.heroFn' === protoMethod.NAME, "NAME is 'Oom.Foo.El.Hero.heroFn'"+protoMethod.NAME)
})




test('+ve heroFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.heroFn('123'),
       "`heroFn('123')` returns '123 ok!'")
    instance1.heroFn('456')
    is(2 === instance1.heroFn_calltally,
       'After two calls, `heroFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.heroFn('789')
    is(1 === instance2.heroFn_calltally,
       'A second instance has its own `heroFn_calltally` property')

})




test('-ve heroFn()', () => {
    const protoMethod = Class.prototype.heroFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.El.Hero.heroFn(): Must not be called as Oom.Foo.El.Hero.prototype.heroFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.heroFn(123)
      , 'Oom.Foo.El.Hero.heroFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/ElMix.FooBar-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.ElMix.FooBar




//// Instantiates a typical Oom.Foo.ElMix.FooBar instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve Oom.Foo.ElMix.FooBar class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.ElMix.FooBar is a function')
    is( ('Oom.Foo.ElMix.FooBar' === Class.NAME && 'Oom.Foo.ElMix.FooBar' === Class.api.NAME)
      , 'NAME and api.NAME is Oom.Foo.ElMix.FooBar')
    is('Oom.Foo.ElMix.FooBar' === Class.name, 'name is Oom.Foo.ElMix.FooBar')
})




test('+ve Oom.Foo.ElMix.FooBar instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.ElMix.FooBar')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.ElMix.FooBar')
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




//\\//\\ src/test/ElMix.FooBar.Sub-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.ElMix.FooBar.Sub




//// Instantiates a typical Oom.Foo.ElMix.FooBar.Sub instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve Oom.Foo.ElMix.FooBar.Sub class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.ElMix.FooBar.Sub is a function')
    is( ('Oom.Foo.ElMix.FooBar.Sub' === Class.NAME && 'Oom.Foo.ElMix.FooBar.Sub' === Class.api.NAME)
      , 'NAME and api.NAME is Oom.Foo.ElMix.FooBar.Sub')
    is('Oom.Foo.ElMix.FooBar.Sub' === Class.name, 'name is Oom.Foo.ElMix.FooBar.Sub')
})




test('+ve Oom.Foo.ElMix.FooBar.Sub instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.ElMix.FooBar.Sub')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.ElMix.FooBar.Sub')
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




//\\//\\ src/test/ElMix.FooBar.Sub.subFn-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.ElMix.FooBar.Sub




test('The Oom.Foo.ElMix.FooBar.Sub.subFn() method', () => {
    const protoMethod = Class.prototype.subFn
    is('function' === typeof protoMethod, 'prototype.subFn() is a function')
    is('Oom.Foo.ElMix.FooBar.Sub.subFn' === protoMethod.NAME, "NAME is 'Oom.Foo.ElMix.FooBar.Sub.subFn'"+protoMethod.NAME)
})




test('+ve subFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.subFn('123'),
       "`subFn('123')` returns '123 ok!'")
    instance1.subFn('456')
    is(2 === instance1.subFn_calltally,
       'After two calls, `subFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.subFn('789')
    is(1 === instance2.subFn_calltally,
       'A second instance has its own `subFn_calltally` property')

})




test('-ve subFn()', () => {
    const protoMethod = Class.prototype.subFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.ElMix.FooBar.Sub.subFn(): Must not be called as Oom.Foo.ElMix.FooBar.Sub.prototype.subFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.subFn(123)
      , 'Oom.Foo.ElMix.FooBar.Sub.subFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/ElMix.FooBar.fbFn-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.ElMix.FooBar




test('The Oom.Foo.ElMix.FooBar.fbFn() method', () => {
    const protoMethod = Class.prototype.fbFn
    is('function' === typeof protoMethod, 'prototype.fbFn() is a function')
    is('Oom.Foo.ElMix.FooBar.fbFn' === protoMethod.NAME, "NAME is 'Oom.Foo.ElMix.FooBar.fbFn'"+protoMethod.NAME)
})




test('+ve fbFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.fbFn('123'),
       "`fbFn('123')` returns '123 ok!'")
    instance1.fbFn('456')
    is(2 === instance1.fbFn_calltally,
       'After two calls, `fbFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.fbFn('789')
    is(1 === instance2.fbFn_calltally,
       'A second instance has its own `fbFn_calltally` property')

})




test('-ve fbFn()', () => {
    const protoMethod = Class.prototype.fbFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.ElMix.FooBar.fbFn(): Must not be called as Oom.Foo.ElMix.FooBar.prototype.fbFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.fbFn(123)
      , 'Oom.Foo.ElMix.FooBar.fbFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Mix.Red-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.Mix.Red




//// Instantiates a typical Oom.Foo.Mix.Red instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve Oom.Foo.Mix.Red class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.Mix.Red is a function')
    is( ('Oom.Foo.Mix.Red' === Class.NAME && 'Oom.Foo.Mix.Red' === Class.api.NAME)
      , 'NAME and api.NAME is Oom.Foo.Mix.Red')
    is('Oom.Foo.Mix.Red' === Class.name, 'name is Oom.Foo.Mix.Red')
})




test('+ve Oom.Foo.Mix.Red instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.Mix.Red')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.Mix.Red')
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




//\\//\\ src/test/Mix.Red.Sub-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.Mix.Red.Sub




//// Instantiates a typical Oom.Foo.Mix.Red.Sub instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve Oom.Foo.Mix.Red.Sub class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.Mix.Red.Sub is a function')
    is( ('Oom.Foo.Mix.Red.Sub' === Class.NAME && 'Oom.Foo.Mix.Red.Sub' === Class.api.NAME)
      , 'NAME and api.NAME is Oom.Foo.Mix.Red.Sub')
    is('Oom.Foo.Mix.Red.Sub' === Class.name, 'name is Oom.Foo.Mix.Red.Sub')
})




test('+ve Oom.Foo.Mix.Red.Sub instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.Mix.Red.Sub')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.Mix.Red.Sub')
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




//\\//\\ src/test/Mix.Red.Sub.subFn-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.Mix.Red.Sub




test('The Oom.Foo.Mix.Red.Sub.subFn() method', () => {
    const protoMethod = Class.prototype.subFn
    is('function' === typeof protoMethod, 'prototype.subFn() is a function')
    is('Oom.Foo.Mix.Red.Sub.subFn' === protoMethod.NAME, "NAME is 'Oom.Foo.Mix.Red.Sub.subFn'"+protoMethod.NAME)
})




test('+ve subFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.subFn('123'),
       "`subFn('123')` returns '123 ok!'")
    instance1.subFn('456')
    is(2 === instance1.subFn_calltally,
       'After two calls, `subFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.subFn('789')
    is(1 === instance2.subFn_calltally,
       'A second instance has its own `subFn_calltally` property')

})




test('-ve subFn()', () => {
    const protoMethod = Class.prototype.subFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.Mix.Red.Sub.subFn(): Must not be called as Oom.Foo.Mix.Red.Sub.prototype.subFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.subFn(123)
      , 'Oom.Foo.Mix.Red.Sub.subFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Mix.Red.redFn-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.Mix.Red




test('The Oom.Foo.Mix.Red.redFn() method', () => {
    const protoMethod = Class.prototype.redFn
    is('function' === typeof protoMethod, 'prototype.redFn() is a function')
    is('Oom.Foo.Mix.Red.redFn' === protoMethod.NAME, "NAME is 'Oom.Foo.Mix.Red.redFn'"+protoMethod.NAME)
})




test('+ve redFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.redFn('123'),
       "`redFn('123')` returns '123 ok!'")
    instance1.redFn('456')
    is(2 === instance1.redFn_calltally,
       'After two calls, `redFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.redFn('789')
    is(1 === instance2.redFn_calltally,
       'A second instance has its own `redFn_calltally` property')

})




test('-ve redFn()', () => {
    const protoMethod = Class.prototype.redFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.Mix.Red.redFn(): Must not be called as Oom.Foo.Mix.Red.prototype.redFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.redFn(123)
      , 'Oom.Foo.Mix.Red.redFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Plain-universal.6.js



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




//\\//\\ src/test/Plain.Sub-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.Plain.Sub




//// Instantiates a typical Oom.Foo.Plain.Sub instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve Oom.Foo.Plain.Sub class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.Plain.Sub is a function')
    is( ('Oom.Foo.Plain.Sub' === Class.NAME && 'Oom.Foo.Plain.Sub' === Class.api.NAME)
      , 'NAME and api.NAME is Oom.Foo.Plain.Sub')
    is('Oom.Foo.Plain.Sub' === Class.name, 'name is Oom.Foo.Plain.Sub')
})




test('+ve Oom.Foo.Plain.Sub instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.Plain.Sub')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.Plain.Sub')
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




//\\//\\ src/test/Plain.Sub.subFn-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.Plain.Sub




test('The Oom.Foo.Plain.Sub.subFn() method', () => {
    const protoMethod = Class.prototype.subFn
    is('function' === typeof protoMethod, 'prototype.subFn() is a function')
    is('Oom.Foo.Plain.Sub.subFn' === protoMethod.NAME, "NAME is 'Oom.Foo.Plain.Sub.subFn'"+protoMethod.NAME)
})




test('+ve subFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.subFn('123'),
       "`subFn('123')` returns '123 ok!'")
    instance1.subFn('456')
    is(2 === instance1.subFn_calltally,
       'After two calls, `subFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.subFn('789')
    is(1 === instance2.subFn_calltally,
       'A second instance has its own `subFn_calltally` property')

})




test('-ve subFn()', () => {
    const protoMethod = Class.prototype.subFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.Plain.Sub.subFn(): Must not be called as Oom.Foo.Plain.Sub.prototype.subFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.subFn(123)
      , 'Oom.Foo.Plain.Sub.subFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Plain.plnFn-universal.6.js



//// Oom.Foo //// 1.2.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
const Class = Oom.Foo.Plain




test('The Oom.Foo.Plain.plnFn() method', () => {
    const protoMethod = Class.prototype.plnFn
    is('function' === typeof protoMethod, 'prototype.plnFn() is a function')
    is('Oom.Foo.Plain.plnFn' === protoMethod.NAME, "NAME is 'Oom.Foo.Plain.plnFn'"+protoMethod.NAME)
})




test('+ve plnFn()', () => {
    const instance1 = Class.testInstanceFactory()
    is('123 ok!' === instance1.plnFn('123'),
       "`plnFn('123')` returns '123 ok!'")
    instance1.plnFn('456')
    is(2 === instance1.plnFn_calltally,
       'After two calls, `plnFn_calltally` is 2')

    const instance2 = Class.testInstanceFactory()
    instance2.plnFn('789')
    is(1 === instance2.plnFn_calltally,
       'A second instance has its own `plnFn_calltally` property')

})




test('-ve plnFn()', () => {
    const protoMethod = Class.prototype.plnFn
    throws( () => protoMethod('123')
      , 'Oom.Foo.Plain.plnFn(): Must not be called as Oom.Foo.Plain.prototype.plnFn()'
      , 'Prototype call')
    const instance = Class.testInstanceFactory()
    throws( () => instance.plnFn(123)
      , 'Oom.Foo.Plain.plnFn(): abc has constructor.name Number not String'
      , 'Passing a number into `abc`')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.2.0 //\\//\\ http://oomtility.loop.coop //////////
