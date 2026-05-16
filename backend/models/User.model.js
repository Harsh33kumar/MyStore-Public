const { Schema, model } = require('mongoose');

const userSchema = new Schema(
{
    username: {
        type: String,
        required: true,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },

    password: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
});

const User = model('User', userSchema);

module.exports = User;