const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: [280, 'Must be less than 280 characters, got {VALUE}']
        }

    }
)