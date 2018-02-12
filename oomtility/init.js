!function () { 'use strict'

const DEFAULT_DESCRIPTION = 'Description to go in here'
const DEFAULT_COLOR = 'silver'
const PATHS = {
    'src/main/Bases.6.js                           ':'Namespace & base classes'
//, 'src/demo/Bases-demo.6.js                      ':'Basic usage example'@TODO
//, 'src/test/Bases-browser.6.js                   ':'Browser-only unit test'@TODO
//, 'src/test/Bases-nonbrowser.6.js                ':'Node-only unit test'@TODO
  , 'src/test/Bases-universal.6.js                 ':'Browser + Node unit test'
  , 'support/demo.html                             ':'Lists usage examples'
//, 'support/demo-app.html                         ':'Basic usage example'@TODO
  , 'support/test.html                             ':'Test browser & universal'
  , 'support/asset/css/bootstrap.4.0.0.min.css     ':'Grid, normalise browsers'
  , 'support/asset/css/main.css                    ':'Specific Oom styles'
  , 'support/asset/icon/android-192x192.png        ':'Smaller icon for Android'
  , 'support/asset/icon/android-512x512.png        ':'Larger icon for Android'
  , 'support/asset/icon/apple-touch-icon.png       ':'Icon for iOS'
  , 'support/asset/icon/browserconfig.xml          ':'Configures Windows Metro'
  , 'support/asset/icon/favicon-16x16.png          ':'Icon for modern browsers'
  , 'support/asset/icon/favicon-32x32.png          ':'Icon for modern browsers'
  , 'support/asset/icon/favicon-96x96.png          ':'Icon for modern browsers'
  , 'support/asset/icon/favicon.ico                ':'Icon for legacy browsers'
  , 'support/asset/icon/manifest.json              ':'Configures Android'
  , 'support/asset/icon/mstile-310x310.png         ':'Icon for Windows Metro'
  , 'support/asset/icon/safari-pinned-tab.svg      ':'Icon for mobile Safari'
  , 'support/asset/font/ubuntu-bold.woff2          ':'Custom Google font'
  , 'support/asset/font/ubuntu-bolditalic.woff2    ':''
  , 'support/asset/font/ubuntu-italic.woff2        ':''
  , 'support/asset/font/ubuntu-regular.woff2       ':''
  , 'support/asset/font/ubuntumono-regular.woff2   ':''
  , 'support/asset/js/aframe-0.7.0.min.js          ':'WebVR framework, THREE.js'
  , 'support/asset/js/ecmaswitch.js                ':'Switch between JS builds'
  , 'support/asset/js/klud.min.js                  ':'An assertion library'
  , 'support/asset/js/report.min.js                ':'Klud’s reporter'
  , 'support/asset/js/polyfill.min.js              ':'Support Object.assign'
  , 'support/asset/js/jquery-3.3.1.slim.min.js     ':'Cross-browser JS helpers'
  , 'support/asset/js/traceur-runtime.min.js       ':'Runs transpiled ES6'
  , 'support/asset/js/vue-2.5.13.dev.js            ':'Frontend framework'
  , 'support/asset/js/vue-2.5.13.min.js            ':'Production version of Vue'
  , 'support/asset/logo/logo-1200x1200.svg         ':'Main image on homepage'
  , '.gitignore                                    ':'Ignore .DS_Store, etc'
  , 'CHANGELOG                                     ':'Lists bumps and commits'
  , 'CNAME                                         ':'Sets the homepage URL'
  , 'index.html                                    ':'The module homepage'
  , 'package.json                                  ':'For publishing on NPM'
  , 'README.md                                     ':'Human-readable info'
}


const NAME     = 'Oomtility Init'
    , VERSION  = '1.2.2'
    , HOMEPAGE = 'http://oomtility.loop.coop'

    , BYLINE   = `\n\n\n\n//\\\\//\\\\ generated by ${NAME} ${VERSION}`
                       + ` //\\\\//\\\\ ${HOMEPAGE} //\\\\//\\\\\n`
    , HELP =
`
${NAME} ${VERSION}
${'='.repeat( (NAME+VERSION).length+1 )}

This Node.js script initialises a new oom module. You should start with a folder
which just contains a ‘LICENSE’ file and the ‘oomtility/’ folder (plus ‘.git/’).

Installation
------------
If you haven’t done it already, you should set up the \`oominit\` alias:
$ node oomtility/alias.js

Basic Usage
-----------
$ cd /path/to/your/oom/module/  # A directory with LICENSE, oomtility/ and .git/
$ oominit --version             # Show the current ${NAME} version
$ oominit                       # Initialises the new oom module
$ oominit --remove              # Destroys the oom module - careful, no undo!

Create Folders
--------------
1. ‘dist/’ and its subfolders ‘demo/’, ‘main/’ and ‘test/’
2. ‘src/’ and its subfolders ‘demo/’, ‘main/’ and ‘test/’
3. ‘support/’, its subfolder ‘asset/’, and various folders in ‘asset/’

Add Files to Folders
--------------------
`+( getPathsList() )+`

Options
-------
-c  --colour        Set colour, avoiding a prompt, eg \`$ oominit -c red\`
-d  --desc          Set description, avoiding a prompt, eg \`$ oominit -d "TBC"\`
-h  --help          Show this help message
-k  --kitchen-sink  Run --remove. Then init, make and test a fairly hefty module
-m  --minimal       Run --remove. Then init, make and test a minimal module
-r  --remove        Delete all items except LICENSE, oomtility/ and .git/
-v  --version       Show the current ${NAME} version
-y  --yes           If removing, run the removal without a confirm-prompt

This script lives at ${HOMEPAGE}`


//// Validate the environment.
const nodePath = process.argv.shift()
const selfPath = process.argv.shift()
if ( '/oomtility/init.js' !== selfPath.slice(-18) )
    return console.warn('Unexpected environment!')
if ( ( process.cwd() !== selfPath.slice(0,-18) ) )
    return console.warn(`Unexpected CWD, try:\n  $ cd ${selfPath.slice(0,-18)}`)
if ('function' !== typeof require)
    return console.warn('Use Node.js instead:\n  $ node oomtility/init.js')




//// SETUP


//// Load library functionality.
const fs = require('fs')
    , { spawn } = require('child_process')
    , readline = require('readline')
    , wrapped = require('./wrapped.js')

//// Declare variables.
let opt, remove = false, yeslessRemove, projectDesc, projectColor
  , kitchenSink, minimal
  , mkdirTally = 0 , writeFileTally = 0

//// Deal with command-line options.
while ( opt = process.argv.shift() ) {
    if ('-h' === opt || '--help'    === opt) return console.log(HELP)
    if ('-v' === opt || '--version' === opt) return console.log(NAME, VERSION)
    if ('-k' === opt || '--kitchen-sink' === opt) { kitchenSink = true; continue }
    if ('-m' === opt || '--minimal' === opt) { minimal = true; continue }
    if ('-r' === opt || '--remove'  === opt) { remove = true; continue }
    if ('-y' === opt || '--yes'     === opt) { yeslessRemove = true; continue }
    if ('-ry' === opt || '-yr'      === opt) { remove = yeslessRemove = true; continue }
    if ('-c' === opt || /--colou?r/.test(opt)) {
        projectColor = process.argv.shift(); continue }
    if ('-d' === opt || /--desc(ription)?/.test(opt)) {
        projectDesc  = process.argv.shift(); continue }
}

//// Set constants.
const projectLC = process.cwd().split('/').pop() // lowercase, eg 'oom-foo'
const rxProjectLC = /^oom-[-a-z]{1,8}$|^[a-z]{1,8}oom$/
if (! rxProjectLC.test(projectLC) ) return console.warn(
    `Project '${projectLC}' fails `+rxProjectLC)
if (/--|-$/.test(projectLC) ) return console.warn(
    `Project '${projectLC}' passes /--|-$/`)
const projectTC   = lcToTc(projectLC) // titlecase with a dot, eg 'Oom.Foo'
if (! /^Oom\.[A-Z][a-z]+$/.test(projectTC) )
    return console.warn(`Bases.6.js’s topline title '${projectTC}' is invalid`)
const projectDmn  = projectLC + '.loop.coop' // 'oom-foo.loop.coop'
const projectURL  = `http://${projectDmn}/` // 'http://oom-foo.loop.coop/'
const projectRepo = 'https://github.com/loopdotcoop/' + projectLC
const projectNPM  = 'https://www.npmjs.com/package/' + projectLC
const mthNum      = (new Date).getUTCMonth() + 1 // 1 for January
const dateNum     = (new Date).getUTCDate() // 7 for 7th day of the month
const mthDigits   = (10 > mthNum  ? '0' : '') + mthNum // '01' for January
const dateDigits  = (10 > dateNum ? '0' : '') + dateNum // '07' for 7th day
const projectMth  = monthNames()[mthNum] // 'January'
const projectYYYY = (new Date).getUTCFullYear() // '2018'
const projectDate = `${projectYYYY}/${mthDigits}/${dateDigits}`
const projectV    = '1.0.0' // NPM does not update a '0.*.*' version
const topline     = ('//// ' + ([ //@TODO deal with overlong topline
    projectTC, projectV, projectMth + ' ' + projectYYYY, projectURL
]).join(' //// ') + ' ///////////////////').substr(0, 80)

//// Replace the current module with a fairly hefty module.
if (kitchenSink)
    return doKitchenSink()

//// Replace the current module with a minimal module.
if (minimal)
    return doMinimal()

//// Remove files if the '-r' or '--remove' option is present.
if (remove) {
    const tally = rmrfCount('LICENSE', 'oomtility', '.git')
    if (! tally)
        return console.warn('No files or folders need to be removed')

    //// If '-y' or '--yes' was set as an option, remove without confirmation.
    if (yeslessRemove)
        return doRemove()

    //// Set up a ‘Readline’ session.
    const rl = readline.createInterface({
        input: process.stdin
      , output: process.stdout
    })

    //// Prompt the user for confirmation.
    rl.question(
        `Permanently delete ${tally} item${1===tally?'':'s'}?\n`
      , answer => {
            answer = answer.toLowerCase()
            if ('y' !== answer && 'yes' !== answer)
                console.log("OK, just answer 'yes' next time to run deletion")
            else
                doRemove()
            rl.close()
        }
    )

//// Not a '--remove' run, so must be a normal initialisation.
} else {

    //// Make sure only expected files and folders currently exist.
    if (! fs.existsSync('.git') )    return console.warn(`No .git folder`)
    if (! fs.existsSync('LICENSE') ) return console.warn(`No LICENSE file`)
    const origItems = fs.readdirSync('.')
    for (let i=0, name; name=origItems[i++];)
        if (! /^\.git$|^\.DS_Store$|^oomtility$|^LICENSE$/.test(name) )
            return console.warn(`Unexpected item ${name}\nTry oominit --remove`)

    //// If the description and colour were set as options, do the init.
    if (projectDesc && projectColor)
        return doInit()

    //// Set up a ‘Readline’ session.
    const rl = readline.createInterface({
        input: process.stdin
      , output: process.stdout
    })

    //// If the description has not been set, prompt the user for it.
    if (! projectDesc) {
        rl.question('Description:\n', readDescription)
    } else {
        rl.question('Colour:\n', readColor)
    }

    //// Prompts the user for a description.
    function readDescription (answer) {
        if (! answer) process.stdout.write('\x1b[1A'+DEFAULT_DESCRIPTION+'\n')
        projectDesc = answer || DEFAULT_DESCRIPTION
        if (projectColor) {
            rl.close() // close Node’s ‘Readline’ session
            doInit()
        } else {
            rl.question('Colour:\n', readColor)
        }
    }

    //// Prompts the user for a colour.
    function readColor (answer) {
        if (! answer) process.stdout.write('\x1b[1A'+DEFAULT_COLOR+'\n')
        projectColor = answer || DEFAULT_COLOR
        rl.close()
        doInit()
    }

}




//// CREATE FOLDERS

function createFolders () {

    //// 1. ‘dist/’ and its subfolders ‘demo/’, ‘main/’ and ‘test/’
    mkdirSyncAndTally('dist')
    mkdirSyncAndTally('dist/demo')
    mkdirSyncAndTally('dist/main')
    mkdirSyncAndTally('dist/test')

    //// 2. ‘src/’ and its subfolders ‘demo/’, ‘main/’ and ‘test/’
    mkdirSyncAndTally('src')
    mkdirSyncAndTally('src/demo')
    mkdirSyncAndTally('src/main')
    mkdirSyncAndTally('src/test')

    //// 3. ‘support/’, its subfolder ‘asset/’, and various folders in ‘asset/’
    mkdirSyncAndTally('support')
    mkdirSyncAndTally('support/asset')
    mkdirSyncAndTally('support/asset/css')
    mkdirSyncAndTally('support/asset/icon')
    mkdirSyncAndTally('support/asset/font')
    mkdirSyncAndTally('support/asset/js')
    mkdirSyncAndTally('support/asset/logo')

}




//// ADD FILES TO FOLDERS

function addFiles () {
    for (let path in PATHS)
        addFile( path.trim() )
}




//// UTILITY


//// Replaces the current module with a fairly hefty module.
function doKitchenSink () {
    replaceModule({
        kind: 'fairly hefty'
      , autoOpts: [
            'Plain'            , 'Plain.Sub'        // extend the `Oom` class...
          , 'Plain.plnFn'      , 'Plain.Sub.subFn'  // ...and add methods
          , 'El.Hero'          , 'El.Hero.Sub'      // extend `Oom.El`
          , 'El.Hero.heroFn'   , 'El.Hero.Sub.subFn'
          , 'Mix.Red'          , 'Mix.Red.Sub'      // extend `Oom.Mix`
          , 'Mix.Red.redFn'    , 'Mix.Red.Sub.subFn'
          , 'ElMix.FooBar'     , 'ElMix.FooBar.Sub' // extend `Oom.ElMix`
          , 'ElMix.FooBar.fbFn', 'ElMix.FooBar.Sub.subFn'
        ]
    })
}


//// Replaces the current module with a minimal module.
function doMinimal () {
    replaceModule({
        kind: 'minimal'
      , autoOpts: ['Plain']
    })
}


//// Deletes generated folders and files, and creates a new module defined by
//// `config`. This is mostly useful for developing 'oom-foo', but could also be
//// handy when teaching or demonstrating Oom and Oomtility.
function replaceModule (config) {
    const {
        kind
      , autoOpts
    } = config
    console.log(NAME+` will replace current repo with a ${kind} module`)

    //// Save the existing repo’s version, if there is one.
    let topline, projectV
    if ( fs.existsSync('src/main/Bases.6.js') ) {
        topline = (fs.readFileSync('src/main/Bases.6.js')+'').split('\n')[0]
        projectV = topline.split(' ')[3] // titlecase, eg '1.2.3'
    }

    //// Save the existing repo’s CHANGELOG, if there is one.
    let CHANGELOG
    if ( fs.existsSync('CHANGELOG') )
        CHANGELOG = fs.readFileSync('CHANGELOG')+''

    //// Begin the sequence.
    runOominitRemove()

    //// Run `$ oominit --remove --yes` to remove any existing repo files.
    function runOominitRemove () {
        runSubProc(runOomwrap, 'oominit', 'oomtility/init.js'
          , '--remove', '--yes'
    )}

    //// Run `$ oomwrap`.
    function runOomwrap () {
        runSubProc(runOominit, 'oomwrap', 'oomtility/wrap.js')
    }

    //// Run `$ oominit -d "Initial test of ...`.
    function runOominit () {
        runSubProc(runOombump, 'oominit', 'oomtility/init.js'
          , '-d', 'Initial test of the oom-hub architecture'
          , '-c', '#9900ff'
    )}

    //// Run `$ oombump -s 1.2.3`, keeping the current project version, if any.
    function runOombump () {
        if (projectV && '1.0.0' !== projectV)
            runSubProc(runOomauto, 'oombump', 'oomtility/bump.js'
              , '--set', projectV)
        else
            runOomauto()
    }

    //// Run `$ oomauto`, with a ‘kitchen sink’ of classes and methods.
    function runOomauto () {
        runSubProc.apply(null, [
            runOommake, 'oomauto', 'oomtility/auto.js'
        ].concat(autoOpts))
    }

    //// Run `$ oommake`.
    function runOommake () {
        runSubProc(runOomtest, 'oommake', 'oomtility/make.js')
    }

    //// Run `$ oomtest`.
    function runOomtest () {
        runSubProc( writeCHANGELOG, 'oomtest', 'oomtility/test.js'
          , '--quieter'
    )}

    //// Reinstate the CHANGELOG file if there was one, and end the sequence.
    function writeCHANGELOG () {
        if (CHANGELOG)
            fs.writeFileSync('CHANGELOG', CHANGELOG)
        console.log(NAME+' complete')
    }

    ////
    function runSubProc (next, command, ...opts) {
        const subProc = spawn('node', opts)
        subProc.stdout.on('data', data => subprocOut(data, command) )
        subProc.stderr.on('data', data => subprocOut(data, `${command}: stderr`) )
        subProc.on('exit', (code, signal) => {
            if (code) subprocOut(
                `exited with code ${code} and signal ${signal}`, command)
            else
                next()
        })
    }

    function subprocOut (data, prefix) {
        (data+'').split('\n').forEach( line => {
            if ( '' === line.trim() ) return
            console.log(`${prefix}: ${line}`)
        })
    }

}


//// Deletes generated folders and files, and shows the result.
function doRemove () {
    const tally2 = rmrf('LICENSE', 'oomtility', '.git')
    if (1 === tally2)
        console.log(NAME+' removed 1 file or folder')
    else
        console.log(NAME+` removed ${tally2} files and/or folders`)
}

//// Generates the folders and files, and shows the result.
function doInit () {
    createFolders()
    addFiles()
    console.log(NAME+` generated ${mkdirTally} folder${1===mkdirTally?'':'s'}`
      + ` and ${writeFileTally} file${1===writeFileTally?'':'s'}`)
}

//// Begin recursively deleting files and folders.
function rmrf(...except) {
    return rmrfRecurse(except, '.')
}


//// Return the number of files and folders which would be deleted by `rmrf()`.
function rmrfCount(...except) {
    return rmrfRecurse(except, '.', true)
}


//// Recursively delete files and folders.
function rmrfRecurse(except, path, dummyrun) {
    let tally = 0
    fs.readdirSync(path).forEach(
        item => {
            if ( -1 !== except.indexOf(item) ) return
            const pathSlashItem = `${path}/${item}`
            const isDir = fs.statSync(pathSlashItem).isDirectory()
            if (dummyrun && ! yeslessRemove)
                console.log(`Will remove ${pathSlashItem}${(isDir ? '/' : '')}`)
            if (isDir) {
                tally += rmrfRecurse(except, pathSlashItem, dummyrun)
                if (! dummyrun) fs.rmdirSync(pathSlashItem)
            } else {
                if (! dummyrun) fs.unlinkSync(pathSlashItem)
            }
            tally++
        }
    )
    return tally
}


//// Lowercase to Titlecase, eg 'oom-foo' to 'OomFoo'.
function lcToTc(lc) {
    return lc.split('-').map( w => w[0].toUpperCase() + w.substr(1) ).join('.')
}


//// Used to get `projectMth`.
function monthNames() {
    return [
        '' // NOT zero indexed
      , 'January'
      , 'February'
      , 'March'
      , 'April'
      , 'May'
      , 'June'
      , 'July'
      , 'August'
      , 'September'
      , 'October'
      , 'November'
      , 'December'
    ]
}


//// Used by `addFiles()`.
function addFile (path) {
    const config = {
        topline
      , isApp: true
      , isTop: true
      , projectLC                       // eg 'oom-foo'
      , projectTC                       // eg 'Oom.Foo'
      , classname:   projectTC.slice(4) // eg 'Foo'
      , name:        projectLC
      , date:        projectDate
      , version:     projectV
      , domain:      projectDmn
      , homepage:    projectURL
      , remarks:     projectDesc
      , repo:        projectRepo
      , npm:         projectNPM
      , title:       projectTC
      , description: projectDesc
      , color:       projectColor
    }
    const fnName = pathToFnName(path)
    const fn = wrapped[fnName]
    if (! fn)
        return console.warn(fnName + '() not found!')
    fn(config, path)
    // fs.open(path, 'wx', (err, fd) => {
    //     if (err) {
    //         if ('EEXIST' === err.code) {
    //             return console.warn(path + ' already exists')
    //         }
    //         throw err
    //     }
    //     fs.writeSync(fd, fn(config), 0, isBinary ? 'binary' : 'utf8')
    // })
    writeFileTally++
}


//// Similar to `lcToTc()`. 'foo/bar-baz.txt' to 'getBarBazTxt'.
function pathToFnName (path) {
    return 'write' + (
        path.split('/').pop().split(/[- .]/g).map(
            w => w ? w[0].toUpperCase() + w.substr(1) : ''
        ).join('')
    )
}


//// Basic wrapper round `fs.mkdirSync()`, which keeps a tally.
function mkdirSyncAndTally (path) {
    fs.mkdirSync(path)
    mkdirTally++
}


//// Displays the ‘Add Files to Folders’ section of the `HELP` text.
function getPathsList () {
    let path, out=[], i=0
    for (path in PATHS)
        out[i++] = `${i}.${' '.repeat(3-(i+'').length)}${path}  ${PATHS[path]}`
    return out.join('\n')
}


}()
