//// Oom.Foo //// 1.2.8 //// February 2018 //// http://oom-foo.loop.coop/ //////


!function (ROOT) { 'use strict'
const { chai, mocha, assert, expect, describe, it, eq, ok } = ROOT.testify()
describe(`Oom.Foo.Post Nonbrowser`, () => {




const Class = Oom.Foo.Post, stat = Class.stat


describe(`+ve Oom.Foo.Post class`, () => {
    it(`should be a class`, () => {
        eq('function', typeof Class, 'Oom.Foo.Post should be a function')
    })
})




})//describe()
}( 'object' === typeof global ? global : this ) // `window` in a browser
