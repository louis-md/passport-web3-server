const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, required: false, unique: true},
  password: {type: String, required: false},

  profile: {
    type: Schema.Types.ObjectId,
    ref: "Contact",
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

  // friends: [{
  //   id: {
  //     type: Schema.Types.ObjectId,
  //     ref: "User"
  //   },
  //   hasAccessToContacts: [{
  //     type: Schema.Types.ObjectId,
  //     ref: "User"
  //   }],
  //   hasAccessToFiles: [{
  //     type: Schema.Types.ObjectId,
  //     ref: "File"
  //   }]
  // }],

  // friendRequests: [{
  //   fromId: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User'
  //   },
  //   message: String
  // }],

  invitations: [{
    fromId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization'
    },
    message: String
  }],

  organizations: [{
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization"
    },
    hasAccessToMyContacts: Boolean,
    hasAccessToMyFiles: Boolean
    // hasAccessToContacts: [{
    //   type: Schema.Types.ObjectId,
    //   ref: "Contacts"
    // }],
    // hasAccessToFiles: [{
    //   type: Schema.Types.ObjectId,
    //   ref: "File"
    // }]
  }],

  confirmedEmail: Boolean,
  confirmationCode: {
    type: String,
    unique: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
