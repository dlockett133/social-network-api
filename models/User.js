const { Schema, model, default: mongoose } = require('mongoose');

const userSchema = new Schema(
    {
        thoughtText: {
            type: String,
            unique: true,
            required: true,
            trim: true           
        },
        
        email: {
            type: String,
            required: true,
            unique: true,
            match: '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    }
);

userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length
    })

const User = model('user', userSchema);

module.exports = User;