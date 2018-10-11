$(document).ready(function () {

  $('input').bind('copy paste', function (e) {e.preventDefault();}).focus();

  $(document).click(function() {$('input').focus();});

  var storedStyleNum = '1';
  var backgroundImage;

  // INSERT RANDOM Y-AXIS STARTING POINT
  // BASIC BELL CURVE var baseYAxisWeights = [0.0014, 0.0032, 0.0068, 0.0134, 0.0239, 0.039, 0.0584, 0.0798, 0.0997, 0.114, 0.1192, 0.114, 0.0997, 0.0798, 0.0584, 0.039, 0.0239, 0.0134, 0.0068, 0.0032, 0.0014]; // probabilities
  var baseYAxisWeights = [0.0014, 0.0032, 0.0068, 0.0134, 0.0239, 0.039, 0.0584, 0.0798, 0.0997, 0.114, 0.1192, 0.114, 0.0997, 0.0798, 0.0584, 0.039, 0.0239, 0.0134, 0.0068, 0.0032, 0.0014];
  var yAxisResults = [-1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]; // values to return

  var baseDEGWeights = [0.00021, 0.00048, 0.00102, 0.00201, 0.003585, 0.00585, 0.00876, 0.01197, 0.014955, 0.0171, 0.86812, 0.0171, 0.014955, 0.01197, 0.00876, 0.00585, 0.003585, 0.00201, 0.00102, 0.00048, 0.00021]
  var DEGResults = [-90, -89, -75, -60, -45, -30, -20, -10, -5, -2.5, 0, 2.5, 5, 10, 20, 30, 45, 60, 75, 89, 90]

  var negativeDEGWeightsA = baseDEGWeights.slice(0,10).map(x => x * 0.2);
  var negativeDEGWeightsB = [0.09234, 0.080757, 0.064638, 0.047304, 0.03159, 0.019359, 0.010854, 0.005508, 0.002592, 0.001134]
  var negativeDEGWeights = negativeDEGWeightsA.concat(0.577984, negativeDEGWeightsB);
  var positiveDEGWeightsA = [0.001134, 0.002592, 0.005508, 0.010854, 0.019359, 0.03159, 0.047304, 0.064638, 0.080757, 0.09234]
  var positiveDEGWeightsB = baseDEGWeights.slice(11).map(x => x * 0.2);
  var positiveDEGWeights = positiveDEGWeightsA.concat(0.577984, positiveDEGWeightsB);

  var negativeDEGWeightsBHigher = [0.18468, 0.161514, 0.096957, 0.070956, 0.0394875, 0.019359, 0.010854, 0.005508, 0.002592, 0.001134]
  var negativeDEGWeightsHigher = negativeDEGWeightsA.concat(0.3410185, negativeDEGWeightsBHigher);
  var positiveDEGWeightsBHigher = [0.001134, 0.002592, 0.005508, 0.010854, 0.019359, 0.0394875, 0.070956, 0.096957, 0.161514, 0.18468]
  var positiveDEGWeightsHigher = positiveDEGWeightsA.concat(0.3410185, positiveDEGWeightsBHigher);

  var fontResults = ['Fahkwang, sans-serif', 'Notable, sans-serif', 'IBM Plex Mono, monospace', 'IBM Plex Serif, serif', 'Stylish, sans-serif', 'Cormorant, serif']
  var baseFontWeights = [0.025, 0.01, 0.35, 0.35, 0.2, 0.065]

  var colorResults = []

  // H = 0-360
  // L =  10-90
  //
  // LINE 1: initial color black, 2% chance of changing color, 10% chance of changing back;
  // LINE 2: initial color random, 10% chance of changing color
  // LINE 3: color white;

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

  function getRandomFont (x) {
      var weights = x
      var num = Math.random(),
          s = 0,
          lastIndex = weights.length - 1;
      for (var i = 0; i < lastIndex; ++i) {
          s += weights[i];
          if (num < s) {
              return fontResults[i];
          }
      }
      return fontResults[lastIndex];
  };

  // I dont think getLineStyle() is working
  function getLineStyle() {
    var num = Math.floor(Math.random() * 3) + 1;
    if (num == storedStyleNum) {
      for (let i = 0; ; i++){
        num = Math.floor(Math.random() * 3) + 1;
        if (num != storedStyleNum) {
          return;
        }
        else if (i=30){return;}
      }
    }
    storedStyleNum = num;
    console.log('hope it worked, this is num: ' + num);
    return num;
    }


  function startNewLine() {
    $('.text-stage_line--active').removeClass('text-stage_line--active');
    currentLine += 1;
    var activeLineClass = `.text-stage_line-${currentLine}-text`;
    var newLineStyle = getLineStyle();
    $(activeLineClass).addClass(`text-stage_line--active text-stage_style-${newLineStyle}`);
    currentRandomREMTotal = 0;
  };




// CAN I INCLUDE SPACES IN OUTPUT??
  var input = document.getElementById("text-input"),
      oldValue,
      newValue,

      // Translation
      newRandomREM,
      newYTranslation,
      currentRandomREMTotal = 0,

      // Rotation
      newRandomDEG = 0,
      newRotation,
      previousRandomDEG = 0,
      charBeforePreviousRandomDEG = 0,

      // Color
      newFont,

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

        // Translation
        var previousCharYAxis = parseInt($('p:last-child').css('transform').split(',')[5]);
        var charBeforePreviousYAxis = parseInt($('p:nth-last-child(2)').css('transform').split(',')[5]);

        newValue = input.value;

        // Rotation
        if (previousRandomDEG > 0 && charBeforePreviousRandomDEG <= 0) {newRandomDEG = getRandomDEG(negativeDEGWeights); console.log(previousRandomDEG + ' ' + charBeforePreviousRandomDEG + ' NEGATIVE');}
        else if (previousRandomDEG > 0 && charBeforePreviousRandomDEG > 0) {newRandomDEG = getRandomDEG(negativeDEGWeightsHigher); console.log(previousRandomDEG + ' ' + charBeforePreviousRandomDEG + ' HIGHER NEGATIVE');}
        else if (previousRandomDEG < 0 && charBeforePreviousRandomDEG >= 0) {newRandomDEG = getRandomDEG(positiveDEGWeights); console.log(previousRandomDEG + ' ' + charBeforePreviousRandomDEG + ' POSITIVE');}
        else if (previousRandomDEG < 0 && charBeforePreviousRandomDEG < 0) {newRandomDEG = getRandomDEG(positiveDEGWeightsHigher); console.log(previousRandomDEG + ' ' + charBeforePreviousRandomDEG + ' HIGHER POSITIVE');}
        else if (previousRandomDEG == 0) {newRandomDEG = getRandomDEG(baseDEGWeights); console.log(previousRandomDEG + ' ' + charBeforePreviousRandomDEG + ' BASE');}
        newRotation = `rotate(${newRandomDEG}deg)`;

        // Translation
        newRandomREM = getRandomYAxis(baseYAxisWeights);
        newYTranslation = `translate(0,${newRandomREM + currentRandomREMTotal}rem)`;

        newTransformation = newYTranslation + ' ' + newRotation;

        newFont = getRandomFont(baseFontWeights);

        if ($('.text-stage_line--active').hasClass('text-stage_style-1')){
          // $('.text-stage_line--active p:last-child').css
        }
        else if ($('.text-stage_line--active').hasClass('text-stage_style-2')){}
        else if ($('.text-stage_line--active').hasClass('text-stage_style-3')){}






        $('.text-stage_line--active').append(`<p>${difference(oldValue, newValue)}</p>`);
        $('.text-stage_line--active p:last-child').css({'transform':newTransformation, 'font-family':newFont})
        console.log(newFont);
        currentRandomREMTotal += newRandomREM;
        charBeforePreviousRandomDEG = previousRandomDEG;
        previousRandomDEG = newRandomDEG;

        if (edgeOfActiveText > edgeOfLineEnd) {startNewLine();}
      }
  ;
  input.addEventListener('keydown', keyDownHandler);
  input.addEventListener('input', inputHandler);

  $.ajax({
    url: 'https://archillect-api.now.sh/random',
    method: 'GET',
    dataType: 'json'
  }).then(function(data) {
    backgroundImage = `url("${data.imageSource}")`;
    $('.text-stage').css({'background-image':backgroundImage});
  });

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
