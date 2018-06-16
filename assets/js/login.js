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

function signin() {
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;
  var errorMessage;
  var errorCode;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    errorCode = error.code;
    errorMessage = error.message;


    // ...
  }).then(function () {
    if (errorMessage != null) {
      swal({
        title: "Error Code: " + errorCode.substring(5),
        text: errorMessage,
        icon: "error"
      });
    } else {
      swal({
        title: "Success!",
        text: "You have logged in! Redirecting to portal...",
        icon: "success",
        timer: 1000,
      }).then(function() {
        window.location.href = "./portal.html";
      });
    }

  });

}

function signInGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).catch(function(error) {

  }).then(function() {
    swal({
      title: "Success!",
      text: "You have logged in! Redirecting to portal...",
      icon: "success",
      timer: 1000,
    }).then(function() {
      window.location.href = "./portal.html";
    });
  });
}

function onLoadLogIn() {

}
