const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
    country: {
        type: String,
        required: [true, 'Required field'],
    },
    director: {
        type: String,
        required: [true, 'Required field'],
    },
    duration: {
        type: Number,
        required: [true, 'Required field'],
    },
    year: {
        type: String,
        required: [true, 'Required field'],
    },
    description: {
        type: String,
        required: [true, 'Required field'],
    },
    image: {
        type: String,
        required: [true, 'Required field'],
        validate: {
            validator(v) {
                return validator.isURL(v);
            },
            message: 'must be link',
        },
    },
    trailer: {
        type: String,
        required: [true, 'Required field'],
        validate: {
            validator(v) {
                return validator.isURL(v);
            },
            message: 'must be link',
        },
    },
    thumbnail: {
        type: String,
        required: [true, 'Required field'],
        validate: {
            validator(v) {
                return validator.isURL(v);
            },
            message: 'must be link',
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Required field'],
    },
    movieId: {
        type: Number,
        ref: 'movie',
        required: [true, 'Required field'],
    },
    nameRU: {
        type: String,
        required: [true, 'Required field'],
    },
    nameEN: {
        type: String,
        required: [true, 'Required field'],
    },
});

module.exports = mongoose.model('movie', movieSchema);
