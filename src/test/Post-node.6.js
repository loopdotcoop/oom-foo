//// Oom.Foo //// 1.2.23 //// March 2018 //// http://oom-foo.loop.coop/ ////////


!function (ROOT) { 'use strict'
if (false) return // change to `true` to ‘hard skip’ this test
const { describe, it, eq, is } = ROOT.testify()
describe('Oom.Foo.Post (node)', () => {




const Class = Oom.Foo.Post, stat = Class.stat


describe(`+ve Oom.Foo.Post class`, () => {
    it(`should be a class`, () => {
        eq('function', typeof Class, 'Oom.Foo.Post should be a function')
    })
})




})//describe('Oom.Foo.Post (node)')
}( 'object' === typeof global ? global : this ) // `window` in a browser
