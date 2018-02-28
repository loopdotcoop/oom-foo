//\\//\\ src/test/Bases-all.6.js



//// Oom.Foo //// 1.2.11 //// February 2018 //// http://oom-foo.loop.coop/ /////

//// Node.js:    7.2.0
//// Rhino:      @TODO get Rhino working
//// Windows XP: Firefox 6, Chrome 15 (and probably lower), Opera 12.10
//// Windows 7:  IE 9, Safari 5.1
//// OS X 10.6:  Firefox 6, Chrome 16 (and probably lower), Opera 12, Safari 5.1
//// iOS:        iPad 3rd (iOS 6) Safari, iPad Air (iOS 7) Chrome
//// Android:    Xperia Tipo (Android 4), Pixel XL (Android 7.1)

!function (ROOT) { 'use strict'
ROOT.testify = testify // make `testify()` available to all test files
const { describe, it, eq, is, tryHardSet, goodVals, badVals, stringOrName }
  = ROOT.testify()
const { countKeyMatches, isConstant, isReadOnly, isReadWrite, isValid }
  = Oom.KIT
describe('Bases All', function () {


//// Establish whether the oom-foo module’s definition of Oom is being used.
let r; if (!(r=ROOT.Oom) || !(r=r.Foo) || !(r=r.stat) || !(r=r.LOADED_FIRST))
    throw Error('Can’t test: ROOT.Oom.Foo.stat.LOADED_FIRST does not exist')
const LOADED_FIRST = ROOT.Oom.Foo.stat.LOADED_FIRST //@TODO generalise Foo


//// `inst_tally` will be incremented each time an instance is created. We
//// capture its initial value here, which should be zero.
// let initInstTally = ROOT.Oom.stat.inst_tally




describe('The Oom class', function () {
    const Class = ROOT.Oom, stat = Class.stat, schema = Class.schema




    //// AUTOMATIC STATIC TESTS

    it('is a class', function(){try{
        eq(typeof Class, 'function'
          , '`typeof Oom` is a function')
    }catch(e){console.error(e.message);throw e}})


    let n = countKeyMatches(schema.stat, isConstant)
    it(`has ${n} constant static${1==n?'':'s'}`, function(){try{
        tryHardSet(Class, 'name', 'Changed!')
        eq(Class.name, 'Oom', 'name is Oom')
        for (let key in schema.stat) {
            if (! isConstant(key) ) continue // only constants
            tryHardSet(stat, key, 'Changed!')
            const valid = schema.stat[key]
            eq(stat[key], valid.default
              , 'stat.'+key+' is '+valid.default.toString())
            is( isValid(valid, stat[key])
              , 'stat.'+key+' is a valid '+stringOrName(valid.type) )
        }
    }catch(e){console.error(e.message);throw e}})


    n = countKeyMatches(schema.stat, isReadOnly)
    it(`has ${n} read-only static${1==n?'':'s'}`, function(){try{
        // stat._inst_tally = 0 // reset `inst_tally` @TODO avoid this
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            stat[key] = 123
            const valid = schema.stat[key]
            eq(stat[key], valid.default
              , 'stat.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, stat[key])
              , 'stat.'+key+' is a valid '+stringOrName(valid.type) )
        }
    }catch(e){console.error(e.message);throw e}})


    it('sees when read-only statics change', function(){try{
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const good = goodVals[ stringOrName(schema.stat[key].type) ]
            stat['_'+key] = good
            eq(stat[key], good
              , 'stat.'+key+' has changed to '+good)
            //// Changing a read-only value via its underscore-prefixed ‘shadow’
            //// does not invoke any validation or type-checking. Therefore we
            //// don’t test that `badVals` are rejected.
        }
    }catch(e){console.error(e.message);throw e}})


    n = countKeyMatches(schema.stat, isReadWrite)
    it(`has ${n} read-write static${1==n?'':'s'}`, function(){try{
        for (let key in schema.stat) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const valid = schema.stat[key]
            eq(stat[key], valid.default
              , 'stat.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, stat[key])
              , 'stat.'+key+' is a valid '+stringOrName(valid.type) )
        }
    }catch(e){console.error(e.message);throw e}})


    it('allows read-write statics to be changed', function(){try{
        for (let key in schema.stat) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const good = goodVals[ stringOrName(schema.stat[key].type) ]
            const bad  = badVals[  stringOrName(schema.stat[key].type) ]
            stat[key] = good
            eq(stat[key], good
              , 'stat.'+key+' has changed to '+good)
            stat[key] = bad
            eq(stat[key], good
              , 'stat.'+key+' has NOT changed to '+bad)
        }
    }catch(e){console.error(e.message);throw e}})




    //// CUSTOM STATIC TESTS
    //@TODO




})//describe('The Oom class')




