const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    title: String,
    description: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    contacts: [{
      type: Schema.Types.ObjectId,
      ref: "Contact"
    }],
  
    contactsFromFriends: [{
      type: Schema.Types.ObjectId,
      ref: "File"
    }],
  
    contactsFromOrganizations: [{
      type: Schema.Types.ObjectId,
      ref: "File"
    }],
    
    files: [String],
    filesFromFriends: [{
      type: Schema.Types.ObjectId,
      ref: "File"
    }],
  
    filesFromOrganizations: [{
      type: Schema.Types.ObjectId,
      ref: "File"
    }],
  
    members: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],

    membershipRequests: [{
      fromId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      message: String
    }],

    partnershipRequests: [{
      fromId: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
      },
      message: String
    }],
  
    partnerOrganizations: [{
      id: {
        type: Schema.Types.ObjectId,
        ref: "Organization"
      },
      hasAccessToContacts: [{
        type: Schema.Types.ObjectId,
        ref: "Contacts"
      }],
      hasAccessToFiles: [{
        type: Schema.Types.ObjectId,
        ref: "File"
      }]
    }],

    partnershipRequests: [{
      fromId: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
      },
      message: String
    }],

    contactEmail: [String],
    ethAddresses: [String],
    layers: [[{
      id: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      hasAccessToContacts: [{
        type: Schema.Types.ObjectId,
        ref: "User"
      }],
      hasAccessToFiles: [{
        type: Schema.Types.ObjectId,
        ref: "File"
      }]
    }]],
    phoneNumbers: [String],
    website: String,
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