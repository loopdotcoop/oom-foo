${{topline}}

//// Windows XP: Firefox 6, Chrome 15 (and probably lower), Opera 12.10
//// Windows 7:  IE 9, Safari 5.1
//// OS X 10.6:  Firefox 6, Chrome 16 (and probably lower), Opera 12, Safari 5.1
//// iOS:        iPad 3rd (iOS 6) Safari, iPad Air (iOS 7) Chrome
//// Android:    Xperia Tipo (Android 4), Pixel XL (Android 7.1)

!function (ROOT) { 'use strict'
if (false) return $(mocha.run) // change to `true` to ‘hard skip’ this test
const { describe, it, eq, is, goodVals, badVals } = ROOT.testify()
const { isConstant, isReadOnly, isReadWrite } = Oom.KIT

${{{
module.exports.writeTestBrowser6Js(
    Object.assign({}, config, { classname:'Oom' }) )
}}}




${{{
module.exports.writeTestBrowser6Js(
    Object.assign({}, config, { classname:`Oom.${classname}` }) )
}}}


/*
describe('The Oom.devMainAFrame() component', function (done) {
    const
        Class = ROOT.Oom
      , testID = 'test-oom-devmainaframe' // also used for component tag
      , stat = Class.stat
      , schema = Class.schema
      , instance = new Class()
      , attr = instance.attr
      , cmp = Vue.component( testID, Class.devMainAFrame(Class) )
      , $container = $('.container').append(`<div class="row ${hid?'hid':''}" `
          + `id="${testID}"><${testID}>Loading...</${testID}></div>`)
      , vue = new Vue({ el:'#'+testID, mounted:testAfterMounted })

function testAfterMounted () {




    //// AUTOMATIC STATIC TESTS
    //// Test whether the devMainAFrame component xxxxxx. You don’t need to modify these tests unless
    //// you’ve given your class special behaviour.


    it('is a viable Vue component', function(){try{
        eq( $('#'+testID).length, 1
          , '#'+testID+' exists' )
        eq( $('#'+testID+' .dev-main').length, 1
          , 'dev-main exists' )
        eq( $('#'+testID+' .dev-main .member-table').length, 2
          , 'Two member-tables exist (one for stat, one for attr)' )
    }catch(e){console.error(e.message);throw e}})


}//testAfterMounted()
})//describe('The Oom.devMainAFrame() component')
*/

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
