!function () { 'use strict'

const NAME     = 'Oomtility Make'
    , VERSION  = '1.2.7'
    , HOMEPAGE = 'http://oomtility.loop.coop'

    , BYLINE   = (`\n\n\n\n//// Made by ${NAME} ${VERSION} //\\\\//\\\\ `
               + `${HOMEPAGE} /////////////////////////////`).slice(0,84) + '\n'
    , HELP =
`
${NAME} ${VERSION}
${'='.repeat( (NAME+VERSION).length+1 )}

This Node.js script reads source files from ‘src/’ (all ES6), and rebuilds the
distribution files in ‘dist/’ (ES6, ES5 and minified ES5). It also updates the
‘dynamic’ sections of various ‘support/’ files.

Installation
------------
You’ll need Uglify and Traceur installed globally before running make.js:
$ npm install -g uglify-js; npm install -g traceur

If you get permission errors, run this before:
$ sudo chmod -R a+w $(npm root -q -g); sudo chmod -R a+w $(npm bin -q -g)
...and this after:
$ sudo chmod -R a-w $(npm root -q -g); sudo chmod -R a-w $(npm bin -q -g)

If you get \`require()\` errors, try:
$ export NODE_PATH=$(npm root -q -g)

If you haven’t done it already, you should set up the \`oommake\` alias:
$ node oomtility/alias.js

Basic Usage
-----------
$ cd /path/to/your/oom/repo/  # An Oom repo directory
$ oommake --version           # Show the current ${NAME} version
$ oommake                     # Build ‘dist/’ files, update ‘support/’ files

Create Files
------------
1. Concatenate files in ‘src/main/’ to ‘dist/main/project.6.js’
2. Transpile the new ‘project.6.js’ to ‘project.5.js’
3. Minify ‘project.5.js’ to ‘project.5.min.js’
4. Copy files in ‘src/demo/’ to ‘dist/demo/’ (and change to lowercase)
5. Transpile ES6 files in ‘dist/demo/’ to ES5
6. Concatenate files in ‘src/test/’ to:
   - ‘dist/test/project-browser.6.js’        (can only be run in a browser)
   - ‘dist/test/project-nonbrowser.6.js’     (cannot be run in a browser)
   - ‘dist/test/project-universal.6.js’      (can run anywhere)
7. Transpile the ‘browser’ and ‘universal’ files to ES5

Edit Files
----------
1. support/demo.html                       Link to each usage example
2. support/asset/js/ecmaswitch.js          \`var classFiles = '...'\` updated
3. support/test.html                       ‘Development ES6’ links
X. src/main/README.md                      Documentation for each class @TODO move to docs.js
X. support/docs.html                       Documentation for each class @TODO move to docs.js

Options
-------
-6  --es6-only  Don’t make .5.js or .5.min.js
-h  --help      Show this help message
-v  --version   Show the current ${NAME} version

This script lives at ${HOMEPAGE}
`


//// Validate the environment.
const nodePath = process.argv.shift()
const selfPath = process.argv.shift()
if ( '/oomtility/make.js' !== selfPath.slice(-18) )
    return console.warn('Unexpected environment!')
if ( ( process.cwd() !== selfPath.slice(0,-18) ) )
    return console.warn(`Unexpected CWD, try:\n  $ cd ${selfPath.slice(0,-18)}`)
if ('function' !== typeof require)
    return console.warn('Use Node.js instead:\n  $ node oomtility/make.js')




//// SETUP


//// Load library functionality.
const fs = require('fs')
    , uglify = tidyUglifyWarnings( require('uglify-js') )
    , traceur = require('traceur/src/node/api.js')
    , wrapped = require('./wrapped.js')

//// Set constants.
const topline = (fs.readFileSync(`src/main/Bases.6.js`)+'').split('\n')[0]
const projectTC = topline.split(' ')[1] // titlecase with a dot, eg 'Oom.Foo'
const projectV  = topline.split(' ')[3] // major.minor.patch, eg 'x1.2.3'
const projectLC = process.cwd().split('/').pop() // lowercase, eg 'foo-bar'
if ( projectLC.toLowerCase() != projectLC) return console.warn(
    `Project '${projectLC}' contains uppercase letters`)
if ( projectTC.toLowerCase().replace(/\./g,'-') != projectLC) return console.warn(
    `Project '${projectLC}' is called '${projectTC}' in src/main/Bases.6.js`)
if (! /^Oom\.[A-Z][a-z]+$/.test(projectTC) )
    return console.warn(`Bases.6.js’s topline title '${projectTC}' is invalid`)

//// Simplifies moving ‘Bases.6.js’ to the start of concatenation.
Array.prototype.move = function(from, to) { // stackoverflow.com/a/7180095
    this.splice(to, 0, this.splice(from, 1)[0]) }

//// Declare variables.
let opt, es6, es5, min, mains, demos, tests, pos, names
  , es6Only, writeFileTally = 0

//// Deal with command-line options.
while ( opt = process.argv.shift() ) {
    if ('-6' === opt || '--es6-only' === opt) { es6Only = true; continue }
    if ('-h' === opt || '--help'     === opt) return console.log(HELP)
    if ('-v' === opt || '--version'  === opt) return console.log(NAME, VERSION)
}




//// CREATE FILES: MAIN


//// Delete the current contents of ‘dist/main/’.
fs.readdirSync('dist/main').forEach( name => {
    if ('.' != name[0]) fs.unlinkSync('dist/main/' + name)
})


//// 1. Concatenate files in ‘src/main/’ to ‘dist/main/project.6.js’
mains = fs.readdirSync('src/main')
es6 = []
if ( -1 === (pos = mains.indexOf('Bases.6.js')) )
    return console.warn('No ‘src/main/Bases.6.js’')
mains.move(pos, 0) // ‘src/main/Bases.6.js’ must go 1st (`move()` defined above)
mains.forEach( name => {
    if ( '.6.js' !== name.slice(-5) ) return
    es6.push('//\\\\//\\\\ src/main/' + name)
    es6.push( fs.readFileSync('src/main/' + name)+'' )
})
es6 = es6.join('\n\n\n\n') + BYLINE
writeFileSyncAndTally( `dist/main/${projectLC}.6.js`, es6 )


//// 2. Transpile the new ‘project.6.js’ to ‘project.5.js’
if (! es6Only) {
    try {
        es5 = traceurFix( traceur.compile(es6, { blockBinding:true }) )
    } catch(e) {
        if ( 'MultipleErrors' === e.name && /^<compile-source>:/.test(e.message) )
            return console.warn(
                e.errors.length + ` syntax errors in dist/main/${projectLC}.6.js\n`
              + `Starting with ${e.errors[0].slice(17)}\n`
              + `Atom user? Try $ atom dist/main/${projectLC}.6.js:`
              + e.errors[0].split(':').slice(1,3).join(':')
            )
        throw(e)
    }
    es5 = removeSourceMapRef(es5)
    writeFileSyncAndTally(
        `dist/main/${projectLC}.5.js`
      , topline + '\n\n' + es5 + BYLINE
    )


    //// 3. Minify ‘project.5.js’ to ‘project.5.min.js’
    min = uglify.minify( es5, minConfig(`dist/main/${projectLC}.5.min.js`) )
    writeFileSyncAndTally(
        `dist/main/${projectLC}.5.min.js`
      , topline + '\n\n' + min.code + BYLINE
    )
}




//// CREATE FILES: DEMO


//// Delete the current contents of ‘dist/demo/’.
fs.readdirSync('dist/demo').forEach( name => {
    if ('.' != name[0]) fs.unlinkSync('dist/demo/' + name)
})


//// 4. Copy files in ‘src/demo/’ to ‘dist/demo/’ (and change to lowercase)
demos = fs.readdirSync('src/demo')
es6 = [], names = []
demos.forEach( name => {
    if ( '.6.js' !== name.slice(-5) ) return
    es6.push('//\\\\//\\\\ src/demo/' + name + '\n\n\n\n'
        + fs.readFileSync('src/demo/' + name)
    )
    names.push( // 'FooBar.OkYep-demo.6.js' -> 'foo-bar.ok-yep-demo'
        name.slice(0,-5).replace(/\./g,'-').toLowerCase()
    )
})
es6.forEach( (orig, i) => {
    writeFileSyncAndTally( `dist/demo/${names[i]}.6.js`, orig + BYLINE )
    })


//// 5. Transpile ES6 files in ‘dist/demo/’ to ES5
if (! es6Only)
    es6.forEach( (orig, i) => {
        let es5 = traceurFix( traceur.compile(orig, { blockBinding:true }) )
        es5 = removeSourceMapRef(es5)
        writeFileSyncAndTally(
            `dist/demo/${names[i]}.5.js`
          , topline + '\n\n' + es5 + BYLINE
        )
    })





//// CREATE FILES: TEST


//// Delete the current contents of ‘dist/test/’.
fs.readdirSync('dist/test').forEach( name => {
    if ('.' != name[0]) fs.unlinkSync('dist/test/' + name)
})


//// 6. Concatenate files in ‘src/test/’ to:
tests = fs.readdirSync('src/test')
es6 = { browser:[], nonbrowser:[], universal:[] }
tests.forEach( name => {
    if ( '.6.js' !== name.slice(-5) ) return
    let ua =
        '-browser.6.js'    === name.slice(-13) ? es6.browser
      : '-nonbrowser.6.js' === name.slice(-16) ? es6.nonbrowser
      : '-universal.6.js'  === name.slice(-15) ? es6.universal
      : []
    ua.push('//\\\\//\\\\ src/test/' + name)
    ua.push( fs.readFileSync('src/test/' + name)+'' )
})

//// - ‘dist/test/project-browser.6.js’         (can only be run in a browser)
es6.browser = es6.browser.join('\n\n\n\n')
writeFileSyncAndTally(
    `dist/test/${projectLC}-browser.6.js`
  , (es6.browser || `//// ${projectTC} ${projectV} has no browser tests`)
      + BYLINE
)

//// - ‘dist/test/project-nonbrowser.6.js’      (cannot be run in a browser)
es6.nonbrowser = es6.nonbrowser.join('\n\n\n\n')
writeFileSyncAndTally(
    `dist/test/${projectLC}-nonbrowser.6.js`
  , (es6.nonbrowser || `//// ${projectTC} ${projectV} has no nonbrowser tests`)
      + BYLINE
)

//// - ‘dist/test/project-universal.6.js’       (can run anywhere)
es6.universal = es6.universal.join('\n\n\n\n')
writeFileSyncAndTally(
    `dist/test/${projectLC}-universal.6.js`
  , (es6.universal || `//// ${projectTC} ${projectV} has no universal tests`)
      + BYLINE
)


//// 7. Transpile the ‘browser’ and ‘universal’ files to ES5
if (! es6Only) {
    es5 = {}
    es5.browser = es6.browser
      ? topline + '\n\n' + traceur.compile(es6.browser, { blockBinding:true })
      : `//// ${projectTC} ${projectV} has no browser tests`
    writeFileSyncAndTally(
        `dist/test/${projectLC}-browser.5.js`
      , removeSourceMapRef( traceurFix(es5.browser) ) + BYLINE
    )
    es5.universal = es6.universal
      ? topline + '\n\n' + traceur.compile(es6.universal, { blockBinding:true })
      : `//// ${projectTC} ${projectV} has no universal tests`
    writeFileSyncAndTally(
        `dist/test/${projectLC}-universal.5.js`
      , removeSourceMapRef( traceurFix(es5.universal) ) + BYLINE
    )
}




//// EDIT FILES

//// 1. support/demo.html                       Link to each usage example
wrapped.updateDemoFile('support/demo.html', 'support')


//// 2. support/asset/js/ecmaswitch.js          `var classFiles = '...'` updated
wrapped.updateECMASwitch('support/asset/js/ecmaswitch.js', mains, projectLC)


//// 3. support/test.html                       ‘Development ES6’ links
wrapped.updateTestFile('support/test.html', tests) // `tests` from previous step




//// FINISH


//// Show the result.
console.log(NAME+`${es6Only ? ', in ES6-only mode,' : ''
    } made ${writeFileTally} file${1===writeFileTally?'':'s'}`)




//// UTILITY


//// Hack Uglify, to avoid warnings we don’t care about.
function tidyUglifyWarnings (uglify) {
    var origWarn = uglify.AST_Node.warn
    uglify.AST_Node.warn = function(txt, props) {
        if (! (
            'Dropping unused variable {name} [{file}:{line},{col}]' === txt
            && ( // 'WARN: Dropping unused variable HOMEPAGE [...]', etc
                'NAME'     === props.name
             || 'VERSION'  === props.name
             || 'HOMEPAGE' === props.name
            )
        ) ) origWarn(txt, props)
    }
    return uglify
}


//// Generate a configuration object for Uglify.
function minConfig(outFileName) {
    return {
       // fromString:  true
       // outFileName: outFileName
        warnings: true
      , keep_fnames: true // to preserve `Function.prototype/constructor.name`
      , output: { max_line_len:64 } // easier on the eye - but 500 would be safe
      , compress: {
            dead_code: true
          , global_defs: { DEBUG:false }
        }
    }
}


//// Remove the pointless line `//# sourceURL=<compile-source>`.
function removeSourceMapRef (code) {
    const sourceMapPos = code.lastIndexOf('/'+'/# sourceURL=<compile-source>\n')
    if (-1 === sourceMapPos)
        return code // not found
    return code.slice(0, sourceMapPos)
}


//// Basic wrapper round `fs.writeFileSync()`, which keeps a tally.
function writeFileSyncAndTally (path, content) {
    fs.writeFileSync(path, content)
    writeFileTally++
}


//// Correct a traceur error.
function traceurFix (es5) {
    return es5.replace( // correct a traceur error
        /efined' : \$traceurRuntime\.typeof\(global\)\) \? global : \(void 0\)\);/g
      , "efined' : $traceurRuntime.typeof(global)) ? global : this);"
    )
}


}()
