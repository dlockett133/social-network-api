const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: [280, 'Must be less than 280 characters, got {VALUE}']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(timestamp) {
                return new Date(timestamp).toLocaleDateString()
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionsSchema]
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    });

