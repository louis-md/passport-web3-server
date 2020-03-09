const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Contact = require("../models/Contact");

const nodemailer = require("nodemailer");
var Recaptcha = require("express-recaptcha").RecaptchaV2;
var recaptcha = new Recaptcha(
  process.env.RECAPTCHA_SITEKEY,
  process.env.RECAPTCHA_SITESECRET
);
var zxcvbn = require("zxcvbn");

authRoutes.post("/signup", recaptcha.middleware.verify, (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const bcryptSalt = 10;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let token = "";

  zxcvbn(password, req.body);

  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  if (email === "" || password === "") {
    console.log("Provide username and password");
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      console.log("Email taken. Choose another one.");
      return;
    }
  });

  async function sendConfirmationEmail() {
    let transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      port: 465,
      secure: true, // true for port 465, must be false for other ports
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
      }
    });

    let info = await transporter.sendMail({
      from: '"Contacth 👻" <contacth@97.network>',
      to: email,
      subject: "Please verify your email ✔",
      text: `Hi ${firstName}! Please click this link to verify your email: https://contacth.herokuapp.com/auth/confirm/${token}`,
      html: `<b>Hi ${firstName}! Please click this link to verify your email: https://contacth.herokuapp.com/auth/confirm/${token}</b>`
    });
    console.log("Message sent!", info.messageId);
  }

  const newUser = new User({
    email: email,
    password: hashPass,
    confirmationCode: token,
    confirmedEmail: false
  });

  const newContact = new Contact({
    firstName: firstName,
    lastName: lastName
  });

  //   if (!req.recaptcha.error) {
  Promise.all([newUser.save(), newContact.save()]).then(dbRes => {
    User.findByIdAndUpdate(dbRes[0]._id, { profile: dbRes[1]._id }).then(() => {
      Contact.findByIdAndUpdate(dbRes[1]._id, { owner: dbRes[0]._id }).then(
        () => {
          sendConfirmationEmail();
          req.login(newUser, err => {
            if (err) {
              res.status(500).json({ message: "Login after signup went bad." });
              return;
            }

            // Send the user's information to the frontend
            // We can use also: res.status(200).json(req.user);
            res.status(200).json(newUser);
            console.log("Logged in after signup");
          });
        }
      );
    });
  });
  //   } else {
  //     console.log('Recaptcha error');
  //   }
});

authRoutes.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(user)
      return res.status(400).send("Invalid credentials")
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.status(200).send(user);
    });
  })(req, res, next);
  // const user = req.body;

  // if (!user.email || !user.password) {
  //   req.flash("error", "Wrong credentials");
  //   return;
  // }

  // User
  //   .findOne({email: user.email})
  //   .then(dbRes => {
  //     activeUser = dbRes._id
  //     console.log(activeUser);
  //     console.log(user.password, user.email)

  //     if (!dbRes) {
  //       return res.status(403).json({ message: 'Unauthorized' });
  //     }
  //     if (bcrypt.compareSync(user.password, dbRes.password)) {
  //       const { _doc: clone } = { ...dbRes };

  //       delete clone.password;
  //       req.session.currentUser = clone;
  //       if(dbRes.confirmedEmail) {
  //         console.log("Logged in!")
  //         req.logIn(dbRes, (err) => {
  //             if (err) {
  //                 res.status(500).json({ message: 'Login after signup went bad.' });
  //                 return;
  //             }
  //             res.status(200).json(user);
  //         return;
  //         })
  //       } else {
  //         console.log('Email unconfirmed')
  //         return res.status(403).json({ message: 'Email unconfirmed' });
  //       }
  //     } else {
  //       console.log("Wrong credentials")
  //       req.flash("error", "Wrong credentials");
  //       return res.status(403).json({ message: 'Wrong credentials' });;
  //     }
  //   })
  //   .catch(next);
  // res.status(200).json({ message: 'Log out success!' });
});

authRoutes.post("/login", (req, res, next) => {
  const user = req.body;

  if (!user.email || !user.password) {
    req.flash("error", "Wrong credentials");
    return;
  }

  User.findOne({ email: user.email })
    .then(dbRes => {
      activeUser = dbRes._id;
      console.log(activeUser);
      console.log(user.password, user.email);

      if (!dbRes) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        const { _doc: clone } = { ...dbRes };

        delete clone.password;
        req.session.currentUser = clone;
        if (dbRes.confirmedEmail) {
          console.log("Logged in!");
          req.logIn(dbRes, err => {
            if (err) {
              res.status(500).json({ message: "Login after signup went bad." });
              return;
            }
            res.status(200).json(user);
            return;
          });
        } else {
          console.log("Email unconfirmed");
          return res.status(403).json({ message: "Email unconfirmed" });
        }
      } else {
        console.log("Wrong credentials");
        req.flash("error", "Wrong credentials");
        return res.status(403).json({ message: "Wrong credentials" });
      }
    })
    .catch(next);
});

authRoutes.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  console.log(req);
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = authRoutes;
