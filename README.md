Math Attackerz
==============

Math Attackerz - A WIP game that helps people learn Multiplication and Addition. Made with [Firebase](firebase.google.com)

Where you can see this
----------------------

Currently, I'm not running this on Github Pages. I'm runnning it on the Firebase Hosting app. If you would like to preview the site, please visit [MathAttackerz.firebaseapp.com](https://mathattackerz.firebaseapp.com)

* * *

How can you contribute to this?
-------------------------------

Currently, here are the three main ways to help out:

*   Add more question forms. [Here](https://github.com/GreenBayRules/MathAttackerz/tree/master/public/assets/questions) is where the questions javascript file is. The question list is a array in the form of:


        [
          {
            "namePartOne": "This is the first thing that pops up. After this is the first randomly generated number.",
            "namePartTwo": "After the first randomly generated number will be this question. Following this is the second randomly generated number.",
            "namePartThree": "This is the last part of the question."
          },
          {
            "namePartOne": "This is the first thing that pops up. After this is the first randomly generated number.",
            "namePartTwo": "After the first randomly generated number will be this question. Following this is the second randomly generated number.",
            "namePartThree": "This is the last part of the question."
          }
        ]


    To contribute this way, just fork the repo, make your changes and submit a pull-request. For every question template you add, you get a small bonus in your Attackerz Points.
*   Another way you can contribute is looking at the help-wanted issues. If you find an issue you would like to take a stab at, fork the project, and create a temporary firebase project. Add in your code, test it with firebase serve, then submit a Pull Request. After the Pull Request is merged, please delete your firebase project. You can keep the fork.
*   I am currently in need of a logo for this project. If you would like to submit a logo, just create an issue.

If you have any other way you are willing to contribute in, just make an issue for it. Thanks!
