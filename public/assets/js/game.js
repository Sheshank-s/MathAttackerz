firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    getScore();
  } else {
    setTimeout(function() {swal("Your not signed in.", "Redirecting to login...", {
      buttons: false,
      timer: 1000,
    }).then(function() {
      window.location.href = "./login.html";
    });}, 2000);
  }
});


function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  }).then(function() {
    swal("Logged out!", "Redirecting to login page...", {
      buttons: false,
      icon: "success",
      timer: 1000,
    }).then(function() {
      window.location.href = "./login.html";
    });
  });
}

var sessionCorrect = 0;
var sessionWrong = 0;

function rules() {
  swal("Rules:", "Answer the question. If you get it right, you get amount of points added to your total. If you get it wrong, you don't lose any points. You'll get a short description on how the problem was solved. Then, you can move to the next question. Click on of the top buttons to change the mode.", {
    icon: "info"
  }).then(function() {

  });
}

function addition() {
  var questionDiv = document.getElementById("question-content");

  var questionBank = additionQuestion;
  currentNumber1 = Math.floor(Math.random() * 10) + 4;
  currentNumber2 = Math.floor(Math.random() * 10) + 4;
  var randomQuestionNumber = Math.floor(Math.random() * (questionBank.length));
  var questionPartOne = questionBank[randomQuestionNumber]["namePartOne"] + " " + currentNumber1;
  var questionPartTwo = questionBank[randomQuestionNumber]["namePartTwo"] + " " + currentNumber2;
  var questionPartThree = questionBank[randomQuestionNumber]["namePartThree"];
  var question = questionPartOne + " " + questionPartTwo + " " + questionPartThree;

  questionDiv.innerHTML =
  `<div class="question-title">Addition</div>
  <div class="question-body">` + question + `</div>
  <div class="question-input">
    <!-- Numeric Textfield with Floating Label -->
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input placeholder="Your Answer Goes Here..." class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="question-input-field" autofocus></input>
      <span class="mdl-textfield__error">Input is not a number!</span>
    </div>
  </div>
  <!-- Accent-colored raised button with ripple -->
  <button style="display:inline-block;" onclick="evaluateAnswerAddition()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
    Submit
  </button>`;
  document.getElementById("title").innerHTML = "Score: <span id='score'></span>";
  var user = firebase.auth().currentUser;
  var starCountRef = firebase.database().ref('users/' + user.uid + '/score');
  starCountRef.on('value', function(snapshot) {
    document.getElementById("score").innerText = snapshot.val();
  });
}
var currentNumber1;
var currentNumber2;
function multiplication() {
  var questionDiv = document.getElementById("question-content");

  var questionBank = multiplicationQuestion;
  currentNumber1 = Math.floor(Math.random() * 10) + 4;
  currentNumber2 = Math.floor(Math.random() * 10) + 4;
  var randomQuestionNumber = Math.floor(Math.random() * (questionBank.length));
  var questionPartOne = questionBank[randomQuestionNumber]["namePartOne"] + " " + currentNumber1;
  var questionPartTwo = questionBank[randomQuestionNumber]["namePartTwo"] + " " + currentNumber2;
  var questionPartThree = questionBank[randomQuestionNumber]["namePartThree"];
  var question = questionPartOne + " " + questionPartTwo + " " + questionPartThree;

  questionDiv.innerHTML =
  `<div class="question-title">Multiplication</div>
  <div class="question-body">` + question + `</div>
  <div class="question-input">
    <!-- Numeric Textfield with Floating Label -->
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input placeholder="Your Answer Goes Here..." class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="question-input-field" autofocus></input>
      <span class="mdl-textfield__error">Input is not a number!</span>
    </div>
  </div>
  <!-- Accent-colored raised button with ripple -->
  <button style="display:inline-block;" onclick="evaluateAnswerMultiplication()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
    Submit
  </button>`;
  document.getElementById("title").innerHTML = "Score: <span id='score'></span>";
  var user = firebase.auth().currentUser;
  var starCountRef = firebase.database().ref('users/' + user.uid + '/score');
  starCountRef.on('value', function(snapshot) {
    document.getElementById("score").innerText = snapshot.val();
  });
}

function evaluateAnswerMultiplication() {
  var answer = currentNumber1 * currentNumber2;
  if (parseInt(document.getElementById("question-input-field").value) == answer) {
    var points = Math.floor(Math.floor(Math.random()*4) + (currentNumber1+currentNumber2)/2);
    swal("Correct!", "You are correct! " + currentNumber1 + " times " + currentNumber2 + " does equal " + answer + "! You will recieve " + points + " points for that question.", {
      "icon": "success"
    }).then(function() {
      sessionCorrect++;
      document.getElementsByClassName("session-correct-number")[0].innerHTML = sessionCorrect;
      // Write user to db

      var user = firebase.auth().currentUser;
      firebase.database().ref('users/' + user.uid).set({
        score: parseInt(document.getElementById("score").innerText)  + points,
      }).catch(function(error) {
        console.log(error);
      });
    });
  } else {
    swal("Oh noes!", "You are incorrect. " + currentNumber1 + " times " + currentNumber2 + " does not equal " + document.getElementById("question-input-field").value + ". It actually equals " + answer + ". You will lose 2 points.", {
      "icon": "error"
    }).then(function() {
      sessionWrong++;
      document.getElementsByClassName("session-wrong-number")[0].innerHTML = sessionWrong;

      // Write user to db

      var user = firebase.auth().currentUser;
      firebase.database().ref('users/' + user.uid).set({
        score: parseInt(document.getElementById("score").innerText) - 2,
      }).catch(function(error) {
        console.log(error);
      });
    });
  }
  multiplication();
}

function evaluateAnswerAddition() {
  var answer = currentNumber1 + currentNumber2;
  if (parseInt(document.getElementById("question-input-field").value) == answer) {
    var points = Math.floor(Math.floor(Math.random()*4) + (currentNumber1+currentNumber2)/2);
    swal("Correct!", "You are correct! " + currentNumber1 + " plus " + currentNumber2 + " does equal " + answer + "! You will recieve " + points + " points for that question.", {
      "icon": "success"
    }).then(function() {
      sessionCorrect++;
      document.getElementsByClassName("session-correct-number")[0].innerHTML = sessionCorrect;
      // Write user to db

      var user = firebase.auth().currentUser;
      firebase.database().ref('users/' + user.uid).set({
        score: parseInt(document.getElementById("score").innerText)  + points,
      }).catch(function(error) {
        console.log(error);
      });
    });
  } else {
    swal("Oh noes!", "You are incorrect. " + currentNumber1 + " plus " + currentNumber2 + " does not equal " + document.getElementById("question-input-field").value + ". It actually equals " + answer + ". You will lose 2 points.", {
      "icon": "error"
    }).then(function() {
      sessionWrong++;
      document.getElementsByClassName("session-wrong-number")[0].innerHTML = sessionWrong;

      // Write user to db

      var user = firebase.auth().currentUser;
      firebase.database().ref('users/' + user.uid).set({
        score: parseInt(document.getElementById("score").innerText) - 2,
      }).catch(function(error) {
        console.log(error);
      });
    });
  }
  addition();
}
