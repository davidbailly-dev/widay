const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        maxLength: 200,
    },
    content: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    tags: {
        type: [String],
    }
}, { timestamps: true });

noteSchema.index({ title: 'text', content: 'text' });
noteSchema.index({ tags: 1 });

module.exports = mongoose.model('Note', noteSchema);