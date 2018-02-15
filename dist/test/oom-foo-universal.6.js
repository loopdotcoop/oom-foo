//\\//\\ src/test/Bases-universal.6.js



// //// Oom.Foo //// 1.0.0 //// February 2018 //// http://oom-foo.loop.coop/ //////

//// Node.js:    7.2.0
//// Rhino:      @TODO get Rhino working
//// Windows XP: Firefox 6, Chrome 15 (and probably lower), Opera 12.10
//// Windows 7:  IE 9, Safari 5.1
//// OS X 10.6:  Firefox 6, Chrome 16 (and probably lower), Opera 12, Safari 5.1
//// iOS:        iPad 3rd (iOS 6) Safari, iPad Air (iOS 7) Chrome
//// Android:    Xperia Tipo (Android 4), Pixel XL (Android 7.1)

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {

//// Define the `title()` and `throws()` global functions. After any `test()`
//// call, update higher-level summary results.
extendKludJs()


//// Show a title for the first set of tests, with a ‘▶’ button for collapsing.
title('Bases')




test('+ve Oom class', () => {
    const Class = ROOT.Oom
    is('function' === typeof Class, 'Oom is a function')
    is(('Oom' === Class.name), 'Oom.name is Oom')
    //@TODO more tests
})


test('+ve Oom instance', () => {
    const Class = ROOT.Oom
    const instance = new Class()
    is(instance instanceof Class, 'Is an instance of Oom')
    is(Class === instance.constructor, '`constructor` is Oom')
    //@TODO more tests
})




test('+ve Oom.Foo class', () => {
    const Class = ROOT.Oom.Foo
    is('function' === typeof Class, 'Oom.Foo is a function')
    is(('Oom.Foo' === Class.name), 'Oom.Foo.name is Oom.Foo')
    //@TODO more tests
})


test('+ve Oom.Foo instance', () => {
    const Class = ROOT.Oom.Foo
    const instance = new Class()
    is(instance instanceof Class, 'Is an instance of Oom.Foo')
    is(Class === instance.constructor, '`constructor` is Oom.Foo')
    //@TODO more tests
})




test('+ve Oom.El class', () => {
    const Class = ROOT.Oom.El
    is('function' === typeof Class, 'Oom.El is a function')
    is(('Oom.El' === Class.name), 'Oom.El.name is Oom.El')
    //@TODO more tests
})


test('+ve Oom.El instance', () => {
    const Class = ROOT.Oom.El
    const instance = new Class()
    is(instance instanceof Class, 'Is an instance of Oom.El')
    is(Class === instance.constructor, '`constructor` is Oom.El')
    // is('pink' === instance.state.color, '@TODO better test')
    //@TODO more tests
})




test('+ve Oom.Foo.El class', () => {
    const Class = ROOT.Oom.Foo.El
    is('function' === typeof Class, 'Oom.Foo.El is a function')
    is(('Oom.Foo.El' === Class.name), 'Oom.Foo.El.name is Oom.Foo.El')
    //@TODO more tests
})


test('+ve Oom.Foo.El instance', () => {
    const Class = ROOT.Oom.Foo.El
    const instance = new Class()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.El')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.El')
    // is(instance.state.el instanceof ROOT.Oom.El, 'Has an instance of Oom.El')
    //@TODO more tests
})




//// EXTEND KLUD.JS AND REPORT.JS

