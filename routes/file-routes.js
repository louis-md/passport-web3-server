const express = require('express');
const router  = express.Router();
const File = require('../models/File');
const uploader = require('../configs/cloudinary');
const User = require('../models/User')

router.get('/', (req, res, next) => {
    File.find()
    .then(filesFromDB => {
        res.status(200).json(filesFromDB)
    })
    .catch(err => next(err))
})

router.post('/new', (req, res, next) => {
    // console.log('body: ', req.body); ==> here we can see that all
    // the fields have the same names as the ones in the model so we can simply pass
    // req.body to the .create() method
    
    File.create(req.body)
    .then( aNewFile => {
        // console.log('Created new thing: ', aNewThing);
        res.status(200).json(aNewFile);
        User.findByIdAndUpdate(aNewFile.owner, {$push: {"files": aNewFile._id}});
    })
    .catch( err => next(err) )
})

router.post('/upload', uploader.single("fileUrl"), (req, res, next) => {
    // console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
})

module.exports = router;
