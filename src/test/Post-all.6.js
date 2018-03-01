//// Oom.Foo //// 1.2.14 //// March 2018 //// http://oom-foo.loop.coop/ ////////

!function (ROOT) { 'use strict'
ROOT.testify = testify // make `testify()` available to all test files
const { describe, it, eq, is, tryHardSet, goodVals, badVals, stringOrName }
  = ROOT.testify()
const { countKeyMatches, isConstant, isReadOnly, isReadWrite, isValid }
  = Oom.KIT
describe('Oom.Foo.Post All', function () {




//// Instantiates a typical Oom.Foo.Post instance for unit testing its methods.
// Class.testInstanceFactory = () =>
//     new Class({
//         firstProp: 100
//       , secondProp: new Date
//     },{
//         /* @TODO hub API */
//     })




describe('The Oom.Foo.Post class', () => {
    const Class = ROOT.Oom.Foo.Post
        , schema = Class.schema, stat = Class.stat




    //// AUTOMATIC STATIC TESTS

    it('is a class', function(){try{
        eq(typeof Class, 'function'
          , '`typeof Oom` is a function')
    }catch(e){console.error(e.message);throw e}})


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
              , 'stat.'+key+' is a valid '+stringOrName(valid.type) )
        }
    }catch(e){console.error(e.message);throw e}})


    n = countKeyMatches(schema.stat, isReadOnly)
    it(`has ${n} read-only static${1==n?'':'s'}`, function(){try{
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            stat[key] = goodVals[ stringOrName(schema.stat[key].type) ]
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




})//describe('The Oom.Foo.Post class')




describe('An Oom.Foo.Post instance', function () {
    const Class = ROOT.Oom.Foo.Post
        , schema = Class.schema, instance = new Class(), attr = instance.attr




    //// AUTOMATIC ATTRIBUTE TESTS

    it('is an instance', function(){try{
        is(instance instanceof Class, 'Is an instance of Oom.Foo.Post')
        eq(Class, instance.constructor, '`constructor` is Oom.Foo.Post')
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
            attr[key] = goodVals[ stringOrName(schema.attr[key].type) ]
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




})//describe('An Oom.Foo.Post instance')




})//describe('Oom.Foo.Post All')
}( 'object' === typeof global ? global : this ) // `window` in a browser
