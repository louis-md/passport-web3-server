const contactModel = require("../models/Contact");



module.exports = function protectUserRoute(req, res, next) {
    contactModel
      .findById(req.params.id)
      .then(contact => {
        if (contact.user == req.session.currentUser._id) next();
        else res.redirect("/contacts");
      })
      .catch(next)
  }
