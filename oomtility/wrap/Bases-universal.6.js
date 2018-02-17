${{topline}}

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


//// Establish whether the oom-foo module’s definition of Oom is being used.
let r; if (!(r=ROOT.Oom) || !(r=r.${{classname}}) || !(r=r.stat) || !(r=r.LOADED_FIRST))
    throw Error('Can’t test: ROOT.Oom.${{classname}}.stat.LOADED_FIRST does not exist')
const LOADED_FIRST = ROOT.Oom.${{classname}}.stat.LOADED_FIRST


//// Show a title for the first set of tests, with a ‘▶’ button for collapsing.
title('Bases Universal')




//// THE Oom CLASS

test('+ve Oom class', () => {
    const Class = ROOT.Oom, stat = Class.stat
    is('function' === typeof Class, 'Oom is a function')
    tryHardSet(Class, 'name', 'Changed!')
    tryHardSet(stat, 'NAME,HOMEPAGE', 'Changed!')
    is( ('Oom' === Class.name && 'Oom' === stat.NAME)
      , 'name and stat.NAME are Oom')
    is( ('http://oom.loop.coop/' === stat.HOMEPAGE)
      , 'stat.HOMEPAGE is \'http://oom.loop.coop/\'')
    // trySoftSet(stat, 'instTally', 55) //@TODO test should pass when this is uncommented
    is(0 === stat.instTally, 'stat.instTally is zero')
    //@TODO more tests
})


//// Only run the following test if the Oom class was defined in this module.
if (LOADED_FIRST)
    test('+ve Oom class, defined in this module', () => {
        const Class = ROOT.Oom, stat = Class.stat
        tryHardSet(stat, 'VERSION,REMARKS', 'Changed!')
        is( ('${{version}}' === stat.VERSION) // OOMBUMPABLE
          , 'stat.VERSION is ${{version}}') // OOMBUMPABLE
        is( ('Base class for all Oom classes' === stat.REMARKS)
          , 'stat.REMARKS is \'Base class for all Oom classes\'')
    })


test('+ve Oom instance', () => {
    const Class = ROOT.Oom, instance = new Class(), attr = instance.attr
    is(instance instanceof Class, 'Is an instance of Oom')
    is(Class === instance.constructor, '`constructor` is Oom')
    tryHardSet(attr, 'UUID', 'Changed!')
    is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID)
      , '`attr.UUID` is a six-character string')
    tryHardSet(attr, 'INST_INDEX', 99)
    is(0 === attr.INST_INDEX, 'attr.INST_INDEX is zero')
    is(1 === Class.stat.instTally, 'stat.instTally has incremented to `1`')
    //@TODO more tests
})




//// THE Oom.${{classname}} CLASS

test('+ve Oom.${{classname}} class', () => {
    const Class = ROOT.Oom.${{classname}}, stat = Class.stat
    is('function' === typeof Class, 'Oom.${{classname}} is a function')
    tryHardSet(Class, 'name', 'Changed!')
    tryHardSet(stat, 'NAME,HOMEPAGE,VERSION', 'Changed!')
    is( ('Oom.${{classname}}' === Class.name && 'Oom.${{classname}}' === stat.NAME)
      , 'name and stat.NAME are Oom.${{classname}}')
    is( ('${{homepage}}' === stat.HOMEPAGE)
      , 'stat.HOMEPAGE is \'${{homepage}}\'')
    is( ('${{version}}' === stat.VERSION) // OOMBUMPABLE
      , 'stat.VERSION is ${{version}}') // OOMBUMPABLE
    //@TODO more tests
})


test('+ve Oom.${{classname}} instance', () => {
    const Class = ROOT.Oom.${{classname}}, instance = new Class(), attr = instance.attr
    is(instance instanceof Class, 'Is an instance of Oom.${{classname}}')
    is(Class === instance.constructor, '`constructor` is Oom.${{classname}}')
    is('string' === typeof attr.UUID && /^[0-9A-Za-z]{6}$/.test(attr.UUID)
      , '`attr.UUID` is a six-character string')
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

    //// Simulate an accidental attempt to modify an object’s properties.
    ROOT.trySoftSet = ROOT.trySoftSet || ( (obj, keylist, value) => {
        keylist.split(',').forEach( key => {
            try { obj[key] = value } catch(e) {} })
    })

    //// Simulate a determined attempt to modify an object’s properties.
    ROOT.tryHardSet = ROOT.tryHardSet || ( (obj, keylist, value) => {
        keylist.split(',').forEach( key => {
            try { obj[key] = value } catch(e) {}
            const def = { enumerable:true, value, configurable:true }
            try { Object.defineProperty(obj, key, def) } catch(e) {}
        })
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
