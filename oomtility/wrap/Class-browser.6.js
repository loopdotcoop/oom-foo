${{topline}}

${{{
isApp ? `
//// Windows XP: Firefox 6, Chrome 15 (and probably lower), Opera 12.10
//// Windows 7:  IE 9, Safari 5.1
//// OS X 10.6:  Firefox 6, Chrome 16 (and probably lower), Opera 12, Safari 5.1
//// iOS:        iPad 3rd (iOS 6) Safari, iPad Air (iOS 7) Chrome
//// Android:    Xperia Tipo (Android 4), Pixel XL (Android 7.1)
`:''
}}}
!function (ROOT) { 'use strict'
return //@TODO convert to Mocha
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('${{classname}} Browser')
const Class = ${{classname}}




test('Browser test the ${{classname}} class', () => {
    is(true, '@TODO')
})



//// Collapse final test section if it passed. See src/test/Bases-universal.6.js
let $t=$('.kludjs-title').last();if($t[0])ROOT.collapseTitle($t,null,true)
})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser
