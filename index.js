// import * as html2canvas from 'dev/scripts/html2canvas.js';
// const $ = require('jquery');

// WORKS: https://78.media.tumblr.com/80628cfe8b513ba38624436c7370e52d/tumblr_o43e4nWAFK1tb6g63o1_1280.jpg
// http://78.media.tumblr.com/8254a550ea0e10413819a2b01d3112f1/tumblr_mtyq1xm4nW1rgaepso1_1280.jpg
// https://78.media.tumblr.com/89ed1cc043f43cf65368604146e836a7/tumblr_oyhkvvUi401s5dlrdo1_1280.jpg
// http://78.media.tumblr.com/242c77f87dc9e8560094be321f2c62d8/tumblr_mtdyngkQUJ1s5u6gko1_1280.jpg
// http://68.media.tumblr.com/55610b7406da9112002f2ebea61e80ab/tumblr_mprw3yNsfz1qbnks2o1_1280.jpg
// http://66.media.tumblr.com/a6cd80dc275f965a5c699eb547a4a699/tumblr_ndw01mVboK1skr4hwo1_1280.jpg
// https://78.media.tumblr.com/c3ffdbd29c42f874e65ff7d968535736/tumblr_o05zcg5o3G1qcbpg0o1_1280.jpg
// https://78.media.tumblr.com/24ea3e9223392ae41546b685a01ce319/tumblr_o0lj6a1pFs1rclv0wo1_500.jpg
// http://68.media.tumblr.com/e2a33543a85c750303f0f2ac1101519b/tumblr_nzpk90cOVP1tpnfozo1_1280.jpg
// http://68.media.tumblr.com/c861188b6d5829c1031dfdd1ec641d06/tumblr_nmrdkfTQJM1r1arpmo1_1280.png


// DOESNT WORK: http://40.media.tumblr.com/tumblr_lctoziHoh81qang03o1_1280.jpg
// http://40.media.tumblr.com/255c0d9f5ae305c5b131f2414a780ddf/tumblr_ngfl4iLraN1rz8mvdo1_1280.jpg
// http://41.media.tumblr.com/tumblr_m5xbtvhBAr1rri8uuo1_500.jpg
// http://36.media.tumblr.com/tumblr_m9d33k5mgF1rv8zajo1_540.jpg
// http://41.media.tumblr.com/c13ef7d7246692ab185eef25f4d5531d/tumblr_n0uh9vzQuV1rxrwjfo1_1280.jpg
// http://67.media.tumblr.com/469de76777a50d66c94aac4c9d45bdd4/tumblr_o47hndmBns1r9n7npo1_1280.jpg
// http://36.media.tumblr.com/5e7ba0fe77fdbc218f42ada0f2e814af/tumblr_nk4yw9c5Vm1rhdmjqo1_1280.jpg

$(document).ready(function () {










  $('input').bind('copy paste', function (e) {e.preventDefault();}).focus();

  $(document).click(function() {$('input').focus();});

    // html2canvas-proxy SERVER SIDE ONLY
    // var proxy = require('html2canvas-proxy');
    // var express = require('express');
    // var app = express();
    // app.use('/', proxy());





//   $('button').click(function () {
//   var userCanvas = document.getElementById("text-stage");
//   var userImg = userCanvas.toDataURL("image/png");
//   document.getElementById('buttonholder').write(`<a download="brain-drain.jpg" href="${userImg}" title="ImageName">DOWNLOADDD</a>`)
// })



  // import html2canvas from 'html2canvas';
  //
  //
  //
  // html2canvas(document.querySelector("#download-image")).then(canvas => {
  //     document.body.appendChild(canvas)
  // });

  var storedStyleNum = '1';
  var backgroundImage;

  // should I init npm in a dev folder? where should package.j-son be? Public or dev?
  // CHANGE MAIN JS TO INDEX.JS
  // MAKE BODY TAKE UP ENTIRE VH, MINIMUM HEIGHT OF TEXT-STAGE, AND VERTICALLY CENTRE TEXT-STAGE
  // INSERT RANDOM Y-AXIS STARTING POINT (POSSIBLY JUST CHANGE currentRandomREMTotal?)
  // FEATURE TO END WRITING, PERHAPS INPUT A ^ SIGN?
  // NPM ADD HTML2CANVAS
  // FIND SOLUTION TO TEXT STROKE BEING NOT LEGIBLE ON MOBILE
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

  // Color options:   H = 0-360    S = 50%-100%    L =  10%-90%     A = 1

  // When color changes:

  // H += 0
  // H += 1
  // H += random number between 2 & 5
  // H += random number between 6 & 10
  // H += random number between 11 & 15
  // H += random number between 16 & 20
  // H += random number between 21 & 25
  // H += random number between 26 & 30
  // H += random number between 31 & 35
  // H += random number between 36 & 40
  // H += random number between 40 & 50

  // S += 0
  // S += random number between 1 & 2
  // S += random number between 3 & 4
  // S += random number between 5 & 6
  // S += random number between 7 & 8
  // S += random number between 9 & 10
  // S += random number between 11 & 12
  // S += random number between 13 & 14
  // S += random number between 15 & 16
  // S += random number between 17 & 18
  // S += random number between 19 & 20

  // L += 0, L += 1... L += 10




  // LINE 1: initial color black, 2% chance of changing color, 10% chance of changing back to black;
  // LINE 2: initial color random, 10% chance of changing color, 2% chance of changing back to initial color;
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
    if (currentLine == 11){
      // $('[class^=intro_]').css({display:'none'});
      $('.outro').css({display:'block'});
      return;
    }
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
        if($(".text-stage_line--active")[0]){
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
        else {return;}
      }
  ;
  input.addEventListener('keydown', keyDownHandler);
  input.addEventListener('input', inputHandler);

  $.ajax({
    url: 'https://archillect-api.now.sh/random',
    cache: false,
    method: 'GET',
    dataType: 'json'
  }).then(function(data) {
    backgroundImage = `url("${data.imageSource}")`;
    $('.text-stage').css({'background-image':backgroundImage});
  });


  // button functionality
  $('.intro_button').click(function() {
    $('.intro').css({display:'none'})
  })
  $('.outro_restart-button').click(function() {
    location.reload();
  })
  $('.outro_background-button').click(function() {
    $('.text-stage').css({'background-image':'none'});
    $.ajax({
      url: 'https://archillect-api.now.sh/random',
      cache: false,
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      backgroundImage = `url("${data.imageSource}")`;
      $('.text-stage').css({'background-image':backgroundImage});
    });
  })
 $("#download-image").click(function() {
  html2canvas(document.querySelector(".text-stage"), {useCORS: true}).then(canvas => {
      var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream00");
      window.location.href=image;
      document.body.appendChild(canvas)
    });
  });
 $(".outro_save-button").click(function() {
   html2canvas(document.querySelector(".text-stage"), {useCORS: true}).then(canvas => {
      var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream00");
      window.location.href=image;
      document.body.appendChild(canvas)
    });
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
