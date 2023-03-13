const { Schema, model, default: mongoose } = require('mongoose');

const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: [280, 'Must be less than 280 characters, got {VALUE}']
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (timestamp) {
                return Date(timestamp).toLocaleDateString();
            }
        }
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
    }
);

module.exports = reactionsSchema;

