//\\//\\ src/test/Bases-browser.6.js



//// Oom.Foo //// 1.2.7 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {

const
    eq = chai.assert.strictEqual
  , ok = chai.assert.isOk

describe(`1st Browser`, () => {
    describe(`+ve Oom class`, () => {
        it(`should be a class`, () => {
            const Class = ROOT.Oom, stat = Class.stat
            eq('function', typeof Class, 'Oom should be a function')
        })
    })
})

describe(`2nd Browser`, () => {
    describe(`+ve Oom class`, () => {
        it(`should be a class`, () => {
            const Class = ROOT.Oom, stat = Class.stat
            eq('function', typeof Class, 'Oom should be a function')
        })
    })
})

})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser

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




//\\//\\ src/test/Post-browser.6.js



//// Oom.Foo //// 1.2.7 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
return //@TODO convert to Mocha
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.Post Browser')
const Class = Oom.Foo.Post




test('Browser test the Oom.Foo.Post class', () => {
    is(true, '@TODO')
})



//// Collapse final test section if it passed. See src/test/Bases-universal.6.js
let $t=$('.kludjs-title').last();if($t[0])ROOT.collapseTitle($t,null,true)
})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Router-browser.6.js



//// Oom.Foo //// 1.2.7 //// February 2018 //// http://oom-foo.loop.coop/ //////

!function (ROOT) { 'use strict'
return //@TODO convert to Mocha
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.Router Browser')
const Class = Oom.Foo.Router




test('Browser test the Oom.Foo.Router class', () => {
    is(true, '@TODO')
})



//// Collapse final test section if it passed. See src/test/Bases-universal.6.js
let $t=$('.kludjs-title').last();if($t[0])ROOT.collapseTitle($t,null,true)
})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.2.7 //\\//\\ http://oomtility.loop.coop //////////
