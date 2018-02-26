//\\//\\ src/test/Bases-browser.6.js



//// Oom.Foo //// 1.2.10 //// February 2018 //// http://oom-foo.loop.coop/ /////

//// Windows XP: Firefox 6, Chrome 15 (and probably lower), Opera 12.10
//// Windows 7:  IE 9, Safari 5.1
//// OS X 10.6:  Firefox 6, Chrome 16 (and probably lower), Opera 12, Safari 5.1
//// iOS:        iPad 3rd (iOS 6) Safari, iPad Air (iOS 7) Chrome
//// Android:    Xperia Tipo (Android 4), Pixel XL (Android 7.1)

!function (ROOT) { 'use strict'
const { describe, it, eq, is } = ROOT.testify()
describe('Bases Browser', () => {



describe('+ve Oom.devMainVue', function (done) {
    $('.container').append(
        '<div id="test" class="row"><oom-test>Loading...</oom-test></div>')
    const
        Class = ROOT.Oom
      , cmp = Vue.component('oom-test', Class.devMainVue)
      , vue = new Vue({ el:'#test', mounted:testAfterMounted })

    after(function () {
        // $('#test').remove()
    })

    function testAfterMounted () {

        //// The current `inst_tally` depends on what previous test suites did.
        let initInstTally

        it('should generates a viable Vue component', function(){try{
            eq( $('#test').length, 1, '#test exists' )
            eq( $('#test .member-table').length, 1
              , '.member-table exists' )
        }catch(e){console.error(e.message);throw e}})


        //// `Vue.nextTick()` because Vue hasn’t initialised the properties yet.
        it('Vue should initially show correct static properties', function (done) {
            Vue.nextTick((function(){let error;try{
                initInstTally = Class.stat.inst_tally
                for (let key in Class.stat) {
                    const $el = $(`#test .Oom-${key} .val`)
                    if ( $el.find('.read-write')[0] )
                        eq( $el.find('.read-write').val(), Class.stat[key]+''
                          , `Vue should set .Oom-${key} to stat.${key}`)
                    else
                        eq( $el.text(), Class.stat[key]+''
                          , `Vue should set .Oom-${key} to stat.${key}`)
                }
            }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
        }) // `bind(this)` to run the test in Mocha’s context)


        it('Vue should update HTML when static properties change', function (done) {
            initInstTally = Class.stat.inst_tally // suite can run in isolation
            Class.stat.color = '#000001'
            Class.stat.inst_tally = 44
            const instance = new Class()
            Vue.nextTick((function(){let error;try{
                eq( $('#test .Oom-inst_tally .val').text(), (initInstTally+1)+''
                  , `Vue should see stat.inst_tally has updated`)
                eq( $('#test .Oom-color .val input').val(), '#000001'
                  , `Vue should see stat.color has updated`)
            }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
        })


        it('Vue should change read-write static properties after UI input', function (done) {
            simulateInput( $('#test .Oom-color .val input'), '#339966')
            Vue.nextTick((function(){let error;try{
                eq( Class.stat.color, '#339966'
                  , `<INPUT> change should make Vue update stat.color`,1)
            }catch(e){error=e;console.error(e.message)}done(error)}).bind(this))
        })


    }

})//describe('+ve Oom.devMainVue')




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
    $input.val('#339966')
    const e = document.createEvent('HTMLEvents')
    e.initEvent('input', true, true)
    $input[0].dispatchEvent(e)
}




//\\//\\ src/test/Post-browser.6.js



//// Oom.Foo //// 1.2.10 //// February 2018 //// http://oom-foo.loop.coop/ /////

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



//// Oom.Foo //// 1.2.10 //// February 2018 //// http://oom-foo.loop.coop/ /////

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




//// Made by Oomtility Make 1.2.10 //\\//\\ http://oomtility.loop.coop /////////