describe('An Oom instance', function () {
    // initInstTally = ROOT.Oom.stat.inst_tally
    const Class = ROOT.Oom, schema = Class.schema
        , instance = new Class(), attr = instance.attr




    //// AUTOMATIC ATTRIBUTE TESTS

    it('is an instance', function(){try{
        is(instance instanceof Class, 'Is an instance of Oom')
        eq(Class, instance.constructor, '`constructor` is Oom')
    }catch(e){console.error(e.message);throw e}})


    let n = countKeyMatches(schema.attr, isConstant)
    it(`has ${n} constant attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isConstant(key) ) continue // only constants
            tryHardSet(attr, key, 'Changed!')
            const valid = schema.attr[key]
            eq(attr[key], valid.default
              , 'attr.'+key+' is '+valid.default.toString())
            is( isValid(valid, attr[key])
              , 'attr.'+key+' is a valid '+stringOrName(valid.type) )
        }
    }catch(e){console.error(e.message);throw e}})


    n = countKeyMatches(schema.attr, isReadOnly)
    it(`has ${n} read-only attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isReadOnly(key) ) continue // only read-only properties
            attr[key] = 123
            const valid = schema.attr[key]
            eq(attr[key], valid.default
              , 'attr.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, attr[key])
              , 'attr.'+key+' is a valid '+stringOrName(valid.type) )
        }
    }catch(e){console.error(e.message);throw e}})


    it('sees when read-only attributes change', function(){try{
        for (let key in schema.attr) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const good = goodVals[ stringOrName(schema.attr[key].type) ]
            attr['_'+key] = good
            eq(attr[key], good
              , 'attr.'+key+' has changed to '+good)
            //// Changing a read-only value via its underscore-prefixed ‘shadow’
            //// does not invoke any validation or type-checking. Therefore we
            //// don’t test that `badVals` are rejected.
        }
    }catch(e){console.error(e.message);throw e}})


    n = countKeyMatches(schema.attr, isReadWrite)
    it(`has ${n} read-write attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const valid = schema.attr[key]
            eq(attr[key], valid.default
              , 'attr.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, attr[key])
              , 'attr.'+key+' is a valid '+stringOrName(valid.type) )
        }
    }catch(e){console.error(e.message);throw e}})


    it('allows read-write attributes to be changed', function(){try{
        for (let key in schema.attr) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const good = goodVals[ stringOrName(schema.attr[key].type) ]
            const bad  = badVals[  stringOrName(schema.attr[key].type) ]
            attr[key] = good
            eq(attr[key], good
              , 'attr.'+key+' has changed to '+good)
            attr[key] = bad
            eq(attr[key], good
              , 'attr.'+key+' has NOT changed to '+bad)
        }
    }catch(e){console.error(e.message);throw e}})




    //// CUSTOM ATTRIBUTE TESTS
    //@TODO
    //
    // tryHardSet(attr, 'UUID', 'Changed!')
    // eq('string', typeof attr.UUID
    //   , '`attr.UUID` is a string')
    // is(/^[0-9A-Za-z]{6}$/.test(attr.UUID)
    //   , '`attr.UUID` conforms to /^[0-9A-Za-z]{6}$/')
    // tryHardSet(attr, 'INST_INDEX', 99)
    // eq(0, attr.INST_INDEX, 'attr.INST_INDEX is zero')
    // eq(initInstTally+1, Class.stat.inst_tally
    //   , 'stat.inst_tally has incremented to '+initInstTally)
    //@TODO more tests




})//describe('An Oom instance')




})//describe('Bases All')
}( 'object' === typeof global ? global : this ) // `window` in a browser




//// UTILITY

//// Reduces boilerplate at the top of the test files. Bases-browser.6.js adds
//// it to global scope, so that the following test files can use it.
function testify () {
    this.chai  = this.chai  || require('chai')  // only `require()` Chai once
    this.mocha = this.mocha || require('mocha') // only `require()` Mocha once
    return {
        chai
      , mocha
      , assert:   chai.assert
      , expect:   chai.expect
      , eq:       chai.assert.strictEqual
      , is:       chai.assert.isOk
      , describe: this.describe || mocha.describe // browser || Node.js
      , it:       this.it       || mocha.it       // browser || Node.js

        //// Simulate an accidental attempt to modify an object’s properties.
      // , trySoftSet: (obj, keylist, value) => {
      //       keylist.split(',').forEach( key => {
      //           try { obj[key] = value } catch(e) {} })
      //   }

        //// Simulate a determined attempt to modify an object’s properties.
      , tryHardSet: (obj, keylist, value) => {
            keylist.split(',').forEach( key => {
                const def = { enumerable:true, value, configurable:true }
                try { Object.defineProperty(obj, key, def) } catch(e) {}
            })
        }

        //// Dummy values which pass or fail `isValid()`.
      , goodVals: {
            color:  '#89abCD'
          , Number: 12345
          , String: 'ok!'
        }
      , badVals: {
            color:  '89abCD' // missing the '#'
          , Number: '11.22.33' // the string '11.22' would be cast to 11.22
          , String: /nope!/ // regexp, not a string
        }

      , stringOrName: val => 'string' === typeof val ? val : val.name

    }
}




//\\//\\ src/test/Post-all.6.js



//// Oom.Foo //// 1.2.11 //// February 2018 //// http://oom-foo.loop.coop/ /////

!function (ROOT) { 'use strict'
const { describe, it, eq, is } = ROOT.testify()
describe.skip(`Oom.Foo.Post All`, () => {




const Class = Oom.Foo.Post, stat = Class.stat

//// Instantiates a typical Oom.Foo.Post instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




describe(`+ve Oom.Foo.Post class`, () => {

    it(`should be a class`, () => {
        is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
        is('function' === typeof Class, 'Oom.Foo.Post is a function')
        try { Class.name = stat.NAME = 'Changed!'} catch (e) {}
        is( ('Oom.Foo.Post' === Class.name && 'Oom.Foo.Post' === stat.NAME)
          , 'name and stat.NAME are Oom.Foo.Post')
    })

})




describe('+ve Oom.Foo.Post instance', () => {

    it(`should be an instance`, () => {
        const instance = Class.testInstanceFactory()
        const attr = instance.attr
        is(instance instanceof Class, 'Is an instance of Oom.Foo.Post')
        is(Class === instance.constructor, '`constructor` is Oom.Foo.Post')
        is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID)
          , '`attr.UUID` is a six-character string')
        // is('object' === typeof instance.hub, '`hub` property is an object')
    })

})




})//describe()
}( 'object' === typeof global ? global : this ) // `window` in a browser

/*
!function (ROOT) { 'use strict'
return //@TODO convert to Mocha
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.Post All')
const Class = Oom.Foo.Post, stat = Class.stat




//// Instantiates a typical Oom.Foo.Post instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        // @TODO hub API
    })




test('+ve Oom.Foo.Post class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.Post is a function')
    try { Class.name = stat.NAME = 'Changed!'} catch (e) {}
    is( ('Oom.Foo.Post' === Class.name && 'Oom.Foo.Post' === stat.NAME)
      , 'name and stat.NAME are Oom.Foo.Post')
})




test('+ve Oom.Foo.Post instance', () => {
    const instance = Class.testInstanceFactory()
    const attr = instance.attr
    is(instance instanceof Class, 'Is an instance of Oom.Foo.Post')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.Post')
    is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID)
      , '`attr.UUID` is a six-character string')
    // is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
*/




//\\//\\ src/test/Router-all.6.js



//// Oom.Foo //// 1.2.11 //// February 2018 //// http://oom-foo.loop.coop/ /////

!function (ROOT) { 'use strict'
const { describe, it, eq, is } = ROOT.testify()
describe.skip(`Oom.Foo.Router All`, () => {




const Class = Oom.Foo.Router, stat = Class.stat

//// Instantiates a typical Oom.Foo.Router instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




describe(`+ve Oom.Foo.Router class`, () => {

    it(`should be a class`, () => {
        is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
        is('function' === typeof Class, 'Oom.Foo.Router is a function')
        try { Class.name = stat.NAME = 'Changed!'} catch (e) {}
        is( ('Oom.Foo.Router' === Class.name && 'Oom.Foo.Router' === stat.NAME)
          , 'name and stat.NAME are Oom.Foo.Router')
    })

})




describe('+ve Oom.Foo.Router instance', () => {

    it(`should be an instance`, () => {
        const instance = Class.testInstanceFactory()
        const attr = instance.attr
        is(instance instanceof Class, 'Is an instance of Oom.Foo.Router')
        is(Class === instance.constructor, '`constructor` is Oom.Foo.Router')
        is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID)
          , '`attr.UUID` is a six-character string')
        // is('object' === typeof instance.hub, '`hub` property is an object')
    })

})




})//describe()
}( 'object' === typeof global ? global : this ) // `window` in a browser

/*
!function (ROOT) { 'use strict'
return //@TODO convert to Mocha
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.Router All')
const Class = Oom.Foo.Router, stat = Class.stat




//// Instantiates a typical Oom.Foo.Router instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        // @TODO hub API
    })




test('+ve Oom.Foo.Router class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.Router is a function')
    try { Class.name = stat.NAME = 'Changed!'} catch (e) {}
    is( ('Oom.Foo.Router' === Class.name && 'Oom.Foo.Router' === stat.NAME)
      , 'name and stat.NAME are Oom.Foo.Router')
})




test('+ve Oom.Foo.Router instance', () => {
    const instance = Class.testInstanceFactory()
    const attr = instance.attr
    is(instance instanceof Class, 'Is an instance of Oom.Foo.Router')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.Router')
    is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID)
      , '`attr.UUID` is a six-character string')
    // is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
*/




//// Made by Oomtility Make 1.2.11 //\\//\\ http://oomtility.loop.coop /////////
