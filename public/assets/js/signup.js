firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    setTimeout(function() {swal("Your already signed in.", "Redirecting to portal...", {
      buttons: false,
      timer: 1000,
    }).then(function() {
      window.location.href = "./portal.html";
    });}, 2000);
  } else {
    // No user is signed in.
  }
});

function signup() {
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;
  var firstName = document.getElementById("login-first-name").value;
  var lastName = document.getElementById("login-last-name").value;
  var displayName1 = firstName + " " + lastName;
  var errorCode;
  var errorMessage;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    errorCode = error.code;
    errorMessage = error.message;
    // ...
  }).then(function () {
    if (errorMessage == null) {
      swal({
        title: "Success!",
        text: "You have signed up! Redirecting to portal...",
        icon: "success",
        timer: 1000,
      }).then(function() {
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified, score;
        console.log(user);
        if (user != null) {
          user.updateProfile({
            displayName: displayName1
          }).catch(function(error) {

          }).then(function() {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            // emailVerified = user.emailVerified;
            uid = user.uid;
            console.log(name + " " + email + " " + photoUrl + " " + uid);
            score = 0;

            // Write user to db
            firebase.database().ref('users/' + uid).set({
              username: name,
              email: email,
              profile_picture : photoUrl,
              score: score,
            }).catch(function(error) {
              console.log(error);
            }).then(function() {
              window.location.href = "./portal.html";
            });
          });
        }

      });
    } else {
      swal({
        title: "Error: " + errorCode.substring(5),
        text: errorMessage,
        icon: "error",
        timer: 1000,
      });
    }

  });

}

function signUpGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).catch(function(error) {
    var errorCode = error.errorCode;
    var errorMessage = error.errorMessage;
  }).then(function () {
    swal({
      title: "Success!",
      text: "You have signed up! Redirecting to login page...",
      icon: "success",
      timer: 1000,
    }).then(function() {
      var user = firebase.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified, score;
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      // emailVerified = user.emailVerified;
      uid = user.uid;
      console.log(name + " " + email + " " + photoUrl + " " + uid);
      score = 0;

      // Write user to db
      firebase.database().ref('users/' + uid).set({
        username: name,
        email: email,
        profile_picture : photoUrl,
        score: score,
      }).catch(function(error) {
        console.log(error);
      }).then(function() {
        window.location.href = "./portal.html";
      });
    });
});
}


function writeUserData(userId, name, email, imageUrl, score) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl,
    score: score,
  });
}
