var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,
    password: String,
    admin:   {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(passportLocalMongoose);

var Users = mongoose.model('User', UserSchema);
module.exports = Users;