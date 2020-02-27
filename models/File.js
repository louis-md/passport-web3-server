const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  name: String,
  fileUrl: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
})

const File = mongoose.model('File', fileSchema);
module.exports = File;