function extendKludJs () {

    //// Show a section title, which helps break up the list of test results.
    ROOT.title = ROOT.title || ( (text) => {
        if ('undefined' === typeof window) // this is how report.js detects Node
            return console.log(text)

        //// Remove the special '__kludjs_init__' test.
        if (! $('ul.kludjs')[0]) {
            test( '__kludjs_init__', x=>is(1,''))
            $('li.kludjs-singleton:contains("__kludjs_init__")').remove()
        }

        //// Create and initialise the title element.
        const $title =
            $(`<li class="kludjs-title"><span>▶</span> ${text}</li>`)
           .appendTo( $('ul.kludjs') )
           .click( function () {
                let $title = $(this)
                ROOT.collapseTitle( $title, ! $title.hasClass('collapsed') )
            })
        $title.data('orig-html', $title.html())

        //// If a previous title which passes exists, collapse it. @TODO collapse the final title
        const $prevTitle = $title.prevAll('.kludjs-title').first()
        if ($prevTitle[0])
            ROOT.collapseTitle($prevTitle, null, true)
    })

    //// Test for an expected exception.
    ROOT.throws = ROOT.throws || ( (fn, expect, pre) => {
        let nl = 'undefined' === typeof window      // newline, prefixed by ':',
          ? ':\n    ' : ':<br>'+' &nbsp;'.repeat(6) // suffixed with an indent
        let didntThrow = true
        try {
            fn()
        } catch (e) {
            didntThrow = false
            const ok = expect === e.message
            is(ok,`${pre} has ${ok?'':'un'}expected error${ok?'':nl+e.message}`)
        }
        if (didntThrow) is(0, pre + ' did not throw an error')
    })

    //// Add a ‘Total’ heading, and make Klud.js’s `test()` title-aware.
    if ('undefined' !== typeof window) {
        const oldTest = ROOT.test
        const $total = $('<h4> Total: </h4>')
        $total.data('orig-html', $total.html())
        $('div.kludjs').append($total)
        ROOT.test = (text, fn) => {
            oldTest(text, fn)
            if ('__kludjs_init__' === text) return
            $('ul.kludjs >li').each( (i,el) => {
                if ( text === el.innerText.slice(0, text.length) ) {
                    const [ x, pass, all ] = el.innerText.match(/\((\d+)\/(\d+)\)/)
                    updateHeading($total, pass, all)
                    updateHeading($(el).prevAll('.kludjs-title').first(), pass, all)
                }
            })
        }
    }

    //// Collapse (or uncollapse) jQuery title element `$i`, and all its tests.
    ROOT.collapseTitle = ROOT.collapseTitle || ( ( $i, doCollapse, ifPass) => {
        if (ifPass) doCollapse = $i.data('pass') === $i.data('all')
        $i[(doCollapse?'add':'remove')+'Class']('collapsed')
        while ( ($i=$i.next()) && $i[0] && ! $i.hasClass('kludjs-title') )
            $i[ doCollapse ? 'hide' : 'show' ]()
    } )

    function updateHeading ($el, pass, all) {
        $el
           .data('pass', ($el.data('pass')||0)+(+pass))
           .data('all' , ($el.data('all' )||0)+(+all))
           .removeClass('kludjs-pass', 'kludjs-fail')
           .addClass( 'kludjs-'
              + ($el.data('pass') === $el.data('all') ? 'pass' : 'fail') )
           .html(`${$el.data('orig-html')}
                (${$el.data('pass')}/${$el.data('all')})`)
    }

}




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Post-universal.6.js



//// Oom.Foo //// 1.2.3 //// February 2018 //// http://oom-foo.loop.coop/ //////
console.log('Post-universal.6.js');
!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.Post Universal')
const Class = Oom.Foo.Post




//// Instantiates a typical Oom.Foo.Post instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve Oom.Foo.Post class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.Post is a function')
    is( ('Oom.Foo.Post' === Class.NAME && 'Oom.Foo.Post' === Class.api.NAME)
      , 'NAME and api.NAME is Oom.Foo.Post')
    is('Oom.Foo.Post' === Class.name, 'name is Oom.Foo.Post')
})




test('+ve Oom.Foo.Post instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.Post')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.Post')
    is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//\\//\\ src/test/Router-universal.6.js



//// Oom.Foo //// 1.2.3 //// February 2018 //// http://oom-foo.loop.coop/ //////
console.log('Router-universal.6.js');
!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {
title('Oom.Foo.Router Universal')
const Class = Oom.Foo.Router




//// Instantiates a typical Oom.Foo.Router instance for unit testing its methods.
Class.testInstanceFactory = () =>
    new Class({
        firstProp: 100
      , secondProp: new Date
    },{
        /* @TODO hub API */
    })




test('+ve Oom.Foo.Router class', () => {
    is('function' === typeof ROOT.Oom, 'The Oom namespace class exists')
    is('function' === typeof Class, 'Oom.Foo.Router is a function')
    is( ('Oom.Foo.Router' === Class.NAME && 'Oom.Foo.Router' === Class.api.NAME)
      , 'NAME and api.NAME is Oom.Foo.Router')
    is('Oom.Foo.Router' === Class.name, 'name is Oom.Foo.Router')
})




test('+ve Oom.Foo.Router instance', () => {
    const instance = Class.testInstanceFactory()
    is(instance instanceof Class, 'Is an instance of Oom.Foo.Router')
    is(Class === instance.constructor, '`constructor` is Oom.Foo.Router')
    is('object' === typeof instance.hub, '`hub` property is an object')
})




})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.2.3 //\\//\\ http://oomtility.loop.coop //////////
