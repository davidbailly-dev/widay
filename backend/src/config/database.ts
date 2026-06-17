import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error('Missing required environment variable: MONGODB_URI');
        }

        await mongoose.connect(uri, {});

        console.log('✅ Connected to MongoDB successfully !');

        // Force MongoDB indexes to be created in the database
        // const Note = require('../models/Note');

        // const createIndexes = async () => {
        //     try {
        //         await Note.collection.createIndex({ content: "text", tags: "text" }, { name: "text_search_idx" });
        //         await Note.collection.createIndex({ date: 1, content: "text", tags: "text" }, { name: "date_text_idx" });
        //         console.log('✅ Indexes text créés !');
        //     } catch (err) {
        //         console.log('Index existe déjà ou erreur:', err.message);
        //     }
        // };

        // createIndexes();

    } catch (err) {
        console.log('Error connecting to MongoDB : ', err);
        process.exit();
    }
};

export default connectDB;