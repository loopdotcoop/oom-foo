${{topline}}
console.log('Post-universal.6.js');
${{{
isApp ? `
//// Node.js:    7.2.0
//// Rhino:      @TODO get Rhino working
//// Windows XP: Firefox 6, Chrome 15 (and probably lower), Opera 12.10
//// Windows 7:  IE 9, Safari 5.1
//// OS X 10.6:  Firefox 6, Chrome 16 (and probably lower), Opera 12, Safari 5.1
//// iOS:        iPad 3rd (iOS 6) Safari, iPad Air (iOS 7) Chrome
//// Android:    Xperia Tipo (Android 4), Pixel XL (Android 7.1)
`:''
}}}
!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('${{classname}} Universal')
const Class = ${{classname}}




//// Instantiates a typical ${{classname}} instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve ${{classname}} class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, '${{classname}} is a function')
    is( ('${{classname}}' === Class.NAME && '${{classname}}' === Class.api.NAME)
      , 'NAME and api.NAME is ${{classname}}')
    is('${{classname}}' === Class.name, 'name is ${{classname}}')
})




test('+ve ${{classname}} instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of ${{classname}}')
    is(Class === instance.constructor, '`constructor` is ${{classname}}')
    is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
