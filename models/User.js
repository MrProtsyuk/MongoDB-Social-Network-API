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
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length; 
})

const User = model('User', UserSchema);

module.exports = User;