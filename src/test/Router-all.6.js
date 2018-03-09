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
