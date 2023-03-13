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
    },

    createThought(req,res) {
        const {thoughtText, username, userId} = req.body;
        Thought.create({thoughtText, username})
            .then((thought) =>{
                const thoughtId = thought._id;
                
                return Thought.findByIdAndUpdate(userId,
                {$push: {thoughts: thoughtId}},
                {new: true});
            })
            .then((user) => {
                !user
                    ? res.status(400).json({message: 'Found no user with this ID'})
                    : res.status(201).json(user)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({message: 'Server Error'})
            })      
    },

    updateThought(req,res) {
        const { thoughtText } = req.body;
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            {thoughtText},
            {
                new: true,
                runValidators: true
            }
        )
        .then((thought) => {
            !thought
                ? res.status(400).json({message: 'Found no thought with this ID'})
                : res.status(201).json(thought)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: 'Server Error'})
        })
    }

}