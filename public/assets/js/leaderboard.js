var leaderboardVal;
var tempLeaderboardVal = [];
window.onload  = function () {
  leaderboard();
};
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
    console.log(leaderboardVal);
    var myNode = document.getElementById("dropbox-leaderboard");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    for (var i = 1; i <= leaderboardVal.length; i++) {
      var tr = document.createElement("TR");
      var tdPlace = document.createElement("TD");
      tdPlace.appendChild(document.createTextNode(i));
      var tdName = document.createElement("TD");
      tdName.id = i + "name";
      var att = document.createAttribute("class");
      att.value = "mdl-data-table__cell--non-numeric";
      tdName.setAttributeNode(att);
      var tdScore = document.createElement("TD");
      tdScore.id = i + "score";
      tr.appendChild(tdPlace);
      tr.appendChild(tdName);
      tr.appendChild(tdScore);
      document.getElementById("dropbox-leaderboard").appendChild(tr);
      document.getElementById(i + "name").innerText = leaderboardVal[i-1].username;
      document.getElementById(i + "score").innerText = leaderboardVal[i-1].score;
    }
  });
}
