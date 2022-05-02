const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName: {
        type: String,
        required: "Must input a Username!",
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: "Must input an email address!",
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Frineds'
        }
    ]
})

// * `username`
//     * String
//     * Unique
//     * Required
//     * Trimmed

// * `email`
//     * String
//     * Required
//     * Unique
//     * Must match a valid email address (look into Mongoose's matching validation)

// * `thoughts`
//     * Array of `_id` values referencing the `Thought` model

// * `friends`
//     * Array of `_id` values referencing the `User` model (self-reference)

// **Schema Settings**

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => total + friends.replies.length + 1, 0);
  });

const User = model('User', UserSchema);

module.exports = User;