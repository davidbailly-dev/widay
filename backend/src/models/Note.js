const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    tags: {
        type: [{
            key: { type: String, required: true},
            label: { type: String, required: true}
        }],
        default: [],
        validate: {
            validator: function(v) {
                return v.length <= 5
            },
            message: 'Max 5 tags can be added to a note'
        }
    }
}, { timestamps: true });

noteSchema.index({ content: "text", 'tags.label': "text" }, { name: 'text_search_idx' });
noteSchema.index({ date: 1 }, { name: 'date_text_idx' });

module.exports = mongoose.model('Note', noteSchema);