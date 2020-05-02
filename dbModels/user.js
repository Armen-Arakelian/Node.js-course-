const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Enter email please'],
  },
  password: {
    type: String,
    required: [true, 'Enter password please'],
  },
  name: {},
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

mongoose.model('user', UserSchema);
