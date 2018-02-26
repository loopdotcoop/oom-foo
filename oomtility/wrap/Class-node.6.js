${{topline}}


!function (ROOT) { 'use strict'
const { describe, it, eq, is } = ROOT.testify()
describe(`${{classname}} Node`, () => {




const Class = ${{classname}}, stat = Class.stat


describe(`+ve ${{classname}} class`, () => {
    it(`should be a class`, () => {
        eq('function', typeof Class, '${{classname}} should be a function')
    })
})




})//describe()
}( 'object' === typeof global ? global : this ) // `window` in a browser
