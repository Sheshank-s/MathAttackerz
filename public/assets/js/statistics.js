firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    getScore();
  } else {
    setTimeout(function() {swal("You're not signed in'", "Redirecting to login...", {
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


function getScore() {
  var user = firebase.auth().currentUser;
  var starCountRef = firebase.database().ref('users/' + user.uid + '/score');
  starCountRef.on('value', function(snapshot) {
    document.getElementById("score").innerText = c(snapshot.val());
  });
  var starCountRef2 = firebase.database().ref('users/' + user.uid + '/level');
  starCountRef2.on('value', function(snapshot) {
    document.getElementById("level").innerText = c(snapshot.val());
  });
  charts()
}


var multiplicationRight = 10;
var additionRight = 10;
var multiplicationQuestionsRight = 10;
var additionQuestionsRight = 10;
function charts() {
  // Load google charts

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

}
// Draw the chart and set the chart values
function drawChart() {
  var starCountRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
  starCountRef.on('value', function(snapshot) {
    console.log(snapshot.val());
    multiplicationRight = snapshot.val()["statistics"]["multiplication"]["points"];
    additionRight = snapshot.val()["statistics"]["addition"]["points"];
    multiplicationQuestionsRight = snapshot.val()["statistics"]["multiplication"]["questions"];
    additionQuestionsRight = snapshot.val()["statistics"]["addition"]["questions"];
    var data = google.visualization.arrayToDataTable([
    ['Category', 'Points Recieved'],
    ['Multiplication', multiplicationRight],
    ['Addition', additionRight]
    ]);
    var data1 = google.visualization.arrayToDataTable([
    ['Category', 'Questions Right'],
    ['Multiplication', multiplicationQuestionsRight],
    ['Addition', additionQuestionsRight]
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {'width':500, 'height':300};
    var options1 = {'width':500, 'height':300};

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
    var chart1 = new google.visualization.PieChart(document.getElementById('piechart1'));
    chart1.draw(data1, options1);

    document.getElementById("totalquestions").innerHTML = c(multiplicationQuestionsRight+additionQuestionsRight);
    document.getElementById("totaladditionquestions").innerHTML = c(additionQuestionsRight);
    document.getElementById("totalmultiplicationquestions").innerHTML = c(multiplicationQuestionsRight);
    document.getElementById("totalpoints").innerHTML = c(multiplicationRight+additionRight);
    document.getElementById("totaladditionpoints").innerHTML = c(additionRight);
    document.getElementById("totalmultiplicationpoints").innerHTML = c(multiplicationRight);
  });

}
