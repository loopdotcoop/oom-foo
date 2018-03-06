//// Oom.Foo //// 1.2.16 //// March 2018 //// http://oom-foo.loop.coop/ ////////

!function (ROOT) { 'use strict'
if (false) return // change to `true` to ‘hard skip’ this test
const { describe, it, eq, is, goodVals, badVals } = ROOT.testify()
const { isConstant, isReadOnly, isReadWrite } = Oom.KIT
describe('Oom.Foo.Post (browser)', () => {
    const hid = 0 // `true` hides the Vue component, `false` makes it visible




describe('The Oom.Foo.Post.devMainVue component', function (done) {
    const
        Class = ROOT.Oom.Foo.Post
      , testID = 'test-oom-foo-post-devmainvue' // also used for component tag
      , stat = Class.stat
      , schema = Class.schema
      , instance = new Class()
      , attr = instance.attr
      , cmp = Vue.component( testID, Class.devMainVue(Class) )
      , $container = $('.container').append(`<div class="row ${hid?'hid':''}" `
          + `id="${testID}"><${testID}>Loading...</${testID}></div>`)
      , vue = new Vue({ el:'#'+testID, mounted:testAfterMounted })

function testAfterMounted () {




    //// AUTOMATIC STATIC TESTS
    //// Test whether the devMainVue component produces a useful representation
    //// of the class’s statics. You don’t need to modify these tests unless
    //// you’ve given your class special behaviour.


    //// The current `inst_tally` depends on what previous test suites did.
    // let initInstTally

    it('is a viable Vue component', function(){try{
        eq( $('#'+testID).length, 1, '#'+testID+' exists' )
        eq( $('#'+testID+' .dev-main').length, 1
          , 'dev-main exists' )
        eq( $('#'+testID+' .dev-main .member-table').length, 2
          , 'Two member-tables exist (one for stat, one for attr)' )
    }catch(e){console.error(e.message);throw e}})


    //// Automatic statics - initial values.
    it('shows correct initial statics', function (done) {
        //// `Vue.nextTick()` because Vue hasn’t initialised the properties yet.
        Vue.nextTick((function(){let error;try{
            // initInstTally = stat.inst_tally
            for (let key in stat) {
                const $el = $(`#${testID} .stat .Oom-${key} .val`)
                const val = ( $el.find('.read-write')[0] )
                    ? $el.find('.read-write').val() // from an <INPUT>
                    : $el.text() // constant or read-only
                eq( val, stat[key]+''
                  , `Vue should set .Oom-${key} to stat.${key}`)
            }
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    }) // `bind(this)` to run the test in Mocha’s context)


    //// Automatic read-only statics - shows changes.
    it('shows that read-only statics have changed', function (done) {
        const cache = { good:{} }
        for (let key in stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            cache.good[key] = goodVals[ schema.stat[key].typeStr ]
            schema.stat[key].definedIn.stat['_'+key] = cache.good[key]
        }
        Vue.nextTick((function(){let error;try{
            for (let key in stat) {
                if (! isReadOnly(key) ) continue // only read-only properties
                const good = cache.good[key]+''
                eq($(`#${testID} .stat .Oom-${key} .val`).text(), good
                  , '`#'+testID+' .stat .Oom-'+key+' .val` changed to '+good)
                //// Changing a read-only value via its underscore-prefixed
                //// ‘shadow’ does not invoke any validation or type-checking.
                //// Therefore we don’t test that `badVals` are rejected.
            }
            Class.reset()
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })


    //// Automatic read-write statics - shows changes.
    it('shows that read-write statics have changed', function (done) {
        const cache = { good:{} }
        for (let key in stat) {
            if (! isReadWrite(key) ) continue // only read-write properties
            cache.good[key] = goodVals[ schema.stat[key].typeStr ]
            stat[key] = cache.good[key]
        }
        Vue.nextTick((function(){let error;try{
            for (let key in stat) {
                if (! isReadWrite(key) ) continue
                const good = cache.good[key]+''
                eq($(`#${testID} .stat .Oom-${key} .val .read-write`).val(), good
                  , '`#'+testID+' .stat .Oom-'+key+' .val` changed to '+good)
            }
            Class.reset()
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })


    //// Automatic read-write statics - valid input.
    it('updates read-write statics after UI input', function (done) {
        const cache = { $el:{}, good:{} }
        for (let key in stat) {
            if (! isReadWrite(key) ) continue
            cache.$el[key] = $(`#${testID} .stat .Oom-${key} .val .read-write`)
            cache.good[key] = goodVals[ schema.stat[key].typeStr ]
            simulateInput( cache.$el[key], cache.good[key] )
        }
        Vue.nextTick((function(){let error;try{
            for (let key in stat) {
                if (! isReadWrite(key) ) continue
                eq( cache.$el[key].val(), cache.good[key]+''
                  , `<INPUT> change should make Vue update stat.`+key)
            }
            Class.reset()
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })


    //// Automatic read-write statics - invalid input.
    it('does not update read-write statics after invalid UI input', function (done) {
        const cache = { $el:{}, orig:{} }
        for (let key in stat) {
            if (! isReadWrite(key) ) continue
            cache.$el[key] = $(`#${testID} .stat .Oom-${key} .val .read-write`)
            cache.orig[key] = cache.$el[key].val()
            simulateInput(
                cache.$el[key]
              , badVals[ schema.stat[key].typeStr ]
            )
        }
        Vue.nextTick((function(){let error;try{
            for (let key in stat) {
                if (! isReadWrite(key) ) continue
                eq( cache.$el[key].val(), cache.orig[key]
                  , `invalid <INPUT> change does not update stat.`+key)
            }
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })




    //// CUSTOM STATIC TESTS
    //@TODO




    //// AUTOMATIC ATTRIBUTE TESTS


    //// `Vue.nextTick()` because Vue hasn’t initialised the properties yet.
    it('shows correct initial attributes', function (done) {
        Vue.nextTick((function(){let error;try{
            for (let key in attr) {
                const $el = $(`#${testID} .attr .Oom-${key} .val`)
                const val = ( $el.find('.read-write')[0] )
                    ? $el.find('.read-write').val() // from an <INPUT>
                    : $el.text() // constant or read-only
                eq( val, attr[key]+''
                  , `Vue should set .Oom-${key} to attr.${key}`)
            }
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    }) // `bind(this)` to run the test in Mocha’s context)


    it('shows that read-only attributes have changed', function (done) {
        const cache = { good:{} }
        for (let key in attr) {
            if (! isReadOnly(key) ) continue // only read-only properties
            cache.good[key] = goodVals[ schema.attr[key].typeStr ]
            attr['_'+key] = cache.good[key]
        }
        Vue.nextTick((function(){let error;try{
            for (let key in attr) {
                if (! isReadOnly(key) ) continue // only read-only properties
                const good = cache.good[key]+''
                eq($(`#${testID} .attr .Oom-${key} .val`).text(), good
                  , '`#'+testID+' .attr .Oom-'+key+' .val` changed to '+good)
                //// Changing a read-only value via its underscore-prefixed
                //// ‘shadow’ does not invoke any validation or type-checking.
                //// Therefore we don’t test that `badVals` are rejected.
            }
            instance.reset()
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })


    it('shows that read-write attributes have changed', function (done) {
        const cache = { good:{} }
        for (let key in attr) {
            if (! isReadWrite(key) ) continue // only read-write properties
            cache.good[key] = goodVals[ schema.attr[key].typeStr ]
            attr[key] = cache.good[key]
        }
        Vue.nextTick((function(){let error;try{
            for (let key in attr) {
                if (! isReadWrite(key) ) continue
                const good = cache.good[key]+''
                eq($(`#${testID} .attr .Oom-${key} .val .read-write`).val(), good
                  , '`#'+testID+' .attr .Oom-'+key+' .val` changed to '+good)
            }
            instance.reset()
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })


    it('updates read-write attributes after UI input', function (done) {
        const cache = { $el:{}, good:{} }
        for (let key in attr) {
            if (! isReadWrite(key) ) continue
            cache.$el[key] = $(`#${testID} .attr .Oom-${key} .val .read-write`)
            cache.good[key] = goodVals[ schema.attr[key].typeStr ]
            simulateInput( cache.$el[key], cache.good[key] )
        }
        Vue.nextTick((function(){let error;try{
            for (let key in attr) {
                if (! isReadWrite(key) ) continue
                eq( cache.$el[key].val(), cache.good[key]+''
                  , `<INPUT> change should make Vue update attr.`+key)
            }
            instance.reset()
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })


    it('does not update read-write attributes after invalid UI input', function (done) {
        const cache = { $el:{}, orig:{} }
        for (let key in attr) {
            if (! isReadWrite(key) ) continue
            cache.$el[key] = $(`#${testID} .attr .Oom-${key} .val .read-write`)
            cache.orig[key] = cache.$el[key].val()
            simulateInput(
                cache.$el[key]
              , badVals[ schema.attr[key].typeStr ]
            )
        }
        Vue.nextTick((function(){let error;try{
            for (let key in attr) {
                if (! isReadWrite(key) ) continue
                eq( cache.$el[key].val(), cache.orig[key]
                  , `invalid <INPUT> change does not update attr.`+key)
            }
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })




    //// CUSTOM ATTRIBUTE TESTS
    //@TODO






}//testAfterMounted()
})//describe('The Oom.Foo.Post.devMainVue component')




})//describe('Oom.Foo.Post (browser)')
}(window)
