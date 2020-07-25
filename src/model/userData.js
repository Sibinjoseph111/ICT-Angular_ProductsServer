const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    password: String
});

var UserModel = mongoose.model('user',UserScheme);



module.exports = UserModel;