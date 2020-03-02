const express = require('express');
const mongoose = require("mongoose");
const router  = express.Router();
const User = require('../models/User');

router.put("/:id", (req, res, next) => {
    console.log(`PUT route user/:id, saving org permission for ${JSON.stringify(req.body)} into user ${req.params.id}`)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    User.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({ message: `Organization is updated successfully.` });
      })
      .catch(err => {
        console.log(err)
        res.json(err);
      });
  });

module.exports = router;
