const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");

// Signup Form
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

// Signup Logic
router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {   
      if (err) return next(err);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to WanderLust!");
        res.redirect("/listings");
      });
      // req.flash("success", "Welcome to WanderLust!");
      // res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

// Login Form
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

// Login Logic
router.post(
  "/login",
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  } 
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are loggedout successfully!");
    res.redirect("/listings");
  });
});

module.exports = router;
