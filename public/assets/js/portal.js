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
  var starCountRef2 = firebase.database().ref('users/' + user.uid + '/username');
  starCountRef.on('value', function(snapshot) {
    document.getElementById("score").innerText = snapshot.val();
  });
  starCountRef2.on('value', function(snapshot) {
    document.getElementById("name").innerText = snapshot.val();
  });
  leaderboard();
}
var leaderboardVal;
var tempLeaderboardVal = [];
function leaderboard() {
  var leaderboard = firebase.database().ref('users');
  leaderboard.on('value', function(snapshot) {
    leaderboardVal = snapshot.val();
    var size = Object.keys(leaderboardVal).length;
    console.log(size);
    tempLeaderboardVal = [];
    for (var i = 0; i < size; i++) {
      tempLeaderboardVal.push(leaderboardVal[Object.keys(leaderboardVal)[i]]);
    }
    leaderboardVal = tempLeaderboardVal;

    leaderboardVal.sort(function(a, b) {
        return a.score - b.score;
    });
    leaderboardVal.reverse();
    leaderboardVal = leaderboardVal.slice(0,5);
    console.log(leaderboardVal);

    var leaderboardParent = document.getElementById("leaderboard");
    leaderboardParent.innerHTML = `<table id="overall-leaderboard-table" class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Place</th>
      <th class="mdl-data-table__cell--non-numeric">Username</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1.</td>
      <td id="1name" class="mdl-data-table__cell--non-numeric">The smart one</td>
      <td id="1score">40</td>
    </tr>
    <tr>
      <td>2.</td>
      <td id="2name" class="mdl-data-table__cell--non-numeric">The smart one</td>
      <td id="2score">40</td>
    </tr>
    <tr>
      <td>3.</td>
      <td id="3name" class="mdl-data-table__cell--non-numeric">The smart one</td>
      <td id="3score">40</td>
    </tr>
    <tr>
      <td>4.</td>
      <td id="4name" class="mdl-data-table__cell--non-numeric">The smart one</td>
      <td id="4score">40</td>
    </tr>
    <tr>
      <td>5.</td>
      <td id="5name" class="mdl-data-table__cell--non-numeric">The smart one</td>
      <td id="5score">40</td>
    </tr>
  </tbody>
</table>
`;

    for (var i = 1; i <= 5; i++) {
      document.getElementById(i + "name").innerText = leaderboardVal[i-1].username;
      document.getElementById(i + "score").innerText = leaderboardVal[i-1].score;
    }
  });
}
