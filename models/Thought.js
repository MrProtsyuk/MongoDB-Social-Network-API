// **Thought**
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: "Must enter a valid message",
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: "Enter your username"
        },
        reactions: [reactionsSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      });

// * `createdAt`
//     * Date
//     * Set default value to the current timestamp
//     * Use a getter method to format the timestamp on query

// * `username` - Which user created this thought
//     * String
//     * Required

// * `reactions` (like replies)
//     * Array of nested documents created with the `reactionSchema`

// **Schema Settings**

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query

// ---

// **Reaction** (SCHEMA ONLY)

// * `reactionId`
//     * Use Mongoose's ObjectId data type
//     * Default value is set to a new ObjectId

// * `reactionBody`
//     * String
//     * Required
//     * 280 character maximum

// * `username`
//     * String
//     * Required

// * `createdAt`
//     * Date
//     * Set default value to the current timestamp
//     * Use a getter method to format the timestamp on query

// **Schema Settings**

// This will not be a model, but rather used as the `reaction` field's subdocument schema in the `Thought` model.