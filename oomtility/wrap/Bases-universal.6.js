// ${{topline}}

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




test('+ve Oom.${{classname}} class', () => {
    const Class = ROOT.Oom.${{classname}}
    is('function' === typeof Class, 'Oom.${{classname}} is a function')
    is(('Oom.${{classname}}' === Class.name), 'Oom.${{classname}}.name is Oom.${{classname}}')
    //@TODO more tests
})


test('+ve Oom.${{classname}} instance', () => {
    const Class = ROOT.Oom.${{classname}}
    const instance = new Class()
    is(instance instanceof Class, 'Is an instance of Oom.${{classname}}')
    is(Class === instance.constructor, '`constructor` is Oom.${{classname}}')
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




test('+ve Oom.${{classname}}.El class', () => {
    const Class = ROOT.Oom.${{classname}}.El
    is('function' === typeof Class, 'Oom.${{classname}}.El is a function')
    is(('Oom.${{classname}}.El' === Class.name), 'Oom.${{classname}}.El.name is Oom.${{classname}}.El')
    //@TODO more tests
})


test('+ve Oom.${{classname}}.El instance', () => {
    const Class = ROOT.Oom.${{classname}}.El
    const instance = new Class()
    is(instance instanceof Class, 'Is an instance of Oom.${{classname}}.El')
    is(Class === instance.constructor, '`constructor` is Oom.${{classname}}.El')
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
                let $i = $(this)
                collapseTitle($i, ! $i.hasClass('collapsed'))
            })
        $title.data('orig-html', $title.html())

        //// If a previous title which passes exists, collapse it. @TODO collapse the final title
        const $prevTitle = $title.prevAll('.kludjs-title').first()
        if ( $prevTitle[0] && $prevTitle.data('pass')===$prevTitle.data('all') )
            collapseTitle($prevTitle)
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

    ////
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

    function collapseTitle( $i, doCollapse=true) { // `$i` is jQuery title el
        $i[(doCollapse?'add':'remove')+'Class']('collapsed')
        const collapse = $i.hasClass('collapsed')
        while ( ($i=$i.next()) && $i[0] && !$i.hasClass('kludjs-title') )
            $i[ collapse ? 'hide' : 'show' ]()
    }

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
