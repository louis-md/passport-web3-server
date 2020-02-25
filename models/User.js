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
  files: [String],
  organizations: [{
    type: Schema.Types.ObjectId,
    ref: "Organization"
  }],
  sharingProfileWithMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  sharingContactsWithMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  sharingFilesWithMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  sharingProfileWithOrganizations: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  sharingContactsWithOrganizations: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  sharingFilesWithOrganizations: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
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
