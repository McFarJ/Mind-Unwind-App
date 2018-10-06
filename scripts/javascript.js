$(document).ready(function () {

  $('input').bind('copy paste', function (e) {e.preventDefault();}).focus();

  $(document).click(function() {$('input').focus();});


  // BASIC BELL CURVE var baseWeights = [0.0014, 0.0032, 0.0068, 0.0134, 0.0239, 0.039, 0.0584, 0.0798, 0.0997, 0.114, 0.1192, 0.114, 0.0997, 0.0798, 0.0584, 0.039, 0.0239, 0.0134, 0.0068, 0.0032, 0.0014]; // probabilities
  var baseWeights = [0.0014, 0.0032, 0.0068, 0.0134, 0.0239, 0.039, 0.0584, 0.0798, 0.0997, 0.114, 0.1192, 0.114, 0.0997, 0.0798, 0.0584, 0.039, 0.0239, 0.0134, 0.0068, 0.0032, 0.0014];
  var results = [-1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]; // values to return

  function getRandom (x) {
      var weights = x
      var num = Math.random(),
          s = 0,
          lastIndex = weights.length - 1;

      for (var i = 0; i < lastIndex; ++i) {
          s += weights[i];
          if (num < s) {
              return `translate(0,${results[i]}rem)`;
          }
      }

      return results[lastIndex];
  };

  console.log (getRandom(baseWeights))


// input interpreter (complexity is due to working around Android's 'keycode 229' issue) and outputer
  // var input = document.getElementById("text-input"),
  //     oldValue,
  //     newValue,
  //     difference = function(value1, value2) {
  //       var output = [];
  //       for(i = 0; i < value2.length; i++) {
  //         if(value1[i] !== value2[i]) {
  //           output.push(value2[i]);
  //         }
  //       }
  //       return output.join("");
  //     },
  //     keyDownHandler = function(e) {
  //       oldValue = input.value;
  //       document.getElementById("onkeydown-result").innerHTML = input.value;
  //     },
  //     inputHandler = function(e) {
  //
  //       var edgeOfActiveText = $('.text-stage_line-1-text').offset().left + $('.text-stage_line-1-text').width();;
  //       var edgeOfLineEnd = $('.text-stage_line-end').offset().left;
  //
  //       newValue = input.value;
  //       document.getElementById("oninput-result").innerHTML = input.value;
  //       document.getElementById("typedvalue-result").innerHTML = difference(oldValue, newValue);
  //       $('.text-stage_line-1-text')
  //         .append(`<p>${difference(oldValue, newValue)}</p>`);
  //       console.log('active text end is ' + edgeOfActiveText + ' and end of line is ' + edgeOfLineEnd);
  //       if (edgeOfActiveText > edgeOfLineEnd) {console.log('end of line');}
  //     }
  // ;
  // input.addEventListener('keydown', keyDownHandler);
  // input.addEventListener('input', inputHandler);




  var input = document.getElementById("text-input"),
      oldValue,
      newValue,
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
        document.getElementById("onkeydown-result").innerHTML = input.value;
      },
      inputHandler = function(e) {

        var edgeOfActiveText = $('.text-stage_line-1-text').offset().left + $('.text-stage_line-1-text').width();;
        var edgeOfLineEnd = $('.text-stage_line-end').offset().left;

        var previousCharYAxis = $('p:last-child').css('transform');
        var charBeforePreviousYAxis = $('p:nth-last-child(2)').css('transform');

        console.log(previousCharYAxis);
        console.log(charBeforePreviousYAxis);

        newValue = input.value;
        document.getElementById("oninput-result").innerHTML = input.value;
        document.getElementById("typedvalue-result").innerHTML = difference(oldValue, newValue);
        $('.text-stage_line-1-text').append(`<p>${difference(oldValue, newValue)}</p>`);
        // if ($('p:nth-last-child(2)'))
        $('p:last-child').css({'transform':getRandom(baseWeights)});
        // console.log('active text end is ' + edgeOfActiveText + ' and end of line is ' + edgeOfLineEnd);
        // if (edgeOfActiveText > edgeOfLineEnd) {console.log('end of line');}
      }
  ;
  input.addEventListener('keydown', keyDownHandler);
  input.addEventListener('input', inputHandler);



});


// getRandom(baseWeights)



















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
