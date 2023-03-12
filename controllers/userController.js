const { User } = require("../models");

module.exports = {
    getUsers(req,res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err)=> {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    getSingleUser(req,res) {
        User.findOne({_id: req.params.userId})
            .populate('thoughts')
            .populate('friends')
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    createUser(req,res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    updateUser(req,res) {
        User.findByIdAndUpdate(
            req.params.userId, 
            req.params.body,
            {
                new: true,
                runValidators: true
            })
            .populate('thoughts')
            .populate('friends')
            .then((user) => {
                !user 
                    ? res.status(400).json({message: 'Found no user with this ID'})
                    : res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({message: 'Server error'});
            });
    },

    deleteUser(req,res) {
        User.findByIdAndDelete(req.params.userId)
            .then((user) => {
                !user 
                    ? res.status(400).json({message: 'Found no user with this ID'})
                    : res.json({message: 'User deleted successfully'});
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({message: 'Server error'});
            });
    },

    addFriend(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {new: true})
            .populate('friends')
            .then((user) => {
                !user
                ? res.status(400).json({message: 'Found no user with this ID'})
                : res.json(user)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({message: 'Server error'});
            })
    },

    removeFriend(req,res) {
        User.findOneAndDelete(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true})
            .populate('friends')
            .then((user) => {
                !user
                    ? res.status(400).json({message: 'Found no user with this ID'})
                    : res.json({message: 'Friend removed from list'})
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({message: 'Server error'});
            })
    }
};