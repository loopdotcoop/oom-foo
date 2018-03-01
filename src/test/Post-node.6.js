//// Oom.Foo //// 1.2.15 //// March 2018 //// http://oom-foo.loop.coop/ ////////


!function (ROOT) { 'use strict'
const { describe, it, eq, is } = ROOT.testify()
describe(`Oom.Foo.Post Node`, () => {




const Class = Oom.Foo.Post, stat = Class.stat


describe(`+ve Oom.Foo.Post class`, () => {
    it(`should be a class`, () => {
        eq('function', typeof Class, 'Oom.Foo.Post should be a function')
    })
})




})//describe()
}( 'object' === typeof global ? global : this ) // `window` in a browser
