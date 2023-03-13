const { Thought, User } = require("../models");

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
        const {thoughtId} = req.params;
        Thought.findOne({_id: thoughtId})
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
                
                return User.findByIdAndUpdate(
                userId,
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
    },

    deleteThought(req,res) {
        const {thoughtId} = req.params;
        Thought.findByIdAndDelete(thoughtId)
            .then((thought) => {
                if (!thought) {
                  res.status(400).json({message: 'Found no thought with this ID'})
                }
                return User.findByIdAndUpdate(
                    thought.username,
                    {$pull: {thoughts: thoughtId}},
                    {new: true}
                )
            .then((user) => {
                !user
                    ? res.status(400).json({message: 'Found no user with this ID'})
                    : res.json({ message: 'Thought and associated user data deleted' });
            })
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({message: 'Server Error'})
            })
    },

    createReaction(req,res) {
        const {thoughtId} = req.params;
        const {username, reactionBody} = req.body;
        Thought.findByIdAndUpdate(
            thoughtId,
            {$push: {reactions: {username, reactionBody}}},
            {
                new: true,
                runValidators: true
            }
        )
        .then((thought) => {
            if(!thought) {
                res.status(400).json({message: 'Found no thought with this ID'});
            }

            res.status(201).json({thought})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Server Error'})
        });
    },

    removeReaction(req,res) {
        const {thoughtId} = req.params;
        const {reactionId} = req.body;
        Thought.findByIdAndUpdate(
            thoughtId,
            {$pull: {reactions: {reactionId}}},
            {new: true}
            )
            .then((thought) => {
                if(!thought) {
                    res.status(400).json({message: 'Found no thought with this ID'});
                }
                res.json({message: 'Reaction has been removed'})
            })  
            .catch((err) => {
                console.log(err);
                res.status(500).json({message: 'Server Error'})
            });
    }
}