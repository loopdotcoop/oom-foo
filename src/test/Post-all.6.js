//// Oom.Foo //// 1.2.20 //// March 2018 //// http://oom-foo.loop.coop/ ////////

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


    //// Oom.Foo.Post class: The class itself.
    it('is a class with base methods', function(){try{
        eq(typeof Class, 'function'
          , '`typeof Oom.Foo.Post` is a function')
        eq(typeof Class.reset, 'function'
          , 'Oom.Foo.Post.reset() is a static method')
    }catch(e){console.error(e.message);throw e}})


    //// Oom.Foo.Post class: Automatic constant statics.
    let n = countKeyMatches(schema.stat, isConstant)
    it(`has ${n} constant static${1==n?'':'s'}`, function(){try{
        tryHardSet(Class, 'name', 'Changed!')
        eq(Class.name, 'Oom.Foo.Post', 'name is Oom.Foo.Post')
        for (let key in schema.stat) {
            if (! isConstant(key) ) continue // only constants
            tryHardSet(stat, key, 'Changed!')
            const def = schema.stat[key]
            eq(stat[key], def.default
              , 'stat.'+key+' is '+def.default.toString())
            is( isValid(def, stat[key])
              , 'stat.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom.Foo.Post class: Automatic read-only statics - initial values.
    n = countKeyMatches(schema.stat, isReadOnly)
    it(`has ${n} read-only static${1==n?'':'s'}`, function(){try{
        Class.reset()
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


    //// Oom.Foo.Post class: Automatic read-only statics - may change.
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


    //// Oom.Foo.Post class: Automatic read-write statics - initial values.
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


    //// Oom.Foo.Post class: Automatic read-write statics - can be changed.
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


    //// Oom.Foo.Post instance: The instance itself.
    it('is an instance with base methods', function(){try{
        is(instance instanceof Class
          , 'is an instance of Oom.Foo.Post')
        eq(Class, instance.constructor
          , '`constructor` is Oom.Foo.Post')
        eq(typeof instance.reset, 'function'
          , 'myOomFooPost.reset() is an instance method')
    }catch(e){console.error(e.message);throw e}})


    //// Oom.Foo.Post instance: Automatic constant attributes.
    let n = countKeyMatches(schema.attr, isConstant)
    it(`has ${n} constant attribute${1==n?'':'s'}`, function(){try{
        for (let key in schema.attr) {
            if (! isConstant(key) ) continue // only constants
            tryHardSet(attr, key, 'Changed!')
            const def = schema.attr[key]
            eq(attr[key], def.default
              , 'attr.'+key+' is '+def.default.toString())
            is( isValid(def, attr[key])
              , 'attr.'+key+' is a valid '+def.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


    //// Oom.Foo.Post instance: Automatic read-only attributes - initial values.
    n = countKeyMatches(schema.attr, isReadOnly)
    it(`has ${n} read-only attribute${1==n?'':'s'}`, function(){try{
        instance.reset()
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


    //// Oom.Foo.Post instance: Automatic read-only attributes - may change.
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


    //// Oom.Foo.Post instance: Automatic read-write attributes - initial values.
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


    //// Oom.Foo.Post instance: Automatic read-write attributes - may change.
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
