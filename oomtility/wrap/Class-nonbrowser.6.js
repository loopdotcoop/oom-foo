${{topline}}


!function (ROOT) { 'use strict'
const { chai, mocha, assert, expect, describe, it, eq, ok } = ROOT.testify()
describe(`${{classname}} Nonbrowser`, () => {




const Class = ${{classname}}, stat = Class.stat


describe(`+ve ${{classname}} class`, () => {
    it(`should be a class`, () => {
        eq('function', typeof Class, '${{classname}} should be a function')
    })
})




})//describe()
}( 'object' === typeof global ? global : this ) // `window` in a browser
