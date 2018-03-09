//\\//\\ src/test/Bases-all.6.js



//// Oom.Foo //// 1.2.17 //// March 2018 //// http://oom-foo.loop.coop/ ////////

//// Node.js:    7.2.0
//// Rhino:      @TODO get Rhino working
//// Windows XP: Firefox 6, Chrome 15 (and probably lower), Opera 12.10
//// Windows 7:  IE 9, Safari 5.1
//// OS X 10.6:  Firefox 6, Chrome 16 (and probably lower), Opera 12, Safari 5.1
//// iOS:        iPad 3rd (iOS 6) Safari, iPad Air (iOS 7) Chrome
//// Android:    Xperia Tipo (Android 4), Pixel XL (Android 7.1)

!function (ROOT) { 'use strict'
ROOT.testify = testify // make `testify()` available to all test files
if (false) return // change to `true` to ‘hard skip’ this test
const { describe, it, eq, is, tryHardSet, goodVals, badVals } = ROOT.testify()
const { countKeyMatches, isConstant, isReadOnly, isReadWrite, isValid } = Oom.KIT
describe('Bases (all)', function () {


//// Establish whether the oom-foo module’s definition of Oom is being used.
let r; if (!(r=ROOT.Oom) || !(r=r.Foo) || !(r=r.stat) || !(r=r.LOADED_FIRST))
    throw Error('Can’t test: ROOT.Oom.Foo.stat.LOADED_FIRST does not exist')
const LOADED_FIRST = ROOT.Oom.Foo.stat.LOADED_FIRST //@TODO generalise Foo




describe('The Oom class', function () {
    const Class = ROOT.Oom
        , schema = Class.schema, stat = Class.stat




    //// AUTOMATIC STATIC TESTS
    //// Test whether a class conforms to its `stat` schema. You don’t need to
    //// modify these tests unless you’ve given your class special behaviour.

    it('is a class with base methods', function(){try{
        eq(typeof Class, 'function'
          , '`typeof Oom` is a function')
        eq(typeof Class.reset, 'function'
          , 'Oom.reset() is a static method')
    }catch(e){console.error(e.message);throw e}})


    //// Automatic constant statics.
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
              , 'stat.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-only statics - initial values.
    n = countKeyMatches(schema.stat, isReadOnly)
    it(`has ${n} read-only static${1==n?'':'s'}`, function(){try{
        Class.reset() // so that `stat._inst_tally = 0` @TODO hardReset()
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            stat[key] = goodVals[ schema.stat[key].typeStr ]
            const valid = schema.stat[key]
            eq(stat[key], valid.default
              , 'stat.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, stat[key])
              , 'stat.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-only statics - may change.
    it('sees when read-only statics change', function(){try{
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const good = goodVals[ schema.stat[key].typeStr ]
            schema.stat[key].definedIn.stat['_'+key] = good // note this line!
            eq(stat[key], good
              , 'stat.'+key+' has changed to '+good)
            //// Changing a read-only value via its underscore-prefixed ‘shadow’
            //// does not invoke any validation or type-checking. Therefore we
            //// don’t test that `badVals` are rejected.
            Class.reset()
            eq(stat[key], schema.stat[key].default
              , 'stat.'+key+' has been reset to '+schema.stat[key].default)
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-write statics - initial values.
    n = countKeyMatches(schema.stat, isReadWrite)
    it(`has ${n} read-write static${1==n?'':'s'}`, function(){try{
        for (let key in schema.stat) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const valid = schema.stat[key]
            eq(stat[key], valid.default
              , 'stat.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, stat[key])
              , 'stat.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-write statics - can be changed.
    it('allows read-write statics to be changed', function(){try{
        for (let key in schema.stat) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const good = goodVals[ schema.stat[key].typeStr ]
            const bad  = badVals[  schema.stat[key].typeStr ]
            stat[key] = good
            eq(stat[key], good
              , 'stat.'+key+' has changed to '+good)
            stat[key] = bad
            eq(stat[key], good
              , 'stat.'+key+' has NOT changed to '+bad)
            Class.reset()
            eq(stat[key], schema.stat[key].default
              , 'stat.'+key+' has been reset to '+schema.stat[key].default)
        }
    }catch(e){console.error(e.message);throw e}})




    //// CUSTOM STATIC TESTS


    //// Custom read-only statics - initial values.
    it('has read-only static `inst_tally`', function(){try{
        Class.reset() // so that `stat._inst_tally = 0` @TODO hardReset()
        eq( 0, stat.inst_tally
          , 'stat.inst_tally is zero after a ‘hard reset’' )
        const instance = new Class()
        eq( 1, stat.inst_tally
          , 'stat.inst_tally is 1 after an instantiation' )
        Class.reset() // so that `stat._inst_tally = 0` @TODO hardReset()
    }catch(e){console.error(e.message);throw e}})




})//describe('The Oom class')




describe('An Oom instance', function () {
    const Class = ROOT.Oom
        , schema = Class.schema, instance = new Class(), attr = instance.attr




    //// AUTOMATIC ATTRIBUTE TESTS
    //// Test whether an instance conforms to its `attr` schema. You don’t need
    //// to modify these tests unless you’ve given your class special behaviour.

    it('is an instance with base methods', function(){try{
        is(instance instanceof Class
          , 'is an instance of Oom')
        eq(Class, instance.constructor
          , '`constructor` is Oom')
        eq(typeof instance.reset, 'function'
          , 'myOom.reset() is an instance method')
    }catch(e){console.error(e.message);throw e}})


    //// Automatic constant attributes.
    let n = countKeyMatches(schema.attr, isConstant)
    it(`has ${n} constant attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isConstant(key) ) continue // only constants
            tryHardSet(attr, key, 'Changed!')
            const valid = schema.attr[key]
            eq(attr[key], valid.default
              , 'attr.'+key+' is '+valid.default.toString())
            is( isValid(valid, attr[key])
              , 'attr.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-only attributes - initial values.
    n = countKeyMatches(schema.attr, isReadOnly)
    it(`has ${n} read-only attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isReadOnly(key) ) continue // only read-only properties
            attr[key] = goodVals[ schema.attr[key].typeStr ]
            const valid = schema.attr[key]
            eq(attr[key], valid.default
              , 'attr.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, attr[key])
              , 'attr.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-only attributes - may change.
    it('sees when read-only attributes change', function(){try{
        for (let key in schema.attr) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const good = goodVals[ schema.attr[key].typeStr ]
            attr['_'+key] = good
            eq(attr[key], good
              , 'attr.'+key+' has changed to '+good)
            //// Changing a read-only value via its underscore-prefixed ‘shadow’
            //// does not invoke any validation or type-checking. Therefore we
            //// don’t test that `badVals` are rejected.
            instance.reset()
            eq(attr[key], schema.attr[key].default
              , 'attr.'+key+' has been reset to '+schema.attr[key].default)
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-write attributes - initial values.
    n = countKeyMatches(schema.attr, isReadWrite)
    it(`has ${n} read-write attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const valid = schema.attr[key]
            eq(attr[key], valid.default
              , 'attr.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, attr[key])
              , 'attr.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-write attributes - may change.
    it('allows read-write attributes to be changed', function(){try{
        for (let key in schema.attr) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const good = goodVals[ schema.attr[key].typeStr ]
            const bad  = badVals[  schema.attr[key].typeStr ]
            attr[key] = good
            eq(attr[key], good
              , 'attr.'+key+' has changed to '+good)
            attr[key] = bad
            eq(attr[key], good
              , 'attr.'+key+' has NOT changed to '+bad)
            instance.reset()
            eq(attr[key], schema.attr[key].default
              , 'attr.'+key+' has been reset to '+schema.attr[key].default)
        }
    }catch(e){console.error(e.message);throw e}})




    //// CUSTOM ATTRIBUTE TESTS


    //// Custom read-only statics - initial values.
    it('has read-only static `inst_index`', function(){try{
        Class.reset() // so that `stat._inst_tally = 0` @TODO hardReset()
        const instance0 = new Class()
        eq( 0, instance0.attr.inst_index
          , 'First instance after a hard reset has attr.inst_index 0' )
        const instance1 = new Class()
        eq( 1, instance1.attr.inst_index
          , 'Second instance after a hard reset has attr.inst_index 1' )
        Class.reset() // so that `stat._inst_tally = 0` @TODO hardReset()
    }catch(e){console.error(e.message);throw e}})

    //@TODO
    //
    // tryHardSet(attr, 'UUID', 'Changed!')
    // eq('string', typeof attr.UUID
    //   , '`attr.UUID` is a string')
    // is(/^[0-9A-Za-z]{6}$/.test(attr.UUID)
    //   , '`attr.UUID` conforms to /^[0-9A-Za-z]{6}$/')
    //@TODO more tests




})//describe('An Oom instance')




})//describe('Bases (all)')
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
            color:  '#C84CED'
          , Number: 12345
          , String: 'A new valid str'
        }
      , badVals: {
            color:  'C84CED' // missing the '#'
          , Number: '11.22.33' // the string '11.22' would be cast to 11.22
          , String: /Not a valid str/ // regexp, not a string
        }

    }
}




//\\//\\ src/test/Post-all.6.js



//// Oom.Foo //// 1.2.17 //// March 2018 //// http://oom-foo.loop.coop/ ////////

!function (ROOT) { 'use strict'
if (false) return // change to `true` to ‘hard skip’ this test
const { describe, it, eq, is, tryHardSet, goodVals, badVals } = ROOT.testify()
const { countKeyMatches, isConstant, isReadOnly, isReadWrite, isValid } = Oom.KIT
describe('Oom.Foo.Post (all)', function () {




//// Instantiates a typical Oom.Foo.Post instance for unit testing its methods.
// Class.testInstanceFactory = () =>
//     new Class({
//         firstProp: 100
//       , secondProp: new Date
//     },{
//         /* @TODO hub API */
//     })




describe('The Oom.Foo.Post class', function () {
    const Class = ROOT.Oom.Foo.Post
        , schema = Class.schema, stat = Class.stat




    //// AUTOMATIC STATIC TESTS
    //// Test whether a class conforms to its `stat` schema. You don’t need to
    //// modify these tests unless you’ve given your class special behaviour.

    it('is a class with base methods', function(){try{
        eq(typeof Class, 'function'
          , '`typeof Oom.Foo.Post` is a function')
        eq(typeof Class.reset, 'function'
          , 'Oom.Foo.Post.reset() is a static method')
    }catch(e){console.error(e.message);throw e}})


    //// Automatic constant statics.
    let n = countKeyMatches(schema.stat, isConstant)
    it(`has ${n} constant static${1==n?'':'s'}`, function(){try{
        tryHardSet(Class, 'name', 'Changed!')
        eq(Class.name, 'Oom.Foo.Post', 'name is Oom.Foo.Post')
        for (let key in schema.stat) {
            if (! isConstant(key) ) continue // only constants
            tryHardSet(stat, key, 'Changed!')
            const valid = schema.stat[key]
            eq(stat[key], valid.default
              , 'stat.'+key+' is '+valid.default.toString())
            is( isValid(valid, stat[key])
              , 'stat.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-only statics - initial values.
    n = countKeyMatches(schema.stat, isReadOnly)
    it(`has ${n} read-only static${1==n?'':'s'}`, function(){try{
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            stat[key] = goodVals[ schema.stat[key].typeStr ]
            const valid = schema.stat[key]
            eq(stat[key], valid.default
              , 'stat.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, stat[key])
              , 'stat.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-only statics - may change.
    it('sees when read-only statics change', function(){try{
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const good = goodVals[ schema.stat[key].typeStr ]
            schema.stat[key].definedIn.stat['_'+key] = good // note this line!
            eq(stat[key], good
              , 'stat.'+key+' has changed to '+good)
            //// Changing a read-only value via its underscore-prefixed ‘shadow’
            //// does not invoke any validation or type-checking. Therefore we
            //// don’t test that `badVals` are rejected.
            Class.reset()
            eq(stat[key], schema.stat[key].default
              , 'stat.'+key+' has been reset to '+schema.stat[key].default)
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-write statics - initial values.
    n = countKeyMatches(schema.stat, isReadWrite)
    it(`has ${n} read-write static${1==n?'':'s'}`, function(){try{
        for (let key in schema.stat) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const valid = schema.stat[key]
            eq(stat[key], valid.default
              , 'stat.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, stat[key])
              , 'stat.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-write statics - can be changed.
    it('allows read-write statics to be changed', function(){try{
        for (let key in schema.stat) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const good = goodVals[ schema.stat[key].typeStr ]
            const bad  = badVals[  schema.stat[key].typeStr ]
            stat[key] = good
            eq(stat[key], good
              , 'stat.'+key+' has changed to '+good)
            stat[key] = bad
            eq(stat[key], good
              , 'stat.'+key+' has NOT changed to '+bad)
            Class.reset()
            eq(stat[key], schema.stat[key].default
              , 'stat.'+key+' has been reset to '+schema.stat[key].default)
        }
    }catch(e){console.error(e.message);throw e}})




    //// CUSTOM STATIC TESTS
    //@TODO




})//describe('The Oom.Foo.Post class')




describe('An Oom.Foo.Post instance', function () {
    const Class = ROOT.Oom.Foo.Post
        , schema = Class.schema, instance = new Class(), attr = instance.attr




    //// AUTOMATIC ATTRIBUTE TESTS
    //// Test whether an instance conforms to its `attr` schema. You don’t need
    //// to modify these tests unless you’ve given your class special behaviour.

    it('is an instance with base methods', function(){try{
        is(instance instanceof Class
          , 'is an instance of Oom.Foo.Post')
        eq(Class, instance.constructor
          , '`constructor` is Oom.Foo.Post')
        eq(typeof instance.reset, 'function'
          , 'myOomFooPost.reset() is an instance method')
    }catch(e){console.error(e.message);throw e}})


    //// Automatic constant attributes.
    let n = countKeyMatches(schema.attr, isConstant)
    it(`has ${n} constant attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isConstant(key) ) continue // only constants
            tryHardSet(attr, key, 'Changed!')
            const valid = schema.attr[key]
            eq(attr[key], valid.default
              , 'attr.'+key+' is '+valid.default.toString())
            is( isValid(valid, attr[key])
              , 'attr.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-only attributes - initial values.
    n = countKeyMatches(schema.attr, isReadOnly)
    it(`has ${n} read-only attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isReadOnly(key) ) continue // only read-only properties
            attr[key] = goodVals[ schema.attr[key].typeStr ]
            const valid = schema.attr[key]
            eq(attr[key], valid.default
              , 'attr.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, attr[key])
              , 'attr.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-only attributes - may change.
    it('sees when read-only attributes change', function(){try{
        for (let key in schema.attr) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const good = goodVals[ schema.attr[key].typeStr ]
            attr['_'+key] = good
            eq(attr[key], good
              , 'attr.'+key+' has changed to '+good)
            //// Changing a read-only value via its underscore-prefixed ‘shadow’
            //// does not invoke any validation or type-checking. Therefore we
            //// don’t test that `badVals` are rejected.
            instance.reset()
            eq(attr[key], schema.attr[key].default
              , 'attr.'+key+' has been reset to '+schema.attr[key].default)
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-write attributes - initial values.
    n = countKeyMatches(schema.attr, isReadWrite)
    it(`has ${n} read-write attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const valid = schema.attr[key]
            eq(attr[key], valid.default
              , 'attr.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, attr[key])
              , 'attr.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-write attributes - may change.
    it('allows read-write attributes to be changed', function(){try{
        for (let key in schema.attr) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const good = goodVals[ schema.attr[key].typeStr ]
            const bad  = badVals[  schema.attr[key].typeStr ]
            attr[key] = good
            eq(attr[key], good
              , 'attr.'+key+' has changed to '+good)
            attr[key] = bad
            eq(attr[key], good
              , 'attr.'+key+' has NOT changed to '+bad)
            instance.reset()
            eq(attr[key], schema.attr[key].default
              , 'attr.'+key+' has been reset to '+schema.attr[key].default)
        }
    }catch(e){console.error(e.message);throw e}})




    //// CUSTOM ATTRIBUTE TESTS
    //@TODO




})//describe('An Oom.Foo.Post instance')




})//describe('Oom.Foo.Post (all)')
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Router-all.6.js



//// Oom.Foo //// 1.2.17 //// March 2018 //// http://oom-foo.loop.coop/ ////////

!function (ROOT) { 'use strict'
if (false) return // change to `true` to ‘hard skip’ this test
const { describe, it, eq, is, tryHardSet, goodVals, badVals } = ROOT.testify()
const { countKeyMatches, isConstant, isReadOnly, isReadWrite, isValid } = Oom.KIT
describe('Oom.Foo.Router (all)', function () {




//// Instantiates a typical Oom.Foo.Router instance for unit testing its methods.
// Class.testInstanceFactory = () =>
//     new Class({
//         firstProp: 100
//       , secondProp: new Date
//     },{
//         /* @TODO hub API */
//     })




describe('The Oom.Foo.Router class', function () {
    const Class = ROOT.Oom.Foo.Router
        , schema = Class.schema, stat = Class.stat




    //// AUTOMATIC STATIC TESTS
    //// Test whether a class conforms to its `stat` schema. You don’t need to
    //// modify these tests unless you’ve given your class special behaviour.

    it('is a class with base methods', function(){try{
        eq(typeof Class, 'function'
          , '`typeof Oom.Foo.Router` is a function')
        eq(typeof Class.reset, 'function'
          , 'Oom.Foo.Router.reset() is a static method')
    }catch(e){console.error(e.message);throw e}})


    //// Automatic constant statics.
    let n = countKeyMatches(schema.stat, isConstant)
    it(`has ${n} constant static${1==n?'':'s'}`, function(){try{
        tryHardSet(Class, 'name', 'Changed!')
        eq(Class.name, 'Oom.Foo.Router', 'name is Oom.Foo.Router')
        for (let key in schema.stat) {
            if (! isConstant(key) ) continue // only constants
            tryHardSet(stat, key, 'Changed!')
            const valid = schema.stat[key]
            eq(stat[key], valid.default
              , 'stat.'+key+' is '+valid.default.toString())
            is( isValid(valid, stat[key])
              , 'stat.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-only statics - initial values.
    n = countKeyMatches(schema.stat, isReadOnly)
    it(`has ${n} read-only static${1==n?'':'s'}`, function(){try{
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            stat[key] = goodVals[ schema.stat[key].typeStr ]
            const valid = schema.stat[key]
            eq(stat[key], valid.default
              , 'stat.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, stat[key])
              , 'stat.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-only statics - may change.
    it('sees when read-only statics change', function(){try{
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const good = goodVals[ schema.stat[key].typeStr ]
            schema.stat[key].definedIn.stat['_'+key] = good // note this line!
            eq(stat[key], good
              , 'stat.'+key+' has changed to '+good)
            //// Changing a read-only value via its underscore-prefixed ‘shadow’
            //// does not invoke any validation or type-checking. Therefore we
            //// don’t test that `badVals` are rejected.
            Class.reset()
            eq(stat[key], schema.stat[key].default
              , 'stat.'+key+' has been reset to '+schema.stat[key].default)
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-write statics - initial values.
    n = countKeyMatches(schema.stat, isReadWrite)
    it(`has ${n} read-write static${1==n?'':'s'}`, function(){try{
        for (let key in schema.stat) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const valid = schema.stat[key]
            eq(stat[key], valid.default
              , 'stat.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, stat[key])
              , 'stat.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-write statics - can be changed.
    it('allows read-write statics to be changed', function(){try{
        for (let key in schema.stat) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const good = goodVals[ schema.stat[key].typeStr ]
            const bad  = badVals[  schema.stat[key].typeStr ]
            stat[key] = good
            eq(stat[key], good
              , 'stat.'+key+' has changed to '+good)
            stat[key] = bad
            eq(stat[key], good
              , 'stat.'+key+' has NOT changed to '+bad)
            Class.reset()
            eq(stat[key], schema.stat[key].default
              , 'stat.'+key+' has been reset to '+schema.stat[key].default)
        }
    }catch(e){console.error(e.message);throw e}})




    //// CUSTOM STATIC TESTS
    //@TODO




})//describe('The Oom.Foo.Router class')




describe('An Oom.Foo.Router instance', function () {
    const Class = ROOT.Oom.Foo.Router
        , schema = Class.schema, instance = new Class(), attr = instance.attr




    //// AUTOMATIC ATTRIBUTE TESTS
    //// Test whether an instance conforms to its `attr` schema. You don’t need
    //// to modify these tests unless you’ve given your class special behaviour.

    it('is an instance with base methods', function(){try{
        is(instance instanceof Class
          , 'is an instance of Oom.Foo.Router')
        eq(Class, instance.constructor
          , '`constructor` is Oom.Foo.Router')
        eq(typeof instance.reset, 'function'
          , 'myOomFooRouter.reset() is an instance method')
    }catch(e){console.error(e.message);throw e}})


    //// Automatic constant attributes.
    let n = countKeyMatches(schema.attr, isConstant)
    it(`has ${n} constant attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isConstant(key) ) continue // only constants
            tryHardSet(attr, key, 'Changed!')
            const valid = schema.attr[key]
            eq(attr[key], valid.default
              , 'attr.'+key+' is '+valid.default.toString())
            is( isValid(valid, attr[key])
              , 'attr.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-only attributes - initial values.
    n = countKeyMatches(schema.attr, isReadOnly)
    it(`has ${n} read-only attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isReadOnly(key) ) continue // only read-only properties
            attr[key] = goodVals[ schema.attr[key].typeStr ]
            const valid = schema.attr[key]
            eq(attr[key], valid.default
              , 'attr.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, attr[key])
              , 'attr.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-only attributes - may change.
    it('sees when read-only attributes change', function(){try{
        for (let key in schema.attr) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const good = goodVals[ schema.attr[key].typeStr ]
            attr['_'+key] = good
            eq(attr[key], good
              , 'attr.'+key+' has changed to '+good)
            //// Changing a read-only value via its underscore-prefixed ‘shadow’
            //// does not invoke any validation or type-checking. Therefore we
            //// don’t test that `badVals` are rejected.
            instance.reset()
            eq(attr[key], schema.attr[key].default
              , 'attr.'+key+' has been reset to '+schema.attr[key].default)
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-write attributes - initial values.
    n = countKeyMatches(schema.attr, isReadWrite)
    it(`has ${n} read-write attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const valid = schema.attr[key]
            eq(attr[key], valid.default
              , 'attr.'+key+' is initially '+valid.default.toString())
            is( isValid(valid, attr[key])
              , 'attr.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Automatic read-write attributes - may change.
    it('allows read-write attributes to be changed', function(){try{
        for (let key in schema.attr) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const good = goodVals[ schema.attr[key].typeStr ]
            const bad  = badVals[  schema.attr[key].typeStr ]
            attr[key] = good
            eq(attr[key], good
              , 'attr.'+key+' has changed to '+good)
            attr[key] = bad
            eq(attr[key], good
              , 'attr.'+key+' has NOT changed to '+bad)
            instance.reset()
            eq(attr[key], schema.attr[key].default
              , 'attr.'+key+' has been reset to '+schema.attr[key].default)
        }
    }catch(e){console.error(e.message);throw e}})




    //// CUSTOM ATTRIBUTE TESTS
    //@TODO




})//describe('An Oom.Foo.Router instance')




})//describe('Oom.Foo.Router (all)')
}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.2.17 //\\//\\ http://oomtility.loop.coop /////////
