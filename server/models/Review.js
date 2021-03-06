const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    message: String,
    creator: {
        firstName: String,
        lastName: String,
        profilePhoto: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = Review = mongoose.model("review", reviewSchema);
