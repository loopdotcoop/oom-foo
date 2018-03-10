${{topline}}

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
const { describe, it, eq, is, trySoftSet, tryHardSet, goodVals, badVals } = ROOT.testify()
const { countKeyMatches, isConstant, isReadOnly, isReadWrite, isValid } = Oom.KIT
describe('Bases (all)', function () {


//// Establish whether the ${{projectLC}} module’s definition of Oom is being used.
let r; if (!(r=ROOT.Oom) || !(r=r.Foo) || !(r=r.stat) || !(r=r.LOADED_FIRST))
    throw Error('Can’t test: ROOT.Oom.Foo.stat.LOADED_FIRST does not exist')
const LOADED_FIRST = ROOT.Oom.Foo.stat.LOADED_FIRST //@TODO generalise Foo




describe('The Oom class', function () {
    const Class = ROOT.Oom
        , schema = Class.schema, stat = Class.stat




    //// AUTOMATIC STATIC TESTS
    //// Test whether a class conforms to its `stat` schema. You don’t need to
    //// modify these tests unless you’ve given your class special behaviour.


    //// Oom class: The class itself.
    it('is a class with base methods', function(){try{
        eq(typeof Class, 'function'
          , '`typeof Oom` is a function')
        eq(typeof Class.reset, 'function'
          , 'Oom.reset() is a static method')
    }catch(e){console.error(e.message);throw e}})


    //// Oom class: Automatic constant statics.
    let n = countKeyMatches(schema.stat, isConstant)
    it(`has ${n} constant static${1==n?'':'s'}`, function(){try{
        tryHardSet(Class, 'name', 'Changed!')
        eq(Class.name, 'Oom', 'name is Oom')
        for (let key in schema.stat) {
            if (! isConstant(key) ) continue // only constants
            const def = schema.stat[key]
            tryHardSet(stat, key, goodVals[ def.typeStr ])
            eq(stat[key], def.default
              , 'stat.'+key+' is '+def.default.toString())
            is( isValid(def, stat[key])
              , 'stat.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom class: Automatic read-only statics - initial values.
    n = countKeyMatches(schema.stat, isReadOnly)
    it(`has ${n} read-only static${1==n?'':'s'}`, function(){try{
        Class.reset() // so that `stat._inst_tally = 0` @TODO hardReset()
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const def = schema.stat[key]
            stat[key] = goodVals[ def.typeStr ]
            eq(stat[key], def.default
              , 'stat.'+key+' is initially '+def.default.toString())
            is( isValid(def, stat[key])
              , 'stat.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom class: Automatic read-only statics - may change.
    it('sees when read-only statics change', function(){try{
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const def = schema.stat[key]
            const good = goodVals[ def.typeStr ]
            const shadowObj = def.perClass ? stat : def.definedIn.stat
            shadowObj['_'+key] = good // `perClass` controls where a static’s ‘shadow’ value is stored
            eq(stat[key], good
              , 'stat.'+key+' has changed to '+good)
            //// Changing a read-only value via its underscore-prefixed ‘shadow’
            //// does not invoke any validation or type-checking. Therefore we
            //// don’t test that `badVals` are rejected.
            Class.reset()
            eq(stat[key], def.default
              , 'stat.'+key+' has been reset to '+def.default)
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom class: Automatic read-write statics - initial values.
    n = countKeyMatches(schema.stat, isReadWrite)
    it(`has ${n} read-write static${1==n?'':'s'}`, function(){try{
        for (let key in schema.stat) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const def = schema.stat[key]
            eq(stat[key], def.default
              , 'stat.'+key+' is initially '+def.default.toString())
            is( isValid(def, stat[key])
              , 'stat.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom class: Automatic read-write statics - can be changed.
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


    //// Oom class: Custom read-only statics - initial values.
    it('has read-only static `inst_tally`', function(){try{
        Class.reset() // so that `stat._inst_tally = 0` @TODO hardReset()
        eq( stat.inst_tally, 0
          , 'stat.inst_tally is zero after a ‘hard reset’' )
        const instance = new Class()
        eq( stat.inst_tally, 1
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


    //// Oom instance: The instance itself.
    it('is an instance with base methods', function(){try{
        is(instance instanceof Class
          , 'is an instance of Oom')
        eq(Class, instance.constructor
          , '`constructor` is Oom')
        eq(typeof instance.reset, 'function'
          , 'myOom.reset() is an instance method')
    }catch(e){console.error(e.message);throw e}})


    //// Oom instance: Automatic constant attributes from function.
    let n = countKeyMatches(schema.attr
      , key => isConstant(key) && schema.attr[key].isFn )
    it(`has ${n} constant attribute${1==n?'':'s'} from function`, function(){try{
        for (let key in schema.attr) {
            const def = schema.attr[key]
            if (! isConstant(key) || ! def.isFn ) continue // only constants from functions
            //// Constants from functions are too ‘weak’ to pass `tryHardSet()`.
            const origValue = attr[key]
            trySoftSet(attr, key, goodVals[ def.typeStr ])
            eq(attr[key], origValue
              , 'attr.'+key+' remains '+origValue.toString()+' after simple set')
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom instance: Automatic constant attributes NOT from function.
    n = countKeyMatches(schema.attr
      , key => isConstant(key) && ! schema.attr[key].isFn )
    it(`has ${n} constant attribute${1==n?'':'s'} NOT from function`, function(){try{
        for (let key in schema.attr) {
            const def = schema.attr[key]
            if (! isConstant(key) || def.isFn ) continue // only constants NOT from functions
            //// Constants NOT from functions are able to pass `tryHardSet()`.
            tryHardSet(attr, key, goodVals[ def.typeStr ])
            eq(attr[key], def.default
              , 'attr.'+key+' is '+def.default.toString())
            is( isValid(def, attr[key])
              , 'attr.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom instance: Automatic read-only attributes - initial values.
    n = countKeyMatches(schema.attr, isReadOnly)
    it(`has ${n} read-only attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const def = schema.attr[key]
            attr[key] = goodVals[ def.typeStr ]
            eq(attr[key], def.default
              , 'attr.'+key+' is initially '+def.default.toString())
            is( isValid(def, attr[key])
              , 'attr.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom instance: Automatic read-only attributes - may change.
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


    //// Oom instance: Automatic read-write attributes - initial values.
    n = countKeyMatches(schema.attr, isReadWrite)
    it(`has ${n} read-write attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const def = schema.attr[key]
            eq(attr[key], def.default
              , 'attr.'+key+' is initially '+def.default.toString())
            is( isValid(def, attr[key])
              , 'attr.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom instance: Automatic read-write attributes - may change.
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


    //// Oom instance: Custom read-only statics - initial values.
    it('has read-only static `inst_index`', function(){try{
        Class.reset() // so that `stat._inst_tally = 0` @TODO hardReset()
        const instance0 = new Class()
        eq( instance0.attr.inst_index, 0
          , 'First instance after a hard reset has attr.inst_index 0' )
        const instance1 = new Class()
        eq( instance1.attr.inst_index, 1
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




describe('The Oom.${{classname}} class', function () {
    const Class = ROOT.Oom.${{classname}}
        , schema = Class.schema, stat = Class.stat




    //// AUTOMATIC STATIC TESTS
    //// Test whether a class conforms to its `stat` schema. You don’t need to
    //// modify these tests unless you’ve given your class special behaviour.


    //// Oom.${{classname}} class: The class itself.
    it('is a class with base methods', function(){try{
        eq(typeof Class, 'function'
          , '`typeof Oom.${{classname}}` is a function')
        eq(typeof Class.reset, 'function'
          , 'Oom.${{classname}}.reset() is a static method')
    }catch(e){console.error(e.message);throw e}})


    //// Oom.${{classname}} class: Automatic constant statics.
    let n = countKeyMatches(schema.stat, isConstant)
    it(`has ${n} constant static${1==n?'':'s'}`, function(){try{
        tryHardSet(Class, 'name', 'Changed!')
        eq(Class.name, 'Oom.${{classname}}', 'name is Oom.${{classname}}')
        for (let key in schema.stat) {
            if (! isConstant(key) ) continue // only constants
            const def = schema.stat[key]
            tryHardSet(stat, key, goodVals[ def.typeStr ])
            eq(stat[key], def.default
              , 'stat.'+key+' is '+def.default.toString())
            is( isValid(def, stat[key])
              , 'stat.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom.${{classname}} class: Automatic read-only statics - initial values.
    n = countKeyMatches(schema.stat, isReadOnly)
    it(`has ${n} read-only static${1==n?'':'s'}`, function(){try{
        Class.reset() // so that `stat._inst_tally = 0` @TODO hardReset()
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const def = schema.stat[key]
            stat[key] = goodVals[ def.typeStr ]
            eq(stat[key], def.default
              , 'stat.'+key+' is initially '+def.default.toString())
            is( isValid(def, stat[key])
              , 'stat.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom.${{classname}} class: Automatic read-only statics - may change.
    it('sees when read-only statics change', function(){try{
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const def = schema.stat[key]
            const good = goodVals[ def.typeStr ]
            const shadowObj = def.perClass ? stat : def.definedIn.stat
            shadowObj['_'+key] = good // `perClass` controls where a static’s ‘shadow’ value is stored
            eq(stat[key], good
              , 'stat.'+key+' has changed to '+good)
            //// Changing a read-only value via its underscore-prefixed ‘shadow’
            //// does not invoke any validation or type-checking. Therefore we
            //// don’t test that `badVals` are rejected.
            Class.reset()
            eq(stat[key], def.default
              , 'stat.'+key+' has been reset to '+def.default)
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom.${{classname}} class: Automatic read-write statics - initial values.
    n = countKeyMatches(schema.stat, isReadWrite)
    it(`has ${n} read-write static${1==n?'':'s'}`, function(){try{
        for (let key in schema.stat) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const def = schema.stat[key]
            eq(stat[key], def.default
              , 'stat.'+key+' is initially '+def.default.toString())
            is( isValid(def, stat[key])
              , 'stat.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom.${{classname}} class: Automatic read-write statics - can be changed.
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


    //// Oom.${{classname}} class: Custom read-only statics - initial values.
    it('has read-only static `inst_tally`', function(){try{
        Class.reset() // so that `stat._inst_tally = 0` @TODO hardReset()
        eq( stat.inst_tally, 0
          , 'stat.inst_tally is zero after a ‘hard reset’' )
        const instance = new Class()
        eq( stat.inst_tally, 1
          , 'stat.inst_tally is 1 after an instantiation' )
        Class.reset() // so that `stat._inst_tally = 0` @TODO hardReset()
    }catch(e){console.error(e.message);throw e}})




})//describe('The Oom.${{classname}} class')




describe('An Oom.${{classname}} instance', function () {
    const Class = ROOT.Oom.${{classname}}
        , schema = Class.schema, instance = new Class(), attr = instance.attr




    //// AUTOMATIC ATTRIBUTE TESTS
    //// Test whether an instance conforms to its `attr` schema. You don’t need
    //// to modify these tests unless you’ve given your class special behaviour.

    //// Oom.${{classname}} instance: The instance itself.
    it('is an instance with base methods', function(){try{
        is(instance instanceof Class
          , 'is an instance of Oom.${{classname}}')
        eq(Class, instance.constructor
          , '`constructor` is Oom.${{classname}}')
        eq(typeof instance.reset, 'function'
          , 'myOom.${{classname}}.reset() is an instance method')
    }catch(e){console.error(e.message);throw e}})


    //// Oom.${{classname}} instance: Automatic constant attributes from function.
    let n = countKeyMatches(schema.attr
      , key => isConstant(key) && schema.attr[key].isFn )
    it(`has ${n} constant attribute${1==n?'':'s'} from function`, function(){try{
        for (let key in schema.attr) {
            const def = schema.attr[key]
            if (! isConstant(key) || ! def.isFn ) continue // only constants from functions
            //// Constants from functions are too ‘weak’ to pass `tryHardSet()`.
            const origValue = attr[key]
            trySoftSet(attr, key, goodVals[ def.typeStr ])
            eq(attr[key], origValue
              , 'attr.'+key+' remains '+origValue.toString()+' after simple set')
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom.${{classname}} instance: Automatic constant attributes NOT from function.
    n = countKeyMatches(schema.attr
      , key => isConstant(key) && ! schema.attr[key].isFn )
    it(`has ${n} constant attribute${1==n?'':'s'} NOT from function`, function(){try{
        for (let key in schema.attr) {
            const def = schema.attr[key]
            if (! isConstant(key) || def.isFn ) continue // only constants NOT from functions
            //// Constants NOT from functions are able to pass `tryHardSet()`.
            tryHardSet(attr, key, goodVals[ def.typeStr ])
            eq(attr[key], def.default
              , 'attr.'+key+' is '+def.default.toString())
            is( isValid(def, attr[key])
              , 'attr.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom.${{classname}} instance: Automatic read-only attributes - initial values.
    n = countKeyMatches(schema.attr, isReadOnly)
    it(`has ${n} read-only attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const def = schema.attr[key]
            attr[key] = goodVals[ def.typeStr ]
            eq(attr[key], def.default
              , 'attr.'+key+' is initially '+def.default.toString())
            is( isValid(def, attr[key])
              , 'attr.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom.${{classname}} instance: Automatic read-only attributes - may change.
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


    //// Oom.${{classname}} instance: Automatic read-write attributes - initial values.
    n = countKeyMatches(schema.attr, isReadWrite)
    it(`has ${n} read-write attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isReadWrite(key) ) continue // only read-write properties
            const def = schema.attr[key]
            eq(attr[key], def.default
              , 'attr.'+key+' is initially '+def.default.toString())
            is( isValid(def, attr[key])
              , 'attr.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom.${{classname}} instance: Automatic read-write attributes - may change.
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


    //// Oom.${{classname}} instance: Custom read-only statics - initial values.
    it('has read-only static `inst_index`', function(){try{
        Class.reset() // so that `stat._inst_tally = 0` @TODO hardReset()
        const instance0 = new Class()
        eq( instance0.attr.inst_index, 0
          , 'First instance after a hard reset has attr.inst_index 0' )
        const instance1 = new Class()
        eq( instance1.attr.inst_index, 1
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




})//describe('An Oom.${{classname}} instance')




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
      , trySoftSet: (obj, keylist, value) => {
            keylist.split(',').forEach( key => {
                try { obj[key] = value } catch(e) {} })
        }

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
