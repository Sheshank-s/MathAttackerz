if (window.location.hostname ==  "mathattackerz.firebaseapp.com") {
  window.location.href = "https://mathattackerz.ga";
}
window.onload = function() {
  if (localStorage.viewed != "true") {
    swal("Love Math Attackerz?", "Go follow our blog! There you will get many updates on what's happening with the site! Follow the blog, Comment on posts, and share!!!", {
      buttons: {
        cancel: "Seen it, don't show again!",
        catch: {
          text: "Check it out!",
          value: "yes",
        },
      },
    }).then((value) => {
      if (value == "yes") {
        window.location.href = "https://mathattackerz.blogspot.com";
      } else {
        localStorage.viewed = "true";
      }
    });
  }

};
