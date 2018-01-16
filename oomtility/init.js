!function () { 'use strict'

const NAME     = 'Oomtility Init'
    , VERSION  = '1.0.9'
    , HOMEPAGE = 'http://oomtility.loop.coop'

    , BYLINE   = `\n\n\n\n//\\\\//\\\\ generated by ${NAME} ${VERSION}`
                       + ` //\\\\//\\\\ ${HOMEPAGE} //\\\\//\\\\\n`
    , HELP =
`
${NAME} ${VERSION}
${'='.repeat( (NAME+VERSION).length+1 )}

This Node.js script initialises a new oom repo. You should start with a folder
which just contains a ‘LICENSE’ file and the ‘oomtility/’ folder (plus ‘.git/’).

Installation
------------
If you haven’t done it already, you should set up the \`oominit\` alias:
$ node oomtility/alias.js

Basic Usage
-----------
$ cd /path/to/your/oom/repo/  # A directory with LICENSE, oomtility/ and .git/
$ oominit --version           # Show the current ${NAME} version
$ oominit                     # Initialises the new oom repo

Create Folders
--------------
1. ‘dist/’ and its subfolders ‘demo/’, ‘main/’ and ‘test/’
2. ‘src/’ and its subfolders ‘demo/’, ‘main/’ and ‘test/’
3. ‘support/’, its subfolder ‘asset/’, and various folders in ‘asset/’

Add Files to Folders
--------------------
1.  src/main/App.6.js                         Entry-point and namespace
2.  src/test/App-universal.6.js               Browser+Node unit test
3.  support/demo.html                         Lists usage examples
4.  support/test.html                         Test browser + universal
5.  support/asset/css/bootstrap.min.css       Grid, normalise browsers
6.  support/asset/css/main.css                Specific Oom styles
7.  support/asset/icon/android-192x192.png    Smaller icon for Android
8.  support/asset/icon/android-512x512.png    Larger icon for Android
9.  support/asset/icon/apple-touch-icon.png   Icon for iOS
10. support/asset/icon/browserconfig.xml      Configures Windows Metro
11. support/asset/icon/favicon-16x16.png      Icon for modern browsers
12. support/asset/icon/favicon-32x32.png      Icon for modern browsers
13. support/asset/icon/favicon-96x96.png      Icon for modern browsers
14. support/asset/icon/favicon.ico            Icon for legacy browsers
15. support/asset/icon/manifest.json          Configures Android
16. support/asset/icon/mstile-310x310.png     Icon for Windows Metro
17. support/asset/icon/safari-pinned-tab.svg  Icon for mobile Safari
18. support/asset/font/ubuntu-bold.woff2      Custom Google fonts
19. support/asset/font/ubuntu-bolditalic.woff2
20. support/asset/font/ubuntu-italic.woff2
21. support/asset/font/ubuntu-regular.woff2
22. support/asset/font/ubuntumono-regular.woff2
23. support/asset/js/ecmaswitch.js            Switch between JS builds
24. support/asset/js/klud.min.js              An assertion library
25. support/asset/js/report.min.js            Klud’s reporter
26. support/asset/js/polyfill.min.js          Support Object.assign
27. support/asset/js/jquery-3.2.1.slim.min.js Cross-browser JS helpers
28. support/asset/js/traceur-runtime.min.js   Runs ES6 transpiled to ES5
29. support/asset/logo/logo-1200x1200.svg     Main image on homepage
30. .gitignore                                Ignore .DS_Store, etc
31. CHANGELOG                                 Lists bumps and commits
32. CNAME                                     Sets the homepage URL
33. index.html                                The repo homepage
34. package.json                              For publishing on NPM
35. README.md                                 Human-readable repo info

Options
-------
-h  --help     Show this help message
-v  --version  Show the current ${NAME} version
-r  --remove   Delete all files and folders except LICENSE, oomtility/ and .git/

This script belongs to ${HOMEPAGE}`


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
    , readline = require('readline')
    , lib = require('./lib.js')

//// Declare variables.
let opt, remove = false, projectDesc, projectColor

//// Deal with command-line options.
while ( opt = process.argv.shift() ) {
    if ('-h' === opt || '--help'    === opt) return console.log(HELP)
    if ('-v' === opt || '--version' === opt) return console.log(VERSION)
    if ('-r' === opt || '--remove'  === opt) { remove = true; continue }
}

//// Set constants.
const projectLC  = process.cwd().split('/').pop() // lowercase, eg 'foo-bar'
if (! /^oom-[-a-z]{1,8}$/.test(projectLC) ) return console.warn(
    `Project '${projectLC}' fails /^oom-[-a-z]{1,8}$/`)
if (/--|-$/.test(projectLC) ) return console.warn(
    `Project '${projectLC}' passes /--|-$/`)
const projectTC   = lcToTc(projectLC) // titlecase, eg 'FooBar'
const projectDmn  = projectLC + '.loop.coop' // 'foo-bar.loop.coop'
const projectURL  = `http://${projectDmn}/` // 'http://foo-bar.loop.coop/'
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

//// Remove files if the '-r' or '--remove' option is present.
if (remove) {
    const tally = rmrfCount('LICENSE', 'oomtility', '.git')
    if (! tally)
        return console.warn('No files or folders need to be removed')

    //// Prompt the user for confirmation.
    const rl = readline.createInterface({
              input: process.stdin
            , output: process.stdout
          })
    rl.question(
        `Permanently delete ${tally} item${1===tally?'':'s'}?\n`
      , answer => {
            answer = answer.toLowerCase()
            if ('y' !== answer && 'yes' !== answer) {
                console.log("OK, just answer 'yes' next time to run deletion")
            } else {
                const tally2 = rmrf('LICENSE', 'oomtility', '.git')
                if (1 === tally2)
                    console.warn('Deleted 1 file or folder')
                else
                    console.warn(`Deleted ${tally2} files and/or folders`)
            }
            process.exit(0)
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

    //// Prompt the user for a description.
    const rl = readline.createInterface({
              input: process.stdin
            , output: process.stdout
          })
    rl.question(
        'Description:\n'
      , answer => {
            projectDesc = answer
            rl.question(
                'Colour:\n'
              , answer => {
                    projectColor = answer
                    createFolders()
                    addFiles()
                    rl.close()
                }
            )
        }
    )
}




//// CREATE FOLDERS

function createFolders () {

    //// 1. ‘dist/’ and its subfolders ‘demo/’, ‘main/’ and ‘test/’
    fs.mkdirSync('dist')
    fs.mkdirSync('dist/demo')
    fs.mkdirSync('dist/main')
    fs.mkdirSync('dist/test')

    //// 2. ‘src/’ and its subfolders ‘demo/’, ‘main/’ and ‘test/’
    fs.mkdirSync('src')
    fs.mkdirSync('src/demo')
    fs.mkdirSync('src/main')
    fs.mkdirSync('src/test')

    //// 3. ‘support/’, its subfolder ‘asset/’, and various folders in ‘asset/’
    fs.mkdirSync('support')
    fs.mkdirSync('support/asset')
    fs.mkdirSync('support/asset/css')
    fs.mkdirSync('support/asset/icon')
    fs.mkdirSync('support/asset/font')
    fs.mkdirSync('support/asset/js')
    fs.mkdirSync('support/asset/logo')

}




//// ADD FILES TO FOLDERS

function addFiles () {

    //// 1.  src/main/App.6.js                         Entry-point and namespace
    addFile('src/main/App.6.js')

    //// 2.  src/test/App-universal.6.js               Browser+Node unit test
    addFile('src/test/App-universal.6.js')

    //// 3.  support/demo.html                         Lists usage examples
    addFile('support/demo.html')

    //// 4.  support/test.html                         Test browser + universal
    addFile('support/test.html')

    //// 5.  support/asset/css/bootstrap.min.css       Grid, normalise browsers
    addFile('support/asset/css/bootstrap.min.css')

    //// 6.  support/asset/css/main.css                Specific Oom styles
    addFile('support/asset/css/main.css')

    //// 7.  support/asset/icon/android-192x192.png    Smaller icon for Android
    addFile('support/asset/icon/android-192x192.png')

    //// 8.  support/asset/icon/android-512x512.png    Larger icon for Android
    addFile('support/asset/icon/android-512x512.png')

    //// 9.  support/asset/icon/apple-touch-icon.png   Icon for iOS
    addFile('support/asset/icon/apple-touch-icon.png')

    //// 10. support/asset/icon/browserconfig.xml      Configures Windows Metro
    addFile('support/asset/icon/browserconfig.xml')

    //// 11. support/asset/icon/favicon-16x16.png      Icon for modern browsers
    addFile('support/asset/icon/favicon-16x16.png')

    //// 12. support/asset/icon/favicon-32x32.png      Icon for modern browsers
    addFile('support/asset/icon/favicon-32x32.png')

    //// 13. support/asset/icon/favicon-96x96.png      Icon for modern browsers
    addFile('support/asset/icon/favicon-96x96.png')

    //// 14. support/asset/icon/favicon.ico            Icon for legacy browsers
    addFile('support/asset/icon/favicon.ico')

    //// 15. support/asset/icon/manifest.json          Configures Android
    addFile('support/asset/icon/manifest.json')

    //// 16. support/asset/icon/mstile-310x310.png     Icon for Windows Metro
    addFile('support/asset/icon/mstile-310x310.png')

    //// 17. support/asset/icon/safari-pinned-tab.svg  Icon for mobile Safari
    addFile('support/asset/icon/safari-pinned-tab.svg')

    //// 18. support/asset/font/ubuntu-bold.woff2      Custom Google fonts
    addFile('support/asset/font/ubuntu-bold.woff2')

    //// 19. support/asset/font/ubuntu-bolditalic.woff2
    addFile('support/asset/font/ubuntu-bolditalic.woff2')

    //// 20. support/asset/font/ubuntu-italic.woff2
    addFile('support/asset/font/ubuntu-italic.woff2')

    //// 21. support/asset/font/ubuntu-regular.woff2
    addFile('support/asset/font/ubuntu-regular.woff2')

    //// 22. support/asset/font/ubuntumono-regular.woff2
    addFile('support/asset/font/ubuntumono-regular.woff2')

    //// 23. support/asset/js/ecmaswitch.js            Switch between JS builds
    addFile('support/asset/js/ecmaswitch.js')

    //// 24. support/asset/js/klud.min.js              An assertion library
    addFile('support/asset/js/klud.min.js')

    //// 25. support/asset/js/report.min.js            Klud’s reporter
    addFile('support/asset/js/report.min.js')

    //// 26. support/asset/js/polyfill.min.js          Support Object.assign
    addFile('support/asset/js/polyfill.min.js')

    //// 27. support/asset/js/jquery-3.2.1.slim.min.js Cross-browser JS helpers
    addFile('support/asset/js/jquery-3.2.1.slim.min.js')

    //// 28. support/asset/js/traceur-runtime.min.js   Runs ES6 transpiled to ES5
    addFile('support/asset/js/traceur-runtime.min.js')

    //// 29. support/asset/logo/logo-1200x1200.svg     Main image on homepage
    addFile('support/asset/logo/logo-1200x1200.svg')

    //// 30. .gitignore                                Ignore .DS_Store, etc
    addFile('.gitignore')

    //// 31. CHANGELOG                                 Lists bumps and commits
    addFile('CHANGELOG')

    //// 32. CNAME                                     Sets the homepage URL
    addFile('CNAME')

    //// 33. index.html                                The repo homepage
    addFile('index.html')

    //// 34. package.json                              For publishing on NPM
    addFile('package.json')

    //// 35. README.md                                 Human-readable repo info
    addFile('README.md')

}




//// UTILITY


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
            if (dummyrun)
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

//// Lowercase to Titlecase, eg 'foo-bar' to 'FooBar'.
function lcToTc(lc) {
    return lc.split('-').map( w => w[0].toUpperCase() + w.substr(1) ).join('')
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
      , projectTC
      , projectLC
      , classname:   projectTC
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
    const fn = lib[fnName]
    const ext = path.split('.').pop().toLowerCase()
    const isBinary = /png|jpg|gif|ico|woff/.test(ext)
    if (! fn)
        console.warn(fnName + '() not found!')
    else
        fs.writeFileSync(path, fn(config), isBinary ? 'binary' : 'utf8')
}

//// Similar to `lcToTc()`. 'foo/bar-baz.txt' to 'getBarBazTxt'.
function pathToFnName (path) {
    return 'get' + (
        path.split('/').pop().split(/[- .]/g).map(
            w => w ? w[0].toUpperCase() + w.substr(1) : ''
        ).join('')
    )
}


}()
