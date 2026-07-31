import mongoose from "mongoose";

import type { Note, Tag } from "../types/note";

const noteSchema = new mongoose.Schema<Note>({
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
            label: { type: String, required: true, maxLength: 30}
        }],
        default: [],
        validate: {
            validator: function(v: Tag[]) {
                return v.length <= 5
            },
            message: 'Max 5 tags can be added to a note'
        }
    }
}, { timestamps: true });

noteSchema.index({ content: "text", 'tags.label': "text" }, { name: 'text_search_idx' });
noteSchema.index({ date: 1 }, { name: 'date_text_idx' });

export default mongoose.model('Note', noteSchema);