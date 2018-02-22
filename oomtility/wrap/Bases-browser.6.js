${{topline}}

!function (ROOT) { 'use strict'
const { chai, mocha, assert, expect, describe, it, eq, ok } = ROOT.testify()
describe('Bases Browser', () => {




beforeEach(function () {
})

afterEach(function () {
})



describe('+ve Oom.enduserMainVue', function () {
    const
        Class = ROOT.Oom
      , testsAfterUpdate = [] // push a test in here before causing a component mod

    $('body').append('<h1 id="test"><oom-test>Loading...</oom-test></h1>')
    initVueTests(Class.enduserMainVue, testAfterMounted, testsAfterUpdate)

    beforeEach(function () {
    })

    afterEach(function () {
    })

    after(function () {
        $('#test').remove()
    })

    function testAfterMounted () {

        //// The current `instTally` depends on what previous test suites did.
        const initialInstTally = Class.stat.instTally

        it('Generates a viable Vue component', function () {
            eq( 1, $('#test').length      , 'div#test exists')
            const lines = textToLines( $('#test').text() )
            eq(lines[0], '${this.stat.NAME} is Oom'
              , 'First line bakes stat.NAME into template')
            eq(lines[1], '{{stat.NAME}} is Oom'
              , 'Second line gets stat.NAME via Vue')
            eq(lines[2], '{{stat.instTally}} is 0'
              , 'Third line gets stat.instTally via Vue')
        })


        it('Vue updates HTML when static properties change', function (done) {

            //// Schedule a modification on Vue’s next tick. If we did it right
            //// now, it might modify the state that the previous test sees.
            const that = this
            Vue.nextTick( x => {
                testsAfterUpdate.push( updateTestFn.bind(that) )
                const instance = new Class()
            })

            //// Tests HTML after Vue has finished processing the modification.
            function updateTestFn () {
                const lines = textToLines( $('#test').text() )
                eq(lines[2], '{{stat.instTally}} is 1'
                  , 'Third line shows Vue sees stat.instTally has updated')
                done()
            }
        })

    }

})//describe('+ve Oom.enduserMainVue')




})//describe('Bases Browser')


//// Calling `mocha.run()` here will run all of the test files, including the
//// ones which haven’t loaded yet. Note that `mocha.run()` does not need to be
//// called when running Mocha tests under Node.js.
$(mocha.run)

}(window)




//// UTILITY


//// Sets up a Vue component for testing. When Vue is ready, it will run
//// `testAfterMounted()`, which should
function initVueTests (
    origDefinition   // the original Vue component def, eg `Oom.devMainVue`
  , testAfterMounted // a function to run after Vue finishes its initial render
  , testsAfterUpdate // array of tests to run after the component is modified
) {
    const
        definition = Object.assign({}, origDefinition, {
            updated: function () { // wraps original `update()` and runs tests
                if (origDefinition.updated) origDefinition.updated.call(this)
                let utFn; while( utFn = testsAfterUpdate.shift() ) utFn()
        } })
      , cmp = Vue.component('oom-test', definition)
      , vue = new Vue({
            el: '#test'
          , mounted: testAfterMounted
        })
}


//// Converts a multiline string to an array of strings, and trims whitespace.
function textToLines (text) {
    return text.trim().split('\n').map( l => l.trim() )
}
