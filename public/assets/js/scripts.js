
function c(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

if (window.location.hostname ==  "mathattackerz.firebaseapp.com") {
  window.location.href = "https://mathattackerz.ga";
}
window.onload = function() {
  if (localStorage.firstTime != "true") {
    swal("Is this your first time playing?", "If it is, please look at the rules at https://mathattackerz.ga/rules.html", {
      buttons: {
        cancel: "I've played before, thanks!",
        catch: {
          text: "Take me there!",
          value: "yes",
        },
      },
    }).then((value) => {
      if (value == "yes") {
        window.location.href = "https://mathattackerz.ga/rules.html";
      } else {
        localStorage.firstTime = "true";
      }
    });
  }

};
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
window.onload = function() {
  if (localStorage.viewedNewRules != "true") {
    swal("IMPORTANT", "The rules have changed, levels have come in, and getting points just got way easier. It is now easy to get points in the billions. Please look at the blogpost that explains the new changes. Or go check out https://mathattackerz.ga/rules.html", {
      buttons: {
        cancel: "Seen it, don't show again!",
        catch: {
          text: "Learn how to get billions of points!",
          value: "yes",
        },
      },
    }).then((value) => {
      if (value == "yes") {
        window.location.href = "https://mathattackerz.blogspot.com/2018/06/important-information-sunday-june-24th.html";
      } else {
        localStorage.viewedNewRules = "true";
      }
    });
  }

};
