$(document).ready(function () {

  $('input').bind('copy paste', function (e) {e.preventDefault();}).focus();

  $(document).click(function() {$('input').focus();});


  // BASIC BELL CURVE var baseYAxisWeights = [0.0014, 0.0032, 0.0068, 0.0134, 0.0239, 0.039, 0.0584, 0.0798, 0.0997, 0.114, 0.1192, 0.114, 0.0997, 0.0798, 0.0584, 0.039, 0.0239, 0.0134, 0.0068, 0.0032, 0.0014]; // probabilities
  var baseYAxisWeights = [0.0014, 0.0032, 0.0068, 0.0134, 0.0239, 0.039, 0.0584, 0.0798, 0.0997, 0.114, 0.1192, 0.114, 0.0997, 0.0798, 0.0584, 0.039, 0.0239, 0.0134, 0.0068, 0.0032, 0.0014];
  var yAxisResults = [-1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]; // values to return

  var baseDEGWeights = [0.00021, 0.00048, 0.00102, 0.00201, 0.003585, 0.00585, 0.00876, 0.01197, 0.014955, 0.0171, 0.86812, 0.0171, 0.014955, 0.01197, 0.00876, 0.00585, 0.003585, 0.00201, 0.00102, 0.00048, 0.00021]
  var DEGResults = [-90, -89, -75, -60, -45, -30, -20, -10, -5, -2.5, 0, 2.5, 5, 10, 20, 30, 45, 60, 75, 89, 90]

  function getRandomYAxis (x) {
      var weights = x
      var num = Math.random(),
          s = 0,
          lastIndex = weights.length - 1;
      for (var i = 0; i < lastIndex; ++i) {
          s += weights[i];
          if (num < s) {
              return yAxisResults[i];
          }
      }
      return yAxisResults[lastIndex];
  };

  function getRandomDEG (x) {
      var weights = x
      var num = Math.random(),
          s = 0,
          lastIndex = weights.length - 1;
      for (var i = 0; i < lastIndex; ++i) {
          s += weights[i];
          if (num < s) {
              return DEGResults[i];
          }
      }
      return DEGResults[lastIndex];
  };

  function startNewLine() {
    $('.text-stage_line--active').removeClass('text-stage_line--active');
    currentLine += 1;
    var activeLineClass = `.text-stage_line-${currentLine}-text`;
    $(activeLineClass).addClass('text-stage_line--active');
    currentRandomREMTotal = 0;
  };


// lineDesignA = Black text, rare background color change
// lineDesignB = Color text, rare background color change
// lineDesignC = White text, black background with common change





// CAN YOU INCLUDE SPACES IN OUTPUT??
  var input = document.getElementById("text-input"),
      oldValue,
      newValue,

      newRandomREM,
      newYTranslation,
      currentRandomREMTotal = 0,

      newRandomDEG,
      newRotation,
      currentRotationTotal = 0,

      currentLine = 1,
      newTransformation = 0,

      difference = function(value1, value2) {
        var output = [];
        for(i = 0; i < value2.length; i++) {
          if(value1[i] !== value2[i]) {
            output.push(value2[i]);
          }
        }
        return output.join("");
      },
      keyDownHandler = function(e) {
        oldValue = input.value;
      },
      inputHandler = function(e) {

        var edgeOfActiveText = $('.text-stage_line--active').offset().left + $('.text-stage_line--active').width();;
        var edgeOfLineEnd = $('.text-stage_line-end').offset().left;

        var previousCharYAxis = parseInt($('p:last-child').css('transform').split(',')[5]);
        var charBeforePreviousYAxis = parseInt($('p:nth-last-child(2)').css('transform').split(',')[5]);

        newValue = input.value;


        newRandomDEG = getRandomDEG(baseDEGWeights);
        newRotation = `rotate(${newRandomDEG + currentRotationTotal}deg)`


        newRandomREM = getRandomYAxis(baseYAxisWeights);
        newYTranslation = `translate(0,${newRandomREM + currentRandomREMTotal}rem)`

        newTransformation = newYTranslation + ' ' + newRotation;

        $('.text-stage_line--active').append(`<p>${difference(oldValue, newValue)}</p>`);
        $('.text-stage_line--active p:last-child').css({transform:newTransformation});
        currentRandomREMTotal += newRandomREM
        currentRotationTotal += newRandomDEG



        if (edgeOfActiveText > edgeOfLineEnd) {startNewLine();}
      }
  ;
  input.addEventListener('keydown', keyDownHandler);
  input.addEventListener('input', inputHandler);



});



















// });




// var Detector = function() {
//     // a font will be compared against all the three default fonts.
//     // and if it doesn't match all 3 then that font is not available.
//     var baseFonts = ['monospace', 'sans-serif', 'serif'];
//     //we use m or w because these two characters take up the maximum width.
//     // And we use a LLi so that the same matching fonts can get separated
//     var testString = "mmmmmmmmmmlli";
//     //we test using 72px font size, we may use any size. I guess larger the better.
//     var testSize = '72px';
//     var h = document.getElementsByTagName("body")[0];
//     // create a SPAN in the document to get the width of the text we use to test
//     var s = document.createElement("span");
//     s.style.fontSize = testSize;
//     s.innerHTML = testString;
//     var defaultWidth = {};
//     var defaultHeight = {};
//     for (var index in baseFonts) {
//         //get the default width for the three base fonts
//         s.style.fontFamily = baseFonts[index];
//         h.appendChild(s);
//         defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
//         defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
//         h.removeChild(s);
//     }
//
//     function detect(font) {
//         var detected = false;
//         for (var index in baseFonts) {
//             s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
//             h.appendChild(s);
//             var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
//             h.removeChild(s);
//             detected = detected || matched;
//         }
//         console.log(font + 'xxx');
//         return detected;
//     }
//
//     this.detect = detect;
// };
//
// let d = new Detector();
// d.detect('Arial');
