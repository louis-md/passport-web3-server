const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    title: String,
    description: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    contactEmail: [String],
    ethAddresses: [String],
    layers: [[{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]],
    phoneNumbers: [String],
    website: [String],
    socialLinks: [String],
    postalAddresses: [{Object}],
    logo: {
      type: String,
      default: "https://cdn.onlinewebfonts.com/svg/img_258083.png"
    },
    publicFiles: [String],
    privateFiles: [String],
    publicContacts: [String],
    privateContacts: [String]
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;