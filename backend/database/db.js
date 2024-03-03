const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect("mongodb+srv://kanishk:Bluecar22$@cluster0.reprrdd.mongodb.net/Paytm");
const User = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const Account  = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    balance : {
        type: Number,
        required: true
    }

})

const AccountModel = mongoose.model('AccountModel', Account);
const UserModel = mongoose.model('UserModel',User);

module.exports = {
    UserModel, AccountModel
}