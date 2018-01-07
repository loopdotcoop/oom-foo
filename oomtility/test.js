//// OomFoo //// 1.0.0 //// January 2018 //// https://oom-foo.loop.coop/ ///////

if ('function' !== typeof require) {
    console.warn('test.js must be run using Node.js, eg:\n  $ node test.js')
} else {

    //// Stub the environment, to make it appear more browser-like.
    global.jQuery = global.$ = onload => { onload() }

    //// Load the Production ES6 verion of the app.
    require('../dist/main/oom-foo.6.js')

    //// Load the assertion library and its reporter.
    require('../lib/test/klud.min.js')
    require('../lib/test/report.min.js')

    //// Run parts of the test-suite compatible with a non-browser runtime.
    require('../dist/test/oom-foo-universal.6.js')
    require('../dist/test/oom-foo-nonbrowser.6.js')

    //// Launch the browser tests.
    const exec = require('child_process').exec
    exec(
        'open file://' + process.cwd() + '/support/test.html'
      , function(error, stdout, stderr) {
            if (error) console.warn(error)
        }
    )

}
