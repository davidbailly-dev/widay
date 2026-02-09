const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    tags: {
        type: [String],
        validate: {
            validator: function(v) {
                return v.length <= 2
            },
            message: 'Max 2 tags can be added to a note'
        }
    }
}, { timestamps: true });

noteSchema.index({ tags: 1 });

module.exports = mongoose.model('Note', noteSchema);