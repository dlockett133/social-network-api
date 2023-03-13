const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thoughtController');

router.route('thoughts')
    .get(getThoughts)
    .get(getSingleThought)
    .post(createThought)
    .put(updateThought)
    .delete(deleteThought);