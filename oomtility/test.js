!function () { 'use strict'

const NAME     = 'Oomtility Test'
    , VERSION  = '1.2.1'
    , HOMEPAGE = 'http://oomtility.loop.coop'

    , HELP =
`
${NAME} ${VERSION}
${'='.repeat( (NAME+VERSION).length+1 )}

This Node.js script runs the ‘universal’ and ‘nonbrowser’ tests in ‘dist/test’.
It can also launch ‘support/test.html’ in your default browser.

Installation
------------
If you haven’t done it already, you should set up the \`oomtest\` alias:
$ node oomtility/alias.js

Basic Usage
-----------
$ cd /path/to/your/oom/repo/  # An Oom repo directory
$ oomtest --version           # Show the current ${NAME} version
$ oomtest                     # Run ‘universal’ and ‘nonbrowser’ tests in Node
$ oomtest --browser           # Run Node tests and browser tests
$ npm test                    # Same as \`$ oomtest\`
$ npm test -- --browser       # Same as \`$ oomtest --browser\`

Options
-------
-b  --browser   Also launch ‘support/test.html’ in the default browser
-q  --quieter   Only show a single line result
-h  --help      Show this help message
-v  --version   Show the current ${NAME} version

This script lives at ${HOMEPAGE}
`


//// Validate the environment.
const nodePath = process.argv.shift()
const selfPath = process.argv.shift()
if ( '/oomtility/test.js' !== selfPath.slice(-18) )
    return console.warn('Unexpected environment!')
if ( ( process.cwd() !== selfPath.slice(0,-18) ) )
    return console.warn(`Unexpected CWD, try:\n  $ cd ${selfPath.slice(0,-18)}`)
if ('function' !== typeof require)
    return console.warn('Use Node.js instead:\n  $ node oomtility/test.js')




//// SETUP


//// Set constants.
const projectLC = process.cwd().split('/').pop() // lowercase, eg 'foo-bar'

//// Load the assertion library and its reporter.
require('../support/asset/js/klud.min.js')
require('../support/asset/js/report.min.js')

//// Load the Production ES6 verion of the app.
require(`../dist/main/${projectLC}.6.js`)

//// Declare variables.
let opt, browser, quieter

//// Deal with command-line options.
while ( opt = process.argv.shift() ) {
    if ('-h' === opt || '--help'    === opt) return console.log(HELP)
    if ('-v' === opt || '--version' === opt) return console.log(NAME, VERSION)
    if ('-b' === opt || '--browser' === opt) { browser = true; continue }
    if ('-q' === opt || '--quieter' === opt) { quieter = true; continue }
}




//// RUN TESTS


//// Stub the environment, to make it appear more browser-like.
global.jQuery = global.$ = onload => { onload() }

//// In '--quieter' mode, capture calls to `console.log()` etc.
let captured, oldConsoleLog, oldConsoleWarn, oldConsoleError
if (quieter) {
    const { Writable } = require('stream')
    captured = []
    const capturer = new Writable({
        write (chunk, encoding, callback) {
            captured.push(chunk+'')
            callback()
        }
    })
    oldConsoleLog   = console.log
    oldConsoleWarn  = console.warn
    oldConsoleError = console.error
    const captureConsole = new console.Console(capturer, capturer)
    console.log   = captureConsole.log
    console.warn  = captureConsole.warn
    console.error = captureConsole.error
}

//// Run parts of the test-suite compatible with a non-browser runtime.
require(`../dist/test/${projectLC}-universal.6.js`)
require(`../dist/test/${projectLC}-nonbrowser.6.js`)

//// In '--quieter' mode, show a summary of the tests.
if (quieter) {
    console.log   = oldConsoleLog
    console.warn  = oldConsoleWarn
    console.error = oldConsoleError
    const fails = captured.filter( // green tick is '\x1b[32m\u2714\x1b[0m'
        l => '\x1b[31m\u2718\x1b[0m' === l.slice(0,10) ? l : null )
    if (fails.length)
        console.log(fails.join(''))
    else
        console.log(
            NAME+` passed ${captured.length} test${1===captured.length?'':'s'}`)
}

//// Launch the browser tests.
if (browser) {
    const exec = require('child_process').exec
    exec(
        'open file://' + process.cwd() + '/support/test.html'
      , function(error, stdout, stderr) {
            if (error) console.warn(error)
        }
    )
}


}()
