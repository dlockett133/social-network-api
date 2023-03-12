const { Thought } = require("../models");

module.exports = {
    getThoughts(req,res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Server'})
        })
    }
}