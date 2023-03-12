const { Thought } = require("../models");

module.exports = {
    getThoughts(req,res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Server'})
        })
    },

    getSingleThought(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
            .then((thought) => {
                !thought
                    ? res.status(400).json({message: 'No user found with this ID'})
                    : res.status(200).json(thought)
                })
            .catch((err) => {
                console.log(err);
                res.status(500).json({message: 'Server Error'})
            });
    }
}