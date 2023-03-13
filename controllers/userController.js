const { User } = require("../models");

module.exports = {
    getUsers(req,res) {
        User.find()
            .then((users) => res.status(200).json(users))
            .catch((err)=> {
                console.log(err);
                res.status(500).json(err);
            });
    },
    
    getSingleUser(req,res) {
        const {userId} = req.params;
        User.findOne({_id: userId})
            .populate('thoughts')
            .populate('friends')
            .then((user) => {
                !user 
                    ? res.status(400).json({message: 'Found no user with this ID'})
                    : res.status(200).json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    createUser(req,res) {
        console.log(req.body)
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    updateUser(req,res) {
        const {userId} = req.params;
        User.findByIdAndUpdate(
            userId, 
            req.body,
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
        const {userId} = req.params;
        User.findByIdAndDelete(userId)
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
        const {userId} = req.params;
        const {friendId} = req.params;

        User.findOneAndUpdate(
            {_id: userId},
            {$addToSet: {friends: friendId}},
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
        const {userId} = req.params;
        const {friendId} = req.params;
        User.findOneAndUpdate(
            {_id: userId},
            {$pull: {friends: friendId}},
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