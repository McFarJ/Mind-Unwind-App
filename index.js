$(document).ready(function () {

  $('input').bind('copy paste', function (e) {e.preventDefault();}).focus();

  $(document).click(function() {$('input').focus();});

  var archillectNum = Math.floor(Math.random() * 9) + 1;
  var randomBackground = `images/mind-unwind${archillectNum}.jpg`

  var storedStyleNum = '1';

  var baseYAxisWeights = [0.0014, 0.0032, 0.0068, 0.0134, 0.0239, 0.039, 0.0584, 0.0798, 0.0997, 0.114, 0.1192, 0.114, 0.0997, 0.0798, 0.0584, 0.039, 0.0239, 0.0134, 0.0068, 0.0032, 0.0014],
      yAxisResults = [-1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

  var baseDEGWeights = [0.00021, 0.00048, 0.00102, 0.00201, 0.003585, 0.00585, 0.00876, 0.01197, 0.014955, 0.0171, 0.86812, 0.0171, 0.014955, 0.01197, 0.00876, 0.00585, 0.003585, 0.00201, 0.00102, 0.00048, 0.00021],
      DEGResults = [-90, -89, -75, -60, -45, -30, -20, -10, -5, -2.5, 0, 2.5, 5, 10, 20, 30, 45, 60, 75, 89, 90];

  var negativeDEGWeightsA = baseDEGWeights.slice(0,10).map(x => x * 0.2),
      negativeDEGWeightsB = [0.09234, 0.080757, 0.064638, 0.047304, 0.03159, 0.019359, 0.010854, 0.005508, 0.002592, 0.001134],
      negativeDEGWeights = negativeDEGWeightsA.concat(0.577984, negativeDEGWeightsB),
      positiveDEGWeightsA = [0.001134, 0.002592, 0.005508, 0.010854, 0.019359, 0.03159, 0.047304, 0.064638, 0.080757, 0.09234],
      positiveDEGWeightsB = baseDEGWeights.slice(11).map(x => x * 0.2),
      positiveDEGWeights = positiveDEGWeightsA.concat(0.577984, positiveDEGWeightsB);

  var negativeDEGWeightsBHigher = [0.18468, 0.161514, 0.096957, 0.070956, 0.0394875, 0.019359, 0.010854, 0.005508, 0.002592, 0.001134],
      negativeDEGWeightsHigher = negativeDEGWeightsA.concat(0.3410185, negativeDEGWeightsBHigher),
      positiveDEGWeightsBHigher = [0.001134, 0.002592, 0.005508, 0.010854, 0.019359, 0.0394875, 0.070956, 0.096957, 0.161514, 0.18468],
      positiveDEGWeightsHigher = positiveDEGWeightsA.concat(0.3410185, positiveDEGWeightsBHigher);

  var fontResults = ['Fahkwang, sans-serif', 'Notable, sans-serif', 'IBM Plex Mono, monospace', 'IBM Plex Serif, serif', 'Stylish, sans-serif', 'Cormorant, serif'],
      baseFontWeights = [0.025, 0.01, 0.35, 0.35, 0.2, 0.065];

  var textColorFreedom;
  var shadowColorFreedom;

  var currentShadowColor;
  var currentTextColor;

  var previousTextH = 0,
      previousTextS = 0,
      previousTextL = 0,
      previousShadowH = 232,
      previousShadowS = 25,
      previousShadowL = 92;

  function CSSShadowTemplate(color){
    return '1px 1px 0.5px ' + color +
    ', 1px -1px 0.5px ' + color +
    ', -1px 1px 0.5px ' + color +
    ', -1px -1px 0.5px ' + color +
    ', 0px -1px 0.5px ' + color +
    ', 0px 1px 0.5px ' + color +
    ', -1px 0px 0.5px ' + color +
    ', 1px 0px 0.5px ' + color +
    ', 2px 2px 0.5px ' + color +
    ', 2px -2px 0.5px ' + color +
    ', -2px 2px 0.5px ' + color +
    ', -2px -2px 0.5px ' + color +
    ', 0px -2px 0.5px ' + color +
    ', 0px 2px 0.5px ' + color +
    ', -2px 0px 0.5px ' + color +
    ', 2px 0px 0.5px ' + color;
  }

  function getColorFreedomValues(){
    var num = Math.floor(Math.random() * 100);
    if ($('.text-stage_line--active').hasClass('text-stage_style-1')){
      textColorFreedom = false;
      if (!shadowColorFreedom && num < 2){
        shadowColorFreedom = true;
      }
      else if (shadowColorFreedom && 0 <= previousShadowL && previousShadowL < 6 && num < 50){
        shadowColorFreedom = false;
      }
    }
    else if ($('.text-stage_line--active').hasClass('text-stage_style-2')){
      textColorFreedom = true;
      if (!shadowColorFreedom && num < 5){
        shadowColorFreedom = true;
      }
      else if (shadowColorFreedom && num < 5){
        shadowColorFreedom = false;
      }
    }
    else if ($('.text-stage_line--active').hasClass('text-stage_style-3')){
      textColorFreedom = false;
      if (!shadowColorFreedom && num < 5){
        shadowColorFreedom = true;
      }
      else if (shadowColorFreedom && num < 5){
        shadowColorFreedom = false;
      }
    }
  }

  function getCurrentColors(){
    // Determining the numbers in the results arrays for H(ue) and S(aturation)
      var H2 = [4, 2],H3 = [5, 6],H4 = [5, 11],H5 = [5, 16],H6 = [5, 21],H7 = [5, 26],H8 = [5,31],H9 = [5, 36],H10 = [11, 40];
      var S1 = [2, 1],S2 = [2, 3],S3 = [2, 5],S4 = [2, 7],S5 = [2, 9],S6 = [2, 11],S7 = [2, 13],S8 = [2, 15],S9 = [2, 17],S10 = [2, 19];

      function colorResultHS(x){var result = Math.floor(Math.random() * x[0]) + x[1]; return result;}

      var colorWeightsH = [0.0014, 0.0032, 0.0068, 0.0134, 0.0239, 0.039, 0.0584, 0.0798, 0.0997, 0.114, 0.1192, 0.114, 0.0997, 0.0798, 0.0584, 0.039, 0.0239, 0.0134, 0.0068, 0.0032, 0.0014],
          colorResultsH = [-colorResultHS(H10), -colorResultHS(H9), -colorResultHS(H8), -colorResultHS(H7), -colorResultHS(H6), -colorResultHS(H5), -colorResultHS(H4), -colorResultHS(H3), -colorResultHS(H2), -1, 0, 1, colorResultHS(H2), colorResultHS(H3), colorResultHS(H4), colorResultHS(H5), colorResultHS(H6), colorResultHS(H7), colorResultHS(H8), colorResultHS(H9), colorResultHS(H10)]
    
      var colorWeightsS = [0.0014, 0.0032, 0.0068, 0.0134, 0.0239, 0.039, 0.0584, 0.0798, 0.0997, 0.114, 0.1192, 0.114, 0.0997, 0.0798, 0.0584, 0.039, 0.0239, 0.0134, 0.0068, 0.0032, 0.0014],
          colorResultsS = [-colorResultHS(S10), -colorResultHS(S9), -colorResultHS(S8), -colorResultHS(S7), -colorResultHS(S6), -colorResultHS(S5), -colorResultHS(S4), -colorResultHS(S3), -colorResultHS(S2), -colorResultHS(S1), 0, colorResultHS(S1), colorResultHS(S2), colorResultHS(S3), colorResultHS(S4), colorResultHS(S5), colorResultHS(S6), colorResultHS(S7), colorResultHS(S8), colorResultHS(S9), colorResultHS(S10)]
                
    var colorWeightsL = [0.0014, 0.0032, 0.0068, 0.0134, 0.0239, 0.039, 0.0584, 0.0798, 0.0997, 0.114, 0.1192, 0.114, 0.0997, 0.0798, 0.0584, 0.039, 0.0239, 0.0134, 0.0068, 0.0032, 0.0014],
        colorResultsL = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    getColorFreedomValues();

    // Picking H(ue) & S(aturation) & L(ightness) results from their respective arrays
      function getRandomColorH (x) {
        var weights = x,
            num = Math.random(),
            s = 0,
            lastIndex = weights.length - 1;
        for (var i = 0; i < lastIndex; ++i) {
            s += weights[i];
            if (num < s) {
                return colorResultsH[i];
            }
        }
        return colorResultsH[lastIndex];
      };
    
      function getRandomColorS (x) {
        var weights = x
        var num = Math.random(),
            s = 0,
            lastIndex = weights.length - 1;
        for (var i = 0; i < lastIndex; ++i) {
            s += weights[i];
            if (num < s) {
                return colorResultsS[i];
            }
        }
        return colorResultsS[lastIndex];
      };
    
      function getRandomColorL (x) {
        var weights = x
        var num = Math.random(),
            s = 0,
            lastIndex = weights.length - 1;
        for (var i = 0; i < lastIndex; ++i) {
            s += weights[i];
            if (num < s) {
                return colorResultsL[i];
            }
        }
        return colorResultsL[lastIndex];
      };

    // Determining current colors for the current line style
      if ($('.text-stage_line--active').hasClass('text-stage_style-1')){
        // style 1 text color
        currentTextColor = 'hsl(50, 11%, 11%, 1)';
        // style 1 shadow color
        if(!shadowColorFreedom){currentShadowColor = 'hsla(232, 25%, 92%, 1)';}
        else if(shadowColorFreedom){
          currentShadowH = previousShadowH + getRandomColorH(colorWeightsH);
          if (currentShadowH < 0){currentShadowH=0}
          currentShadowS = previousShadowS + getRandomColorS(colorWeightsS);
          if (currentShadowS < 0){currentShadowS=0}
          currentShadowL = previousShadowL + getRandomColorL(colorWeightsL);
          if (currentShadowL < 0){currentShadowL=0}
          currentShadowColor = `hsla(${currentShadowH},${currentShadowS}%,${currentShadowL}%,1)`;
          previousShadowH = currentShadowH;
          previousShadowS = currentShadowS;
          previousShadowL = currentShadowL;
        }
      }
      if ($('.text-stage_line--active').hasClass('text-stage_style-2')){
        // style 2 text color
        currentTextH = previousTextH + getRandomColorH(colorWeightsH);
        if (currentTextH < 0){currentTextH=0}
        else if (currentTextH > 360){currentTextH=360}
        currentTextS = previousTextS + getRandomColorS(colorWeightsS);
        if (currentTextS < 50){currentTextS=50}
        else if (currentTextS > 100){currentTextS=100}
        currentTextL = previousTextL + getRandomColorL(colorWeightsL);
        if (currentTextL < 10){currentTextL=10}
        else if (currentTextL > 90){currentTextL=90}
        currentTextColor = `hsla(${currentTextH},${currentTextS}%,${currentTextL}%,1)`;
        previousTextH = currentTextH;
        previousTextS = currentTextS;
        previousTextL = currentTextL;
        // style 2 shadow color
        if(!shadowColorFreedom){currentShadowColor = 'hsla(232, 25%, 92%, 1)';}
        else if(shadowColorFreedom){
          currentShadowH = previousShadowH + getRandomColorH(colorWeightsH);
          if (currentShadowH < 0){currentShadowH=0}
          currentShadowS = previousShadowS + getRandomColorS(colorWeightsS);
          if (currentShadowS < 0){currentShadowS=0}
          currentShadowL = previousShadowL + getRandomColorL(colorWeightsL);
          if (currentShadowL < 0){currentShadowL=0}
          currentShadowColor = `hsla(${currentShadowH},${currentShadowS}%,${currentShadowL}%,1)`;
          previousShadowH = currentShadowH;
          previousShadowS = currentShadowS;
          previousShadowL = currentShadowL;
        }
      }
      if ($('.text-stage_line--active').hasClass('text-stage_style-3')){
        // style 3 text color
        currentTextColor = 'hsla(232, 25%, 92%, 1)';
        // style 3 shadow color
        if(!shadowColorFreedom){currentShadowColor = 'hsl(50, 11%, 11%, 1)';}
        else if(shadowColorFreedom){
          currentShadowH = previousShadowH + getRandomColorH(colorWeightsH);
          if (currentShadowH < 0){currentShadowH=0}
          currentShadowS = previousShadowS + getRandomColorS(colorWeightsS);
          if (currentShadowS < 0){currentShadowS=0}
          currentShadowL = previousShadowL + getRandomColorL(colorWeightsL);
          if (currentShadowL < 0){currentShadowL=0}
          currentShadowColor = `hsla(${currentShadowH},${currentShadowS}%,${currentShadowL}%,1)`;
          previousShadowH = currentShadowH;
          previousShadowS = currentShadowS;
          previousShadowL = currentShadowL;
        }
      }
      return [currentTextColor, currentShadowColor]
  }

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

  function startNewLine() {
    $('.text-stage_line--active').removeClass('text-stage_line--active');
    currentLine += 1;
    if (currentLine == 11){
      $('.outro').css({display:'block'});
      return;
    }
    var activeLineClass = `.text-stage_line-${currentLine}-text`;
    function getLineStyle() {
      var styles = [1,2,3];
      styles.splice(storedStyleNum-1,1); 
      storedStyleNum = styles[Math.floor(Math.random() *2)];
      if (storedStyleNum == 1 || storedStyleNum == 2){previousShadowH = 232; previousShadowS = 25; previousShadowL = 92;}
      if (storedStyleNum == 3){previousShadowH = 50; previousShadowS = 11; previousShadowL = 11;}
      return storedStyleNum;
    }
    var newLineStyle = getLineStyle();
    $(activeLineClass).addClass(`text-stage_line--active text-stage_style-${newLineStyle}`).css({'margin-left':`${getRandomMargin()}`});
    currentRandomREMTotal = 0;
  };

  function getRandomMargin() {
    var num = Math.floor(Math.random() * 8) - 10;
    var margin = `${num}px`;
    return margin;
  }

  $('.text-stage_line-1-text').css({'margin-left':`${getRandomMargin()}`});

  var audioOff = false,
      audio = new Audio('Audio.mp3');
  audio.loop = true;
  audio.play();

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

      caretEntered= false,

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
        if (caretEntered === true){
          return;
        }
        if($(".text-stage_line--active")[0]){
          var edgeOfActiveText = $('.text-stage_line--active').offset().left + $('.text-stage_line--active').width();;
          var edgeOfLineEnd = $('.text-stage_line-end').offset().left;

          newValue = input.value;

          // Rotation
          if (previousRandomDEG > 0 && charBeforePreviousRandomDEG <= 0) {newRandomDEG = getRandomDEG(negativeDEGWeights);}
          else if (previousRandomDEG > 0 && charBeforePreviousRandomDEG > 0) {newRandomDEG = getRandomDEG(negativeDEGWeightsHigher);}
          else if (previousRandomDEG < 0 && charBeforePreviousRandomDEG >= 0) {newRandomDEG = getRandomDEG(positiveDEGWeights);}
          else if (previousRandomDEG < 0 && charBeforePreviousRandomDEG < 0) {newRandomDEG = getRandomDEG(positiveDEGWeightsHigher);}
          else if (previousRandomDEG == 0) {newRandomDEG = getRandomDEG(baseDEGWeights);}
          newRotation = `rotate(${newRandomDEG}deg)`;

          // Translation
          newRandomREM = getRandomYAxis(baseYAxisWeights);
          newYTranslation = `translate(0,${newRandomREM + currentRandomREMTotal}rem)`;

          newTransformation = newYTranslation + ' ' + newRotation;

          newFont = getRandomFont(baseFontWeights);

          // To make ^ end session
          if (difference(oldValue, newValue) === '^'){
            $('.outro').css({display:'block'});
            caretEntered = true;
            return;
          }

          // Outputting the modified typed character
          $('.text-stage_line--active').append(`<p>${difference(oldValue, newValue)}</p>`);
          $('.text-stage_line--active p:last-child').css({'transform':newTransformation, 'font-family':newFont, 'color':`${getCurrentColors()[0]}`, 'text-shadow':CSSShadowTemplate(getCurrentColors()[1])});
          if (difference(oldValue, newValue) == ' ') {$('.text-stage_line--active p:last-child').css({'width': '0.5rem'});};


          
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

  // Selecting background image
  function setInitBackground(){
        $('.background-image').css({'background-image': `url(${randomBackground})`});
        $('.text-stage').css({'background-color':'hsla(45,10%,92%,0)'})
  }
  setInitBackground()

  // Button functionality
  $('.intro_start-button').click(function() {
    $('.intro').css({display:'none'})
  })
  $('[class*=audio-button').click(function(){
    if (audioOff){
      audio.play();
      audioOff = false;
    }
    else if (!audioOff){
      audio.pause();
      audioOff = true;
    }
  })
  $('.outro_restart-button').click(function() {
    location.reload();
  })
  $('.outro_background-button').click(function() {
    archillectNum = Math.floor(Math.random() * 9) + 1;
    randomBackground = `images/mind-unwind${archillectNum}.jpg`
    $('.background-image').css({'background-image': `url(${randomBackground})`})
  })
    $('.outro_save-button').click(function(){$('.outro_save-message').css({'opacity':1}).hide().fadeIn('slow');})
  $('.save-message_save-button').click(function() {
   html2canvas(document.querySelector(".background-image")).then(canvas => {
    var image = canvas.toDataURL("image/jpeg");
    var a = document.createElement('A');
    a.href = image;
    a.download = 'mind-unwind.jpeg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    });
  });
  $('.save-message_close-button').click(function(){
    $('.outro').delay(200).fadeOut('slow').delay(3000).fadeIn('fast');
    $('.outro_save-message').animate({"opacity": 0});
  })
});