//\\//\\ src/test/Bases-browser.6.js



//// Oom.Foo //// 1.2.11 //// February 2018 //// http://oom-foo.loop.coop/ /////

//// Windows XP: Firefox 6, Chrome 15 (and probably lower), Opera 12.10
//// Windows 7:  IE 9, Safari 5.1
//// OS X 10.6:  Firefox 6, Chrome 16 (and probably lower), Opera 12, Safari 5.1
//// iOS:        iPad 3rd (iOS 6) Safari, iPad Air (iOS 7) Chrome
//// Android:    Xperia Tipo (Android 4), Pixel XL (Android 7.1)

!function (ROOT) { 'use strict'
const { describe, it, eq, is, goodVals, badVals, stringOrName } = ROOT.testify()
const { isConstant, isReadOnly, isReadWrite } = Oom.KIT
describe('Bases Browser', () => {



describe('The Oom.devMainVue component', function (done) {
    $('.container').append(
        '<div id="test" class="row"><oom-test>Loading...</oom-test></div>')
    const
        Class = ROOT.Oom
      , stat = Class.stat
      , schema = Class.schema
      , instance = new Class()
      , attr = instance.attr
      , cmp = Vue.component('oom-test', Class.devMainVue)
      , vue = new Vue({ el:'#test', mounted:testAfterMounted })

    after(function () {
        // $('#test').remove()
    })

function testAfterMounted () {




    //// AUTOMATIC STATIC TESTS


    //// The current `inst_tally` depends on what previous test suites did.
    // let initInstTally

    it('is a viable Vue component', function(){try{
        eq( $('#test').length, 1, '#test exists' )
        eq( $('#test .dev-main').length, 1
          , 'dev-main exists' )
        eq( $('#test .dev-main .member-table').length, 2
          , 'Two member-tables exist' )
    }catch(e){console.error(e.message);throw e}})


    //// `Vue.nextTick()` because Vue hasn’t initialised the properties yet.
    it('shows correct initial statics', function (done) {
        Vue.nextTick((function(){let error;try{
            // initInstTally = stat.inst_tally
            for (let key in stat) {
                const $el = $(`#test .stat .Oom-${key} .val`)
                const val = ( $el.find('.read-write')[0] )
                    ? $el.find('.read-write').val() // from an <INPUT>
                    : $el.text() // constant or read-only
                eq( val, stat[key]+''
                  , `Vue should set .Oom-${key} to stat.${key}`)
            }
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    }) // `bind(this)` to run the test in Mocha’s context)


    it('shows that read-only statics have changed', function (done) {
        const cache = { good:{} }
        for (let key in stat) {
            if (! isReadOnly(key) ) continue // only read-only properties
            cache.good[key] = goodVals[ stringOrName(schema.stat[key].type) ]
            stat['_'+key] = cache.good[key]
        }
        Vue.nextTick((function(){let error;try{
            for (let key in stat) {
                if (! isReadOnly(key) ) continue // only read-only properties
                const good = cache.good[key]+''
                eq($(`#test .stat .Oom-${key} .val`).text(), good
                  , '`#test .stat .Oom-'+key+' .val` has changed to '+good)
                //// Changing a read-only value via its underscore-prefixed
                //// ‘shadow’ does not invoke any validation or type-checking.
                //// Therefore we don’t test that `badVals` are rejected.
            }
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })


    it('shows that read-write statics have changed', function (done) {
        const cache = { good:{} }
        for (let key in stat) {
            if (! isReadWrite(key) ) continue // only read-write properties
            cache.good[key] = goodVals[ stringOrName(schema.stat[key].type) ]
            stat[key] = cache.good[key]
        }
        Vue.nextTick((function(){let error;try{
            for (let key in stat) {
                if (! isReadWrite(key) ) continue
                const good = cache.good[key]+''
                eq($(`#test .stat .Oom-${key} .val .read-write`).val(), good
                  , '`#test .stat .Oom-'+key+' .val` has changed to '+good)
            }
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })


    it('updates read-write statics after UI input', function (done) {
        const cache = { $el:{}, good:{} }
        for (let key in stat) {
            if (! isReadWrite(key) ) continue
            cache.$el[key] = $(`#test .stat .Oom-${key} .val .read-write`)
            cache.good[key] = goodVals[ stringOrName(schema.stat[key].type) ]
            simulateInput( cache.$el[key], cache.good[key] )
        }
        Vue.nextTick((function(){let error;try{
            for (let key in stat) {
                if (! isReadWrite(key) ) continue
                eq( cache.$el[key].val(), cache.good[key]
                  , `<INPUT> change should make Vue update stat.`+key)
            }
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })


    it('does not update read-write statics after invalid UI input', function (done) {
        const cache = { $el:{}, orig:{} }
        for (let key in stat) {
            if (! isReadWrite(key) ) continue
            cache.$el[key] = $(`#test .stat .Oom-${key} .val .read-write`)
            cache.orig[key] = cache.$el[key].val()
            simulateInput(
                cache.$el[key]
              , badVals[ stringOrName(schema.stat[key].type) ]
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
                const $el = $(`#test .attr .Oom-${key} .val`)
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
            cache.good[key] = goodVals[ stringOrName(schema.attr[key].type) ]
            attr['_'+key] = cache.good[key]
        }
        Vue.nextTick((function(){let error;try{
            for (let key in attr) {
                if (! isReadOnly(key) ) continue // only read-only properties
                const good = cache.good[key]+''
                eq($(`#test .attr .Oom-${key} .val`).text(), good
                  , '`#test .attr .Oom-'+key+' .val` has changed to '+good)
                //// Changing a read-only value via its underscore-prefixed
                //// ‘shadow’ does not invoke any validation or type-checking.
                //// Therefore we don’t test that `badVals` are rejected.
            }
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })


    it('shows that read-write attributes have changed', function (done) {
        const cache = { good:{} }
        for (let key in attr) {
            if (! isReadWrite(key) ) continue // only read-write properties
            cache.good[key] = goodVals[ stringOrName(schema.attr[key].type) ]
            attr[key] = cache.good[key]
        }
        Vue.nextTick((function(){let error;try{
            for (let key in attr) {
                if (! isReadWrite(key) ) continue
                const good = cache.good[key]+''
                eq($(`#test .attr .Oom-${key} .val .read-write`).val(), good
                  , '`#test .attr .Oom-'+key+' .val` has changed to '+good)
            }
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })


    it('updates read-write attributes after UI input', function (done) {
        const cache = { $el:{}, good:{} }
        for (let key in attr) {
            if (! isReadWrite(key) ) continue
            cache.$el[key] = $(`#test .attr .Oom-${key} .val .read-write`)
            cache.good[key] = goodVals[ stringOrName(schema.attr[key].type) ]
            simulateInput( cache.$el[key], cache.good[key] )
        }
        Vue.nextTick((function(){let error;try{
            for (let key in attr) {
                if (! isReadWrite(key) ) continue
                eq( cache.$el[key].val(), cache.good[key]+''
                  , `<INPUT> change should make Vue update attr.`+key)
            }
        }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
    })


    it('does not update read-write attributes after invalid UI input', function (done) {
        const cache = { $el:{}, orig:{} }
        for (let key in attr) {
            if (! isReadWrite(key) ) continue
            cache.$el[key] = $(`#test .attr .Oom-${key} .val .read-write`)
            cache.orig[key] = cache.$el[key].val()
            simulateInput(
                cache.$el[key]
              , badVals[ stringOrName(schema.attr[key].type) ]
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
})//describe('The Oom.devMainVue component')




})//describe('Bases Browser')


//// Calling `mocha.run()` here will run all of the test files, including the
//// ones which haven’t loaded yet. Note that `mocha.run()` does not need to be
//// called when running Mocha tests under Node.js.
$(mocha.run)

}(window)




//// UTILITY

//// Uses jQuery to simulate an <INPUT>’s value being changed. The simple
//// `$('.my-input').val('abc').trigger('input')` does not trigger Vue.
//// From https://github.com/vuejs/Discussion/issues/157#issuecomment-273301588
function simulateInput ($input, val) {
    $input.val(val)
    const e = document.createEvent('HTMLEvents')
    e.initEvent('input', true, true)
    $input[0].dispatchEvent(e)
}




//\\//\\ src/test/Post-browser.6.js



//// Oom.Foo //// 1.2.11 //// February 2018 //// http://oom-foo.loop.coop/ /////

!function (ROOT) { 'use strict'
const { describe, it, eq, is } = ROOT.testify()
describe(`Oom.Foo.Post Browser`, () => {




const Class = Oom.Foo.Post, stat = Class.stat


describe(`+ve Oom.Foo.Post class`, () => {
    it(`@TODO`, () => {
        is(true, '@TODO')
    })
})





})//describe()
}(window)




//\\//\\ src/test/Router-browser.6.js



//// Oom.Foo //// 1.2.11 //// February 2018 //// http://oom-foo.loop.coop/ /////

!function (ROOT) { 'use strict'
const { describe, it, eq, is } = ROOT.testify()
describe(`Oom.Foo.Router Browser`, () => {




const Class = Oom.Foo.Router, stat = Class.stat


describe(`+ve Oom.Foo.Router class`, () => {
    it(`@TODO`, () => {
        is(true, '@TODO')
    })
})





})//describe()
}(window)




//// Made by Oomtility Make 1.2.11 //\\//\\ http://oomtility.loop.coop /////////
