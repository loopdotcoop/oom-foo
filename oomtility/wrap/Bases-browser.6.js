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

//// Test whether one pixel in an A-Frame scene is the expected colour.
function testPixel (config) {

    //// Apply defaults to `config`.
    const c = Object.assign({}, {
        x: 0.5 // position, center by default
      , y: 0.5 // position, middle by default
      , tol: 5 // tolerance, eg if expected is 245, allow 241 to 249
      , exp: { // expected, 100% red by default
            r: 255
          , g: 0
          , b: 0
          , a: 255
        }
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

    //// Get the RGBA colour value of the test pixel.
    const pixel = Array.from(
        captureCtx.getImageData(
            ~~(captureCanvas.width*c.x), ~~(captureCanvas.height*c.y) // position
          , 1, 1 // one pixel
        ).data
    )

    //// The pixel should pass four times.
    let passes = 0
    passes += ( pixel[0] < (c.exp.r+c.tol) ) && ( pixel[0] > (c.exp.r-c.tol) )
    passes += ( pixel[1] < (c.exp.g+c.tol) ) && ( pixel[1] > (c.exp.g-c.tol) )
    passes += ( pixel[2] < (c.exp.b+c.tol) ) && ( pixel[2] > (c.exp.b-c.tol) )
    passes += ( pixel[3] < (c.exp.a+c.tol) ) && ( pixel[3] > (c.exp.a-c.tol) )

    //// Return the test results.
    return {
        passes
      , pixelRGBA:    `rgba(${pixel[0]},${pixel[1]},${pixel[2]},${pixel[3]})`
      , expectedRGBA: `rgba(${c.exp.r},${c.exp.g},${c.exp.b},${c.exp.a})`
    }
}
