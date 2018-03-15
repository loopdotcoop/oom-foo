${{topline}}

//// Windows XP: Firefox 6, Chrome 15 (and probably lower), Opera 12.10
//// Windows 7:  IE 9, Safari 5.1
//// OS X 10.6:  Firefox 6, Chrome 16 (and probably lower), Opera 12, Safari 5.1
//// iOS:        iPad 3rd (iOS 6) Safari, iPad Air (iOS 7) Chrome
//// Android:    Xperia Tipo (Android 4), Pixel XL (Android 7.1)

!function (ROOT) { 'use strict'
if (false) return $(mocha.run) // change to `true` to ‘hard skip’ this test
const { describe, it, eq, neq, is, goodVals, badVals } = ROOT.testify()
const { isConstant, isReadOnly, isReadWrite } = Oom.KIT

${{{
module.exports.writeTestBrowser6Js(
    Object.assign({}, config, { classname:'Oom' }) )
}}}




${{{
module.exports.writeTestBrowser6Js(
    Object.assign({}, config, { classname:`Oom.${classname}` }) )
}}}




//// Calling `mocha.run()` here will run all of the test files, including the
//// ones which haven’t loaded yet. Note that `mocha.run()` does not need to be
//// called when running Mocha tests under Node.js.
$(mocha.run)

}(window)




//// UTILITY

//// Uses jQuery to simulate an <INPUT>’s value being changed. The simple
//// `$('.my-input').val('abc').trigger('input')` does not trigger Vue.
//// From https://github.com/vuejs/Discussion/issues/157#issuecomment-273301588
function simulateInput ($input, val) {
    $input.val(val)
    const e = document.createEvent('HTMLEvents')
    e.initEvent('input', true, true)
    $input[0].dispatchEvent(e)
}


//// Test whether one or more pixel in an A-Frame scene is the expected colour.
function testPixels (config) {

    //// Apply defaults to `config`.
    const c = Object.assign({}, {
        tol: 5 // tolerance, eg if expected is 245, allow 241 to 249
      , pos: [ // positions
            { x:0.5, y:0.5 } // center middle by default
        ]
      , exp: [ // expected
            { r:255, g:0, b:0, a:255 } // 100% red by default
        ]
    }, config)

    //// Get a reference to A-Frame’s ‘screenshot’ canvas.
    const sceneEl = $('a-scene')[0]
    const captureCanvas = sceneEl.components.screenshot.getCanvas('perspective')
    const captureCtx = captureCanvas.getContext('2d')

    //// Copy the screenshot canvas, and add it to our list of thumbnails.
    const cloneCanvas = document.createElement('canvas');
    const cloneCtx = cloneCanvas.getContext('2d');
    cloneCanvas.width = captureCanvas.width;
    cloneCanvas.height = captureCanvas.height;
    cloneCtx.drawImage(captureCanvas, 0, 0);
    $('#screenshots').append(cloneCanvas)

    //// Test the RGBA colour value of each specified pixel.
    const r = []
    for (let i=0; i<c.pos.length; i++) {
        const { x, y } = c.pos[i]
        const exp = c.exp[i]
        const tol = c.tol

        //// Prevent pixel outside canvas bounds, if `x` or `y` are set to `1`.
        const xClamped =
            0 > x  ? 0
          : 1 <= x ? captureCanvas.width - 1
          : captureCanvas.width * x
        const yClamped =
            0 > y  ? 0
          : 1 <= y ? captureCanvas.height - 1
          : captureCanvas.width * y

        //// Get the colour at the specified position.
        const actual = Array.from(
            cloneCtx.getImageData(
                ~~xClamped // x position
              , ~~yClamped // x position
              , 1, 1 // one pixel
            ).data )

        //// If `passes` is `4`, all four channels are within tolerance.
        let passes = 0
        passes += ( actual[0] < (exp.r+tol) ) && ( actual[0] > (exp.r-tol) )
        passes += ( actual[1] < (exp.g+tol) ) && ( actual[1] > (exp.g-tol) )
        passes += ( actual[2] < (exp.b+tol) ) && ( actual[2] > (exp.b-tol) )
        passes += ( actual[3] < (exp.a+tol) ) && ( actual[3] > (exp.a-tol) )

        //// Add to the test results array.
        r[i] = {
            passes
          , actualRGBA: `rgba(${actual.join(',')})`
          , expRGBA:    `rgba(${exp.r},${exp.g},${exp.b},${exp.a})`
        }
    }

    //// Return the test results.
    return r
}


//// Xx.
function generateRandomColors () {
    const a = {
        r: 0.5 > Math.random() ? 255 : 0
      , g: 0.5 > Math.random() ? 255 : 0
      , b: 0.5 > Math.random() ? 255 : 0
      , a: 255
    }
    const b = {
        r: 0.5 > Math.random() ? 255 : 0
      , g: 0.5 > Math.random() ? 255 : 0
      , b: 0.5 > Math.random() ? 255 : 0
      , a: 255
    }
    const c = {
        r: 0.5 > Math.random() ? 80 : 130
      , g: 0.5 > Math.random() ? 80 : 130
      , b: 0.5 > Math.random() ? 80 : 130
      , a: 255
    }
    const d = {
        r: 0.5 > Math.random() ? 80 : 130
      , g: 0.5 > Math.random() ? 80 : 130
      , b: 0.5 > Math.random() ? 80 : 130
      , a: 255
    }
    return {
        firstObj:  a
      , secondObj: b
      , firstHex:  `#${0==a.r?'00':'ff'}${0==a.g?'00':'ff'}${0==a.b?'00':'ff'}`
      , secondHex: `#${0==b.r?'00':'ff'}${0==b.g?'00':'ff'}${0==b.b?'00':'ff'}`
      , thirdObj:  c
      , fourthObj: d
      , thirdHex:  `#${80==c.r?'50':'82'}${80==c.g?'50':'82'}${80==c.b?'50':'82'}`
      , fourthHex: `#${80==d.r?'50':'82'}${80==d.g?'50':'82'}${80==d.b?'50':'82'}`
    }
}
