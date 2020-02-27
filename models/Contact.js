const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    openToMembers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    openToOrganizations: [{
      type: Schema.Types.ObjectId,
      ref: 'Organization'
    }],
    firstName: String,
    lastName: String,
    bio: String,
    secondaryEmails: [String],
    phoneNumbers: [String],
    ethAddresses: [String],
    postalAddresses: [Object],
    socialAccounts: Object,
    avatar: {
      type: String,
      default: "https://cdn.onlinewebfonts.com/svg/img_258083.png"
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: "User",
    },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;