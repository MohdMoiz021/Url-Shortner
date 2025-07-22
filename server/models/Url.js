const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,


    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d' // Document will be removed after 7 days
    }
});

module.exports = mongoose.model('Url', urlSchema);