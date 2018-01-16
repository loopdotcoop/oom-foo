//\\//\\ src/test/App-universal.6.js



//// OomFoo //// 1.0.7 //// January 2018 //// http://oom-foo.loop.coop/ ////////

//// Node.js: 7.2.0
//// Rhino:   @TODO get Rhino working

//// Windows XP: Firefox 6, Chrome 15 (and probably lower), Opera 12.10
//// Windows 7:  IE 9, Safari 5.1
//// OS X 10.6:  Firefox 6, Chrome 16 (and probably lower), Opera 12, Safari 5.1
//// iOS:        iPad 3rd (iOS 6) Safari, iPad Air (iOS 7) Chrome
//// Android:    Xperia Tipo (Android 4), Pixel XL (Android 7.1)




if ('function' != typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {




test('The OomFoo class', () => {
    is('object' === typeof OOM, 'The OOM namespace object exists')
    is('undefined' === typeof OomFoo, 'OomFoo is not global')
    let Class = OOM.OomFoo
    is('function' === typeof Class, 'OomFoo is a function')

    is('OomFoo' === Class.NAME, 'NAME as expected')
    is('1.0.7' === Class.VERSION, 'VERSION as expected') // OOMBUMPABLE
    is('http://oom-foo.loop.coop/' === Class.HOMEPAGE, 'HOMEPAGE as expected')
})




})




//\\//\\ built by Oomtility Make 1.0.7 //\\//\\ http://oomtility.loop.coop //\\//\\
