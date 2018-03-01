${{topline}}

!function (ROOT) { 'use strict'
ROOT.testify = testify // make `testify()` available to all test files
const { describe, it, eq, is, tryHardSet, goodVals, badVals } = ROOT.testify()
const { countKeyMatches, isConstant, isReadOnly, isReadWrite, isValid } = Oom.KIT
describe('${{classname}} All', function () {




//// Instantiates a typical ${{classname}} instance for unit testing its methods.
// Class.testInstanceFactory = () =>
//     new Class({
//         firstProp: 100
//       , secondProp: new Date
//     },{
//         /* @TODO hub API */
//     })




describe('The ${{classname}} class', () => {
    const Class = ROOT.${{classname}}
        , schema = Class.schema, stat = Class.stat




    //// AUTOMATIC STATIC TESTS

    it('is a class', function(){try{
        eq(typeof Class, 'function'
          , '`typeof Oom` is a function')
    }catch(e){console.error(e.message);throw e}})


    let n = countKeyMatches(schema.stat, isConstant)
    it(`has ${n} constant static${1==n?'':'s'}`, function(){try{
        tryHardSet(Class, 'name', 'Changed!')
        eq(Class.name, '${{classname}}', 'name is ${{classname}}')
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


    it('sees when read-only statics change', function(){try{
        for (let key in schema.stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            const good = goodVals[ schema.stat[key].typeStr ]
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
              , 'stat.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


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
        }
    }catch(e){console.error(e.message);throw e}})




    //// CUSTOM STATIC TESTS
    //@TODO




})//describe('The ${{classname}} class')




describe('An ${{classname}} instance', function () {
    const Class = ROOT.${{classname}}
        , schema = Class.schema, instance = new Class(), attr = instance.attr




    //// AUTOMATIC ATTRIBUTE TESTS

    it('is an instance', function(){try{
        is(instance instanceof Class, 'Is an instance of ${{classname}}')
        eq(Class, instance.constructor, '`constructor` is ${{classname}}')
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
              , 'attr.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


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
              , 'attr.'+key+' is a valid '+valid.typeStr )
        }
    }catch(e){console.error(e.message);throw e}})


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
        }
    }catch(e){console.error(e.message);throw e}})




    //// CUSTOM ATTRIBUTE TESTS
    //@TODO




})//describe('An ${{classname}} instance')




})//describe('${{classname}} All')
}( 'object' === typeof global ? global : this ) // `window` in a browser
