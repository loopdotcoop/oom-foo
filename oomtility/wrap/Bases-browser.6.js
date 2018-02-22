${{topline}}

!function (ROOT) { 'use strict'
const { chai, mocha, assert, expect, describe, it, eq, ok } = ROOT.testify()
describe(`Bases Browser`, () => {




describe(`+ve Oom class`, () => {
    const Class = Oom, stat = Class.stat
    it(`@TODO`, () => {
        ok(true, '@TODO')
    })
})




})//describe()


//// Calling `mocha.run()` here will run all of the test files, including the
//// ones which haven’t loaded yet. Note that `mocha.run()` does not need to be
//// called when running Mocha tests under Node.js.
$(mocha.run)

}(window)

/*
!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Bases Browser')




test('+ve Oom.enduserMainVue', function (next) {
    const Class = ROOT.Oom
    const $test = $('<h1 id="test"><oom-test>Loading...</oom-test></h1>')
    $('body').append($test)
    console.log($test);
    Vue.component('oom-test', Class.enduserMainVue)
    new Vue({ el: '#test' })
    const expected =
        '\n  ${this.stat.NAME} is Oom'
      + '\n  {{stat.NAME}} is Oom'
      + '\n  {{stat.instTally}} is 1\n'
    is( ( $('#ok')[0] && expected === $('#ok').text() )
      , 'div#ok exists and contains the expected text')
    // setTimeout( function () {
    //     const expected =
    //         '\n  ${this.stat.NAME} is Oom'
    //       + '\n  {{stat.NAME}} is Oom'
    //       + '\n  {{stat.instTally}} is 2\n'
    //     is( ( expected === $('#ok').text() )
    //       , 'div#ok shows instTally has incremented')
    //     next()
    // }, 100)
    //@TODO more tests
}, true) // `true` enables async




//// Collapse final test section if it passed. See src/test/Bases-universal.6.js
let $t=$('.kludjs-title').last();if($t[0])ROOT.collapseTitle($t,null,true)
})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
*/
