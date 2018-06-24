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
  var starCountRef3 = firebase.database().ref('users/' + user.uid + '/email');
  var starCountRef4 = firebase.database().ref('users/' + user.uid + '/profile_picture');
  starCountRef2.on('value', function(snapshot) {
    document.getElementById("name").innerText = snapshot.val();
  });
  starCountRef3.on('value', function(snapshot) {
    document.getElementById("email").innerText = snapshot.val();
  });
  starCountRef4.on('value', function(snapshot) {
    document.getElementById("profile-picture").src = snapshot.val();
  });
}

function updateSettings() {
  var inputName = document.getElementById("name-input").value;
  var inputEmail = document.getElementById("email-input").value;
  var inputPhotoLink = document.getElementById("profile-picture-input").value;

  var profile1;
  var user = firebase.auth().currentUser;
  user.providerData.forEach(function (profile) {
    profile1 = profile.providerId;
  });
  var name, email, photoUrl, uid, emailVerified, score;
  if (inputName == "") {
    name = user.displayName;
  } else {
    name = inputName;
  }
  if (inputEmail == "") {
    email = user.email;
  } else {
    if (profile1 == "google.com") {
      swal("Error", "You can't change your email if you made your account with google.", {
        "icon": "error"
      });
      email = user.email;
    } else {
      email = inputEmail;
    }
  }
  if (inputPhotoLink == "") {
    photoUrl = user.photoURL;
  } else {
    photoUrl = inputPhotoLink;
  }
  console.log(name + email + user.email + photoUrl + uid);
  uid = user.uid;

  firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
    console.log(snapshot.val());
    score = snapshot.val().score;
    console.log(score["score"]);
    // Write user to db
    firebase.database().ref('users/' + uid).update({
      username: name,
      email: email,
      profile_picture : photoUrl,
    }).catch(function(error) {
      console.log(error);
    }).then(function() {
      var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name,
        photoURL: photoUrl,
      }).then(function() {
        var user = firebase.auth().currentUser;
        var isNew = true;
        if(email == user.email) {
          isNew = false;
        }
        user.updateEmail(email).then(function() {
          if (isNew) {
            user.sendEmailVerification();
          }
        }).catch(function(error) {
          // An error happened.
        });
      }).catch(function(error) {
        // An error happened.
      });

    });
  });


}
