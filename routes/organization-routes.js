const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Organization = require("../models/Organization");

router.get("/", (req, res, next) => {
  Organization.find()
    .then(allTheOrganizations => {
      res.json(allTheOrganizations);
    })
    .catch(err => {
      res.json(err);
    });
});

// POST route => to create a new organization
router.post("/", (req, res, next) => {
  console.log(req.body);
  const {
    title,
    description,
    owner,
    members,
    contactEmail,
    phoneNumbers,
    layers,
    ethAddresses,
    website,
    socialLinks,
    postalAddresses,
    logo,
    publicFiles,
    privateFiles,
    publicContacts,
    privateContacts
  } = req.body;

  Organization.create({
    title,
    description,
    owner,
    members,
    layers,
    ethAddresses,
    contactEmail,
    phoneNumbers,
    website,
    socialLinks,
    postalAddresses,
    logo,
    publicFiles,
    privateFiles,
    publicContacts,
    privateContacts
  })
    .then(response => {
      console.log("Successfully saved organization to the database");
      res.json(response);
    })
    .catch(err => {
      console.log(err)
      res.json(err);
    });
});

router.get("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Organization.findById(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT route => to update a specific organization
router.put("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Organization.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Organization is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE route => to delete a specific organization
router.delete("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Organization.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Organization {req.params.id} is removed successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
